import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const wallet_1 = accounts.get("wallet_1")!;
const wallet_2 = accounts.get("wallet_2")!;
const wallet_3 = accounts.get("wallet_3")!;
const ustx = 1000000;

describe("User can cancel btc-stx swap after 100 blocks", () => {
   it("should allow user to cancel btc-stx swap after 100 blocks", () => {
      let block = simnet.callPublicFn(
         "btc-stx-swap",
         "create-swap",
         [
            Cl.uint(10000),
            Cl.bufferFromHex(
               "76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"
            ),
            Cl.uint(ustx),
            Cl.some(Cl.standardPrincipal(wallet_2)),
         ],
         wallet_1
      );
      const id = 0;

      expect(block.result).toBeOk(Cl.uint(id));
      expect(block.events[0].data.sender).toBe(wallet_1);
      expect(block.events[0].data.amount).toBe(`${ustx}`);

      simnet.mineEmptyBlocks(99);

      block = simnet.callPublicFn(
         "btc-stx-swap",
         "cancel",
         [Cl.uint(id)],
         wallet_2
      );
      // TOO EARLY
      expect(block.result).toBeErr(Cl.uint(4));

      block = simnet.callPublicFn(
         "btc-stx-swap",
         "cancel",
         [Cl.uint(id)],
         wallet_2
      );

      expect(block.result).toBeOk(Cl.bool(true));
      expect(block.events[0].data.recipient).toBe(wallet_1);
      expect(block.events[0].data.amount).toBe(`${ustx}`);
   });
});

const parts = [
   "00200020",
   "b9d30838796e6ea7ff4b441ca1d705c229f3492cfdddcd186b21000000000000",
   "ed853698ef70b79478b6c01e31efdfff6fac38606661e3aa7b30d1b6fe6bf65a",
   "bec89660",
   "0afd2219",
   "6e2d6012",
];

const validBlock = Cl.tuple({
   // block
   version: Cl.bufferFromHex(parts[0]),
   parent: Cl.bufferFromHex(parts[1]),
   "merkle-root": Cl.bufferFromHex(parts[2]),
   timestamp: Cl.bufferFromHex(parts[3]),
   nbits: Cl.bufferFromHex(parts[4]),
   nonce: Cl.bufferFromHex(parts[5]),
   height: Cl.uint(11319),
});

const validTx = Cl.tuple({
   version: Cl.bufferFromHex("01000000"),
   ins: Cl.list([
      Cl.tuple({
         outpoint: Cl.tuple({
            hash: Cl.bufferFromHex(
               "c8bd3502a21f810da7692e323cc46e0e9ec1def7a93cc610f6d65b60193174e2"
            ),
            index: Cl.bufferFromHex("03000000"),
         }),
         scriptSig: Cl.bufferFromHex(
            "47304402204ffe267e6b5aab28350be80c1f4ea94424c483f3f44f175594bb6273000f80e8022042ebd5668420c8b29d2ec2791e2c8aa0d7784d8a6283f958fe581e0be129c61b0121037435c194e9b01b3d7f7a2802d6684a3af68d05bbf4ec8f17021980d777691f1d"
         ),
         sequence: Cl.bufferFromHex("fdffffff"),
      }),
   ]),
   outs: Cl.list([
      Cl.tuple({
         scriptPubKey: Cl.bufferFromHex(
            "6a4c5058365b13588072c8b4eca88a505db5c453123c5c91db98d90ac1cd124402dba596531ebf945361dbdbcb0a43e8d6984ab8eee14982d0341eab198fc74d2d917c6d95dc001e21c20008001e1fc2001d02"
         ),
         value: Cl.bufferFromHex("0000000000000000"),
      }),
      Cl.tuple({
         scriptPubKey: Cl.bufferFromHex(
            "76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"
         ),
         value: Cl.bufferFromHex("1027000000000000"),
      }),
      Cl.tuple({
         scriptPubKey: Cl.bufferFromHex(
            "76a9146c575e9f31715b180b22738136895876ade678cb88ac"
         ),
         value: Cl.bufferFromHex("1027000000000000"),
      }),
      Cl.tuple({
         scriptPubKey: Cl.bufferFromHex(
            "76a914ba27f99e007c7f605a8305e318c1abde3cd220ac88ac"
         ),
         value: Cl.bufferFromHex("752f7c5c00000000"),
      }),
   ]),
   locktime: Cl.bufferFromHex("00000000"),
});

const validProof = Cl.tuple({
   "tx-index": Cl.uint(6),
   hashes: Cl.list([
      Cl.bufferFromHex(
         "3ae3dfeedc6eb99fb5e2c5d0c90697a66de969c3f4d974ebe2ef104fcea7f13b"
      ),
      Cl.bufferFromHex(
         "52500d11cabf1049ebb139a82b439d08bd3a8e867a41fb3f368dfa125e043989"
      ),
      Cl.bufferFromHex(
         "a104c2725aabf28fcf3c304fd370610370330c546495acd5015ecc177c6494f6"
      ),
      Cl.bufferFromHex(
         "5e4442a235be2fc92aa15ba3b59c5af61c46dff8e7ed8198ebc48ec6d71a6a49"
      ),
      Cl.bufferFromHex(
         "904640bdf50c8edd12232efc41966a3a9af955208b205a90fc8a6dca5f69c458"
      ),
   ]),
   "tree-depth": Cl.uint(5),
});

describe("User can submit btc tx but verification fails on VM", () => {
   it("should allow user to submit btc tx but verification fails on VM", () => {
      let block = simnet.callPublicFn(
         "btc-stx-swap",
         "create-swap",
         [
            Cl.uint(10000),
            Cl.bufferFromHex(
               "76a914c70e1ca5a5ef633fe5464821ca421c173997f38888ac"
            ),
            Cl.uint(ustx),
            Cl.some(Cl.standardPrincipal(wallet_2)),
         ],
         wallet_1
      );
      const id = 0;

      expect(block.result).toBeOk(Cl.uint(id));
      expect(block.events[0].data.sender).toBe(wallet_1);
      expect(block.events[0].data.amount).toBe(`${ustx}`);

      block = simnet.callPublicFn(
         "btc-stx-swap",
         "submit-swap",
         [Cl.uint(id), validBlock, validTx, validProof],
         wallet_3
      );

      expect(block.result).toBeErr(Cl.uint(6000)); // ERR_VERIFICATION_FAILED due to clarinet block header
   });
});
