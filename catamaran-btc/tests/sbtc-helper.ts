import { hexToBytes, projectFactory } from "@clarigen/core";
import { rov, txOk } from "@clarigen/test";
import { project } from "../src/clarigen-types";
import { expect } from "vitest";

const { sbtcDeposit, btcSbtcSwap } = projectFactory(project, "simnet");

export function mineSbtc(recipient: string) {
  const blockHeight = 1000;
  const burnHash = rov(sbtcDeposit.getBurnHeader(blockHeight));
  if (burnHash === null) {
    return;
  }

  txOk(
    sbtcDeposit.completeDepositWrapper(
      hexToBytes(
        "3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b"
      ),
      1,
      100000000, // 1 BTC
      recipient,
      burnHash,
      blockHeight,
      hexToBytes(
        "52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989"
      )
    ),
    "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4"
  );
}

export function createSwap(alice: string, bob: string) {
  const swap = txOk(
    btcSbtcSwap.createSwap(
      100000,
      hexToBytes("76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"),
      1000000,
      bob,
      1000
    ),
    alice
  );
  const expectedSwapId = 0n;
  expect(swap.value).toBe(expectedSwapId);
}
