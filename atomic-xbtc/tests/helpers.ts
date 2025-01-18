import { rov, txOk } from "@clarigen/test";
import { project, accounts } from "./clarigen-types";
import { projectFactory, projectErrors } from "@clarigen/core";
import { expect } from "vitest";

export const contracts = projectFactory(project, "simnet");

export const deployer = accounts.deployer.address;
export const alice = accounts.wallet_1.address;
export const bob = accounts.wallet_2.address;
export const charlie = accounts.wallet_3.address;
export const fred = accounts.wallet_9.address;

export const fixedFees = contracts.fixedFees;
export const xbtcFtSwap = contracts.xbtcFtSwap;
export const xbtcNftSwap = contracts.xbtcNftSwap;
export const wrappedBitcoin = contracts.wrappedBitcoin;
export const funToken = contracts.funToken;
export const funNft = contracts.funNft;
export const controllerId = `${accounts.deployer.address}.controller`;

const _errors = projectErrors(project);

export const errors = {
  fixedFees: _errors.fixedFees,
  xbtcFtSwap: _errors.xbtcFtSwap,
  xbtcNftSwap: _errors.xbtcNftSwap,
};


export function createNftSwap(amountA:bigint, nftId:bigint, swapperA:string, swapperB:string, nft:string, fees:string) {
  const mintResponse = txOk(wrappedBitcoin.mintTokens(amountA + (amountA/100n), swapperA), deployer);
  expect(mintResponse.value).toBe(true);
  let receipt = rov(wrappedBitcoin.getBalance(swapperA), swapperA);
  expect(receipt.value).toEqual(amountA + (amountA/100n));
  const response = txOk(xbtcNftSwap.createSwap(amountA, nftId, (swapperB !== 'none') ? swapperB : null, nft, fees), swapperA);
  
  // post condition - alices xbtc transerred to contarct
  receipt = rov(wrappedBitcoin.getBalance(swapperA), swapperA);
  expect(receipt.value).toEqual(0n);
  
  return response;
}

export function submitNftSwap(swapId:bigint, swapperA:string, swapperB:string, nft:string, fees:string) {
  const mintResponse = txOk(funNft.mint(), swapperB);
  expect(mintResponse.value).toBe(true);
  let owner = rov(funNft.getOwner(1n), swapperB);
  expect(owner.value).toEqual(swapperB);
  // not working in funnft contract... const value = rov(funNft.getBalance(swapper), swapper);
  const response = txOk(xbtcNftSwap.submitSwap(swapId, nft, fees), swapperB);
  return response;
}

export function createFTSwap(amountA:bigint, amountB:bigint, swapperA:string, swapperB:string, tokenB:string, fees:string) {
  const mintResponse = txOk(wrappedBitcoin.mintTokens(amountA + (amountA/100n), swapperA), deployer);
  expect(mintResponse.value).toBe(true);
  let receipt = rov(wrappedBitcoin.getBalance(swapperA), swapperA);
  expect(receipt.value).toEqual(amountA + (amountA/100n));
  const response = txOk(xbtcFtSwap.createSwap(amountA, amountB, (swapperB !== 'none') ? swapperB : null, tokenB, fees), swapperA);
  
  // post condition - alices xbtc transerred to contarct
  receipt = rov(wrappedBitcoin.getBalance(swapperA), swapperA);
  expect(receipt.value).toEqual(0n);
  
  return response;
}

export function submitFTSwap(swapId:bigint, amountA:bigint, amountB:bigint, swapperB:string, tokenB:string, fees:string) {
  const mintResponse = txOk(funToken.mint(amountB), swapperB);
  expect(mintResponse.value).toBe(true);
  let receipt = rov(funToken.getBalance(swapperB), swapperB);
  expect(receipt.value).toEqual(amountB);
  const response = txOk(xbtcFtSwap.submitSwap(swapId, tokenB, fees), swapperB);

  // alices xbtc transerred to bob
  // bob fun transerred to alice
  receipt = rov(funToken.getBalance(swapperB), swapperB);
  expect(receipt.value).toEqual(0n);
  receipt = rov(wrappedBitcoin.getBalance(swapperB), swapperB);
  expect(receipt.value).toEqual(amountA);

  return response;
}
