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
  name: "User can cancel stx-ft swap after 100 blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ustx = 1_000_000;
    const amountFt = 10;

    let block = chain.mineBlock([
      Tx.contractCall(
        "SPZ0RAC1EFTH949T4W2SYY6YBHJRMAF4ECT5A7DD.oracle-v1",
        "add-prices",
        [
          types.list([
            types.tuple({
              msg: "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000006101695900000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000af30000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000075354582d42544300000000000000000000000000000000000000000000000000",
              sig: "0x1e8b7d0413665f7646bf83b25c71f3b90a7626f01a3575ef2996e18c1b3f2a0609422476865780fc34e5e4bdf8f04bd4d23b40eddb6eee17184985cfd4ba26ad01",
              src: types.ascii("artifix-binance"),
            }),
            types.tuple({
              msg: "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000006101695900000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000010fba80000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085354582d55534454000000000000000000000000000000000000000000000000",
              sig: "0x8cd83255f9c1436ce06ce79fe01940d1bc4c8624e73185cc36862063cb3101dc5d8ebb1a083fdcb26d849f27a9e9bfe3921cd3ee6e1745e9af1df3e4c65d53b600",
              src: types.ascii("artifix-binance"),
            }),
            types.tuple({
              msg: "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000006101695900000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000b954000000000000000000000000000000000000000000000000000000000000000670726963657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007554e492d42544300000000000000000000000000000000000000000000000000",
              sig: "0xb34ea3604ae5d61c703ce06ce14f8bf907e1a48892a144d359ebaa7370a5d13d33a6c278a86b39d38e4166b0805b3a0ac17a2e822bd7d5dc0af7e91f1a885b0e01",
              src: types.ascii("artifix-binance"),
            }),
          ]),
        ],
        deployer.address
      ),
    ]);
    block = chain.mineBlock([
      Tx.contractCall(
        "fun-token",
        "mint",
        [types.uint(20_000)],
        wallet_1.address
      ),
      Tx.contractCall(
        "stx-ft-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.uint(amountFt),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "fixed-ft-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    const id = 0;
    block.receipts[1].result.expectOk().expectUint(id);
    assertObjectMatch(block.receipts[1].events[0].ft_transfer_event, {
      sender: wallet_1.address,
      amount: `28`,
    });
    assertObjectMatch(block.receipts[1].events[2].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ustx}`,
    });

    chain.mineEmptyBlock(99);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "cancel",
        [
          types.uint(id),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "fixed-ft-fees"),
        ],
        wallet_1.address
      ),
    ]);
    // too early
    block.receipts[0].result.expectErr().expectUint(4);

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "cancel",
        [
          types.uint(id),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "fixed-ft-fees"),
        ],
        wallet_2.address
      ),
    ]);
    block.receipts[0].result.expectOk();
    assertObjectMatch(block.receipts[0].events[0].ft_transfer_event, {
      recipient: wallet_2.address, // user 2 is rewarded with the fees
      amount: `28`,
    });

    assertObjectMatch(block.receipts[0].events[2].stx_transfer_event, {
      recipient: wallet_1.address, // user 1 receives the stxs
      amount: `${ustx}`,
    });
  },
});

Clarinet.test({
  name: "User can submit ft",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const wallet_3 = accounts.get("wallet_3")!;
    const ustx = 1_000_000;
    const amountFt = 10;
    let block = chain.mineBlock([
      Tx.contractCall(
        "SPZ0RAC1EFTH949T4W2SYY6YBHJRMAF4ECT5A7DD.oracle-v1",
        "add-prices",
        [
          types.list([
            types.tuple({
              msg: "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000006101695900000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000af30000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000075354582d42544300000000000000000000000000000000000000000000000000",
              sig: "0x1e8b7d0413665f7646bf83b25c71f3b90a7626f01a3575ef2996e18c1b3f2a0609422476865780fc34e5e4bdf8f04bd4d23b40eddb6eee17184985cfd4ba26ad01",
              src: types.ascii("artifix-binance"),
            }),
            types.tuple({
              msg: "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000006101695900000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000010fba80000000000000000000000000000000000000000000000000000000000000006707269636573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085354582d55534454000000000000000000000000000000000000000000000000",
              sig: "0x8cd83255f9c1436ce06ce79fe01940d1bc4c8624e73185cc36862063cb3101dc5d8ebb1a083fdcb26d849f27a9e9bfe3921cd3ee6e1745e9af1df3e4c65d53b600",
              src: types.ascii("artifix-binance"),
            }),
            types.tuple({
              msg: "0x0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000006101695900000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000b954000000000000000000000000000000000000000000000000000000000000000670726963657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007554e492d42544300000000000000000000000000000000000000000000000000",
              sig: "0xb34ea3604ae5d61c703ce06ce14f8bf907e1a48892a144d359ebaa7370a5d13d33a6c278a86b39d38e4166b0805b3a0ac17a2e822bd7d5dc0af7e91f1a885b0e01",
              src: types.ascii("artifix-binance"),
            }),
          ]),
        ],
        deployer.address
      ),
    ]);

    block = chain.mineBlock([
      Tx.contractCall(
        "fun-token",
        "mint",
        [types.uint(20_000)],
        wallet_1.address
      ),
      Tx.contractCall(
        "stx-ft-swap",
        "create-swap",
        [
          types.uint(ustx),
          types.uint(amountFt),
          types.some(types.principal(wallet_2.address)),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "fixed-ft-fees"),
        ],
        wallet_1.address
      ),
    ]);

    block.receipts[0].result.expectOk();
    const id = 0;
    block.receipts[1].result.expectOk().expectUint(id);
    assertObjectMatch(block.receipts[1].events[0].ft_transfer_event, {
      sender: wallet_1.address,
      amount: `28`,
    });

    assertObjectMatch(block.receipts[1].events[2].stx_transfer_event, {
      sender: wallet_1.address,
      amount: `${ustx}`,
    });

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "submit-swap",
        [
          types.uint(id),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "fixed-ft-fees"),
        ],
        wallet_3.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(9); // invalid stx receiver, can only be called by seller

    block = chain.mineBlock([
      Tx.contractCall(
        "stx-ft-swap",
        "submit-swap",
        [
          types.uint(id),
          types.principal(deployer.address + "." + "fun-token"),
          types.principal(deployer.address + "." + "fixed-ft-fees"),
        ],
        wallet_2.address
      ),
    ]);

    block.receipts[0].result.expectOk().expectBool(true);
    assertObjectMatch(block.receipts[0].events[0].ft_transfer_event, {
      recipient: deployer.address,
      amount: `28`,
    });
    assertObjectMatch(block.receipts[0].events[2].ft_transfer_event, {
      recipient: wallet_1.address,
      amount: `${amountFt}`,
    });

    assertObjectMatch(block.receipts[0].events[4].stx_transfer_event, {
      recipient: wallet_2.address,
      amount: `${ustx}`,
    });
  },
});
