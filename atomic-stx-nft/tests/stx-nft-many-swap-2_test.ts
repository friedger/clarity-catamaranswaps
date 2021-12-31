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
  name: "User can submit many nfts",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ustx = 1_000_000;
    const nftId = 1;
    const swapId = 0;
    const numberOfNfts = 200;
    let block = chain.mineBlock(
      [...new Array(numberOfNfts).keys()].map((i) =>
        Tx.contractCall("fun-nft", "mint", [], wallet_2.address)
      )
    );
    [...new Array(numberOfNfts).keys()].map((i) =>
      block.receipts[0].result.expectOk().expectBool(true)
    );

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-nft-many-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.list([... new Array(numberOfNfts).keys()].map(i => types.uint(i+1))),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fixed-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectUint(swapId);

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
  },
});
