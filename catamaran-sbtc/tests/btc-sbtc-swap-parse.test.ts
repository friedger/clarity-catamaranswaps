import { projectFactory } from "@clarigen/core";
import { rov } from "@clarigen/test";
import { hexToBytes } from "@noble/hashes/utils";
import { bigIntToBytes, bytesToHex } from "@stacks/common";
import { describe, expect, test } from "vitest";
import { project } from "../src/clarigen-types"; // where your [types.output] was specified
import { txObjects } from "./txs";

const { clarityBitcoinHelperWtx, clarityBitcoinLibV5, clarityBitcoinHelper } =
  projectFactory(project, "simnet");

describe("Verify parse tx", () => {
  test("that we can parse the legacy tx (no witness data)", async () => {
    assertParseTx(txObjects[0]);
  });

  test("that we can parse the native segwit tx", async () => {
    assertParseTx(txObjects[1]);
  });

  test("that we can parse tx with op_return (no witness data)", async () => {
    assertParseTx(txObjects[2]);
  });

  test("that we can parse tx with multiple ins and outs", async () => {
    assertParseTx(txObjects[3]);
  });
});

function assertParseTx(txObject: any) {
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

  console.log(txObject);

  const parsedTx = hasWitnessData
    ? rov(clarityBitcoinLibV5.parseWtx(hexToBytes(txObject.hex), true)).value
    : rov(clarityBitcoinLibV5.parseTx(hexToBytes(txObject.hex))).value;

  // throw execption if parsedTx is bigint
  if (typeof parsedTx === "bigint") {
    console.log("parsedTx", parsedTx);
    throw new Error("parsedTx is bigint");
  }

  const tx = {
    version: bigIntToBytes(parsedTx.version, 4).reverse(),
    locktime: bigIntToBytes(parsedTx.locktime, 4).reverse(),
    ins: parsedTx.ins.map((input: any) => {
      return {
        outpoint: {
          hash: input.outpoint.hash.reverse(),
          index: bigIntToBytes(input.outpoint.index, 4).reverse(), // convert to Uint8Array
        },
        scriptSig: input.scriptSig,
        sequence: bigIntToBytes(input.sequence, 4).reverse(),
      };
    }),
    outs: parsedTx.outs.map((output: any) => {
      return {
        value: bigIntToBytes(output.value, 8).reverse(),
        scriptPubKey: output.scriptPubKey,
      };
    }),
  };

  const txBuff = hasWitnessData
    ? rov(clarityBitcoinHelperWtx.concatWtx(tx, new Uint8Array(witnessData)))
    : rov(clarityBitcoinHelper.concatTx(tx));
  expect(bytesToHex(txBuff)).toStrictEqual(txObject.hex);
}
