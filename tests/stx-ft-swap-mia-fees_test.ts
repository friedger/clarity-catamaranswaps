import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
  assertObjectMatch,
} from "../src/deps.ts";

Clarinet.test({
  name: "User can't submit ft if not hodling MIA",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const ustx = 1_000_000;
    const amountFt = 10;
    let block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.uint(amountFt),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "hodl-mia-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(404);
  },
});
