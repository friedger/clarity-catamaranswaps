import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
} from "../src/deps.ts";

Clarinet.test({
  name: "User can cancel after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ustx = 1000000;
    let block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.uint(amount),
          types.principal(wallet_2.address),
          types.principal(deployer.address + "." + "fpwr"),
          types.principal(deployer.address + "." + "fees")
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();
    console.log(block.receipts[0]);
    const id = 0;
    block.receipts[0].result.expectOk().expectUint(id);
    assertEquals(
      block.receipts[0].events[0].stx_transfer_event.sender,
      wallet_1.address
    );
    assertEquals(
      block.receipts[0].events[0].stx_transfer_event.amount,
      `${ustx}`
    );

    chain.mineEmptyBlock(99);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "cancel",
        [types.uint(id),
         types.principal(deployer.address + "." + "fees")],
        wallet_1.address
      ),
    ]);
    // too early
    block.receipts[0].result.expectErr().expectUint(4);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "cancel",
        [types.uint(id),
         types.principal(deployer.address + "." + "fees")],
        wallet_2.address
      ),
    ]);
    block.receipts[0].result.expectOk();
    assertEquals(
      block.receipts[0].events[0].stx_transfer_event.recipient,
      wallet_1.address
    );
    assertEquals(
      block.receipts[0].events[0].stx_transfer_event.amount,
      `${ustx}`
    );
  },
});

Clarinet.test({
  name: "User can submit ft",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const ustx = 1000000;
    let block = chain.mineBlock([
      Tx.contractCall(
        "btc-stx-swap",
        "create-swap",
        [
          types.uint(10000),
          types.uint(ustx),
          types.principal(wallet_2.address),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();
    console.log(block.receipts[0]);
    const id = 0;
    block.receipts[0].result.expectOk().expectUint(id);
    assertEquals(
      block.receipts[0].events[0].stx_transfer_event.sender,
      wallet_1.address
    );
    assertEquals(
      block.receipts[0].events[0].stx_transfer_event.amount,
      `${ustx}`
    );

    block = chain.mineBlock([
      Tx.contractCall(
        "btc-stx-swap",
        "submit-swap",
        [types.uint(id), validBlock, validTx, validProof],
        wallet_3.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(1000); // ERR_VERIFICATION_FAILED due to clarinet block header
  },
});
