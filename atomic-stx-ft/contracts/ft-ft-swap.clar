;; DO NOT USE - Securit threat
;; bad actors can steal from escrow contract

(use-trait fungible-token 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; the fee structure is defined by the calling client
;; this is to avoid duplication of the protocol just with adjusted fee structure
;; it is the responsibility of the client to adjust the post conditions accordingly
(define-trait fees-trait
  ((get-fees (uint <fungible-token> <fungible-token>) (response uint uint))
  (hold-fees (uint <fungible-token> <fungible-token>) (response bool uint))
  (release-fees (uint <fungible-token> <fungible-token>) (response bool uint))
  (pay-fees (uint <fungible-token> <fungible-token>) (response bool uint))))

(define-constant expiry u100)
(define-map swaps uint {ustx: uint, stx-sender: principal, amount: uint, ft-sender: (optional principal), when: uint, open: bool, ft: principal, fees: principal})
(define-data-var next-id uint u0)

;; helper function to transfer stx to a principal with memo
(define-private (ft-transfer-to (amount uint) (to principal) (ft <fungible-token>) (memo (buff 34)))
  (contract-call? ft transfer amount tx-sender to (some memo)))

;; create a swap between btc and fungible token
(define-public (create-swap (amount-buy uint) (amount-sell uint) (seller (optional principal)) (ft-buy <fungible-token>) (ft-sell <fungible-token>) (fees <fees-trait>))
  (let ((id (var-get next-id)))
    (asserts! (map-insert swaps id
      {amount-buy: amount-buy, buyer: tx-sender, amount-sell: amount, seller: ft-sender,
         when: block-height, open: true, ft-buyer: (contract-of ft-buy), ft-seller: (contract-of ft-sell) fees: (contract-of fees)}) ERR_INVALID_ID)
    (var-set next-id (+ id u1))
    (try! (contract-call? fees hold-fees amount-buy amount-sell ft-buy ft-sell))
    (match (ft-transfer-to amount-buy (as-contract tx-sender) ft-buy 0x636174616d6172616e2073776170)
      success (ok id)
      error (err (* error u100)))))

;; any user can cancle the swap after the expiry period
(define-public (cancel (id uint) (ft-buy <fungible-token>) (ft-sell <fungible-token>) (fees <fees-trait>))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID))
    (amount-buy (get amount-buy swap))
    (amount-sell (get amount-sell swap)))
      (asserts! (is-eq (contract-of ft-buy) (get ft-buy swap)) ERR_INVALID_FUNGIBLE_TOKEN)
      (asserts! (is-eq (contract-of fees) (get fees swap)) ERR_INVALID_FEES_TRAIT)
      (asserts! (< (+ (get when swap) expiry) block-height) ERR_TOO_EARLY)
      (asserts! (get open swap) ERR_ALREADY_DONE)
      (asserts! (map-set swaps id (merge swap {open: false})) ERR_NATIVE_FAILURE)
      (try! (contract-call? fees release-fees amount-buy amount-sell ft-buy ft-sell))
      (match (as-contract (ft-transfer-to
                amount-buy (get buyer swap) ft-buy
                0x72657665727420636174616d6172616e2073776170))
        success (ok success)
        error (err (* error u100)))))

;; any user can submit a tx that contains the swap
(define-public (submit-swap
    (id uint)
    (ft-buy <fungible-token>)
    (ft-sell <fungible-token)
    (fees <fees-trait>))
  (let ((swap (unwrap! (map-get? swaps id) ERR_INVALID_ID))
    (amount-buy (get amount-buy swap))
    (amount-sell (get amount-sell swap))
    (seller (default-to tx-sender (get seller swap))))
      (asserts! (get open swap) ERR_ALREADY_DONE)
      (asserts! (is-eq (contract-of ft-buy) (get ft-buy swap)) ERR_INVALID_FUNGIBLE_TOKEN)
      (asserts! (is-eq (contract-of ft-sell) (get ft-sell swap)) ERR_INVALID_FUNGIBLE_TOKEN)
      (asserts! (is-eq (contract-of fees) (get fees swap)) ERR_INVALID_FEES_TRAIT)
      (asserts! (map-set swaps id (merge swap {open: false, seller: seller})) ERR_NATIVE_FAILURE)
      (asserts! (is-eq tx-sender seller) ERR_INVALID_STX_RECEIVER)
      (try! (contract-call? fees pay-fees ustx))
      (match (ft-transfer-to
          (get amount-sell swap) (get buyer swap) ft-sell
          0x636174616d6172616e2073776170)
        success-sell (begin
            (asserts! success-sell ERR_NATIVE_FAILURE)
            (match (as-contract (ft-transfer-to
                (get amount-buy swap) stx-receiver ft-buy
                0x636174616d6172616e2073776170))
              success-stx (ok success-stx)
              error-stx (err (* error-stx u100))))
        error-ft (err (* error-ft u1000)))))

(define-constant ERR_INVALID_ID (err u3))
(define-constant ERR_TOO_EARLY (err u4))
(define-constant ERR_ALREADY_DONE (err u7))
(define-constant ERR_INVALID_FUNGIBLE_TOKEN (err u8))
(define-constant ERR_INVALID_STX_RECEIVER (err u9))
(define-constant ERR_INVALID_FEES (err u10))
(define-constant ERR_INVALID_FEES_TRAIT (err u11))
(define-constant ERR_NATIVE_FAILURE (err u99))
