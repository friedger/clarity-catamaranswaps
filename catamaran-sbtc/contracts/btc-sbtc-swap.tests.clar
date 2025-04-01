(define-public (test-create-swap 
    (sats uint) (btc-receiver (buff 40)) 
    (amount uint) (stx-receiver (optional principal)))
  
  (if (is-eq amount u0)
    (ok false)
    (begin
      ;; map entry should match the swap data        
      (match (create-swap sats btc-receiver amount stx-receiver u0)
        id (ok (asserts! (is-eq 
            (some {sats: sats, btc-receiver: btc-receiver, amount: amount, stx-receiver: stx-receiver, sbtc-sender: tx-sender, when: burn-block-height, done: false, premium: u0})
            (map-get? swaps id)) (err u999)))
        error (err error)))
  )
)


(define-read-only (invariant-balance-correct)
  (let ((balance (unwrap-panic (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-balance (as-contract tx-sender)))))
    (or (is-eq (var-get next-id) u0) (> balance u0))
  ))