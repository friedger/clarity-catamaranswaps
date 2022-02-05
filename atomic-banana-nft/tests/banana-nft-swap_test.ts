import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
  assertObjectMatch,
} from "../../deps.ts"

const contractName = "banana-nft-swap";

Clarinet.test({
  name: "User can cancel stx-ft swap after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ubanana = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    let block = chain.mineBlock([
      Tx.contractCall("fun-nft", "mint", [], wallet_1.address),

      Tx.contractCall(
        contractName,
        "create-swap",
        [
          types.uint(ubanana),
          types.uint(nftId),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectUint(swapId);
    assertObjectMatch(block.receipts[1].events[0].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ubanana / 100}`,
    });
    assertObjectMatch(block.receipts[1].events[1].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ubanana}`,
    });

    chain.mineEmptyBlock(99);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        "cancel",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);
    // too early
    block.receipts[0].result.expectErr().expectUint(4);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        "cancel",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_2.address
      ),
    ]);
    block.receipts[0].result.expectOk();
    assertObjectMatch(block.receipts[0].events[0].stx_transfer_event, {
      recipient: wallet_2.address, // user 2 is rewarded with the fees
      amount: `${ubanana / 100}`,
    });

    assertObjectMatch(block.receipts[0].events[1].stx_transfer_event, {
      recipient: wallet_1.address, // user 1 receives the stxs
      amount: `${ubanana}`,
    });
  },
});

Clarinet.test({
  name: "User can submit nft",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const ubanana = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    let block = chain.mineBlock([
      Tx.contractCall("fun-nft", "mint", [], wallet_2.address),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        "create-swap",
        [
          types.uint(ubanana),
          types.uint(nftId),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectUint(swapId);
    assertObjectMatch(block.receipts[0].events[0].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ubanana / 100}`,
    });

    assertObjectMatch(block.receipts[0].events[1].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ubanana}`,
    });

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-swap",
        "submit-swap",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_3.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(9); // invalid stx receiver, can only be called by seller

    block = chain.mineBlock([
      Tx.contractCall("fun-nft", "mint", [], wallet_2.address),
      Tx.contractCall(
        contractName,
        "submit-swap",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    assertObjectMatch(block.receipts[1].events[0].stx_transfer_event, {
      recipient: deployer.address,
      amount: `${ubanana / 100}`,
    });
    assertObjectMatch(block.receipts[1].events[1].nft_transfer_event, {
      recipient: wallet_1.address,
      value: "u1",
    });
    assertObjectMatch(block.receipts[1].events[2].stx_transfer_event, {
      recipient: wallet_2.address,
      amount: `${ubanana}`,
    });
  },
});
