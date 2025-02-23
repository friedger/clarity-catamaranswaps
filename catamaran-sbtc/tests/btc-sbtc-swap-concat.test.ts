import { projectFactory } from "@clarigen/core";
import { rov } from "@clarigen/test";
import { hexToBytes } from "@noble/hashes/utils";
import { bigIntToBytes, bytesToHex, intToBytes } from "@stacks/common";
import { describe, expect, test } from "vitest";
import { project } from "../src/clarigen-types"; // where your [types.output] was specified
import { txObjects } from "./txs";
import { cvToString } from "@stacks/transactions";

const { clarityBitcoinHelperWtx, clarityBitcoinLibV5, clarityBitcoinHelper } =
  projectFactory(project, "simnet");

describe("Verify concat tx", () => {
  test("that we can concat the legacy tx (no witness data)", async () => {
    assertConcatTx(txObjects[0]);
  });

  test("that we can concat the native segwit tx", async () => {
    assertConcatTx(txObjects[1]);
  });

  test("that we can concat tx with op_return (no witness data)", async () => {
    assertConcatTx(txObjects[2]);
  });

  test("that we can concat tx with multiple ins and outs", async () => {
    assertConcatTx(txObjects[3]);
  });
});

function assertConcatTx(txObject: any) {
  const tx = {
    version: bigIntToBytes(txObject.version, 4).reverse(),
    locktime: bigIntToBytes(txObject.locktime, 4).reverse(),
    ins: txObject.vin.map((input: any) => {
      return {
        outpoint: {
          hash: hexToBytes(input.txid).reverse(),
          index: bigIntToBytes(input.vout, 4).reverse(),
        },
        scriptSig: hexToBytes(input.scriptSig.hex),
        sequence: bigIntToBytes(input.sequence, 4).reverse(),
      };
    }),
    outs: txObject.vout.map((output: any) => {
      return {
        value: bigIntToBytes(
          BigInt(Math.round(output.value * 100000000)),
          8
        ).reverse(),
        scriptPubKey: hexToBytes(output.scriptPubKey.hex),
      };
    }),
  };
  let hasWitnessData = false;
  const witnessData: number[] = [];
  for (let vin of txObject.vin) {
    if (!vin.txinwitness) {
      continue;
    }
    hasWitnessData = true;
    witnessData.push(vin.txinwitness.length);
    for (let item of vin.txinwitness || []) {
      const b = hexToBytes(item);
      witnessData.push(b.length);
      witnessData.push(...b);
    }
  }

  const txBuff = hasWitnessData
    ? rov(clarityBitcoinHelperWtx.concatWtx(tx, new Uint8Array(witnessData)))
    : rov(clarityBitcoinHelper.concatTx(tx));
  expect(bytesToHex(txBuff)).toStrictEqual(txObject.hex);
}
