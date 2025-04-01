import { BitcoinRPCConfig } from "bitcoin-tx-proof";
import { BitcoinRPC } from "bitcoin-tx-proof/dist/rpc";
import * as fs from "fs";
import { txs } from "../tests/txs";

const btcRPCConfig: BitcoinRPCConfig = {
  url: "http://localhost:8332",
};

const btcRPC = new BitcoinRPC(btcRPCConfig);

async function fetchTxObject(txid: string, blockHeight: number) {
  // get transaction object
  const blockHash = await btcRPC.call("getblockhash", [blockHeight]);
  const txObject = await btcRPC.call("getrawtransaction", [
    txid,
    true,
    blockHash,
  ]);
  return txObject;
}

const main = async () => {
  const data = await Promise.all(
    txs.map(async (tx) => fetchTxObject(tx.tx, tx.height))
  );

  fs.writeFileSync("./tests/tx-objects.json", JSON.stringify(data, null, 2));
};

main();
