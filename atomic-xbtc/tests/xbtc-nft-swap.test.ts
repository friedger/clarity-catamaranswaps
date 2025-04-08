import { test, expect, describe } from "vitest";
import { roOk, rov, txErr, txOk, varGet } from '@clarigen/test';
import util from 'util'
import { createNftSwap, deployer, errors, fixedFees, funNft, submitNftSwap, wrappedBitcoin, xbtcNftSwap } from "./helpers";
import { bufferCV, noneCV } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;
const charlie = accounts.get("wallet_3")!;

const NOT_ENOUGH_FUNDS = 1n
const NOT_ENOUGH_FUNDS_AMPLIFIED = 100n
const NOT_ENOUGH_FUNDS_AMPLIFIED_AMPLIFIED = 3000n

describe("create swaps", () => {
  test("Can't create a swap without funds", async () => {
    const response = txErr(xbtcNftSwap.createSwap(100n, 200n, bob, funNft.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(NOT_ENOUGH_FUNDS);
  });

  test("Can't create a swap without funds enough to cover fee", async () => {
    const mintResponse = txOk(wrappedBitcoin.mintTokens(100n, alice), deployer);
    expect(mintResponse.value).toBe(true);
    let receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(100n);
    const response = txErr(xbtcNftSwap.createSwap(100n, 200n, bob, funNft.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(NOT_ENOUGH_FUNDS_AMPLIFIED);
  });

  test("Can create a swap with oneself", async () => {
    const mintResponse = txOk(wrappedBitcoin.mintTokens(1000n, alice), deployer);
    expect(mintResponse.value).toBe(true);
    let receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(1000n);
    const response = txOk(xbtcNftSwap.createSwap(100n, 200n, alice, funNft.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(0n);
  });
})

describe("submit swaps", () => {
  test("Can't swap for a closed swap", async () => {
    const createResp = createNftSwap(1000n, 1n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    let submitResp = submitNftSwap(0n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(submitResp.value).toBe(true);
    
    const response = txErr(xbtcNftSwap.submitSwap(0n, funNft.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_ALREADY_DONE);
  });

  test("Can't swap for wrong token", async () => {
    const createResp = createNftSwap(1000n, 200n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    
    const response = txErr(xbtcNftSwap.submitSwap(0n, wrappedBitcoin.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_INVALID_FUNGIBLE_TOKEN);
  });

  test("Can't swap if a seller was set and tx-sender is different", async () => {
    const createResp = createNftSwap(1000n, 200n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    
    const response = txErr(xbtcNftSwap.submitSwap(0n, funNft.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_INVALID_RECEIVER);
  });

  test("Can't swap if a owner hasnt the nft", async () => {
    const createResp = createNftSwap(1000n, 200n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    const response = txErr(xbtcNftSwap.submitSwap(0n, funNft.identifier, fixedFees.identifier), bob);
    expect(response.value).toBe(NOT_ENOUGH_FUNDS_AMPLIFIED_AMPLIFIED);
  });

  test("Can swap if nft owner has the nft", async () => {
    const createResp = createNftSwap(1000n, 1n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    txOk(funNft.mint(), bob);
    const response = txOk(xbtcNftSwap.submitSwap(0n, funNft.identifier, fixedFees.identifier), bob);
    expect(response.value).toBe(true);
  });

  test("Cant swap with random owner only with intended owner if present", async () => {
    const createResp = createNftSwap(1000n, 1n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    txOk(funNft.mint(), charlie);
    const response = txErr(xbtcNftSwap.submitSwap(0n, funNft.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_INVALID_RECEIVER);
  });

  test("Can swap with random owner only with intended owner if present", async () => {
    const createResp = createNftSwap(1000n, 1n, alice, "none", funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    txOk(funNft.mint(), charlie);
    const response = txOk(xbtcNftSwap.submitSwap(0n, funNft.identifier, fixedFees.identifier), charlie);
    expect(response.value).toBe(true);
  });

})

describe("cancel swaps", () => {

  test("Can't cancel invalid swap", async () => {
    const response = txErr(xbtcNftSwap.cancel(0n, funNft.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_INVALID_ID);
  });

  test("Can't cancel if swap not expired", async () => {
    let response = createNftSwap(1000n, 200n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(response.value).toBe(0n);
    response = txErr(xbtcNftSwap.cancel(0n, funNft.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_TOO_EARLY);
    simnet.mineEmptyBlocks(98)
    response = txErr(xbtcNftSwap.cancel(0n, funNft.identifier, fixedFees.identifier), alice);
    expect(response.value).toBe(errors.xbtcNftSwap.ERR_TOO_EARLY);
  });

  test("Can't cancel after expiry if swap is done", async () => {
    const createResp = createNftSwap(1000n, 1n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);
    const submitResp = submitNftSwap(0n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(submitResp.value).toBe(true);
    
    simnet.mineEmptyBlocks(100)
    const response1 = txErr(xbtcNftSwap.cancel(0n, funNft.identifier, fixedFees.identifier), alice);
    expect(response1.value).toBe(errors.xbtcNftSwap.ERR_ALREADY_DONE);
  });

  test("Can cancel after expiry", async () => {
    const createResp = createNftSwap(1000n, 200n, alice, bob, funNft.identifier, fixedFees.identifier);
    expect(createResp.value).toBe(0n);    
    simnet.mineEmptyBlocks(100)
    const response1 = txOk(xbtcNftSwap.cancel(0n, funNft.identifier, fixedFees.identifier), alice);
    expect(response1.value).toBe(true);

    // post conditions; 1. fees returns, 2. primary returned
    let receipt = rov(wrappedBitcoin.getBalance(alice), alice);
    expect(receipt.value).toEqual(1010n);
    receipt = rov(wrappedBitcoin.getBalance(bob), bob);
    expect(receipt.value).toEqual(0n);
  });

});
