;; Implementation of fixed fees of 1% for the service
;; by the charging-ctr. Only that contract can call the public functions.

(define-constant fee-receiver tx-sender)

(define-private (is-called-by-charging-ctr)
  (is-eq contract-caller .banana-nft-swap))

(define-private (calc-fees (ubanana uint))
  (/ ubanana u100))

;; For information only.
(define-read-only (get-fees (ubanana uint))
  (ok (calc-fees ubanana)))

;; helper function to transfer banana from tx-sender to a principal with memo
(define-private (banana-transfer-to (ubanana uint) (to principal) (memo (buff 34)))
  (contract-call? 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.bitcoin-monkeys-bananas transfer
    ubanana tx-sender to (some memo)))

;; Hold fees for the given amount in escrow.
(define-public (hold-fees (ubanana uint))
  (let ((fees (calc-fees ubanana)))
    (asserts! (is-called-by-charging-ctr) ERR_NOT_AUTH)
    (if (> fees 0)
      (banana-transfer-to fees (as-contract tx-sender))
      (ok true))))

;; Release fees for the given amount if swap was canceled.
;; It relies on the logic of the charging-ctr that this contract.
(define-public (release-fees (ubanana uint))
  (let ((user tx-sender)
        (fees (calc-fees ubanana)))
    (asserts! (is-called-by-charging-ctr) ERR_NOT_AUTH)
    (if (> fees 0)
      (as-contract (banana-transfer-to fees user))
      (ok true))))

;; Pay fee for the given amount if swap was executed.
(define-public (pay-fees (ubanana uint))
  (let ((fee (calc-fees ubanana)))
    (asserts! (is-called-by-charging-ctr) ERR_NOT_AUTH)
    (if (> fee u0)
      (as-contract (banana-transfer-to fees fee-receiver))
      (ok true))))

(define-constant ERR_NOT_AUTH (err u404))
