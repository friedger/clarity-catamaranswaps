(impl-trait .ft-trait.sip-010-trait)

(define-constant ERR-NOT-AUTHORIZED u401)
(define-constant ERR-INVALID-STAKE u104)
(define-constant CONTRACT-OWNER tx-sender)

(define-data-var shutoff-valve bool false)

;; Define BANANA with a maximum of 1,000,000 tokens / 1T microtokens.
(define-fungible-token BANANA u1000000000000)


;; Transfers tokens to a recipient
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (if (is-eq tx-sender sender)
    (begin
      (try! (ft-transfer? BANANA amount sender recipient))
      (print memo)
      (ok true)
    )
    (err u4)))

(define-read-only (get-balance (owner principal))
    (ok (ft-get-balance BANANA owner))
)

(define-read-only (get-name)
    (ok "BANANA")
)

(define-read-only (get-symbol)
    (ok "BAN")
)

(define-read-only (get-decimals)
    (ok u6)
)

(define-read-only (get-total-supply)
    (ok (ft-get-supply BANANA))
)

(define-read-only (get-token-uri)
  (ok (some u"https://bitcoinmonkeys.io")))

(define-public (burn (burn-amount uint))
    (begin
        (try! (ft-burn? BANANA burn-amount tx-sender))
        (ok true)
    )
)

(print (ft-mint? BANANA u100000000000 tx-sender))
