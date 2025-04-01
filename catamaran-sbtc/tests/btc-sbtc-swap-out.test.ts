import { projectFactory } from "@clarigen/core";
import { txOk } from "@clarigen/test";
import { hexToBytes } from "@noble/hashes/utils";
import { bigIntToBytes, intToBytes } from "@stacks/common";
import {
  bufferCV,
  responseOkCV,
  someCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { txObjects } from "./txs";

const alice = accounts.wallet_1.address;
const { btcSbtcSwap } = projectFactory(project, "simnet");

describe("Find btc recipient in tx", () => {
  test("that we can find the legacy recipient in a btc tx", async () => {
    const txObject = txObjects[0];
    const receiverOutIndex = 0;

    assertReceiver(txObject, receiverOutIndex);
  });

  test("that we can find the native segwit recipient in a btc tx", async () => {
    const txObject = txObjects[1];
    const receiverOutIndex = 0;

    assertReceiver(txObject, receiverOutIndex);
  });

  test("that we CANNOT find the recipient that is described as OP_RETURN (hex > 80)", async () => {
    const txObject = txObjects[2];
    const receiverOutIndex = 0; // <-- op_return

    expect(() => assertReceiver(txObject, receiverOutIndex)).toThrowError();
  });

  test("that we can find the recipient in a btc tx with op_return", async () => {
    const txObject = txObjects[2];
    const receiverOutIndex = 1;

    assertReceiver(txObject, receiverOutIndex);
  });
});

function assertReceiver(txObject: any, receiverIndex: number) {
  const receiver = txObject.vout[receiverIndex].scriptPubKey.hex;

  const tx = {
    version: bigIntToBytes(txObject.version, 4),
    locktime: bigIntToBytes(txObject.locktime, 4),
    ins: txObject.vin.map((input: any) => {
      return {
        outpoint: {
          hash: hexToBytes(input.txid),
          index: bigIntToBytes(input.vout, 4),
        },
        scriptSig: hexToBytes(input.scriptSig.hex),
        sequence: bigIntToBytes(input.sequence, 4),
      };
    }),
    outs: txObject.vout.map((output: any) => {
      return {
        value: bigIntToBytes(BigInt(Math.round(output.value * 100000000)), 8),
        scriptPubKey: hexToBytes(output.scriptPubKey.hex),
      };
    }),
  };

  const recipient = txOk(
    btcSbtcSwap.getOutValue(tx, hexToBytes(receiver)),
    alice
  ).result;

  expect(recipient).toEqual(
    responseOkCV(
      tupleCV({
        out: someCV(
          tupleCV({
            scriptPubKey: bufferCV(hexToBytes(receiver)),
            value: uintCV(0),
          })
        ),
        pubscriptkey: bufferCV(hexToBytes(receiver)),
      })
    )
  );
}
