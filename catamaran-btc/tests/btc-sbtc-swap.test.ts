import {
  bytesToHex,
  CoreNodeEventType,
  hexToBytes,
  projectFactory,
} from "@clarigen/core";
import { filterEvents, rov, txErr, txOk } from "@clarigen/test";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { createSwap, mineSbtc, swapAmount } from "./sbtc-helper";

const alice = accounts.wallet_1.address;
const bob = accounts.wallet_2.address;
const charlie = accounts.wallet_3.address;

const { btcSbtcSwap, clarityBitcoinLibV5 } = projectFactory(project, "simnet");

const parts = [
  "00200020",
  "b9d30838796e6ea7ff4b441ca1d705c229f3492cfdddcd186b21000000000000",
  "ed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a",
  "bec89660",
  "0afd2219",
  "6e2d6012",
].map(hexToBytes);

const validBlock = {
  // block
  version: parts[0],
  parent: parts[1],
  merkleRoot: parts[2],
  timestamp: parts[3],
  nbits: parts[4],
  nonce: parts[5],
  height: 11319,
};

const validTx = {
  version: hexToBytes("01000000"),
  ins: [
    {
      outpoint: {
        hash: hexToBytes(
          "c8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2"
        ),
        index: hexToBytes("03000000"),
      },
      scriptSig: hexToBytes(
        "47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1d"
      ),
      sequence: hexToBytes("fdffffff"),
    },
  ],
  outs: [
    {
      scriptPubKey: hexToBytes(
        "6a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d02"
      ),
      value: hexToBytes("0000000000000000"),
    },
    {
      scriptPubKey: hexToBytes(
        "76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"
      ),
      value: hexToBytes("1027000000000000"),
    },
    {
      scriptPubKey: hexToBytes(
        "76a9146c575e9f31715b180b22738136895876ade678cb88ac"
      ),
      value: hexToBytes("1027000000000000"),
    },
    {
      scriptPubKey: hexToBytes(
        "76a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac"
      ),
      value: hexToBytes("752f7c5c00000000"),
    },
  ],
  locktime: hexToBytes("00000000"),
};

const validProof = {
  txIndex: 6,
  hashes: [
    "3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b",
    "52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989",
    "a104c2725aabf28fcf3c304fd370610370330c546495acd5015ecc177c6494f6",
    "5e4442a235be2fc92aa15ba3b59c5af61c46dff8e7ed8198ebc48ec6d71a6a49",
    "904640bdf50c8edd12232efc41966a3a9af955208b205a90fc8a6dca5f69c458",
  ].map(hexToBytes),
  treeDepth: 5,
};

describe("User can cancel btc-sbtc swap", () => {
  test("that Alice can create a swap with Bob and cancel it after", async () => {
    mineSbtc(alice);
    const requestId = createSwap(alice, bob);

    simnet.mineEmptyBlocks(100);
    // try to cancel before it expired
    const tooEarly = txErr(btcSbtcSwap.cancel(requestId), alice);
    expect(tooEarly.value).toBe(4n);

    simnet.mineEmptyBlocks(1);

    // cancel after it expired by charlie
    const cancelByCharlie = txOk(btcSbtcSwap.cancel(requestId), charlie);
    expect(cancelByCharlie.value).toBe(true);
    expect(
      filterEvents(cancelByCharlie.events, CoreNodeEventType.FtTransferEvent)
    ).toStrictEqual([
      {
        data: {
          amount: swapAmount.toString(),
          asset_identifier:
            "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token",
          recipient: "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
          sender: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap",
        },
        event: "ft_transfer_event",
      },
    ]);

    // try cancel after swapped by alice
    const cancel = txErr(btcSbtcSwap.cancel(requestId), alice);
    expect(cancel.value).toBe(7n);
  });

  test("that Alice can't cancel the swap with Bob after Bob registered btc tx", async () => {
    mineSbtc(alice);
    const requestId = createSwap(alice, bob);

    // concat arrays of part
    const blockHeader = parts.reduce(
      (result, part) => new Uint8Array([...result, ...part]),
      new Uint8Array()
    );

    console.log(bytesToHex(blockHeader));
    const hblock = rov(clarityBitcoinLibV5.parseBlockHeader(blockHeader));
    console.log(bytesToHex((hblock.value as any).merkleRoot));

    const bchh = rov(clarityBitcoinLibV5.getBcHHash(validBlock.height));
    console.log("bchh", bchh ? bytesToHex(bchh) : "null");

    const blockHeaderHash = hexToBytes(
      "44fc864fe70a66fd161f6140ff96930690950d30efc2f8d12000000000000000"
    ).reverse();

    const submissionByAlice = txErr(
      btcSbtcSwap.submitSwap(
        requestId,
        validBlock.height,
        blockHeader,
        validTx,
        validProof
      ),
      alice
    );
    expect(submissionByAlice.value).toBe(4n);

    const submission = txErr(
      btcSbtcSwap.submitSwap(
        requestId,
        validBlock.height,
        blockHeader,
        validTx,
        validProof
      ),
      bob
    );
    console.log(submission);

    expect(submission.value).toBe(6000n); // ERR_VERIFICATION_FAILED due to clarinet block header
  });
});
