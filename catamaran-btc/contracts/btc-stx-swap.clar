(define-constant expiry u100)
(define-map swaps uint {sats: uint, btc-receiver: (buff 40), ustx: uint, stx-receiver: (optional principal), stx-sender: principal, when: uint, done: uint})
(define-data-var next-id uint u0)

(define-private (find-out (entry {scriptPubKey: (buff 128), value: (buff 8)}) (result {pubscriptkey: (buff 40), out: (optional {scriptPubKey: (buff 128), value: uint})}))
  (if (is-eq (get scriptPubKey entry) (get pubscriptkey result))
    (merge result {out: (some {scriptPubKey: (get scriptPubKey entry), value: (get uint32 (unwrap-panic (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v5 read-uint32 {txbuff: (get value entry), index: u0})))})})
    result))

;; Top level function to contruct the header from its parts
(define-read-only (concat-header (block { version: (buff 4), parent: (buff 32), merkle-root: (buff 32), timestamp: (buff 4), nbits: (buff 4), nonce: (buff 4), height: uint }))
  (concat (concat (concat (concat (concat (get version block) (get parent block)) (get merkle-root block)) (get timestamp block)) (get nbits block)) (get nonce block)))

;; Top level function to produces a raw transaction without witnesses
;; from transaction parts
(define-read-only (concat-tx (tx {version: (buff 4),
                                  ins: (list 8
                                        {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
                                  outs: (list 8
                                         {value: (buff 8), scriptPubKey: (buff 128)}),
                                  locktime: (buff 4)}))
 (unwrap-panic (as-max-len? (concat (concat (concat (get version tx) (concat-ins (get ins tx))) (concat-outs (get outs tx))) (get locktime tx)) u1024)))

;; helper functions to construct the raw transaction
(define-read-only (concat-in (in {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}) (result (buff 1024)))
  (unwrap-panic (as-max-len? (concat (concat (concat (concat result (get hash (get outpoint in))) (get index (get outpoint in))) (concat-var (get scriptSig in))) (get sequence in)) u1024)))

(define-read-only (concat-ins (ins (list 8
                                    {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)})))
       (unwrap-panic (as-max-len? (concat (unwrap-panic (element-at BUFF_TO_BYTE (len ins))) (fold concat-in ins 0x)) u1024)))

(define-read-only (concat-out (out {value: (buff 8), scriptPubKey: (buff 128)}) (result (buff 1024)))
  (unwrap-panic (as-max-len? (concat (concat result (get value out)) (concat-var (get scriptPubKey out))) u1024)))

(define-read-only (concat-outs (outs (list 8
                                      {value: (buff 8), scriptPubKey: (buff 128)})))
       (unwrap-panic (as-max-len? (concat (unwrap-panic (element-at BUFF_TO_BYTE (len outs))) (fold concat-out outs 0x)) u1024)))

(define-read-only (concat-var (buffer (buff 256)))
  (concat (unwrap-panic (element-at BUFF_TO_BYTE (len buffer))) buffer))

(define-public (get-out-value (tx {
    version: (buff 4),
    ins: (list 8
      {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
    outs: (list 8
      {value: (buff 8), scriptPubKey: (buff 128)}),
    locktime: (buff 4)}) (pubscriptkey (buff 40)))
    (ok (fold find-out (get outs tx) {pubscriptkey: pubscriptkey, out: none})))

;; create a swap between btc and stx
(define-public (create-swap (sats uint) (btc-receiver (buff 40)) (ustx uint) (stx-receiver (optional principal)))
  (let ((id (var-get next-id)))
    (asserts! (map-insert swaps id
      {sats: sats, btc-receiver: btc-receiver, ustx: ustx, stx-receiver: stx-receiver,
        stx-sender: tx-sender, when: block-height, done: u0}) ERR_INVALID_ID)
    (var-set next-id (+ id u1))
    (match (stx-transfer? ustx tx-sender (as-contract tx-sender))
      success (ok id)
      error (err (* error u1000)))))

(define-public (set-stx-receiver (id uint))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID)))
    (if (is-none (get stx-receiver swap))
      (begin
        (asserts! (map-set swaps id (merge swap {stx-receiver: (some tx-sender)})) ERR_NATIVE_FAILURE)
        (ok true))
      ERR_ALREADY_DONE)))

;; any user can cancle the swap after the expiry period
(define-public (cancel (id uint))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID)))
    (asserts! (< (+ (get when swap) expiry) block-height) ERR_TOO_EARLY)
    (asserts! (is-eq (get done swap) u0) ERR_ALREADY_DONE)
    (asserts! (map-set swaps id (merge swap {done: u1})) ERR_NATIVE_FAILURE)
    (as-contract (stx-transfer? (get ustx swap) tx-sender (get stx-sender swap)))))

;; any user can submit a tx that contains the swap
(define-public (submit-swap
    (id uint)
    (block { version: (buff 4), parent: (buff 32), merkle-root: (buff 32), timestamp: (buff 4), nbits: (buff 4), nonce: (buff 4), height: uint })
    (tx {version: (buff 4),
      ins: (list 8
        {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
      outs: (list 8
        {value: (buff 8), scriptPubKey: (buff 128)}),
      locktime: (buff 4)})
    (proof { tx-index: uint, hashes: (list 12 (buff 32)), tree-depth: uint }))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID))
        (tx-buff (concat-tx tx)))
      (match (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v5 was-tx-mined-compact (get height block) tx-buff (concat-header block) proof)
        result
          (begin
            ;; (asserts! result ERR_VERIFICATION_FAILED)
            (asserts! (is-eq (get done swap) u0) ERR_ALREADY_DONE)
            (match (get out (unwrap! (get-out-value tx (get btc-receiver swap)) ERR_NATIVE_FAILURE))
              out (if (>= (get value out) (get sats swap))
                (begin
                      (asserts! (map-set swaps id (merge swap {done: u1})) ERR_NATIVE_FAILURE)
                      (as-contract (stx-transfer? (get ustx swap) tx-sender (unwrap! (get stx-receiver swap) ERR_NO_STX_RECEIVER))))
                ERR_TX_VALUE_TOO_SMALL)
            ERR_TX_NOT_FOR_RECEIVER))
        error (err (* error u1000)))))

;; lookup table for converting 1-byte buffers to uints via index-of
(define-constant BUFF_TO_BYTE (list
                               0x00 0x01 0x02 0x03 0x04 0x05 0x06 0x07 0x08 0x09 0x0a 0x0b 0x0c 0x0d 0x0e 0x0f
                               0x10 0x11 0x12 0x13 0x14 0x15 0x16 0x17 0x18 0x19 0x1a 0x1b 0x1c 0x1d 0x1e 0x1f
                               0x20 0x21 0x22 0x23 0x24 0x25 0x26 0x27 0x28 0x29 0x2a 0x2b 0x2c 0x2d 0x2e 0x2f
                               0x30 0x31 0x32 0x33 0x34 0x35 0x36 0x37 0x38 0x39 0x3a 0x3b 0x3c 0x3d 0x3e 0x3f
                               0x40 0x41 0x42 0x43 0x44 0x45 0x46 0x47 0x48 0x49 0x4a 0x4b 0x4c 0x4d 0x4e 0x4f
                               0x50 0x51 0x52 0x53 0x54 0x55 0x56 0x57 0x58 0x59 0x5a 0x5b 0x5c 0x5d 0x5e 0x5f
                               0x60 0x61 0x62 0x63 0x64 0x65 0x66 0x67 0x68 0x69 0x6a 0x6b 0x6c 0x6d 0x6e 0x6f
                               0x70 0x71 0x72 0x73 0x74 0x75 0x76 0x77 0x78 0x79 0x7a 0x7b 0x7c 0x7d 0x7e 0x7f
                               0x80 0x81 0x82 0x83 0x84 0x85 0x86 0x87 0x88 0x89 0x8a 0x8b 0x8c 0x8d 0x8e 0x8f
                               0x90 0x91 0x92 0x93 0x94 0x95 0x96 0x97 0x98 0x99 0x9a 0x9b 0x9c 0x9d 0x9e 0x9f
                               0xa0 0xa1 0xa2 0xa3 0xa4 0xa5 0xa6 0xa7 0xa8 0xa9 0xaa 0xab 0xac 0xad 0xae 0xaf
                               0xb0 0xb1 0xb2 0xb3 0xb4 0xb5 0xb6 0xb7 0xb8 0xb9 0xba 0xbb 0xbc 0xbd 0xbe 0xbf
                               0xc0 0xc1 0xc2 0xc3 0xc4 0xc5 0xc6 0xc7 0xc8 0xc9 0xca 0xcb 0xcc 0xcd 0xce 0xcf
                               0xd0 0xd1 0xd2 0xd3 0xd4 0xd5 0xd6 0xd7 0xd8 0xd9 0xda 0xdb 0xdc 0xdd 0xde 0xdf
                               0xe0 0xe1 0xe2 0xe3 0xe4 0xe5 0xe6 0xe7 0xe8 0xe9 0xea 0xeb 0xec 0xed 0xee 0xef
                               0xf0 0xf1 0xf2 0xf3 0xf4 0xf5 0xf6 0xf7 0xf8 0xf9 0xfa 0xfb 0xfc 0xfd 0xfe 0xff))

(define-constant ERR_VERIFICATION_FAILED (err u1))
(define-constant ERR_FAILED_TO_PARSE_TX (err u2))
(define-constant ERR_INVALID_ID (err u3))
(define-constant ERR_TOO_EARLY (err u4))
(define-constant ERR_TX_VALUE_TOO_SMALL (err u5))
(define-constant ERR_TX_NOT_FOR_RECEIVER (err u6))
(define-constant ERR_ALREADY_DONE (err u7))
(define-constant ERR_NO_STX_RECEIVER (err u8))
(define-constant ERR_NATIVE_FAILURE (err u99))
