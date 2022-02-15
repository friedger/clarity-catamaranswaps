;; Implementation of fixed fees of 1% for the service
;; by the charging-ctr. Only that contract can call the public functions.

(define-constant fee-receiver tx-sender)

(define-private (is-called-by-charging-ctr)
  (or (is-eq contract-caller .mia-nft-swap)
    (is-eq contract-caller .mia-ft-swap)))


(define-private (calc-fees (mia uint))
  (/ mia u100))

;; For information only.
(define-read-only (get-fees (mia uint))
  (ok (calc-fees mia)))

;; helper function to transfer mia to a principal with memo
(define-private (mia-transfer-to (amount uint) (to principal) (memo (buff 34)))
  ;;(contract-call? 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token
  (contract-call? .miamicoin-token
    transfer amount tx-sender to (some memo)))

;; Hold fees for the given amount in escrow.
(define-public (hold-fees (mia uint))
  (let ((fees (calc-fees mia)))
    (asserts! (is-called-by-charging-ctr) ERR_NOT_AUTH)
    (if (> fees u0)
      (mia-transfer-to fees (as-contract tx-sender) 0x636174616d6172616e2073776170)
      (ok true))))

;; Release fees for the given amount if swap was canceled.
;; It relies on the logic of the charging-ctr that this contract.
(define-public (release-fees (mia uint))
  (let ((user tx-sender)
        (fees (calc-fees mia)))
    (asserts! (is-called-by-charging-ctr) ERR_NOT_AUTH)
    (if (> fees u0)
      (as-contract (mia-transfer-to fees user 0x636174616d6172616e2073776170))
      (ok true))))

;; Pay fee for the given amount if swap was executed.
(define-public (pay-fees (mia uint))
  (let ((fees (calc-fees mia)))
    (asserts! (is-called-by-charging-ctr) ERR_NOT_AUTH)
    (if (> fees u0)
      (as-contract (mia-transfer-to fees fee-receiver 0x636174616d6172616e2073776170))
      (ok true))))

(define-constant ERR_NOT_AUTH (err u404))
