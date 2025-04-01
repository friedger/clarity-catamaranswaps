import { projectFactory } from "@clarigen/core";
import { txOk } from "@clarigen/test";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { intToBytes } from "@stacks/common";
import { bufferCV, Cl, cvToString, SomeCV, uintCV } from "@stacks/transactions";
import { BitcoinRPCConfig } from "bitcoin-tx-proof";
import { BitcoinRPC } from "bitcoin-tx-proof/dist/rpc";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { mineSbtc } from "./sbtc-helper";
import { txObjects } from "./txs";

const alice = accounts.wallet_1.address;
const bob = accounts.wallet_2.address;

const { btcSbtcSwap } = projectFactory(project, "simnet");

describe("User can finalize btc-sbtc swap", () => {
  const txid =
    "f5a993361e1db33c3b2323e39eda6c8ee70bc08da1429d0a2f81063751e55c73";
  const blockHeight = 883230;
  const bitcoinBlockHeaderHash =
    "00000000000000000001c55626b85b4b3ecb33f67645356a2b01f4dfba893679";

  // https://mempool.space/api/block/00000000000000000001c55626b85b4b3ecb33f67645356a2b01f4dfba893679/header
  const headerHex =
    "040060208c8b71956e408769453d40275830b83856bc0d8afaf60000000000000000000069167b97329b04d11aea35a48fbfc00af71c9750c4526d024dbb97158793eac31379aa672677021707a18259";

  test("Ensure that burn block height is as expected", () => {
    const bbh = simnet.execute("burn-block-height");
    expect(bbh.result).toBeUint(blockHeight);

    var bbhh = simnet.execute(
      "(get-burn-block-info? header-hash burn-block-height)"
    );
    expect(bbhh.result).toBeSome(Cl.bufferFromHex(bitcoinBlockHeaderHash));
  });

  test("Ensure that remote data is as expected", () => {
    // the simnet burn-block-height can change depending on the contracts deployed
    // therefore, we always check that simnet is in the correct state

    var ihh = simnet.execute("(get-stacks-block-info? id-header-hash u595012)");
    expect(ihh.result).toBeSome(bufferCV(hexToBytes("abcd"))); // TODO replace with actual value

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

    // get transaction object
    const txObject = txObjects[0];

    console.log(txObject.vin);
    console.log(txObject.vout);

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
      txIndex: merkleProof.pos,
      hashes,
      treeDepth: hashes.length,
    };

    // submit btc tx by bob
    const submission = txOk(
      btcSbtcSwap.submitSwap(
        requestId,
        merkleProof.block_height,
        hexToBytes(headerHex),
        tx,
        txProof
      ),
      bob
    );

    console.log(submission);

    expect(submission.value).toBe(6000n); // ERR_VERIFICATION_FAILED due to clarinet block header
  }, 100_000);
});
