import { projectFactory } from "@clarigen/core";
import { rov, txOk } from "@clarigen/test";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { createSwap, mineSbtc } from "./sbtc-helper";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { BitcoinRPCConfig, bitcoinTxProof } from "bitcoin-tx-proof";
import { BitcoinRPC } from "bitcoin-tx-proof/dist/rpc";
import { BaseSequencer } from "vitest/node.js";
import { intToBytes } from "@stacks/common";
import { Cl, cvToString, SomeCV } from "@stacks/transactions";
import { sha256 } from "@noble/hashes/sha256";

const alice = accounts.wallet_1.address;
const bob = accounts.wallet_2.address;
const charlie = accounts.wallet_3.address;

const { btcSbtcSwap, clarityBitcoinLibV5 } = projectFactory(project, "simnet");

const btcRPCConfig: BitcoinRPCConfig = {
  url: "http://localhost:8332",
};

const btcRPC = new BitcoinRPC(btcRPCConfig);

describe("User can finalize btc-sbtc swap", () => {
  const txid =
    "f5a993361e1db33c3b2323e39eda6c8ee70bc08da1429d0a2f81063751e55c73";
  const blockHeight = 883230;
  const bitcoinBlockHeaderHash =
    "00000000000000000001c55626b85b4b3ecb33f67645356a2b01f4dfba893679";

  test("Ensure that remote data is as expected", () => {
    // the simnet burn-block-height can change depending on the contracts deployed
    // therefore, we always check that simnet is in the correct state

    var ihh = simnet.execute("(get-stacks-block-info? id-header-hash u595012)");
    console.log(cvToString(ihh.result));

    const bbh = simnet.execute(
      `(at-block ${cvToString((ihh.result as SomeCV).value)} burn-block-height)`
    );
    expect(bbh.result).toBeUint(blockHeight);

    var bbhh = simnet.execute(
      `(at-block ${cvToString(
        (ihh.result as SomeCV).value
      )} (get-burn-block-info? header-hash burn-block-height) )`
    );
    expect(bbhh.result).toBeSome(Cl.bufferFromHex(bitcoinBlockHeaderHash));
  });

  test("that Bob can complete Alice' swap using a legacy btc tx", async () => {
    mineSbtc(alice);
    const swapAmount = 10000;
    const requestId = txOk(
      btcSbtcSwap.createSwap(
        swapAmount,
        hexToBytes("76a9147bb1218a48c58c35c3537e6560e804023ee7310688ac"), // receiver script
        swapAmount,
        bob,
        1000
      ),
      alice
    ).value;
    console.log(requestId);

    //  https://mempool.space/api/tx/f5a993361e1db33c3b2323e39eda6c8ee70bc08da1429d0a2f81063751e55c73/merkle-proof
    const merkleProof = {
      block_height: 883230,
      merkle: [
        "d59c146d5f87b8c14fbeffb4189fe173aa4c8d6633f4597e3fab2591594af1a4",
        "498ea075e8ab8f6d4a678d6c24bc8a82304c31744e3067326ca9c242a275f604",
        "c52bc8ec72395e90646d5cc96cd17ff080c4f4af7ef6f01ea3b7ecfaa49b25cd",
        "a0a36ab643cabd74c6c9445a4c069c6c7c0ea5ac85f92342c28d8f91d487ab76",
        "15310842f6e9f419dd6860fae1cff45db709040d46cff8e736aa66a57f275b40",
        "ca377ffe8805556d45d75f2e64d92984ac8edeac661cb841c0ec198f34af7e16",
        "85b7e2affe4b61fa1dd69e3f6713afa22a58e224769e8f245c4e9b62be6ffb01",
        "0e04534a2cabf0bc42044de898c65fa283b2d661f76b4e227aa79ba390e7da70",
        "fea2965f0cf6e2c2cc1542b985565c9e2af281c14a396a3f62c57954977872e5",
        "51a1c02147ab62b9a5f67582536e4e7913d944660722b8f78a83158440752c85",
      ],
      pos: 6,
    };

    // create proof
    // Get proof for a transaction
    //const proof = await bitcoinTxProof(txid, blockHeight, btcRPCConfig);

    //console.log(proof);

    // get transaction object
    const blockHash = await btcRPC.call("getblockhash", [blockHeight]);
    const txObject = await btcRPC.call("getrawtransaction", [
      txid,
      true,
      blockHash,
    ]);

    console.log(txObject.vin);
    console.log(txObject.vout);

    return;
    // split proof.witnessMerkleProof into chunks of 64 chars
    // const hashes = (proof.witnessMerkleProof.match(/.{1,64}/g) || []).map(hexToBytes)
    const hashes = merkleProof.merkle.map(hexToBytes).map((h) => h.reverse());

    const tx = {
      version: intToBytes(txObject.version, 4),
      locktime: intToBytes(txObject.locktime, 4),
      ins: txObject.vin.map((input: any) => {
        return {
          outpoint: {
            hash: hexToBytes(input.txid),
            index: intToBytes(input.vout, 4), // convert to Uint8Array
          },
          scriptSig: hexToBytes(input.scriptSig.hex),
          sequence: intToBytes(input.sequence, 4),
        };
      }),
      outs: txObject.vout.map((output: any) => {
        return {
          value: intToBytes(output.value * 100_000_000, 8),
          scriptPubKey: hexToBytes(output.scriptPubKey.hex),
        };
      }),
    };

    const txHex =
      "0100000001fb031611b675eb06e0d94f4d668d95f4ad4bc74ffe70bcefa035c1ab89e5c121000000006a47304402207ce0dcbdb1b3790831fc294a451bfc329b129588bef8766697f589c37666d85f0220135b39800f5d1ec2c329fd125be71cba4132b429cb3827815a2af9c21ee36f69012103e6a7489ea5fe06f9363830466067e34c574b44c485cb8ee9a4fc98276dc5a5c8ffffffff01ffb60000000000001976a9147bb1218a48c58c35c3537e6560e804023ee7310688ac00000000";

    console.log(
      merkleProof.pos,
      merkleProof.merkle
        .map(hexToBytes)
        .map((h) => h.reverse())
        .map(bytesToHex),
      merkleProof.merkle.length
    );

    const txProof = {
      txIndex: proof.txIndex,
      hashes,
      treeDepth: proof.merkleProofDepth,
    };

    console.log(proof.txIndex, hashes, proof.merkleProofDepth);
    const verify = rov(
      clarityBitcoinLibV5.wasTxMinedCompact(
        proof.blockHeight,
        hexToBytes(txHex),
        hexToBytes(proof.blockHeader),
        txProof
      )
    );
    console.log("verify", verify);

    // submit btc tx by bob
    const submission = txOk(
      btcSbtcSwap.submitSwap(
        requestId,
        proof.blockHeight,
        hexToBytes(proof.blockHeader),
        tx,
        txProof
      ),
      bob
    );

    console.log(submission);

    expect(submission.value).toBe(6000n); // ERR_VERIFICATION_FAILED due to clarinet block header
  }, 100_000);
});
