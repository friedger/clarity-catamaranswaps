import { hexToBytes, projectFactory } from "@clarigen/core";
import { txErr, txOk } from "@clarigen/test";
import { describe, expect, test } from "vitest";
import { accounts, project } from "../src/clarigen-types"; // where your [types.output] was specified
import { createSwap, mineSbtc } from "./sbtc-helper";

const alice = accounts.wallet_1.address;
const bob = accounts.wallet_1.address;

const { btcSbtcSwap } = projectFactory(project, "simnet");

describe("User can cancel btc-sbtc swap", () => {
  test("that Alice can create a swap with Bob and cancel it after", async () => {
    mineSbtc(alice);
    createSwap(alice, bob);

    simnet.mineEmptyBlocks(100);
    // try to cancel before it expired
    const tooEarly = txErr(btcSbtcSwap.cancel(0), alice);
    expect(tooEarly.value).toBe(4n);

    simnet.mineEmptyBlocks(1);
    // cancel after it expired
    const cancel = txOk(btcSbtcSwap.cancel(0), alice);
    console.log(cancel);
  });

  test("that Alice can't cancel the swap with Bob after Bob registered btc tx", async () => {
    mineSbtc(alice);
    createSwap(alice, bob);
    // const submission = btcSbtcSwap.submitSwap(0, "btc-tx", "btc-tx-id", "btc-tx-recipient", "btc-tx-amount", "btc-tx-script");
    // console.log(submission);
  )
});
