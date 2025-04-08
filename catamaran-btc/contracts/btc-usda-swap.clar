;; @description swap usda for btc using catamaran swap
;; USE WITH CARE due to limitation of this contract and Stacks 2.0
;; @version 1

(define-constant expiry u100)
(define-map swaps uint {sats: uint, btc-receiver: (buff 40), amount: uint, usda-receiver: (optional principal), usda-sender: principal, when: uint, open: bool})
(define-data-var next-id uint u0)

(define-private (find-out (entry {scriptPubKey: (buff 128), value: (buff 8)}) (result {pubscriptkey: (buff 40), out: (optional {scriptPubKey: (buff 128), value: uint})}))
  (if (is-eq (get scriptPubKey entry) (get pubscriptkey result))
    (merge result {out: (some {scriptPubKey: (get scriptPubKey entry),
    value: (get uint32 (unwrap-panic
      (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v1
        read-uint32 {txbuff: (get value entry), index: u0})))})})
    result))

(define-public (get-out-value (tx {
    version: (buff 4),
    ins: (list 8
      {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
    outs: (list 8
      {value: (buff 8), scriptPubKey: (buff 128)}),
    locktime: (buff 4)}) (pubscriptkey (buff 40)))
    (ok (fold find-out (get outs tx) {pubscriptkey: pubscriptkey, out: none})))

(define-private (usda-transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (contract-call? 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token transfer amount sender recipient memo))

;; create a swap between btc and usda
(define-public (create-swap (sats uint) (btc-receiver (buff 40)) (amount uint) (usda-receiver (optional principal)) )
  (let ((id (var-get next-id)))
    (asserts! (map-insert swaps id
      {sats: sats, btc-receiver: btc-receiver, amount: amount, usda-receiver: usda-receiver,
        usda-sender: tx-sender, when: block-height, open: true}) ERR_INVALID_ID)
    (var-set next-id (+ id u1))
    (match (usda-transfer amount tx-sender (as-contract tx-sender) (some 0x636174616d6172616e2073776170))
      success (ok id)
      error (err (* error u1000)))))


(define-public (set-usda-receiver (id uint))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID)))
    (if (is-none (get usda-receiver swap))
      (begin
        (asserts! (map-set swaps id (merge swap {usda-receiver: (some tx-sender)})) ERR_NATIVE_FAILURE)
        (ok true))
      ERR_ALREADY_DONE)))

;; any user can cancle the swap after the expiry period
(define-public (cancel (id uint))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID)))
    (asserts! (< (+ (get when swap) expiry) block-height) ERR_TOO_EARLY)
    (asserts! (get open swap) ERR_ALREADY_DONE)
    (asserts! (map-set swaps id (merge swap {open: false})) ERR_NATIVE_FAILURE)
    (as-contract (usda-transfer (get amount swap) tx-sender (get usda-sender swap) (some 0x72657665727420636174616d6172616e2073776170)))))

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
    (tx-buff (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v1 concat-tx tx)))
    (match (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v1 was-tx-mined block tx-buff proof)
      result
        (begin
          (asserts! result ERR_VERIFICATION_FAILED)
          (asserts! (get open swap) ERR_ALREADY_DONE)
          (match (get out (unwrap! (get-out-value tx (get btc-receiver swap)) ERR_NATIVE_FAILURE))
            out (if (>= (get value out) (get sats swap))
              (begin
                    (asserts! (map-set swaps id (merge swap {open: true})) ERR_NATIVE_FAILURE)
                    (as-contract (usda-transfer (get amount swap) tx-sender (unwrap! (get usda-receiver swap) ERR_NO_FT_RECEIVER) (some 0x636174616d6172616e2073776170))))
              ERR_TX_VALUE_TOO_SMALL)
           ERR_TX_NOT_FOR_RECEIVER))
      error (err (* error u1000)))))

(define-constant ERR_VERIFICATION_FAILED (err u1))
(define-constant ERR_FAILED_TO_PARSE_TX (err u2))
(define-constant ERR_INVALID_ID (err u3))
(define-constant ERR_TOO_EARLY (err u4))
(define-constant ERR_TX_VALUE_TOO_SMALL (err u5))
(define-constant ERR_TX_NOT_FOR_RECEIVER (err u6))
(define-constant ERR_ALREADY_DONE (err u7))
(define-constant ERR_NO_FT_RECEIVER (err u9))
(define-constant ERR_NATIVE_FAILURE (err u99))
