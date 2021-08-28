(define-constant expiry u100)
(define-map swaps uint {sats: uint, btc-receiver: (buff 40), namespace: (buff 20), name: (buff 48), bns-receiver: principal, bns-sender: principal, zonefile-hash: (buff 20), when: uint, done: uint})
(define-data-var next-id uint u0)

(define-private (find-out (entry {scriptPubKey: (buff 128), value: (buff 8)}) (result {pubscriptkey: (buff 40), out: (optional {scriptPubKey: (buff 128), value: uint})}))
  (if (is-eq (get scriptPubKey entry) (get pubscriptkey result))
    (merge result {out: (some {scriptPubKey: (get scriptPubKey entry), value: (get uint32 (unwrap-panic (contract-call? 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v1 read-uint32 {txbuff: (get value entry), index: u0})))})})
    result))

(define-public (get-out-value (tx {
    version: (buff 4),
    ins: (list 8
      {outpoint: {hash: (buff 32), index: (buff 4)}, scriptSig: (buff 256), sequence: (buff 4)}),
    outs: (list 8
      {value: (buff 8), scriptPubKey: (buff 128)}),
    locktime: (buff 4)}) (pubscriptkey (buff 40)))
    (ok (fold find-out (get outs tx) {pubscriptkey: pubscriptkey, out: none})))

;; create a swap between btc and bns name
(define-public (create-swap (sats uint) (btc-receiver (buff 40)) (namespace (buff 20)) (name (buff 48)) (bns-receiver principal))
  (let ((id (var-get next-id))
    (name-props (unwrap! (contract-call? 'SP000000000000000000002Q6VF78.bns name-resolve namespace name) ERR_INVALID_BNS)))
    (asserts! (map-insert swaps id
      {sats: sats, btc-receiver: btc-receiver, namespace: namespace, name: name, bns-receiver: bns-receiver,
        bns-sender: tx-sender, zonefile-hash: (get zonefile-hash name-props),
        when: block-height, done: u0}) ERR_INVALID_ID)
    (var-set next-id (+ id u1))
    ;; attention: escrow can only own one name at a time
    (match (contract-call? 'SP000000000000000000002Q6VF78.bns name-transfer  namespace name (as-contract tx-sender) (some zonefile-hash))
      success (ok id)
      error (err (* error u1000)))))

;; any user can cancle the swap after the expiry period
(define-public (cancel (id uint))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID)))
    (asserts! (< (+ (get when swap) expiry) block-height) ERR_TOO_EARLY)
    (asserts! (is-eq (get done swap) u0) ERR_ALREADY_DONE)
    (asserts! (map-set swaps id (merge swap {done: u1})) ERR_NATIVE_FAILURE)
    (as-contract (contract-call? 'SP000000000000000000002Q6VF78.bns name-transfer (get namespace swap) (get name swap) (get bns-sender swap) (some (get zonefile-hash swap))))))

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
          (asserts! (is-eq (get done swap) u0) ERR_ALREADY_DONE)
          (match (get out (unwrap! (get-out-value tx (get btc-receiver swap)) ERR_NATIVE_FAILURE))
            out (if (>= (get value out) (get sats swap))
              (begin
                    (asserts! (map-set swaps id (merge swap {done: u1})) ERR_NATIVE_FAILURE)
                    (as-contract (contract-call? 'SP000000000000000000002Q6VF78.bns name-transfer (get namespace swap) (get name swap) (get bns-receiver swap) none)))
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
(define-constant ERR_INVALID_BNS (err u8))
(define-constant ERR_NATIVE_FAILURE (err u99))
