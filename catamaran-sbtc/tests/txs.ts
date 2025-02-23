import * as fs from "fs";

export const txs = [
  // legacy
  {
    tx: "f5a993361e1db33c3b2323e39eda6c8ee70bc08da1429d0a2f81063751e55c73",
    height: 883230,
  },
  // native segwit
  {
    tx: "99197d06f15884f7e9038e641b6706fd101a229abba6fa91bc54d72c192a263f",
    height: 883230,
  },
  // op_return
  {
    tx: "1d336463635c30de205afdd99e95520747e686ba50433559f44f7ec685394391",
    height: 883230,
  },
  // multi ins and outs
  {
    tx: "50c9e9e0fd92b39e32e68eb0fce78704a936e27dbf683243b089f9c7437f9389",
    height: 883230,
  },
];

export const txObjects = JSON.parse(
  fs.readFileSync("./tests/tx-objects.json").toString()
);
