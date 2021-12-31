(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-non-fungible-token fun uint)

;; Storage
(define-map token-count principal uint)
(define-map approved {owner: principal, operator: principal} bool)

;; Define Constants
(define-constant CONTRACT-OWNER tx-sender)

;; Define Variables
(define-data-var last-id uint u0)

;; Token count for account
(define-read-only (get-balance (account principal))
  (default-to u0
    (map-get? token-count account)))


;; SIP009: Transfer token to a specified principal
(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (or
       (is-eq contract-caller sender)
       (default-to false (map-get? approved {owner: sender, operator: contract-caller}))) (err u401))
    (nft-transfer? fun id sender recipient)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? fun id)))

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id)))

;; SIP009: Get the token URI. You can set it to any other URI
(define-read-only (get-token-uri (id uint))
  (ok (some "ipfs://Qm...")))

;; Mint new NFT
(define-public (mint)
  (let ((next-id (+ u1 (var-get last-id))))
    (var-set last-id next-id)
    (nft-mint? fun next-id tx-sender)))

(define-public (set-approved (operator principal) (apprvd bool))
  (ok (map-set approved {owner: contract-caller, operator: operator} apprvd)))
