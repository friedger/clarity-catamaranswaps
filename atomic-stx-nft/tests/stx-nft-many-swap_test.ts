import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
  assertObjectMatch,
} from "../../src/deps.ts";

Clarinet.test({
  name: "User can cancel stx-nft-many swap after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ustx = 1_000_000;
    const swapId = 0;
    let block = chain.mineBlock([
      Tx.contractCall("fun-nft", "mint", [], wallet_1.address),
      Tx.contractCall("fun-nft", "mint", [], wallet_1.address),
      Tx.contractCall("fun-nft", "mint", [], wallet_1.address),

      Tx.contractCall(
        "stx-nft-many-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.list([types.uint(1), types.uint(2), types.uint(3)]),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    block.receipts[3].result.expectOk().expectUint(swapId);
    assertObjectMatch(block.receipts[3].events[0].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ustx / 100}`,
    });
    assertObjectMatch(block.receipts[3].events[1].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ustx}`,
    });

    chain.mineEmptyBlock(99);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-many-swap",
        "cancel",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);
    // too early
    block.receipts[0].result.expectErr().expectUint(4);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-many-swap",
        "cancel",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_2.address
      ),
    ]);
    block.receipts[0].result.expectOk();
    assertObjectMatch(block.receipts[0].events[0].stx_transfer_event, {
      recipient: wallet_2.address, // user 2 is rewarded with the fees
      amount: `${ustx / 100}`,
    });

    assertObjectMatch(block.receipts[0].events[1].stx_transfer_event, {
      recipient: wallet_1.address, // user 1 receives the stxs
      amount: `${ustx}`,
    });
  },
});

Clarinet.test({
  name: "User can submit many nft",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const ustx = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    let block = chain.mineBlock([
      Tx.contractCall("fun-nft", "mint", [], wallet_2.address),
      Tx.contractCall("fun-nft", "mint", [], wallet_2.address),
      Tx.contractCall("fun-nft", "mint", [], wallet_2.address),
      Tx.contractCall("fun-nft", "mint", [], wallet_2.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-many-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.list([types.uint(1), types.uint(2), types.uint(3)]),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectUint(swapId);
    assertObjectMatch(block.receipts[0].events[0].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ustx / 100}`,
    });

    assertObjectMatch(block.receipts[0].events[1].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ustx}`,
    });

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-many-swap",
        "submit-swap",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_3.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(9); // invalid stx receiver, can only be called by seller

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-many-swap",
        "submit-swap",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[0].events.expectSTXTransferEvent(
      ustx / 100,
      `${deployer.address}.fixed-fees`,
      deployer.address
    );
    block.receipts[0].events.expectNonFungibleTokenTransferEvent(
      types.uint(1),
      wallet_2.address,
      wallet_1.address,
      `${deployer.address}.fun-nft`,
      "fun"
    );
    block.receipts[0].events.expectNonFungibleTokenTransferEvent(
      types.uint(2),
      wallet_2.address,
      wallet_1.address,
      `${deployer.address}.fun-nft`,
      "fun"
    );
    block.receipts[0].events.expectNonFungibleTokenTransferEvent(
      types.uint(3),
      wallet_2.address,
      wallet_1.address,
      `${deployer.address}.fun-nft`,
      "fun"
    );
    block.receipts[0].events.expectSTXTransferEvent(
      ustx,
      `${deployer.address}.stx-nft-many-swap`,
      wallet_2.address
    );
  },
});
