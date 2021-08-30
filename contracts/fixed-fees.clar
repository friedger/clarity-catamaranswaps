(define-constant fee-receiver tx-sender)
(define-constant charging-ctr .stx-ft-swap)

(define-public (get-fees (ustx uint))
  (ok (/ ustx u100)))

(define-public (hold-fees (ustx uint))
  (begin
    (asserts! (is-eq contract-caller charging-ctr) ERR_NOT_AUTH)
    (stx-transfer? (/ ustx u100) tx-sender (as-contract tx-sender))))

(define-public (release-fees (ustx uint))
  (let ((user tx-sender))
    (asserts! (is-eq contract-caller charging-ctr) ERR_NOT_AUTH)
    (as-contract (stx-transfer? (/ ustx u100) tx-sender user))))

(define-public (pay-fees (ustx uint))
  (let ((fee (/ ustx u100)))
    (asserts! (is-eq contract-caller charging-ctr) ERR_NOT_AUTH)
    (if (> fee u0)
      (as-contract (stx-transfer? fee tx-sender fee-receiver))
      (ok true))))

(define-constant ERR_NOT_AUTH (err u404))
