;; Implementation of fixed fees of 1% for the service
;; by the charging-ctr. Only that contract can call the public functions.
;; the ft is exchanged 1:1 to STX

(define-constant fee-receiver tx-sender)
(define-constant charging-ctr .stx-ft-swap)

;; For information only.
(define-public (get-fees (ustx uint))
  (ok (to-ft-fee ustx)))

(define-read-only (to-ft-fee (ustx uint))
  (/ ustx u100))

(define-private (ft-transfer-to (amount uint) (recipient principal) (memo (optional (buff 34))))
  (begin
    (and (> amount u0) (try! (contract-call? .fun-token transfer amount tx-sender recipient memo)))
    (ok true)))


;; Hold fees for the given amount in escrow.
(define-public (hold-fees (ustx uint))
  (begin
    (asserts! (is-eq contract-caller charging-ctr) ERR_NOT_AUTH)
    (ft-transfer-to (to-ft-fee ustx) (as-contract tx-sender) none)))

;; Release fees for the given amount if swap was canceled.
;; It relies on the logic of the charging-ctr that this contract.
(define-public (release-fees (ustx uint))
  (let ((user tx-sender))
    (asserts! (is-eq contract-caller charging-ctr) ERR_NOT_AUTH)
    (as-contract (ft-transfer-to (to-ft-fee ustx) user none))))

;; Pay fee for the given amount if swap was executed.
(define-public (pay-fees (ustx uint))
  (begin
    (asserts! (is-eq contract-caller charging-ctr) ERR_NOT_AUTH)
    (as-contract (ft-transfer-to (to-ft-fee ustx) fee-receiver none))))

(define-constant ERR_NOT_AUTH (err u404))
