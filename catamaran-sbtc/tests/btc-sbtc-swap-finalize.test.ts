import { projectFactory } from "@clarigen/core";
import { txOk } from "@clarigen/test";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { createSwap, mineSbtc } from "./sbtc-helper";
import { hexToBytes } from "@noble/hashes/utils";
import { BitcoinRPCConfig, bitcoinTxProof } from "bitcoin-tx-proof";
import { BitcoinRPC } from "bitcoin-tx-proof/dist/rpc";

const alice = accounts.wallet_1.address;
const bob = accounts.wallet_2.address;
const charlie = accounts.wallet_3.address;

const { btcSbtcSwap, clarityBitcoinLibV5 } = projectFactory(project, "simnet");

const btcRPCConfig: BitcoinRPCConfig = {
  url: "http://localhost:8332",
};

const btcRPC = new BitcoinRPC(btcRPCConfig);

describe("User can finalize btc-sbtc swap", () => {
  test("that Bob can complete Alice' swap", async () => {
    mineSbtc(alice);
    const requestId = createSwap(alice, bob);
    console.log(requestId);

    const txid =
      "bd725ba1fc3be138d2d62cd3ec4c7f55e2e33811ee1e5dbffd44e91686a233f3";

    // create proof
    // Get proof for a transaction
    const proof = await bitcoinTxProof(
      txid,
      883016, // block height
      btcRPCConfig
    );

    console.log(proof);

    // get transaction object
    const txObject = await btcRPC.call("gettransactions", [txid]);

    console.log(txObject);

    // submit btc tx by bob
    const submission = txOk(
      btcSbtcSwap.submitSwap(
        requestId,
        proof.blockHeight,
        hexToBytes(proof.blockHeader),
        txObject as any,
        proof
      ),
      alice
    );

    console.log(submission);

    expect(submission.value).toBe(6000n); // ERR_VERIFICATION_FAILED due to clarinet block header
  }, 100_000);
});
