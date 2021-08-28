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
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    const ustx = 1000000;
    let block = chain.mineBlock([
      Tx.contractCall(
        "btc-stx-swap",
        "create-swap",
        [
          types.uint(10000),
          "0x76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac",
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

    chain.mineEmptyBlock(99);

    block = chain.mineBlock([
      Tx.contractCall(
        "btc-stx-swap",
        "cancel",
        [types.uint(id)],
        wallet_1.address
      ),
    ]);
    // too early
    block.receipts[0].result.expectErr().expectUint(4);

    block = chain.mineBlock([
      Tx.contractCall(
        "btc-stx-swap",
        "cancel",
        [types.uint(id)],
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

const parts = [
  "0x00200020",
  "0xb9d30838796e6ea7ff4b441ca1d705c229f3492cfdddcd186b21000000000000",
  "0xed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a",
  "0xbec89660",
  "0x0afd2219",
  "0x6e2d6012",
];

const validBlock = types.tuple({
  // block
  version: parts[0],
  parent: parts[1],
  "merkle-root": parts[2],
  timestamp: parts[3],
  nbits: parts[4],
  nonce: parts[5],
  height: types.uint(11319),
});

const validTx = types.tuple({
  version: "0x01000000",
  ins: types.list([
    types.tuple({
      outpoint: types.tuple({
        hash: "0xc8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2",
        index: "0x03000000",
      }),
      scriptSig:
        "0x47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1d",
      sequence: "0xfdffffff",
    }),
  ]),
  outs: types.list([
    types.tuple({
      scriptPubKey:
        "0x6a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d02",
      value: "0x0000000000000000",
    }),
    types.tuple({
      scriptPubKey: "0x76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac",
      value: "0x1027000000000000",
    }),
    types.tuple({
      scriptPubKey: "0x76a9146c575e9f31715b180b22738136895876ade678cb88ac",
      value: "0x1027000000000000",
    }),
    types.tuple({
      scriptPubKey: "0x76a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac",
      value: "0x752f7c5c00000000",
    }),
  ]),
  locktime: "0x00000000",
});

const validProof = types.tuple({
  "tx-index": types.uint(6),
  hashes: types.list([
    "0x3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b",
    "0x52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989",
    "0xa104c2725aabf28fcf3c304fd370610370330c546495acd5015ecc177c6494f6",
    "0x5e4442a235be2fc92aa15ba3b59c5af61c46dff8e7ed8198ebc48ec6d71a6a49",
    "0x904640bdf50c8edd12232efc41966a3a9af955208b205a90fc8a6dca5f69c458",
  ]),
  "tree-depth": types.uint(5),
});

Clarinet.test({
  name: "User can submit btc tx",
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
          "0x76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac",
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
