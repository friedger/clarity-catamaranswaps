
import type { TypedAbiArg, TypedAbiFunction, TypedAbiMap, TypedAbiVariable, Response } from '@clarigen/core';

export const contracts = {
  bitcoinHelperWtxV1: {
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
  "fungible_tokens":[],"epoch":"Epoch30","clarity_version":"Clarity3",
  contractName: 'bitcoin-helper-wtx-v1',
  },
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
  }
} as const;

export const accounts = {"deployer":{"address":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM","balance":"100000000000000"},"faucet":{"address":"STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6","balance":"100000000000000"},"wallet_1":{"address":"ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5","balance":"100000000000000"},"wallet_2":{"address":"ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG","balance":"100000000000000"},"wallet_3":{"address":"ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC","balance":"100000000000000"},"wallet_4":{"address":"ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND","balance":"100000000000000"},"wallet_5":{"address":"ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB","balance":"100000000000000"},"wallet_6":{"address":"ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0","balance":"100000000000000"},"wallet_7":{"address":"ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ","balance":"100000000000000"},"wallet_8":{"address":"ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP","balance":"100000000000000"}} as const;

export const identifiers = {"bitcoinHelperWtxV1":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-helper-wtx-v1","btcSbtcSwap":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap"} as const

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;


export const deployments = {"bitcoinHelperWtxV1":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-helper-wtx-v1","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-helper-wtx-v1","testnet":null,"mainnet":null},"btcSbtcSwap":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.btc-sbtc-swap","testnet":"ST3FFRX7C911PZP5RHE148YDVDD9JWVS6FZRA60VS.btc-sbtc-swap","mainnet":null}} as const;

export const project = {
  contracts,
  deployments,
} as const;
  