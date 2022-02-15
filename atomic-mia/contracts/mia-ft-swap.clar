(use-trait fungible-token .ft-trait.sip-010-trait)

;; the fee structure is defined by the calling client
;; this is to avoid duplication of the protocol just with adjusted fee structure
;; it is the responsibility of the client to adjust the post conditions accordingly
(define-trait fees-trait
  ((get-fees (uint) (response uint uint))
  (hold-fees (uint) (response bool uint))
  (release-fees (uint) (response bool uint))
  (pay-fees (uint) (response bool uint))))

(define-constant expiry u100)
(define-map swaps uint {mia: uint, buyer: principal, amount-sell: uint, seller: (optional principal), when: uint, open: bool, ft-sell: principal, fees: principal})
(define-data-var next-id uint u0)

;; helper function to transfer mia to a principal with memo
(define-private (mia-transfer-to (amount uint) (to principal) (memo (buff 34)))
  ;;(contract-call? 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token
  (contract-call? .miamicoin-token
    transfer amount tx-sender to (some memo)))

;; create a swap between banana and fungible token
(define-public (create-swap (mia uint) (amount-sell uint) (seller (optional principal)) (ft-sell <fungible-token>) (fees <fees-trait>))
  (let ((id (var-get next-id)))
    (asserts! (map-insert swaps id
      {mia: mia, buyer: tx-sender, amount-sell: amount-sell, seller: seller,
         when: block-height, open: true, ft-sell: (contract-of ft-sell), fees: (contract-of fees)}) ERR_INVALID_ID)
    (var-set next-id (+ id u1))
    (try! (contract-call? fees hold-fees mia))
    (match (mia-transfer-to mia (as-contract tx-sender) 0x636174616d6172616e2073776170)
      success (ok id)
      error (err (* error u100)))))

;; any user can cancle the swap after the expiry period
(define-public (cancel (id uint) (fees <fees-trait>))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID))
    (mia (get mia swap))
    (amount-sell (get amount-sell swap)))
      (asserts! (is-eq (contract-of fees) (get fees swap)) ERR_INVALID_FEES_TRAIT)
      (asserts! (< (+ (get when swap) expiry) block-height) ERR_TOO_EARLY)
      (asserts! (get open swap) ERR_ALREADY_DONE)
      (asserts! (map-set swaps id (merge swap {open: false})) ERR_NATIVE_FAILURE)
      (try! (contract-call? fees release-fees mia))
      (match (as-contract (mia-transfer-to
                mia (get buyer swap)
                0x72657665727420636174616d6172616e2073776170))
        success (ok success)
        error (err (* error u100)))))

;; any user can submit a tx that contains the swap
(define-public (submit-swap
    (id uint)
    (ft <fungible-token>)
    (fees <fees-trait>))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID))
    (mia (get mia swap))
    (buyer (get buyer swap))
    (amount-sell (get amount-sell swap))
    (seller (default-to tx-sender (get seller swap))))
      (asserts! (get open swap) ERR_ALREADY_DONE)
      (asserts! (is-eq (contract-of ft) (get ft-sell swap)) ERR_INVALID_FUNGIBLE_TOKEN)
      (asserts! (is-eq (contract-of fees) (get fees swap)) ERR_INVALID_FEES_TRAIT)
      (asserts! (map-set swaps id (merge swap {open: false, seller: (some seller)})) ERR_NATIVE_FAILURE)
      (asserts! (is-eq tx-sender seller) ERR_INVALID_RECEIVER)
      (try! (contract-call? fees pay-fees mia))
      (match (contract-call? ft transfer
          (get amount-sell swap) seller buyer
          (some 0x636174616d6172616e2073776170))
        success-sell (begin
            (asserts! success-sell ERR_NATIVE_FAILURE)
            (match (as-contract (mia-transfer-to
                (get mia swap) seller
                0x636174616d6172616e2073776170))
              success (ok success)
              error (err (* error u100))))
        error-ft (err (* error-ft u1000)))))

(define-constant ERR_INVALID_ID (err u3))
(define-constant ERR_TOO_EARLY (err u4))
(define-constant ERR_ALREADY_DONE (err u7))
(define-constant ERR_INVALID_FUNGIBLE_TOKEN (err u8))
(define-constant ERR_INVALID_RECEIVER (err u9))
(define-constant ERR_INVALID_FEES_TRAIT (err u11))
(define-constant ERR_NATIVE_FAILURE (err u99))
