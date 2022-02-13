import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
  assertObjectMatch,
} from "../../src/deps.ts";

const contractName = "satoshible-nft-swap";
const FIXED_FEES = 1_000_000;

Clarinet.test({
  name: "User can cancel satoshible-nft swap after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const satoshibleId = 1;
    const nftId = 1;
    const swapId = 0;

    let block = chain.mineBlock([
      Tx.contractCall(
        "satoshibles",
        "transfer",
        [
          types.uint(satoshibleId),
          types.principal(deployer.address),
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        "create-swap",
        [
          types.uint(satoshibleId),
          types.uint(nftId),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectUint(swapId);
    block.receipts[0].events.expectSTXTransferEvent(
      FIXED_FEES,
      `${wallet_1.address}`,
      `${deployer.address}.fixed-fees`
    );
    block.receipts[0].events.expectNonFungibleTokenTransferEvent(
      types.uint(satoshibleId),
      `${wallet_1.address}`,
      `${deployer.address}.${contractName}`,
      `${deployer.address}.satoshibles`,
      "Satoshibles"
    );

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
    block.receipts[0].events.expectSTXTransferEvent(
      FIXED_FEES,
      `${deployer.address}.fixed-fees`,
      `${wallet_2.address}`
    );
    block.receipts[0].events.expectNonFungibleTokenTransferEvent(
      types.uint(satoshibleId),
      `${deployer.address}.${contractName}`,
      `${wallet_1.address}`,
      `${deployer.address}.satoshibles`,
      "Satoshibles"
    );
  },
});

Clarinet.test({
  name: "User can submit nft",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const satoshibleId = 1;
    const nftId = 1;
    const swapId = 0;

    let block = chain.mineBlock([
      Tx.contractCall(
        "satoshibles",
        "transfer",
        [
          types.uint(satoshibleId),
          types.principal(deployer.address),
          types.principal(wallet_1.address),
        ],
        deployer.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        "create-swap",
        [
          types.uint(satoshibleId),
          types.uint(nftId),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);
    block.receipts[0].result.expectOk().expectUint(swapId);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        "submit-swap",
        [
          types.uint(swapId),
          types.principal(deployer.address + "." + "fun-nft"),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_3.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(9); // invalid receiver, can only be called by seller

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

    block.receipts[1].events.expectSTXTransferEvent(
      FIXED_FEES,
      `${deployer.address}.fixed-fees`,
      `${deployer.address}`
    );
    block.receipts[1].events.expectNonFungibleTokenTransferEvent(
      types.uint(satoshibleId),
      `${deployer.address}.${contractName}`,
      `${wallet_2.address}`,
      `${deployer.address}.satoshibles`,
      "Satoshibles"
    );
    block.receipts[1].events.expectNonFungibleTokenTransferEvent(
      types.uint(nftId),
      `${wallet_2.address}`,
      `${wallet_1.address}`,
      `${deployer.address}.fun-nft`,
      `fun`
    );
  },
});
