import { hexToBytes, projectFactory } from "@clarigen/core";
import { txOk } from "@clarigen/test";
import {
  BufferCV,
  bufferCV,
  ClarityType,
  noneCV,
  OptionalCV,
  principalCV,
  someCV,
  uintCV,
} from "@stacks/transactions";
import { expect } from "vitest";
import { project } from "../src/clarigen-types";
import { O } from "vitest/dist/chunks/reporters.d.CfRkRKN2.js";
import { B } from "vitest/dist/chunks/benchmark.d.BwvBVTda.js";

const { btcSbtcSwap } = projectFactory(project, "simnet");
const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;

export const swapAmount = 1000000;

export function mineSbtc(recipient: string) {
  const blockHeight = 1000;
  const burnHash = simnet.callReadOnlyFn(
    "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit",
    "get-burn-header",
    [uintCV(blockHeight)],
    deployer
  ).result as OptionalCV<BufferCV>;
  if (burnHash === null || burnHash.type === ClarityType.OptionalNone) {
    return;
  }

  simnet.callPublicFn(
    "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit",
    "complete-deposit-wrapper",
    [
      bufferCV(
        hexToBytes(
          "3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b"
        )
      ),
      uintCV(1),
      uintCV(100000000), // 1 BTC
      principalCV(recipient),
      burnHash.value,
      uintCV(blockHeight),
      bufferCV(
        hexToBytes(
          "52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989"
        )
      ),
    ],
    "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4"
  );
}

export function createSwap(alice: string, bob: string) {
  const swap = txOk(
    btcSbtcSwap.createSwap(
      swapAmount,
      hexToBytes("76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"),
      swapAmount,
      bob,
      1000
    ),
    alice
  );
  const expectedSwapId = 0n;
  expect(swap.value).toBe(expectedSwapId);
  return expectedSwapId;
}
