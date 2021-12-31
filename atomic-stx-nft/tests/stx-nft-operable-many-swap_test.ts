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
  name: "User can submit oeprable nft",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const ustx = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    let block = chain.mineBlock([
      Tx.contractCall("fun-operable-nft", "mint", [], wallet_2.address),
      Tx.contractCall("fun-operable-nft", "mint", [], wallet_2.address),
      Tx.contractCall("fun-operable-nft", "mint", [], wallet_2.address),
      Tx.contractCall("fun-operable-nft", "mint", [], wallet_2.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);


    block = chain.mineBlock([
      Tx.contractCall(
        "fun-operable-nft",
        "set-approved",
        [
          types.principal(deployer.address + "." + "stx-nft-operable-many-swap"),
          types.bool(true),
        ],
        wallet_2.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-operable-many-swap",
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
        "stx-nft-operable-many-swap",
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
        "stx-nft-operable-many-swap",
        "submit-swap",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    assertObjectMatch(block.receipts[0].events[0].stx_transfer_event, {
      recipient: deployer.address,
      amount: `${ustx / 100}`,
    });
    assertObjectMatch(block.receipts[0].events[1].nft_transfer_event, {
      recipient: wallet_1.address,
      value: "u1",
    });
    assertObjectMatch(block.receipts[0].events[2].nft_transfer_event, {
      recipient: wallet_1.address,
      value: "u2",
    });
    assertObjectMatch(block.receipts[0].events[3].nft_transfer_event, {
      recipient: wallet_1.address,
      value: "u3",
    });
    assertObjectMatch(block.receipts[0].events[4].stx_transfer_event, {
      recipient: wallet_2.address,
      amount: `${ustx}`,
    });
  },
});
