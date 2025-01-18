import { test, expect, describe } from "vitest";
import { roOk, rov, txErr, txOk, varGet } from '@clarigen/test';
import util from 'util'
import { createFTSwap, deployer, errors, fixedFees, funToken, submitFTSwap, wrappedBitcoin, xbtcFtSwap } from "./helpers";
import { bufferCV, noneCV } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;
const charlie = accounts.get("wallet_3")!;

const NOT_ENOUGH_FUNDS = 1n
const NOT_ENOUGH_FUNDS_AMPLIFIED = 100n
const NOT_ENOUGH_FUNDS_AMPLIFIED_AMPLIFIED = 1000n

describe("submit swaps", () => {
  test("Can't submit a swap for a closed swap", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    let submitResp = submitFTSwap(0n, 1000n, 200n, bob, funToken.identifier, fixedFees.identifier);
    expect(submitResp.value).toBe(true);
    
    const response = txErr(xbtcFtSwap.submitSwap(0n, funToken.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_ALREADY_DONE);
  });

  test("Can't submit a swap for wrong token", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    
    const response = txErr(xbtcFtSwap.submitSwap(0n, wrappedBitcoin.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_INVALID_FUNGIBLE_TOKEN);
  });

  test("Can't submit a swap if a seller was set and tx-sender is different", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    
    const response = txErr(xbtcFtSwap.submitSwap(0n, funToken.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_INVALID_RECEIVER);
  });

  test("Can't submit a swap if a seller has insufficient funds", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    const response = txErr(xbtcFtSwap.submitSwap(0n, funToken.identifier, fixedFees.identifier), bob);
    expect(response.value).toBe(NOT_ENOUGH_FUNDS_AMPLIFIED_AMPLIFIED);
  });

  test("Can submit a swap if a seller has sufficient funds", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    txOk(funToken.mint(200n), bob);
    const response = txOk(xbtcFtSwap.submitSwap(0n, funToken.identifier, fixedFees.identifier), bob);
    expect(response.value).toBe(true);
  });

  test("Can submit a swap for random seller with sufficient funds", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, "none", funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    txOk(funToken.mint(200n), charlie);
    const response = txOk(xbtcFtSwap.submitSwap(0n, funToken.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(true);
  });

})


describe("create swaps", () => {
  test("Can't create a swap without funds", async () => {
    const response = txErr(xbtcFtSwap.createSwap(100n, 200n, bob, funToken.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(NOT_ENOUGH_FUNDS);
  });

  test("Can't create a swap without funds enough to cover fee", async () => {
    const mintResponse = txOk(wrappedBitcoin.mintTokens(100n, alice), deployer);
    expect(mintResponse.value).toBe(true);
    let receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(100n);
    const response = txErr(xbtcFtSwap.createSwap(100n, 200n, bob, funToken.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(NOT_ENOUGH_FUNDS_AMPLIFIED);
  });

  test("Can create a swap with oneself", async () => {
    const mintResponse = txOk(wrappedBitcoin.mintTokens(1000n, alice), deployer);
    expect(mintResponse.value).toBe(true);
    let receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(1000n);
    const response = txOk(xbtcFtSwap.createSwap(100n, 200n, alice, funToken.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(0n);
  });
})


describe("cancel swaps", () => {

  test("Can't cancel invalid swap", async () => {
    const response = txErr(xbtcFtSwap.cancel(0n, fixedFees.identifier), alice);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_INVALID_ID);
  });

  test("Can't cancel with invalid fee contract", async () => {
    let response = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(response.value).toBe(0n);
    response = txErr(xbtcFtSwap.cancel(0n, funToken.identifier), alice);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_INVALID_FEES_TRAIT);
  });

  test("Can't cancel with invalid fee contract", async () => {
    let response = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(response.value).toBe(0n);
    response = txErr(xbtcFtSwap.cancel(0n, funToken.identifier), alice);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_INVALID_FEES_TRAIT);
  });

  test("Can't cancel if swap not expired", async () => {
    let response = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(response.value).toBe(0n);
    response = txErr(xbtcFtSwap.cancel(0n, fixedFees.identifier), alice);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_TOO_EARLY);
    simnet.mineEmptyBlocks(98)
    response = txErr(xbtcFtSwap.cancel(0n, fixedFees.identifier), alice);
    expect(response.value).toBe(errors.xbtcFtSwap.ERR_TOO_EARLY);
  });

  test("Can't cancel after expiry if swap is done", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    const submitResp = submitFTSwap(0n, 1000n, 200n, bob, funToken.identifier, fixedFees.identifier);
    expect(submitResp.value).toBe(true);
    
    simnet.mineEmptyBlocks(100)
    const response1 = txErr(xbtcFtSwap.cancel(0n, fixedFees.identifier), alice);
    expect(response1.value).toBe(errors.xbtcFtSwap.ERR_ALREADY_DONE);
  });

  test("Can cancel after expiry", async () => {
    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);    
    simnet.mineEmptyBlocks(100)
    const response1 = txOk(xbtcFtSwap.cancel(0n, fixedFees.identifier), alice);
    expect(response1.value).toBe(true);

    // post conditions; 1. fees returns, 2. primary returned
    let receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(1010n);
    receipt = rov(wrappedBitcoin.getBalance(bob), bob);
    expect(receipt.value).toEqual(0n);
  });

  /**
   * QUESTION - about the cancelation in case where fee contract is compromised.
   */
  test("Can cancel after expiry and get primary back even if the fee contract cant return the fees for any reason", async () => {
    let receipt = rov(wrappedBitcoin.getBalance(fixedFees.identifier), deployer);
    expect(receipt.value).toEqual(0n);

    const createResp = createFTSwap(1000n, 200n, alice, bob, funToken.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);    
    simnet.mineEmptyBlocks(100)

    receipt = rov(wrappedBitcoin.getBalance(fixedFees.identifier), deployer);
    expect(receipt.value).toEqual(10n);

    // drain the fee contract (had to add BURNER role to deployer in xbtc token contract)
    const mintResponse = txOk(wrappedBitcoin.burnTokens(5n, fixedFees.identifier), deployer);
    expect(mintResponse.value).toEqual(true);
    receipt = rov(wrappedBitcoin.getBalance(fixedFees.identifier), deployer);
    expect(receipt.value).toEqual(5n);

    // QUESTION - if the fee contract is compromised it can lead to the user being able to 
    // get their entire primary back. Not sure the answer to this but it feels wrong to 
    // prevent the return of the primary in this scenario?
    const response1 = txOk(xbtcFtSwap.cancel(0n, fixedFees.identifier), alice);
    // ** expect(response1.value).toBe(true); **

    // post conditions; 1. fees NOT returns, 2. primary returned
    receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(1000n);
    receipt = rov(wrappedBitcoin.getBalance(bob), bob);
    expect(receipt.value).toEqual(5n);
  });

});
