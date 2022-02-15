(impl-trait .ft-trait.sip-010-trait)

(define-fungible-token fun-token)

;; get the token balance of owner
(define-read-only (get-balance (owner principal))
  (ok (ft-get-balance fun-token owner)))

;; returns the total number of tokens
(define-read-only (get-total-supply)
  (ok (ft-get-supply fun-token)))

;; returns the token name
(define-read-only (get-name)
  (ok "Fun Token"))

;; the symbol or "ticker" for this token
(define-read-only (get-symbol)
  (ok "FT"))

;; the number of decimals used
(define-read-only (get-decimals)
  (ok u0))

;; Transfers tokens to a recipient
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (if (is-eq tx-sender sender)
    (begin
      (try! (ft-transfer? fun-token amount sender recipient))
      (print memo)
      (ok true)
    )
    (err u4)))

(define-public (get-token-uri)
  (ok (some u"https://pool.friedger.de/fun-token.json")))

(define-constant ERR_TX_IGNORED (err u6))
(define-constant ERR_NATIVE_FAILURE (err u99))

(ft-mint? fun-token u100 tx-sender)

(define-public (mint (amount uint))
  (ft-mint? fun-token amount tx-sender))
