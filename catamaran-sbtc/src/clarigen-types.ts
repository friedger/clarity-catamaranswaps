
import type { TypedAbiArg, TypedAbiFunction, TypedAbiMap, TypedAbiVariable, Response } from '@clarigen/core';

export const contracts = {
  btcSbtcSwap: {
  "functions": {
    findOut: {"name":"find-out","access":"private","args":[{"name":"entry","type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]}},{"name":"result","type":{"tuple":[{"name":"out","type":{"optional":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]}}},{"name":"pubscriptkey","type":{"buffer":{"length":40}}}]}}],"outputs":{"type":{"tuple":[{"name":"out","type":{"optional":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]}}},{"name":"pubscriptkey","type":{"buffer":{"length":40}}}]}}} as TypedAbiFunction<[entry: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}, "entry">, result: TypedAbiArg<{
  "out": {
  "scriptPubKey": Uint8Array;
  "value": number | bigint;
} | null;
  "pubscriptkey": Uint8Array;
}, "result">], {
  "out": {
  "scriptPubKey": Uint8Array;
  "value": bigint;
} | null;
  "pubscriptkey": Uint8Array;
}>,
    sbtcTransfer: {"name":"sbtc-transfer","access":"private","args":[{"name":"amount","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<string, "recipient">], Response<boolean, bigint>>,
    cancel: {"name":"cancel","access":"public","args":[{"name":"id","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">], Response<boolean, bigint>>,
    createSwap: {"name":"create-swap","access":"public","args":[{"name":"sats","type":"uint128"},{"name":"btc-receiver","type":{"buffer":{"length":40}}},{"name":"amount","type":"uint128"},{"name":"stx-receiver","type":{"optional":"principal"}},{"name":"premium","type":"uint128"}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[sats: TypedAbiArg<number | bigint, "sats">, btcReceiver: TypedAbiArg<Uint8Array, "btcReceiver">, amount: TypedAbiArg<number | bigint, "amount">, stxReceiver: TypedAbiArg<string | null, "stxReceiver">, premium: TypedAbiArg<number | bigint, "premium">], Response<bigint, bigint>>,
    getOutValue: {"name":"get-out-value","access":"public","args":[{"name":"tx","type":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}},{"name":"locktime","type":{"buffer":{"length":4}}},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}},{"name":"version","type":{"buffer":{"length":4}}}]}},{"name":"pubscriptkey","type":{"buffer":{"length":40}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"out","type":{"optional":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]}}},{"name":"pubscriptkey","type":{"buffer":{"length":40}}}]},"error":"none"}}}} as TypedAbiFunction<[tx: TypedAbiArg<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[];
  "locktime": Uint8Array;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[];
  "version": Uint8Array;
}, "tx">, pubscriptkey: TypedAbiArg<Uint8Array, "pubscriptkey">], Response<{
  "out": {
  "scriptPubKey": Uint8Array;
  "value": bigint;
} | null;
  "pubscriptkey": Uint8Array;
}, null>>,
    setStxReceiver: {"name":"set-stx-receiver","access":"public","args":[{"name":"id","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">], Response<boolean, bigint>>,
    submitSwap: {"name":"submit-swap","access":"public","args":[{"name":"id","type":"uint128"},{"name":"height","type":"uint128"},{"name":"blockheader","type":{"buffer":{"length":80}}},{"name":"tx","type":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}},{"name":"locktime","type":{"buffer":{"length":4}}},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}},{"name":"version","type":{"buffer":{"length":4}}}]}},{"name":"proof","type":{"tuple":[{"name":"hashes","type":{"list":{"type":{"buffer":{"length":32}},"length":12}}},{"name":"tree-depth","type":"uint128"},{"name":"tx-index","type":"uint128"}]}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, height: TypedAbiArg<number | bigint, "height">, blockheader: TypedAbiArg<Uint8Array, "blockheader">, tx: TypedAbiArg<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[];
  "locktime": Uint8Array;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[];
  "version": Uint8Array;
}, "tx">, proof: TypedAbiArg<{
  "hashes": Uint8Array[];
  "treeDepth": number | bigint;
  "txIndex": number | bigint;
}, "proof">], Response<boolean, bigint>>,
    submitSwapSegwit: {"name":"submit-swap-segwit","access":"public","args":[{"name":"id","type":"uint128"},{"name":"height","type":"uint128"},{"name":"wtx","type":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}},{"name":"locktime","type":{"buffer":{"length":4}}},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}},{"name":"version","type":{"buffer":{"length":4}}}]}},{"name":"witness-data","type":{"buffer":{"length":1650}}},{"name":"header","type":{"buffer":{"length":80}}},{"name":"tx-index","type":"uint128"},{"name":"tree-depth","type":"uint128"},{"name":"wproof","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"witness-merkle-root","type":{"buffer":{"length":32}}},{"name":"witness-reserved-value","type":{"buffer":{"length":32}}},{"name":"ctx","type":{"buffer":{"length":1024}}},{"name":"cproof","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, height: TypedAbiArg<number | bigint, "height">, wtx: TypedAbiArg<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[];
  "locktime": Uint8Array;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[];
  "version": Uint8Array;
}, "wtx">, witnessData: TypedAbiArg<Uint8Array, "witnessData">, header: TypedAbiArg<Uint8Array, "header">, txIndex: TypedAbiArg<number | bigint, "txIndex">, treeDepth: TypedAbiArg<number | bigint, "treeDepth">, wproof: TypedAbiArg<Uint8Array[], "wproof">, witnessMerkleRoot: TypedAbiArg<Uint8Array, "witnessMerkleRoot">, witnessReservedValue: TypedAbiArg<Uint8Array, "witnessReservedValue">, ctx: TypedAbiArg<Uint8Array, "ctx">, cproof: TypedAbiArg<Uint8Array[], "cproof">], Response<boolean, bigint>>,
    readUint32: {"name":"read-uint32","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"uint32","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "uint32": bigint;
}, bigint>>
  },
  "maps": {
    submittedBtcTxs: {"name":"submitted-btc-txs","key":{"buffer":{"length":128}},"value":"uint128"} as TypedAbiMap<Uint8Array, bigint>,
    swaps: {"name":"swaps","key":"uint128","value":{"tuple":[{"name":"amount","type":"uint128"},{"name":"btc-receiver","type":{"buffer":{"length":40}}},{"name":"done","type":"bool"},{"name":"premium","type":"uint128"},{"name":"sats","type":"uint128"},{"name":"sbtc-sender","type":"principal"},{"name":"stx-receiver","type":{"optional":"principal"}},{"name":"when","type":"uint128"}]}} as TypedAbiMap<number | bigint, {
  "amount": bigint;
  "btcReceiver": Uint8Array;
  "done": boolean;
  "premium": bigint;
  "sats": bigint;
  "sbtcSender": string;
  "stxReceiver": string | null;
  "when": bigint;
}>
  },
  "variables": {
    ERR_OUT_OF_BOUNDS: {
  name: 'ERR-OUT-OF-BOUNDS',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_ALREADY_DONE: {
  name: 'ERR_ALREADY_DONE',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_BTC_TX_ALREADY_USED: {
  name: 'ERR_BTC_TX_ALREADY_USED',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_FAILED_TO_PARSE_TX: {
  name: 'ERR_FAILED_TO_PARSE_TX',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_FORBIDDEN: {
  name: 'ERR_FORBIDDEN',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_ID: {
  name: 'ERR_INVALID_ID',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_NATIVE_FAILURE: {
  name: 'ERR_NATIVE_FAILURE',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_NO_STX_RECEIVER: {
  name: 'ERR_NO_STX_RECEIVER',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_TX_NOT_FOR_RECEIVER: {
  name: 'ERR_TX_NOT_FOR_RECEIVER',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_TX_VALUE_TOO_SMALL: {
  name: 'ERR_TX_VALUE_TOO_SMALL',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_VERIFICATION_FAILED: {
  name: 'ERR_VERIFICATION_FAILED',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    expiry: {
  name: 'expiry',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    nextId: {
  name: 'next-id',
  type: 'uint128',
  access: 'variable'
} as TypedAbiVariable<bigint>
  },
  constants: {
  eRROUTOFBOUNDS: 1n,
  ERR_ALREADY_DONE: {
    isOk: false,
    value: 7n
  },
  ERR_BTC_TX_ALREADY_USED: {
    isOk: false,
    value: 9n
  },
  ERR_FAILED_TO_PARSE_TX: {
    isOk: false,
    value: 2n
  },
  ERR_FORBIDDEN: {
    isOk: false,
    value: 4n
  },
  ERR_INVALID_ID: {
    isOk: false,
    value: 3n
  },
  ERR_NATIVE_FAILURE: {
    isOk: false,
    value: 99n
  },
  ERR_NO_STX_RECEIVER: {
    isOk: false,
    value: 8n
  },
  ERR_TX_NOT_FOR_RECEIVER: {
    isOk: false,
    value: 6n
  },
  ERR_TX_VALUE_TOO_SMALL: {
    isOk: false,
    value: 5n
  },
  ERR_VERIFICATION_FAILED: {
    isOk: false,
    value: 1n
  },
  expiry: 100n,
  nextId: 0n
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'btc-sbtc-swap',
  },
clarityBitcoinHelper: {
  "functions": {
    concatHeader: {"name":"concat-header","access":"read_only","args":[{"name":"block","type":{"tuple":[{"name":"merkle-root","type":{"buffer":{"length":32}}},{"name":"nbits","type":{"buffer":{"length":4}}},{"name":"nonce","type":{"buffer":{"length":4}}},{"name":"parent","type":{"buffer":{"length":32}}},{"name":"timestamp","type":{"buffer":{"length":4}}},{"name":"version","type":{"buffer":{"length":4}}}]}}],"outputs":{"type":{"buffer":{"length":80}}}} as TypedAbiFunction<[block: TypedAbiArg<{
  "merkleRoot": Uint8Array;
  "nbits": Uint8Array;
  "nonce": Uint8Array;
  "parent": Uint8Array;
  "timestamp": Uint8Array;
  "version": Uint8Array;
}, "block">], Uint8Array>,
    concatIn: {"name":"concat-in","access":"read_only","args":[{"name":"in","type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]}},{"name":"result","type":{"buffer":{"length":1024}}}],"outputs":{"type":{"buffer":{"length":1024}}}} as TypedAbiFunction<[_in: TypedAbiArg<{
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}, "_in">, result: TypedAbiArg<Uint8Array, "result">], Uint8Array>,
    concatIns: {"name":"concat-ins","access":"read_only","args":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}}],"outputs":{"type":{"buffer":{"length":1024}}}} as TypedAbiFunction<[ins: TypedAbiArg<{
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[], "ins">], Uint8Array>,
    concatOut: {"name":"concat-out","access":"read_only","args":[{"name":"out","type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]}},{"name":"result","type":{"buffer":{"length":1024}}}],"outputs":{"type":{"buffer":{"length":1024}}}} as TypedAbiFunction<[out: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}, "out">, result: TypedAbiArg<Uint8Array, "result">], Uint8Array>,
    concatOuts: {"name":"concat-outs","access":"read_only","args":[{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}}],"outputs":{"type":{"buffer":{"length":1024}}}} as TypedAbiFunction<[outs: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[], "outs">], Uint8Array>,
    concatTx: {"name":"concat-tx","access":"read_only","args":[{"name":"tx","type":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}},{"name":"locktime","type":{"buffer":{"length":4}}},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}},{"name":"version","type":{"buffer":{"length":4}}}]}}],"outputs":{"type":{"buffer":{"length":1024}}}} as TypedAbiFunction<[tx: TypedAbiArg<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[];
  "locktime": Uint8Array;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[];
  "version": Uint8Array;
}, "tx">], Uint8Array>,
    concatVar: {"name":"concat-var","access":"read_only","args":[{"name":"buffer","type":{"buffer":{"length":256}}}],"outputs":{"type":{"buffer":{"length":257}}}} as TypedAbiFunction<[buffer: TypedAbiArg<Uint8Array, "buffer">], Uint8Array>
  },
  "maps": {
    
  },
  "variables": {
    BUFF_TO_BYTE: {
  name: 'BUFF_TO_BYTE',
  type: {
    list: {
      type: {
        buffer: {
          length: 1
        }
      },
      length: 256
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array[]>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch21","clarity_version":"Clarity2",
  contractName: 'clarity-bitcoin-helper',
  },
clarityBitcoinHelperWtx: {
  "functions": {
    concatHeader: {"name":"concat-header","access":"read_only","args":[{"name":"block","type":{"tuple":[{"name":"merkle-root","type":{"buffer":{"length":32}}},{"name":"nbits","type":{"buffer":{"length":4}}},{"name":"nonce","type":{"buffer":{"length":4}}},{"name":"parent","type":{"buffer":{"length":32}}},{"name":"timestamp","type":{"buffer":{"length":4}}},{"name":"version","type":{"buffer":{"length":4}}}]}}],"outputs":{"type":{"buffer":{"length":80}}}} as TypedAbiFunction<[block: TypedAbiArg<{
  "merkleRoot": Uint8Array;
  "nbits": Uint8Array;
  "nonce": Uint8Array;
  "parent": Uint8Array;
  "timestamp": Uint8Array;
  "version": Uint8Array;
}, "block">], Uint8Array>,
    concatIn: {"name":"concat-in","access":"read_only","args":[{"name":"in","type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]}},{"name":"result","type":{"buffer":{"length":4096}}}],"outputs":{"type":{"buffer":{"length":4096}}}} as TypedAbiFunction<[_in: TypedAbiArg<{
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}, "_in">, result: TypedAbiArg<Uint8Array, "result">], Uint8Array>,
    concatIns: {"name":"concat-ins","access":"read_only","args":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}}],"outputs":{"type":{"buffer":{"length":4096}}}} as TypedAbiFunction<[ins: TypedAbiArg<{
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[], "ins">], Uint8Array>,
    concatOut: {"name":"concat-out","access":"read_only","args":[{"name":"out","type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]}},{"name":"result","type":{"buffer":{"length":4096}}}],"outputs":{"type":{"buffer":{"length":4096}}}} as TypedAbiFunction<[out: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}, "out">, result: TypedAbiArg<Uint8Array, "result">], Uint8Array>,
    concatOuts: {"name":"concat-outs","access":"read_only","args":[{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}}],"outputs":{"type":{"buffer":{"length":4096}}}} as TypedAbiFunction<[outs: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[], "outs">], Uint8Array>,
    concatVar: {"name":"concat-var","access":"read_only","args":[{"name":"buffer","type":{"buffer":{"length":256}}}],"outputs":{"type":{"buffer":{"length":257}}}} as TypedAbiFunction<[buffer: TypedAbiArg<Uint8Array, "buffer">], Uint8Array>,
    concatWtx: {"name":"concat-wtx","access":"read_only","args":[{"name":"tx","type":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":{"buffer":{"length":4}}}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":{"buffer":{"length":4}}}]},"length":8}}},{"name":"locktime","type":{"buffer":{"length":4}}},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":{"buffer":{"length":8}}}]},"length":8}}},{"name":"version","type":{"buffer":{"length":4}}}]}},{"name":"witness-data","type":{"buffer":{"length":1650}}}],"outputs":{"type":{"buffer":{"length":4096}}}} as TypedAbiFunction<[tx: TypedAbiArg<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": Uint8Array;
};
  "scriptSig": Uint8Array;
  "sequence": Uint8Array;
}[];
  "locktime": Uint8Array;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": Uint8Array;
}[];
  "version": Uint8Array;
}, "tx">, witnessData: TypedAbiArg<Uint8Array, "witnessData">], Uint8Array>
  },
  "maps": {
    
  },
  "variables": {
    BUFF_TO_BYTE: {
  name: 'BUFF_TO_BYTE',
  type: {
    list: {
      type: {
        buffer: {
          length: 1
        }
      },
      length: 256
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array[]>
  },
  constants: {
  BUFF_TO_BYTE: [
    Uint8Array.from([0]),
    Uint8Array.from([1]),
    Uint8Array.from([2]),
    Uint8Array.from([3]),
    Uint8Array.from([4]),
    Uint8Array.from([5]),
    Uint8Array.from([6]),
    Uint8Array.from([7]),
    Uint8Array.from([8]),
    Uint8Array.from([9]),
    Uint8Array.from([10]),
    Uint8Array.from([11]),
    Uint8Array.from([12]),
    Uint8Array.from([13]),
    Uint8Array.from([14]),
    Uint8Array.from([15]),
    Uint8Array.from([16]),
    Uint8Array.from([17]),
    Uint8Array.from([18]),
    Uint8Array.from([19]),
    Uint8Array.from([20]),
    Uint8Array.from([21]),
    Uint8Array.from([22]),
    Uint8Array.from([23]),
    Uint8Array.from([24]),
    Uint8Array.from([25]),
    Uint8Array.from([26]),
    Uint8Array.from([27]),
    Uint8Array.from([28]),
    Uint8Array.from([29]),
    Uint8Array.from([30]),
    Uint8Array.from([31]),
    Uint8Array.from([32]),
    Uint8Array.from([33]),
    Uint8Array.from([34]),
    Uint8Array.from([35]),
    Uint8Array.from([36]),
    Uint8Array.from([37]),
    Uint8Array.from([38]),
    Uint8Array.from([39]),
    Uint8Array.from([40]),
    Uint8Array.from([41]),
    Uint8Array.from([42]),
    Uint8Array.from([43]),
    Uint8Array.from([44]),
    Uint8Array.from([45]),
    Uint8Array.from([46]),
    Uint8Array.from([47]),
    Uint8Array.from([48]),
    Uint8Array.from([49]),
    Uint8Array.from([50]),
    Uint8Array.from([51]),
    Uint8Array.from([52]),
    Uint8Array.from([53]),
    Uint8Array.from([54]),
    Uint8Array.from([55]),
    Uint8Array.from([56]),
    Uint8Array.from([57]),
    Uint8Array.from([58]),
    Uint8Array.from([59]),
    Uint8Array.from([60]),
    Uint8Array.from([61]),
    Uint8Array.from([62]),
    Uint8Array.from([63]),
    Uint8Array.from([64]),
    Uint8Array.from([65]),
    Uint8Array.from([66]),
    Uint8Array.from([67]),
    Uint8Array.from([68]),
    Uint8Array.from([69]),
    Uint8Array.from([70]),
    Uint8Array.from([71]),
    Uint8Array.from([72]),
    Uint8Array.from([73]),
    Uint8Array.from([74]),
    Uint8Array.from([75]),
    Uint8Array.from([76]),
    Uint8Array.from([77]),
    Uint8Array.from([78]),
    Uint8Array.from([79]),
    Uint8Array.from([80]),
    Uint8Array.from([81]),
    Uint8Array.from([82]),
    Uint8Array.from([83]),
    Uint8Array.from([84]),
    Uint8Array.from([85]),
    Uint8Array.from([86]),
    Uint8Array.from([87]),
    Uint8Array.from([88]),
    Uint8Array.from([89]),
    Uint8Array.from([90]),
    Uint8Array.from([91]),
    Uint8Array.from([92]),
    Uint8Array.from([93]),
    Uint8Array.from([94]),
    Uint8Array.from([95]),
    Uint8Array.from([96]),
    Uint8Array.from([97]),
    Uint8Array.from([98]),
    Uint8Array.from([99]),
    Uint8Array.from([100]),
    Uint8Array.from([101]),
    Uint8Array.from([102]),
    Uint8Array.from([103]),
    Uint8Array.from([104]),
    Uint8Array.from([105]),
    Uint8Array.from([106]),
    Uint8Array.from([107]),
    Uint8Array.from([108]),
    Uint8Array.from([109]),
    Uint8Array.from([110]),
    Uint8Array.from([111]),
    Uint8Array.from([112]),
    Uint8Array.from([113]),
    Uint8Array.from([114]),
    Uint8Array.from([115]),
    Uint8Array.from([116]),
    Uint8Array.from([117]),
    Uint8Array.from([118]),
    Uint8Array.from([119]),
    Uint8Array.from([120]),
    Uint8Array.from([121]),
    Uint8Array.from([122]),
    Uint8Array.from([123]),
    Uint8Array.from([124]),
    Uint8Array.from([125]),
    Uint8Array.from([126]),
    Uint8Array.from([127]),
    Uint8Array.from([128]),
    Uint8Array.from([129]),
    Uint8Array.from([130]),
    Uint8Array.from([131]),
    Uint8Array.from([132]),
    Uint8Array.from([133]),
    Uint8Array.from([134]),
    Uint8Array.from([135]),
    Uint8Array.from([136]),
    Uint8Array.from([137]),
    Uint8Array.from([138]),
    Uint8Array.from([139]),
    Uint8Array.from([140]),
    Uint8Array.from([141]),
    Uint8Array.from([142]),
    Uint8Array.from([143]),
    Uint8Array.from([144]),
    Uint8Array.from([145]),
    Uint8Array.from([146]),
    Uint8Array.from([147]),
    Uint8Array.from([148]),
    Uint8Array.from([149]),
    Uint8Array.from([150]),
    Uint8Array.from([151]),
    Uint8Array.from([152]),
    Uint8Array.from([153]),
    Uint8Array.from([154]),
    Uint8Array.from([155]),
    Uint8Array.from([156]),
    Uint8Array.from([157]),
    Uint8Array.from([158]),
    Uint8Array.from([159]),
    Uint8Array.from([160]),
    Uint8Array.from([161]),
    Uint8Array.from([162]),
    Uint8Array.from([163]),
    Uint8Array.from([164]),
    Uint8Array.from([165]),
    Uint8Array.from([166]),
    Uint8Array.from([167]),
    Uint8Array.from([168]),
    Uint8Array.from([169]),
    Uint8Array.from([170]),
    Uint8Array.from([171]),
    Uint8Array.from([172]),
    Uint8Array.from([173]),
    Uint8Array.from([174]),
    Uint8Array.from([175]),
    Uint8Array.from([176]),
    Uint8Array.from([177]),
    Uint8Array.from([178]),
    Uint8Array.from([179]),
    Uint8Array.from([180]),
    Uint8Array.from([181]),
    Uint8Array.from([182]),
    Uint8Array.from([183]),
    Uint8Array.from([184]),
    Uint8Array.from([185]),
    Uint8Array.from([186]),
    Uint8Array.from([187]),
    Uint8Array.from([188]),
    Uint8Array.from([189]),
    Uint8Array.from([190]),
    Uint8Array.from([191]),
    Uint8Array.from([192]),
    Uint8Array.from([193]),
    Uint8Array.from([194]),
    Uint8Array.from([195]),
    Uint8Array.from([196]),
    Uint8Array.from([197]),
    Uint8Array.from([198]),
    Uint8Array.from([199]),
    Uint8Array.from([200]),
    Uint8Array.from([201]),
    Uint8Array.from([202]),
    Uint8Array.from([203]),
    Uint8Array.from([204]),
    Uint8Array.from([205]),
    Uint8Array.from([206]),
    Uint8Array.from([207]),
    Uint8Array.from([208]),
    Uint8Array.from([209]),
    Uint8Array.from([210]),
    Uint8Array.from([211]),
    Uint8Array.from([212]),
    Uint8Array.from([213]),
    Uint8Array.from([214]),
    Uint8Array.from([215]),
    Uint8Array.from([216]),
    Uint8Array.from([217]),
    Uint8Array.from([218]),
    Uint8Array.from([219]),
    Uint8Array.from([220]),
    Uint8Array.from([221]),
    Uint8Array.from([222]),
    Uint8Array.from([223]),
    Uint8Array.from([224]),
    Uint8Array.from([225]),
    Uint8Array.from([226]),
    Uint8Array.from([227]),
    Uint8Array.from([228]),
    Uint8Array.from([229]),
    Uint8Array.from([230]),
    Uint8Array.from([231]),
    Uint8Array.from([232]),
    Uint8Array.from([233]),
    Uint8Array.from([234]),
    Uint8Array.from([235]),
    Uint8Array.from([236]),
    Uint8Array.from([237]),
    Uint8Array.from([238]),
    Uint8Array.from([239]),
    Uint8Array.from([240]),
    Uint8Array.from([241]),
    Uint8Array.from([242]),
    Uint8Array.from([243]),
    Uint8Array.from([244]),
    Uint8Array.from([245]),
    Uint8Array.from([246]),
    Uint8Array.from([247]),
    Uint8Array.from([248]),
    Uint8Array.from([249]),
    Uint8Array.from([250]),
    Uint8Array.from([251]),
    Uint8Array.from([252]),
    Uint8Array.from([253]),
    Uint8Array.from([254]),
    Uint8Array.from([255])
  ]
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch25","clarity_version":"Clarity2",
  contractName: 'clarity-bitcoin-helper-wtx',
  },
clarityBitcoinLibV5: {
  "functions": {
    boolListOfLen: {"name":"bool-list-of-len","access":"private","args":[{"name":"n","type":"uint128"}],"outputs":{"type":{"list":{"type":"bool","length":8}}}} as TypedAbiFunction<[n: TypedAbiArg<number | bigint, "n">], boolean[]>,
    innerMerkleProofVerify: {"name":"inner-merkle-proof-verify","access":"private","args":[{"name":"ctr","type":"uint128"},{"name":"state","type":{"tuple":[{"name":"cur-hash","type":{"buffer":{"length":32}}},{"name":"path","type":"uint128"},{"name":"proof-hashes","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"root-hash","type":{"buffer":{"length":32}}},{"name":"tree-depth","type":"uint128"},{"name":"verified","type":"bool"}]}}],"outputs":{"type":{"tuple":[{"name":"cur-hash","type":{"buffer":{"length":32}}},{"name":"path","type":"uint128"},{"name":"proof-hashes","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"root-hash","type":{"buffer":{"length":32}}},{"name":"tree-depth","type":"uint128"},{"name":"verified","type":"bool"}]}}} as TypedAbiFunction<[ctr: TypedAbiArg<number | bigint, "ctr">, state: TypedAbiArg<{
  "curHash": Uint8Array;
  "path": number | bigint;
  "proofHashes": Uint8Array[];
  "rootHash": Uint8Array;
  "treeDepth": number | bigint;
  "verified": boolean;
}, "state">], {
  "curHash": Uint8Array;
  "path": bigint;
  "proofHashes": Uint8Array[];
  "rootHash": Uint8Array;
  "treeDepth": bigint;
  "verified": boolean;
}>,
    reverseBuff16: {"name":"reverse-buff16","access":"private","args":[{"name":"input","type":{"buffer":{"length":16}}}],"outputs":{"type":{"buffer":{"length":17}}}} as TypedAbiFunction<[input: TypedAbiArg<Uint8Array, "input">], Uint8Array>,
    wasTxMinedInternal: {"name":"was-tx-mined-internal","access":"private","args":[{"name":"height","type":"uint128"},{"name":"tx","type":{"buffer":{"length":4096}}},{"name":"header","type":{"buffer":{"length":80}}},{"name":"merkle-root","type":{"buffer":{"length":32}}},{"name":"proof","type":{"tuple":[{"name":"hashes","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"tree-depth","type":"uint128"},{"name":"tx-index","type":"uint128"}]}}],"outputs":{"type":{"response":{"ok":{"buffer":{"length":32}},"error":"uint128"}}}} as TypedAbiFunction<[height: TypedAbiArg<number | bigint, "height">, tx: TypedAbiArg<Uint8Array, "tx">, header: TypedAbiArg<Uint8Array, "header">, merkleRoot: TypedAbiArg<Uint8Array, "merkleRoot">, proof: TypedAbiArg<{
  "hashes": Uint8Array[];
  "treeDepth": number | bigint;
  "txIndex": number | bigint;
}, "proof">], Response<Uint8Array, bigint>>,
    getBcHHash: {"name":"get-bc-h-hash","access":"read_only","args":[{"name":"bh","type":"uint128"}],"outputs":{"type":{"optional":{"buffer":{"length":32}}}}} as TypedAbiFunction<[bh: TypedAbiArg<number | bigint, "bh">], Uint8Array | null>,
    getCommitmentScriptPubKey: {"name":"get-commitment-scriptPubKey","access":"read_only","args":[{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]},"length":8}}}],"outputs":{"type":{"buffer":{"length":128}}}} as TypedAbiFunction<[outs: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": number | bigint;
}[], "outs">], Uint8Array>,
    getReversedTxid: {"name":"get-reversed-txid","access":"read_only","args":[{"name":"tx","type":{"buffer":{"length":4096}}}],"outputs":{"type":{"buffer":{"length":32}}}} as TypedAbiFunction<[tx: TypedAbiArg<Uint8Array, "tx">], Uint8Array>,
    getTxid: {"name":"get-txid","access":"read_only","args":[{"name":"tx","type":{"buffer":{"length":4096}}}],"outputs":{"type":{"buffer":{"length":32}}}} as TypedAbiFunction<[tx: TypedAbiArg<Uint8Array, "tx">], Uint8Array>,
    innerGetCommitmentScriptPubKey: {"name":"inner-get-commitment-scriptPubKey","access":"read_only","args":[{"name":"out","type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]}},{"name":"result","type":{"buffer":{"length":128}}}],"outputs":{"type":{"buffer":{"length":128}}}} as TypedAbiFunction<[out: TypedAbiArg<{
  "scriptPubKey": Uint8Array;
  "value": number | bigint;
}, "out">, result: TypedAbiArg<Uint8Array, "result">], Uint8Array>,
    isBitSet: {"name":"is-bit-set","access":"read_only","args":[{"name":"val","type":"uint128"},{"name":"bit","type":"uint128"}],"outputs":{"type":"bool"}} as TypedAbiFunction<[val: TypedAbiArg<number | bigint, "val">, bit: TypedAbiArg<number | bigint, "bit">], boolean>,
    isCommitmentPattern: {"name":"is-commitment-pattern","access":"read_only","args":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}}],"outputs":{"type":"bool"}} as TypedAbiFunction<[scriptPubKey: TypedAbiArg<Uint8Array, "scriptPubKey">], boolean>,
    parseBlockHeader: {"name":"parse-block-header","access":"read_only","args":[{"name":"headerbuff","type":{"buffer":{"length":80}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"merkle-root","type":{"buffer":{"length":32}}},{"name":"nbits","type":"uint128"},{"name":"nonce","type":"uint128"},{"name":"parent","type":{"buffer":{"length":32}}},{"name":"timestamp","type":"uint128"},{"name":"version","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[headerbuff: TypedAbiArg<Uint8Array, "headerbuff">], Response<{
  "merkleRoot": Uint8Array;
  "nbits": bigint;
  "nonce": bigint;
  "parent": Uint8Array;
  "timestamp": bigint;
  "version": bigint;
}, bigint>>,
    parseTx: {"name":"parse-tx","access":"read_only","args":[{"name":"tx","type":{"buffer":{"length":4096}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":"uint128"}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":"uint128"}]},"length":8}}},{"name":"locktime","type":"uint128"},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]},"length":8}}},{"name":"version","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[tx: TypedAbiArg<Uint8Array, "tx">], Response<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": bigint;
};
  "scriptSig": Uint8Array;
  "sequence": bigint;
}[];
  "locktime": bigint;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": bigint;
}[];
  "version": bigint;
}, bigint>>,
    parseWtx: {"name":"parse-wtx","access":"read_only","args":[{"name":"tx","type":{"buffer":{"length":4096}}},{"name":"calculate-txid","type":"bool"}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":"uint128"}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":"uint128"}]},"length":8}}},{"name":"locktime","type":"uint128"},{"name":"outs","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]},"length":8}}},{"name":"segwit-marker","type":"uint128"},{"name":"segwit-version","type":"uint128"},{"name":"txid","type":{"optional":{"buffer":{"length":32}}}},{"name":"version","type":"uint128"},{"name":"witnesses","type":{"list":{"type":{"list":{"type":{"buffer":{"length":128}},"length":8}},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[tx: TypedAbiArg<Uint8Array, "tx">, calculateTxid: TypedAbiArg<boolean, "calculateTxid">], Response<{
  "ins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": bigint;
};
  "scriptSig": Uint8Array;
  "sequence": bigint;
}[];
  "locktime": bigint;
  "outs": {
  "scriptPubKey": Uint8Array;
  "value": bigint;
}[];
  "segwitMarker": bigint;
  "segwitVersion": bigint;
  "txid": Uint8Array | null;
  "version": bigint;
  "witnesses": Uint8Array[][];
}, bigint>>,
    readHashslice: {"name":"read-hashslice","access":"read_only","args":[{"name":"old-ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"hashslice","type":{"buffer":{"length":32}}}]},"error":"uint128"}}}} as TypedAbiFunction<[oldCtx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "oldCtx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "hashslice": Uint8Array;
}, bigint>>,
    readNextItem: {"name":"read-next-item","access":"read_only","args":[{"name":"ignored","type":"bool"},{"name":"result","type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"items","type":{"list":{"type":{"buffer":{"length":128}},"length":8}}}]},"error":"uint128"}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"items","type":{"list":{"type":{"buffer":{"length":128}},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ignored: TypedAbiArg<boolean, "ignored">, result: TypedAbiArg<Response<{
  "ctx": {
  "index": number | bigint;
  "txbuff": Uint8Array;
};
  "items": Uint8Array[];
}, number | bigint>, "result">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "items": Uint8Array[];
}, bigint>>,
    readNextTxin: {"name":"read-next-txin","access":"read_only","args":[{"name":"ignored","type":"bool"},{"name":"result","type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"remaining","type":"uint128"},{"name":"txins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":"uint128"}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":"uint128"}]},"length":8}}}]},"error":"uint128"}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"remaining","type":"uint128"},{"name":"txins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":"uint128"}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":"uint128"}]},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ignored: TypedAbiArg<boolean, "ignored">, result: TypedAbiArg<Response<{
  "ctx": {
  "index": number | bigint;
  "txbuff": Uint8Array;
};
  "remaining": number | bigint;
  "txins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": number | bigint;
};
  "scriptSig": Uint8Array;
  "sequence": number | bigint;
}[];
}, number | bigint>, "result">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "remaining": bigint;
  "txins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": bigint;
};
  "scriptSig": Uint8Array;
  "sequence": bigint;
}[];
}, bigint>>,
    readNextTxout: {"name":"read-next-txout","access":"read_only","args":[{"name":"ignored","type":"bool"},{"name":"result","type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"txouts","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]},"length":8}}}]},"error":"uint128"}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"txouts","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ignored: TypedAbiArg<boolean, "ignored">, result: TypedAbiArg<Response<{
  "ctx": {
  "index": number | bigint;
  "txbuff": Uint8Array;
};
  "txouts": {
  "scriptPubKey": Uint8Array;
  "value": number | bigint;
}[];
}, number | bigint>, "result">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "txouts": {
  "scriptPubKey": Uint8Array;
  "value": bigint;
}[];
}, bigint>>,
    readNextWitness: {"name":"read-next-witness","access":"read_only","args":[{"name":"ignored","type":"bool"},{"name":"result","type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"witnesses","type":{"list":{"type":{"list":{"type":{"buffer":{"length":128}},"length":8}},"length":8}}}]},"error":"uint128"}}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"witnesses","type":{"list":{"type":{"list":{"type":{"buffer":{"length":128}},"length":8}},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ignored: TypedAbiArg<boolean, "ignored">, result: TypedAbiArg<Response<{
  "ctx": {
  "index": number | bigint;
  "txbuff": Uint8Array;
};
  "witnesses": Uint8Array[][];
}, number | bigint>, "result">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "witnesses": Uint8Array[][];
}, bigint>>,
    readTxins: {"name":"read-txins","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"remaining","type":"uint128"},{"name":"txins","type":{"list":{"type":{"tuple":[{"name":"outpoint","type":{"tuple":[{"name":"hash","type":{"buffer":{"length":32}}},{"name":"index","type":"uint128"}]}},{"name":"scriptSig","type":{"buffer":{"length":256}}},{"name":"sequence","type":"uint128"}]},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "remaining": bigint;
  "txins": {
  "outpoint": {
  "hash": Uint8Array;
  "index": bigint;
};
  "scriptSig": Uint8Array;
  "sequence": bigint;
}[];
}, bigint>>,
    readTxouts: {"name":"read-txouts","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"txouts","type":{"list":{"type":{"tuple":[{"name":"scriptPubKey","type":{"buffer":{"length":128}}},{"name":"value","type":"uint128"}]},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "txouts": {
  "scriptPubKey": Uint8Array;
  "value": bigint;
}[];
}, bigint>>,
    readUint16: {"name":"read-uint16","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"uint16","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "uint16": bigint;
}, bigint>>,
    readUint32: {"name":"read-uint32","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"uint32","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "uint32": bigint;
}, bigint>>,
    readUint64: {"name":"read-uint64","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"uint64","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "uint64": bigint;
}, bigint>>,
    readUint8: {"name":"read-uint8","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"uint8","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "uint8": bigint;
}, bigint>>,
    readVarint: {"name":"read-varint","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"varint","type":"uint128"}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "varint": bigint;
}, bigint>>,
    readVarslice: {"name":"read-varslice","access":"read_only","args":[{"name":"old-ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"varslice","type":{"buffer":{"length":4096}}}]},"error":"uint128"}}}} as TypedAbiFunction<[oldCtx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "oldCtx">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "varslice": Uint8Array;
}, bigint>>,
    readWitnesses: {"name":"read-witnesses","access":"read_only","args":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"num-txins","type":"uint128"}],"outputs":{"type":{"response":{"ok":{"tuple":[{"name":"ctx","type":{"tuple":[{"name":"index","type":"uint128"},{"name":"txbuff","type":{"buffer":{"length":4096}}}]}},{"name":"witnesses","type":{"list":{"type":{"list":{"type":{"buffer":{"length":128}},"length":8}},"length":8}}}]},"error":"uint128"}}}} as TypedAbiFunction<[ctx: TypedAbiArg<{
  "index": number | bigint;
  "txbuff": Uint8Array;
}, "ctx">, numTxins: TypedAbiArg<number | bigint, "numTxins">], Response<{
  "ctx": {
  "index": bigint;
  "txbuff": Uint8Array;
};
  "witnesses": Uint8Array[][];
}, bigint>>,
    reverseBuff32: {"name":"reverse-buff32","access":"read_only","args":[{"name":"input","type":{"buffer":{"length":32}}}],"outputs":{"type":{"buffer":{"length":32}}}} as TypedAbiFunction<[input: TypedAbiArg<Uint8Array, "input">], Uint8Array>,
    verifyBlockHeader: {"name":"verify-block-header","access":"read_only","args":[{"name":"headerbuff","type":{"buffer":{"length":80}}},{"name":"expected-block-height","type":"uint128"}],"outputs":{"type":"bool"}} as TypedAbiFunction<[headerbuff: TypedAbiArg<Uint8Array, "headerbuff">, expectedBlockHeight: TypedAbiArg<number | bigint, "expectedBlockHeight">], boolean>,
    verifyMerkleProof: {"name":"verify-merkle-proof","access":"read_only","args":[{"name":"reversed-txid","type":{"buffer":{"length":32}}},{"name":"merkle-root","type":{"buffer":{"length":32}}},{"name":"proof","type":{"tuple":[{"name":"hashes","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"tree-depth","type":"uint128"},{"name":"tx-index","type":"uint128"}]}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[reversedTxid: TypedAbiArg<Uint8Array, "reversedTxid">, merkleRoot: TypedAbiArg<Uint8Array, "merkleRoot">, proof: TypedAbiArg<{
  "hashes": Uint8Array[];
  "treeDepth": number | bigint;
  "txIndex": number | bigint;
}, "proof">], Response<boolean, bigint>>,
    wasSegwitTxMinedCompact: {"name":"was-segwit-tx-mined-compact","access":"read_only","args":[{"name":"height","type":"uint128"},{"name":"wtx","type":{"buffer":{"length":4096}}},{"name":"header","type":{"buffer":{"length":80}}},{"name":"tx-index","type":"uint128"},{"name":"tree-depth","type":"uint128"},{"name":"wproof","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"witness-merkle-root","type":{"buffer":{"length":32}}},{"name":"witness-reserved-value","type":{"buffer":{"length":32}}},{"name":"ctx","type":{"buffer":{"length":1024}}},{"name":"cproof","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}}],"outputs":{"type":{"response":{"ok":{"buffer":{"length":32}},"error":"uint128"}}}} as TypedAbiFunction<[height: TypedAbiArg<number | bigint, "height">, wtx: TypedAbiArg<Uint8Array, "wtx">, header: TypedAbiArg<Uint8Array, "header">, txIndex: TypedAbiArg<number | bigint, "txIndex">, treeDepth: TypedAbiArg<number | bigint, "treeDepth">, wproof: TypedAbiArg<Uint8Array[], "wproof">, witnessMerkleRoot: TypedAbiArg<Uint8Array, "witnessMerkleRoot">, witnessReservedValue: TypedAbiArg<Uint8Array, "witnessReservedValue">, ctx: TypedAbiArg<Uint8Array, "ctx">, cproof: TypedAbiArg<Uint8Array[], "cproof">], Response<Uint8Array, bigint>>,
    wasTxMinedCompact: {"name":"was-tx-mined-compact","access":"read_only","args":[{"name":"height","type":"uint128"},{"name":"tx","type":{"buffer":{"length":4096}}},{"name":"header","type":{"buffer":{"length":80}}},{"name":"proof","type":{"tuple":[{"name":"hashes","type":{"list":{"type":{"buffer":{"length":32}},"length":14}}},{"name":"tree-depth","type":"uint128"},{"name":"tx-index","type":"uint128"}]}}],"outputs":{"type":{"response":{"ok":{"buffer":{"length":32}},"error":"uint128"}}}} as TypedAbiFunction<[height: TypedAbiArg<number | bigint, "height">, tx: TypedAbiArg<Uint8Array, "tx">, header: TypedAbiArg<Uint8Array, "header">, proof: TypedAbiArg<{
  "hashes": Uint8Array[];
  "treeDepth": number | bigint;
  "txIndex": number | bigint;
}, "proof">], Response<Uint8Array, bigint>>
  },
  "maps": {
    
  },
  "variables": {
    ERR_BAD_HEADER: {
  name: 'ERR-BAD-HEADER',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_HEADER_HEIGHT_MISMATCH: {
  name: 'ERR-HEADER-HEIGHT-MISMATCH',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_INVALID_COMMITMENT: {
  name: 'ERR-INVALID-COMMITMENT',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_INVALID_MERKLE_PROOF: {
  name: 'ERR-INVALID-MERKLE-PROOF',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_LEFTOVER_DATA: {
  name: 'ERR-LEFTOVER-DATA',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_NOT_SEGWIT_TRANSACTION: {
  name: 'ERR-NOT-SEGWIT-TRANSACTION',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_OUT_OF_BOUNDS: {
  name: 'ERR-OUT-OF-BOUNDS',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_PROOF_TOO_SHORT: {
  name: 'ERR-PROOF-TOO-SHORT',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_TOO_MANY_TXINS: {
  name: 'ERR-TOO-MANY-TXINS',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_TOO_MANY_TXOUTS: {
  name: 'ERR-TOO-MANY-TXOUTS',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_TOO_MANY_WITNESSES: {
  name: 'ERR-TOO-MANY-WITNESSES',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_VARSLICE_TOO_LONG: {
  name: 'ERR-VARSLICE-TOO-LONG',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_WITNESS_TX_NOT_IN_COMMITMENT: {
  name: 'ERR-WITNESS-TX-NOT-IN-COMMITMENT',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch24","clarity_version":"Clarity2",
  contractName: 'clarity-bitcoin-lib-v5',
  },
sbtcBootstrapSigners: {
  "functions": {
    signerKeyLengthCheck: {"name":"signer-key-length-check","access":"private","args":[{"name":"current-key","type":{"buffer":{"length":33}}},{"name":"helper-response","type":{"response":{"ok":"uint128","error":"uint128"}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[currentKey: TypedAbiArg<Uint8Array, "currentKey">, helperResponse: TypedAbiArg<Response<number | bigint, number | bigint>, "helperResponse">], Response<bigint, bigint>>,
    rotateKeysWrapper: {"name":"rotate-keys-wrapper","access":"public","args":[{"name":"new-keys","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}},{"name":"new-aggregate-pubkey","type":{"buffer":{"length":33}}},{"name":"new-signature-threshold","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[newKeys: TypedAbiArg<Uint8Array[], "newKeys">, newAggregatePubkey: TypedAbiArg<Uint8Array, "newAggregatePubkey">, newSignatureThreshold: TypedAbiArg<number | bigint, "newSignatureThreshold">], Response<boolean, bigint>>,
    updateProtocolContractWrapper: {"name":"update-protocol-contract-wrapper","access":"public","args":[{"name":"contract-type","type":{"buffer":{"length":1}}},{"name":"contract-address","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[contractType: TypedAbiArg<Uint8Array, "contractType">, contractAddress: TypedAbiArg<string, "contractAddress">], Response<boolean, bigint>>,
    bytesLen: {"name":"bytes-len","access":"read_only","args":[{"name":"bytes","type":{"buffer":{"length":33}}}],"outputs":{"type":{"buffer":{"length":1}}}} as TypedAbiFunction<[bytes: TypedAbiArg<Uint8Array, "bytes">], Uint8Array>,
    concatPubkeysFold: {"name":"concat-pubkeys-fold","access":"read_only","args":[{"name":"pubkey","type":{"buffer":{"length":33}}},{"name":"iterator","type":{"buffer":{"length":4352}}}],"outputs":{"type":{"buffer":{"length":4352}}}} as TypedAbiFunction<[pubkey: TypedAbiArg<Uint8Array, "pubkey">, iterator: TypedAbiArg<Uint8Array, "iterator">], Uint8Array>,
    pubkeysToBytes: {"name":"pubkeys-to-bytes","access":"read_only","args":[{"name":"pubkeys","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}}],"outputs":{"type":{"buffer":{"length":4352}}}} as TypedAbiFunction<[pubkeys: TypedAbiArg<Uint8Array[], "pubkeys">], Uint8Array>,
    pubkeysToHash: {"name":"pubkeys-to-hash","access":"read_only","args":[{"name":"pubkeys","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}},{"name":"m","type":"uint128"}],"outputs":{"type":{"buffer":{"length":20}}}} as TypedAbiFunction<[pubkeys: TypedAbiArg<Uint8Array[], "pubkeys">, m: TypedAbiArg<number | bigint, "m">], Uint8Array>,
    pubkeysToPrincipal: {"name":"pubkeys-to-principal","access":"read_only","args":[{"name":"pubkeys","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}},{"name":"m","type":"uint128"}],"outputs":{"type":"principal"}} as TypedAbiFunction<[pubkeys: TypedAbiArg<Uint8Array[], "pubkeys">, m: TypedAbiArg<number | bigint, "m">], string>,
    pubkeysToSpendScript: {"name":"pubkeys-to-spend-script","access":"read_only","args":[{"name":"pubkeys","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}},{"name":"m","type":"uint128"}],"outputs":{"type":{"buffer":{"length":4355}}}} as TypedAbiFunction<[pubkeys: TypedAbiArg<Uint8Array[], "pubkeys">, m: TypedAbiArg<number | bigint, "m">], Uint8Array>,
    uintToByte: {"name":"uint-to-byte","access":"read_only","args":[{"name":"n","type":"uint128"}],"outputs":{"type":{"buffer":{"length":1}}}} as TypedAbiFunction<[n: TypedAbiArg<number | bigint, "n">], Uint8Array>
  },
  "maps": {
    
  },
  "variables": {
    BUFF_TO_BYTE: {
  name: 'BUFF_TO_BYTE',
  type: {
    list: {
      type: {
        buffer: {
          length: 1
        }
      },
      length: 256
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array[]>,
    ERR_INVALID_CALLER: {
  name: 'ERR_INVALID_CALLER',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_KEY_SIZE: {
  name: 'ERR_KEY_SIZE',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_KEY_SIZE_PREFIX: {
  name: 'ERR_KEY_SIZE_PREFIX',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_SIGNATURE_THRESHOLD: {
  name: 'ERR_SIGNATURE_THRESHOLD',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    keySize: {
  name: 'key-size',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'sbtc-bootstrap-signers',
  },
sbtcDeposit: {
  "functions": {
    completeIndividualDepositsHelper: {"name":"complete-individual-deposits-helper","access":"private","args":[{"name":"deposit","type":{"tuple":[{"name":"amount","type":"uint128"},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"sweep-txid","type":{"buffer":{"length":32}}},{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"}]}},{"name":"helper-response","type":{"response":{"ok":"uint128","error":"uint128"}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[deposit: TypedAbiArg<{
  "amount": number | bigint;
  "burnHash": Uint8Array;
  "burnHeight": number | bigint;
  "recipient": string;
  "sweepTxid": Uint8Array;
  "txid": Uint8Array;
  "voutIndex": number | bigint;
}, "deposit">, helperResponse: TypedAbiArg<Response<number | bigint, number | bigint>, "helperResponse">], Response<bigint, bigint>>,
    completeDepositWrapper: {"name":"complete-deposit-wrapper","access":"public","args":[{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"},{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[txid: TypedAbiArg<Uint8Array, "txid">, voutIndex: TypedAbiArg<number | bigint, "voutIndex">, amount: TypedAbiArg<number | bigint, "amount">, recipient: TypedAbiArg<string, "recipient">, burnHash: TypedAbiArg<Uint8Array, "burnHash">, burnHeight: TypedAbiArg<number | bigint, "burnHeight">, sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">], Response<boolean, bigint>>,
    completeDepositsWrapper: {"name":"complete-deposits-wrapper","access":"public","args":[{"name":"deposits","type":{"list":{"type":{"tuple":[{"name":"amount","type":"uint128"},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"sweep-txid","type":{"buffer":{"length":32}}},{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"}]},"length":500}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[deposits: TypedAbiArg<{
  "amount": number | bigint;
  "burnHash": Uint8Array;
  "burnHeight": number | bigint;
  "recipient": string;
  "sweepTxid": Uint8Array;
  "txid": Uint8Array;
  "voutIndex": number | bigint;
}[], "deposits">], Response<bigint, bigint>>,
    getBurnHeader: {"name":"get-burn-header","access":"read_only","args":[{"name":"height","type":"uint128"}],"outputs":{"type":{"optional":{"buffer":{"length":32}}}}} as TypedAbiFunction<[height: TypedAbiArg<number | bigint, "height">], Uint8Array | null>
  },
  "maps": {
    
  },
  "variables": {
    ERR_DEPOSIT: {
  name: 'ERR_DEPOSIT',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_DEPOSIT_INDEX_PREFIX: {
  name: 'ERR_DEPOSIT_INDEX_PREFIX',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_DEPOSIT_REPLAY: {
  name: 'ERR_DEPOSIT_REPLAY',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_BURN_HASH: {
  name: 'ERR_INVALID_BURN_HASH',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_CALLER: {
  name: 'ERR_INVALID_CALLER',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_LOWER_THAN_DUST: {
  name: 'ERR_LOWER_THAN_DUST',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_TXID_LEN: {
  name: 'ERR_TXID_LEN',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    depositRole: {
  name: 'deposit-role',
  type: {
    buffer: {
      length: 1
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array>,
    dustLimit: {
  name: 'dust-limit',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    txidLength: {
  name: 'txid-length',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'sbtc-deposit',
  },
sbtcRegistry: {
  "functions": {
    incrementLastWithdrawalRequestId: {"name":"increment-last-withdrawal-request-id","access":"private","args":[],"outputs":{"type":"uint128"}} as TypedAbiFunction<[], bigint>,
    completeDeposit: {"name":"complete-deposit","access":"public","args":[{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"},{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[txid: TypedAbiArg<Uint8Array, "txid">, voutIndex: TypedAbiArg<number | bigint, "voutIndex">, amount: TypedAbiArg<number | bigint, "amount">, recipient: TypedAbiArg<string, "recipient">, burnHash: TypedAbiArg<Uint8Array, "burnHash">, burnHeight: TypedAbiArg<number | bigint, "burnHeight">, sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">], Response<boolean, bigint>>,
    completeWithdrawalAccept: {"name":"complete-withdrawal-accept","access":"public","args":[{"name":"request-id","type":"uint128"},{"name":"bitcoin-txid","type":{"buffer":{"length":32}}},{"name":"output-index","type":"uint128"},{"name":"signer-bitmap","type":"uint128"},{"name":"fee","type":"uint128"},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[requestId: TypedAbiArg<number | bigint, "requestId">, bitcoinTxid: TypedAbiArg<Uint8Array, "bitcoinTxid">, outputIndex: TypedAbiArg<number | bigint, "outputIndex">, signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">, fee: TypedAbiArg<number | bigint, "fee">, burnHash: TypedAbiArg<Uint8Array, "burnHash">, burnHeight: TypedAbiArg<number | bigint, "burnHeight">, sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">], Response<boolean, bigint>>,
    completeWithdrawalReject: {"name":"complete-withdrawal-reject","access":"public","args":[{"name":"request-id","type":"uint128"},{"name":"signer-bitmap","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[requestId: TypedAbiArg<number | bigint, "requestId">, signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">], Response<boolean, bigint>>,
    createWithdrawalRequest: {"name":"create-withdrawal-request","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"max-fee","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":{"tuple":[{"name":"hashbytes","type":{"buffer":{"length":32}}},{"name":"version","type":{"buffer":{"length":1}}}]}},{"name":"height","type":"uint128"}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, maxFee: TypedAbiArg<number | bigint, "maxFee">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<{
  "hashbytes": Uint8Array;
  "version": Uint8Array;
}, "recipient">, height: TypedAbiArg<number | bigint, "height">], Response<bigint, bigint>>,
    rotateKeys: {"name":"rotate-keys","access":"public","args":[{"name":"new-keys","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}},{"name":"new-address","type":"principal"},{"name":"new-aggregate-pubkey","type":{"buffer":{"length":33}}},{"name":"new-signature-threshold","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[newKeys: TypedAbiArg<Uint8Array[], "newKeys">, newAddress: TypedAbiArg<string, "newAddress">, newAggregatePubkey: TypedAbiArg<Uint8Array, "newAggregatePubkey">, newSignatureThreshold: TypedAbiArg<number | bigint, "newSignatureThreshold">], Response<boolean, bigint>>,
    updateProtocolContract: {"name":"update-protocol-contract","access":"public","args":[{"name":"contract-type","type":{"buffer":{"length":1}}},{"name":"new-contract","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[contractType: TypedAbiArg<Uint8Array, "contractType">, newContract: TypedAbiArg<string, "newContract">], Response<boolean, bigint>>,
    getActiveProtocol: {"name":"get-active-protocol","access":"read_only","args":[{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"optional":"principal"}}} as TypedAbiFunction<[contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], string | null>,
    getCompletedDeposit: {"name":"get-completed-deposit","access":"read_only","args":[{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"}],"outputs":{"type":{"optional":{"tuple":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"sweep-burn-hash","type":{"buffer":{"length":32}}},{"name":"sweep-burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}]}}}} as TypedAbiFunction<[txid: TypedAbiArg<Uint8Array, "txid">, voutIndex: TypedAbiArg<number | bigint, "voutIndex">], {
  "amount": bigint;
  "recipient": string;
  "sweepBurnHash": Uint8Array;
  "sweepBurnHeight": bigint;
  "sweepTxid": Uint8Array;
} | null>,
    getCompletedWithdrawalSweepData: {"name":"get-completed-withdrawal-sweep-data","access":"read_only","args":[{"name":"id","type":"uint128"}],"outputs":{"type":{"optional":{"tuple":[{"name":"sweep-burn-hash","type":{"buffer":{"length":32}}},{"name":"sweep-burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}]}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">], {
  "sweepBurnHash": Uint8Array;
  "sweepBurnHeight": bigint;
  "sweepTxid": Uint8Array;
} | null>,
    getCurrentAggregatePubkey: {"name":"get-current-aggregate-pubkey","access":"read_only","args":[],"outputs":{"type":{"buffer":{"length":33}}}} as TypedAbiFunction<[], Uint8Array>,
    getCurrentSignerData: {"name":"get-current-signer-data","access":"read_only","args":[],"outputs":{"type":{"tuple":[{"name":"current-aggregate-pubkey","type":{"buffer":{"length":33}}},{"name":"current-signature-threshold","type":"uint128"},{"name":"current-signer-principal","type":"principal"},{"name":"current-signer-set","type":{"list":{"type":{"buffer":{"length":33}},"length":128}}}]}}} as TypedAbiFunction<[], {
  "currentAggregatePubkey": Uint8Array;
  "currentSignatureThreshold": bigint;
  "currentSignerPrincipal": string;
  "currentSignerSet": Uint8Array[];
}>,
    getCurrentSignerPrincipal: {"name":"get-current-signer-principal","access":"read_only","args":[],"outputs":{"type":"principal"}} as TypedAbiFunction<[], string>,
    getCurrentSignerSet: {"name":"get-current-signer-set","access":"read_only","args":[],"outputs":{"type":{"list":{"type":{"buffer":{"length":33}},"length":128}}}} as TypedAbiFunction<[], Uint8Array[]>,
    getDepositStatus: {"name":"get-deposit-status","access":"read_only","args":[{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"}],"outputs":{"type":{"optional":"bool"}}} as TypedAbiFunction<[txid: TypedAbiArg<Uint8Array, "txid">, voutIndex: TypedAbiArg<number | bigint, "voutIndex">], boolean | null>,
    getWithdrawalRequest: {"name":"get-withdrawal-request","access":"read_only","args":[{"name":"id","type":"uint128"}],"outputs":{"type":{"optional":{"tuple":[{"name":"amount","type":"uint128"},{"name":"block-height","type":"uint128"},{"name":"max-fee","type":"uint128"},{"name":"recipient","type":{"tuple":[{"name":"hashbytes","type":{"buffer":{"length":32}}},{"name":"version","type":{"buffer":{"length":1}}}]}},{"name":"sender","type":"principal"},{"name":"status","type":{"optional":"bool"}}]}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">], {
  "amount": bigint;
  "blockHeight": bigint;
  "maxFee": bigint;
  "recipient": {
  "hashbytes": Uint8Array;
  "version": Uint8Array;
};
  "sender": string;
  "status": boolean | null;
} | null>,
    isProtocolCaller: {"name":"is-protocol-caller","access":"read_only","args":[{"name":"contract-flag","type":{"buffer":{"length":1}}},{"name":"contract","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[contractFlag: TypedAbiArg<Uint8Array, "contractFlag">, contract: TypedAbiArg<string, "contract">], Response<boolean, bigint>>
  },
  "maps": {
    activeProtocolContracts: {"name":"active-protocol-contracts","key":{"buffer":{"length":1}},"value":"principal"} as TypedAbiMap<Uint8Array, string>,
    activeProtocolRoles: {"name":"active-protocol-roles","key":"principal","value":{"buffer":{"length":1}}} as TypedAbiMap<string, Uint8Array>,
    aggregatePubkeys: {"name":"aggregate-pubkeys","key":{"buffer":{"length":33}},"value":"bool"} as TypedAbiMap<Uint8Array, boolean>,
    completedDeposits: {"name":"completed-deposits","key":{"tuple":[{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"}]},"value":{"tuple":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"sweep-burn-hash","type":{"buffer":{"length":32}}},{"name":"sweep-burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}]}} as TypedAbiMap<{
  "txid": Uint8Array;
  "voutIndex": number | bigint;
}, {
  "amount": bigint;
  "recipient": string;
  "sweepBurnHash": Uint8Array;
  "sweepBurnHeight": bigint;
  "sweepTxid": Uint8Array;
}>,
    completedWithdrawalSweep: {"name":"completed-withdrawal-sweep","key":"uint128","value":{"tuple":[{"name":"sweep-burn-hash","type":{"buffer":{"length":32}}},{"name":"sweep-burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}]}} as TypedAbiMap<number | bigint, {
  "sweepBurnHash": Uint8Array;
  "sweepBurnHeight": bigint;
  "sweepTxid": Uint8Array;
}>,
    depositStatus: {"name":"deposit-status","key":{"tuple":[{"name":"txid","type":{"buffer":{"length":32}}},{"name":"vout-index","type":"uint128"}]},"value":"bool"} as TypedAbiMap<{
  "txid": Uint8Array;
  "voutIndex": number | bigint;
}, boolean>,
    withdrawalRequests: {"name":"withdrawal-requests","key":"uint128","value":{"tuple":[{"name":"amount","type":"uint128"},{"name":"block-height","type":"uint128"},{"name":"max-fee","type":"uint128"},{"name":"recipient","type":{"tuple":[{"name":"hashbytes","type":{"buffer":{"length":32}}},{"name":"version","type":{"buffer":{"length":1}}}]}},{"name":"sender","type":"principal"}]}} as TypedAbiMap<number | bigint, {
  "amount": bigint;
  "blockHeight": bigint;
  "maxFee": bigint;
  "recipient": {
  "hashbytes": Uint8Array;
  "version": Uint8Array;
};
  "sender": string;
}>,
    withdrawalStatus: {"name":"withdrawal-status","key":"uint128","value":"bool"} as TypedAbiMap<number | bigint, boolean>
  },
  "variables": {
    ERR_AGG_PUBKEY_REPLAY: {
  name: 'ERR_AGG_PUBKEY_REPLAY',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_REQUEST_ID: {
  name: 'ERR_INVALID_REQUEST_ID',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_UNAUTHORIZED: {
  name: 'ERR_UNAUTHORIZED',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    depositRole: {
  name: 'deposit-role',
  type: {
    buffer: {
      length: 1
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array>,
    governanceRole: {
  name: 'governance-role',
  type: {
    buffer: {
      length: 1
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array>,
    withdrawalRole: {
  name: 'withdrawal-role',
  type: {
    buffer: {
      length: 1
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array>,
    currentAggregatePubkey: {
  name: 'current-aggregate-pubkey',
  type: {
    buffer: {
      length: 33
    }
  },
  access: 'variable'
} as TypedAbiVariable<Uint8Array>,
    currentSignatureThreshold: {
  name: 'current-signature-threshold',
  type: 'uint128',
  access: 'variable'
} as TypedAbiVariable<bigint>,
    currentSignerPrincipal: {
  name: 'current-signer-principal',
  type: 'principal',
  access: 'variable'
} as TypedAbiVariable<string>,
    currentSignerSet: {
  name: 'current-signer-set',
  type: {
    list: {
      type: {
        buffer: {
          length: 33
        }
      },
      length: 128
    }
  },
  access: 'variable'
} as TypedAbiVariable<Uint8Array[]>,
    lastWithdrawalRequestId: {
  name: 'last-withdrawal-request-id',
  type: 'uint128',
  access: 'variable'
} as TypedAbiVariable<bigint>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'sbtc-registry',
  },
sbtcToken: {
  "functions": {
    protocolMintManyIter: {"name":"protocol-mint-many-iter","access":"private","args":[{"name":"item","type":{"tuple":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"}]}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[item: TypedAbiArg<{
  "amount": number | bigint;
  "recipient": string;
}, "item">], Response<boolean, bigint>>,
    transferManyIter: {"name":"transfer-many-iter","access":"private","args":[{"name":"individual-transfer","type":{"tuple":[{"name":"amount","type":"uint128"},{"name":"memo","type":{"optional":{"buffer":{"length":34}}}},{"name":"sender","type":"principal"},{"name":"to","type":"principal"}]}},{"name":"result","type":{"response":{"ok":"uint128","error":"uint128"}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[individualTransfer: TypedAbiArg<{
  "amount": number | bigint;
  "memo": Uint8Array | null;
  "sender": string;
  "to": string;
}, "individualTransfer">, result: TypedAbiArg<Response<number | bigint, number | bigint>, "result">], Response<bigint, bigint>>,
    protocolBurn: {"name":"protocol-burn","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"owner","type":"principal"},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, owner: TypedAbiArg<string, "owner">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolBurnLocked: {"name":"protocol-burn-locked","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"owner","type":"principal"},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, owner: TypedAbiArg<string, "owner">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolLock: {"name":"protocol-lock","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"owner","type":"principal"},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, owner: TypedAbiArg<string, "owner">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolMint: {"name":"protocol-mint","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, recipient: TypedAbiArg<string, "recipient">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolMintMany: {"name":"protocol-mint-many","access":"public","args":[{"name":"recipients","type":{"list":{"type":{"tuple":[{"name":"amount","type":"uint128"},{"name":"recipient","type":"principal"}]},"length":200}}},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":{"list":{"type":{"response":{"ok":"bool","error":"uint128"}},"length":200}},"error":"uint128"}}}} as TypedAbiFunction<[recipients: TypedAbiArg<{
  "amount": number | bigint;
  "recipient": string;
}[], "recipients">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<Response<boolean, bigint>[], bigint>>,
    protocolSetName: {"name":"protocol-set-name","access":"public","args":[{"name":"new-name","type":{"string-ascii":{"length":32}}},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[newName: TypedAbiArg<string, "newName">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolSetSymbol: {"name":"protocol-set-symbol","access":"public","args":[{"name":"new-symbol","type":{"string-ascii":{"length":10}}},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[newSymbol: TypedAbiArg<string, "newSymbol">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolSetTokenUri: {"name":"protocol-set-token-uri","access":"public","args":[{"name":"new-uri","type":{"optional":{"string-utf8":{"length":256}}}},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[newUri: TypedAbiArg<string | null, "newUri">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    protocolUnlock: {"name":"protocol-unlock","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"owner","type":"principal"},{"name":"contract-flag","type":{"buffer":{"length":1}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, owner: TypedAbiArg<string, "owner">, contractFlag: TypedAbiArg<Uint8Array, "contractFlag">], Response<boolean, bigint>>,
    transfer: {"name":"transfer","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":"principal"},{"name":"memo","type":{"optional":{"buffer":{"length":34}}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<string, "recipient">, memo: TypedAbiArg<Uint8Array | null, "memo">], Response<boolean, bigint>>,
    transferMany: {"name":"transfer-many","access":"public","args":[{"name":"recipients","type":{"list":{"type":{"tuple":[{"name":"amount","type":"uint128"},{"name":"memo","type":{"optional":{"buffer":{"length":34}}}},{"name":"sender","type":"principal"},{"name":"to","type":"principal"}]},"length":200}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[recipients: TypedAbiArg<{
  "amount": number | bigint;
  "memo": Uint8Array | null;
  "sender": string;
  "to": string;
}[], "recipients">], Response<bigint, bigint>>,
    getBalance: {"name":"get-balance","access":"read_only","args":[{"name":"who","type":"principal"}],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[who: TypedAbiArg<string, "who">], Response<bigint, null>>,
    getBalanceAvailable: {"name":"get-balance-available","access":"read_only","args":[{"name":"who","type":"principal"}],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[who: TypedAbiArg<string, "who">], Response<bigint, null>>,
    getBalanceLocked: {"name":"get-balance-locked","access":"read_only","args":[{"name":"who","type":"principal"}],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[who: TypedAbiArg<string, "who">], Response<bigint, null>>,
    getDecimals: {"name":"get-decimals","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>,
    getName: {"name":"get-name","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":32}},"error":"none"}}}} as TypedAbiFunction<[], Response<string, null>>,
    getSymbol: {"name":"get-symbol","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":10}},"error":"none"}}}} as TypedAbiFunction<[], Response<string, null>>,
    getTokenUri: {"name":"get-token-uri","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"optional":{"string-utf8":{"length":256}}},"error":"none"}}}} as TypedAbiFunction<[], Response<string | null, null>>,
    getTotalSupply: {"name":"get-total-supply","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>
  },
  "maps": {
    
  },
  "variables": {
    ERR_NOT_OWNER: {
  name: 'ERR_NOT_OWNER',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_TRANSFER_INDEX_PREFIX: {
  name: 'ERR_TRANSFER_INDEX_PREFIX',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    tokenDecimals: {
  name: 'token-decimals',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    tokenName: {
  name: 'token-name',
  type: {
    'string-ascii': {
      length: 32
    }
  },
  access: 'variable'
} as TypedAbiVariable<string>,
    tokenSymbol: {
  name: 'token-symbol',
  type: {
    'string-ascii': {
      length: 10
    }
  },
  access: 'variable'
} as TypedAbiVariable<string>,
    tokenUri: {
  name: 'token-uri',
  type: {
    optional: {
      'string-utf8': {
        length: 256
      }
    }
  },
  access: 'variable'
} as TypedAbiVariable<string | null>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[{"name":"sbtc-token"},{"name":"sbtc-token-locked"}],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'sbtc-token',
  },
sbtcWithdrawal: {
  "functions": {
    completeIndividualWithdrawalHelper: {"name":"complete-individual-withdrawal-helper","access":"private","args":[{"name":"withdrawal","type":{"tuple":[{"name":"bitcoin-txid","type":{"optional":{"buffer":{"length":32}}}},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"fee","type":{"optional":"uint128"}},{"name":"output-index","type":{"optional":"uint128"}},{"name":"request-id","type":"uint128"},{"name":"signer-bitmap","type":"uint128"},{"name":"status","type":"bool"},{"name":"sweep-txid","type":{"optional":{"buffer":{"length":32}}}}]}},{"name":"helper-response","type":{"response":{"ok":"uint128","error":"uint128"}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[withdrawal: TypedAbiArg<{
  "bitcoinTxid": Uint8Array | null;
  "burnHash": Uint8Array;
  "burnHeight": number | bigint;
  "fee": number | bigint | null;
  "outputIndex": number | bigint | null;
  "requestId": number | bigint;
  "signerBitmap": number | bigint;
  "status": boolean;
  "sweepTxid": Uint8Array | null;
}, "withdrawal">, helperResponse: TypedAbiArg<Response<number | bigint, number | bigint>, "helperResponse">], Response<bigint, bigint>>,
    acceptWithdrawalRequest: {"name":"accept-withdrawal-request","access":"public","args":[{"name":"request-id","type":"uint128"},{"name":"bitcoin-txid","type":{"buffer":{"length":32}}},{"name":"signer-bitmap","type":"uint128"},{"name":"output-index","type":"uint128"},{"name":"fee","type":"uint128"},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"sweep-txid","type":{"buffer":{"length":32}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[requestId: TypedAbiArg<number | bigint, "requestId">, bitcoinTxid: TypedAbiArg<Uint8Array, "bitcoinTxid">, signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">, outputIndex: TypedAbiArg<number | bigint, "outputIndex">, fee: TypedAbiArg<number | bigint, "fee">, burnHash: TypedAbiArg<Uint8Array, "burnHash">, burnHeight: TypedAbiArg<number | bigint, "burnHeight">, sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">], Response<boolean, bigint>>,
    completeWithdrawals: {"name":"complete-withdrawals","access":"public","args":[{"name":"withdrawals","type":{"list":{"type":{"tuple":[{"name":"bitcoin-txid","type":{"optional":{"buffer":{"length":32}}}},{"name":"burn-hash","type":{"buffer":{"length":32}}},{"name":"burn-height","type":"uint128"},{"name":"fee","type":{"optional":"uint128"}},{"name":"output-index","type":{"optional":"uint128"}},{"name":"request-id","type":"uint128"},{"name":"signer-bitmap","type":"uint128"},{"name":"status","type":"bool"},{"name":"sweep-txid","type":{"optional":{"buffer":{"length":32}}}}]},"length":600}}}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[withdrawals: TypedAbiArg<{
  "bitcoinTxid": Uint8Array | null;
  "burnHash": Uint8Array;
  "burnHeight": number | bigint;
  "fee": number | bigint | null;
  "outputIndex": number | bigint | null;
  "requestId": number | bigint;
  "signerBitmap": number | bigint;
  "status": boolean;
  "sweepTxid": Uint8Array | null;
}[], "withdrawals">], Response<bigint, bigint>>,
    initiateWithdrawalRequest: {"name":"initiate-withdrawal-request","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"recipient","type":{"tuple":[{"name":"hashbytes","type":{"buffer":{"length":32}}},{"name":"version","type":{"buffer":{"length":1}}}]}},{"name":"max-fee","type":"uint128"}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, recipient: TypedAbiArg<{
  "hashbytes": Uint8Array;
  "version": Uint8Array;
}, "recipient">, maxFee: TypedAbiArg<number | bigint, "maxFee">], Response<bigint, bigint>>,
    rejectWithdrawalRequest: {"name":"reject-withdrawal-request","access":"public","args":[{"name":"request-id","type":"uint128"},{"name":"signer-bitmap","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[requestId: TypedAbiArg<number | bigint, "requestId">, signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">], Response<boolean, bigint>>,
    getBurnHeader: {"name":"get-burn-header","access":"read_only","args":[{"name":"height","type":"uint128"}],"outputs":{"type":{"optional":{"buffer":{"length":32}}}}} as TypedAbiFunction<[height: TypedAbiArg<number | bigint, "height">], Uint8Array | null>,
    validateRecipient: {"name":"validate-recipient","access":"read_only","args":[{"name":"recipient","type":{"tuple":[{"name":"hashbytes","type":{"buffer":{"length":32}}},{"name":"version","type":{"buffer":{"length":1}}}]}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[recipient: TypedAbiArg<{
  "hashbytes": Uint8Array;
  "version": Uint8Array;
}, "recipient">], Response<boolean, bigint>>
  },
  "maps": {
    
  },
  "variables": {
    DUST_LIMIT: {
  name: 'DUST_LIMIT',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    ERR_ALREADY_PROCESSED: {
  name: 'ERR_ALREADY_PROCESSED',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_DUST_LIMIT: {
  name: 'ERR_DUST_LIMIT',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_FEE_TOO_HIGH: {
  name: 'ERR_FEE_TOO_HIGH',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_ADDR_HASHBYTES: {
  name: 'ERR_INVALID_ADDR_HASHBYTES',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_ADDR_VERSION: {
  name: 'ERR_INVALID_ADDR_VERSION',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_BURN_HASH: {
  name: 'ERR_INVALID_BURN_HASH',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_CALLER: {
  name: 'ERR_INVALID_CALLER',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_REQUEST: {
  name: 'ERR_INVALID_REQUEST',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_WITHDRAWAL_INDEX: {
  name: 'ERR_WITHDRAWAL_INDEX',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_WITHDRAWAL_INDEX_PREFIX: {
  name: 'ERR_WITHDRAWAL_INDEX_PREFIX',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    MAX_ADDRESS_VERSION: {
  name: 'MAX_ADDRESS_VERSION',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    mAX_ADDRESS_VERSION_BUFF_20: {
  name: 'MAX_ADDRESS_VERSION_BUFF_20',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    mAX_ADDRESS_VERSION_BUFF_32: {
  name: 'MAX_ADDRESS_VERSION_BUFF_32',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    withdrawRole: {
  name: 'withdraw-role',
  type: {
    buffer: {
      length: 1
    }
  },
  access: 'constant'
} as TypedAbiVariable<Uint8Array>
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'sbtc-withdrawal',
  },
sip010TraitFtStandard: {
  "functions": {
    
  },
  "maps": {
    
  },
  "variables": {
    
  },
  constants: {},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'sip-010-trait-ft-standard',
  }
} as const;

export const accounts = {"deployer":{"address":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM","balance":"100000000000000"},"faucet":{"address":"STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6","balance":"100000000000000"},"wallet_1":{"address":"ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5","balance":"100000000000000"},"wallet_2":{"address":"ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG","balance":"100000000000000"},"wallet_3":{"address":"ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC","balance":"100000000000000"},"wallet_4":{"address":"ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND","balance":"100000000000000"},"wallet_5":{"address":"ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB","balance":"100000000000000"},"wallet_6":{"address":"ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0","balance":"100000000000000"},"wallet_7":{"address":"ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ","balance":"100000000000000"},"wallet_8":{"address":"ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP","balance":"100000000000000"}} as const;

export const identifiers = {"btcSbtcSwap":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap","clarityBitcoinHelper":"SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-helper","clarityBitcoinHelperWtx":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-helper-wtx","clarityBitcoinLibV5":"SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v5","sbtcBootstrapSigners":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-bootstrap-signers","sbtcDeposit":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit","sbtcRegistry":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry","sbtcToken":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token","sbtcWithdrawal":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-withdrawal","sip010TraitFtStandard":"SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard"} as const

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;


export const deployments = {"btcSbtcSwap":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap","testnet":null,"mainnet":null},"clarityBitcoinHelper":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-helper","simnet":"SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-helper","testnet":null,"mainnet":"SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-helper"},"clarityBitcoinHelperWtx":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-helper-wtx","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-helper-wtx","testnet":null,"mainnet":null},"clarityBitcoinLibV5":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-lib-v5","simnet":"SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v5","testnet":null,"mainnet":"SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v5"},"sbtcBootstrapSigners":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-bootstrap-signers","simnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-bootstrap-signers","testnet":null,"mainnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-bootstrap-signers"},"sbtcDeposit":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-deposit","simnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit","testnet":null,"mainnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit"},"sbtcRegistry":{"devnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry","simnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry","testnet":null,"mainnet":null},"sbtcToken":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-token","simnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token","testnet":null,"mainnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token"},"sbtcWithdrawal":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-withdrawal","simnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-withdrawal","testnet":null,"mainnet":"SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-withdrawal"},"sip010TraitFtStandard":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard","simnet":"SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard","testnet":null,"mainnet":"SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard"}} as const;

export const project = {
  contracts,
  deployments,
} as const;
  