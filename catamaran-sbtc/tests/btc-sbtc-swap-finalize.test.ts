import { projectFactory } from "@clarigen/core";
import { txOk } from "@clarigen/test";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { createSwap, mineSbtc } from "./sbtc-helper";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { BitcoinRPCConfig, bitcoinTxProof } from "bitcoin-tx-proof";
import { BitcoinRPC } from "bitcoin-tx-proof/dist/rpc";
import { BaseSequencer } from "vitest/node.js";

const alice = accounts.wallet_1.address;
const bob = accounts.wallet_2.address;
const charlie = accounts.wallet_3.address;

const { btcSbtcSwap, clarityBitcoinLibV5 } = projectFactory(project, "simnet");

const btcRPCConfig: BitcoinRPCConfig = {
  url: "http://localhost:8332",
};

const btcRPC = new BitcoinRPC(btcRPCConfig);

describe("User can finalize btc-sbtc swap", () => {
  test("that Bob can complete Alice' swap using a legacy btc tx", async () => {
    mineSbtc(alice);
    const swapAmount = 10000;
    const requestId = txOk(
      btcSbtcSwap.createSwap(
        swapAmount,
        hexToBytes("76a9147bb1218a48c58c35c3537e6560e804023ee7310688ac"),
        swapAmount,
        bob,
        1000
      ),
      alice
    ).value;
    console.log(requestId);

    const txid =
      "f5a993361e1db33c3b2323e39eda6c8ee70bc08da1429d0a2f81063751e55c73";
    const blockHeight = 883230;
    // create proof
    // Get proof for a transaction
    const proof = await bitcoinTxProof(txid, blockHeight, btcRPCConfig);

    console.log(proof);

    // get transaction object
    const blockHash = await btcRPC.call("getblockhash", [blockHeight]);
    const txObject = await btcRPC.call("getrawtransaction", [
      txid,
      true,
      blockHash,
    ]);

    console.log(txObject.vin);
    console.log(txObject.vout);

    // split proof.witnessMerkleProof into chunks of 64 chars
    const hashes = proof.witnessMerkleProof.match(/.{1,64}/g) || [];

    // submit btc tx by bob
    const submission = txOk(
      btcSbtcSwap.submitSwap(
        requestId,
        proof.blockHeight,
        hexToBytes(proof.blockHeader),
        {
          version: txObject.version,
          locktime: txObject.locktime,
          ins: txObject.vin.map((input: any) => {
            return {
              outpoint: { hash: hexToBytes(input.txid), index: input.vout },
              scriptSig: hexToBytes(input.scriptSig.hex),
              sequence: input.sequence,
            };
          }),
          outs: txObject.vout.map((output: any) => {
            return {
              value: output.value * 100_000_000,
              scriptPubKey: hexToBytes(output.scriptPubKey.hex),
            };
          }),
        },
        {
          txIndex: proof.txIndex,
          hashes: hashes.map(hexToBytes),
          treeDepth: proof.merkleProofDepth,
        }
      ),
      bob
    );

    console.log(submission);

    expect(submission.value).toBe(6000n); // ERR_VERIFICATION_FAILED due to clarinet block header
  }, 100_000);
});
