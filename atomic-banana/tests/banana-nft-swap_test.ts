import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
  assertObjectMatch,
} from "../../src/deps.ts";
import { transfer } from "./client/bananas.ts";

const contractName = "banana-nft-swap";

Clarinet.test({
  name: "User can cancel banana-nft swap after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ubanana = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    let block = chain.mineBlock([
      transfer(ubanana * 2, deployer, wallet_1, deployer),
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
    block.receipts[0].events.expectFungibleTokenTransferEvent(
      ubanana / 100,
      `${wallet_1.address}`,
      `${deployer.address}.fixed-fees`,
      `${deployer.address}.btc-monkeys-bananas::BANANA`
    );
    block.receipts[0].events.expectFungibleTokenTransferEvent(
      ubanana,
      `${wallet_1.address}`,
      `${deployer.address}.banana-nft-swap`,
      `${deployer.address}.btc-monkeys-bananas::BANANA`
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
    block.receipts[0].events.expectFungibleTokenTransferEvent(
      ubanana / 100,
      `${deployer.address}.fixed-fees`,
      `${wallet_2.address}`,
      `${deployer.address}.btc-monkeys-bananas::BANANA`
    );
    block.receipts[0].events.expectFungibleTokenTransferEvent(
      ubanana,
      `${deployer.address}.banana-nft-swap`,
      `${wallet_1.address}`,
      `${deployer.address}.btc-monkeys-bananas::BANANA`
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
    const ubanana = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    let block = chain.mineBlock([
      transfer(ubanana * 2, deployer, wallet_1, deployer),
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

    block.receipts[1].events.expectFungibleTokenTransferEvent(
      ubanana / 100,
      `${deployer.address}.fixed-fees`,
      `${deployer.address}`,
      `${deployer.address}.btc-monkeys-bananas::BANANA`
    );
    block.receipts[1].events.expectFungibleTokenTransferEvent(
      ubanana,
      `${deployer.address}.banana-nft-swap`,
      `${wallet_2.address}`,
      `${deployer.address}.btc-monkeys-bananas::BANANA`
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
