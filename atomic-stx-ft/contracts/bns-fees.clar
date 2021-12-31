;; Implementation of fixed fees of 0% for any service.
;; This fee model can only be used by holders of the Friedger Pool NFT.

;; For information only.
(define-public (get-fees (ustx uint))
  (ok u0))

;; Hold fees for the given amount in escrow.
(define-public (hold-fees (ustx uint))
  (asserts! (is-ok (contract-call? 'SP000000000000000000002Q6VF78.pox resolve-principal tx-sender)) ERR_NOT_AUTH)
  (ok true))

;; Release fees for the given amount if swap was canceled.
;; It relies on the logic of the charging-ctr that this contract.
(define-public (release-fees (ustx uint))
  (ok true))

;; Pay fee for the given amount if swap was executed.
(define-public (pay-fees (ustx uint))
  (ok true))

(define-constant ERR_NOT_AUTH (err u404))
