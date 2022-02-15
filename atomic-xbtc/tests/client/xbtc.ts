import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  assertEquals,
  assertObjectMatch,
} from "../../../src/deps.ts";

export function transfer(
  ubanana: number,
  sender: Account,
  recipient: Account,
  user: Account
) {
  return Tx.contractCall(
    "Wrapped-Bitcoin",
    "transfer",
    [
      types.uint(ubanana),
      types.principal(sender.address),
      types.principal(recipient.address),
      types.none(),
    ],
    user.address
  );
}
