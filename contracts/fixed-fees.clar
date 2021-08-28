(define-constant fee-receiver tx-sender)

(define-public (get-fees (ustx uint))
  (ok (/ ustx u100))
)

(define-public (pay-fees (ustx uint))
  (let ((fee (unwrap! (get-fees ustx) ERR_INVALID_FEES)))
    (if (> fee u0)
      (stx-transfer? fee tx-sender fee-receiver)
      (ok true))))

(define-constant ERR_INVALID_FEES (err u100))
