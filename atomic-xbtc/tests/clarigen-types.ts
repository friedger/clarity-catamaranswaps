
import type { TypedAbiArg, TypedAbiFunction, TypedAbiMap, TypedAbiVariable, Response } from '@clarigen/core';

export const contracts = {
  wrappedBitcoin: {
  "functions": {
    addPrincipalToRole: {"name":"add-principal-to-role","access":"public","args":[{"name":"role-to-add","type":"uint128"},{"name":"principal-to-add","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[roleToAdd: TypedAbiArg<number | bigint, "roleToAdd">, principalToAdd: TypedAbiArg<string, "principalToAdd">], Response<boolean, bigint>>,
    burnTokens: {"name":"burn-tokens","access":"public","args":[{"name":"burn-amount","type":"uint128"},{"name":"burn-from","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[burnAmount: TypedAbiArg<number | bigint, "burnAmount">, burnFrom: TypedAbiArg<string, "burnFrom">], Response<boolean, bigint>>,
    initialize: {"name":"initialize","access":"public","args":[{"name":"name-to-set","type":{"string-ascii":{"length":32}}},{"name":"symbol-to-set","type":{"string-ascii":{"length":32}}},{"name":"decimals-to-set","type":"uint128"},{"name":"initial-owner","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[nameToSet: TypedAbiArg<string, "nameToSet">, symbolToSet: TypedAbiArg<string, "symbolToSet">, decimalsToSet: TypedAbiArg<number | bigint, "decimalsToSet">, initialOwner: TypedAbiArg<string, "initialOwner">], Response<boolean, bigint>>,
    mintTokens: {"name":"mint-tokens","access":"public","args":[{"name":"mint-amount","type":"uint128"},{"name":"mint-to","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[mintAmount: TypedAbiArg<number | bigint, "mintAmount">, mintTo: TypedAbiArg<string, "mintTo">], Response<boolean, bigint>>,
    removePrincipalFromRole: {"name":"remove-principal-from-role","access":"public","args":[{"name":"role-to-remove","type":"uint128"},{"name":"principal-to-remove","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[roleToRemove: TypedAbiArg<number | bigint, "roleToRemove">, principalToRemove: TypedAbiArg<string, "principalToRemove">], Response<boolean, bigint>>,
    revokeTokens: {"name":"revoke-tokens","access":"public","args":[{"name":"revoke-amount","type":"uint128"},{"name":"revoke-from","type":"principal"},{"name":"revoke-to","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[revokeAmount: TypedAbiArg<number | bigint, "revokeAmount">, revokeFrom: TypedAbiArg<string, "revokeFrom">, revokeTo: TypedAbiArg<string, "revokeTo">], Response<boolean, bigint>>,
    setTokenUri: {"name":"set-token-uri","access":"public","args":[{"name":"updated-uri","type":{"string-utf8":{"length":256}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[updatedUri: TypedAbiArg<string, "updatedUri">], Response<boolean, bigint>>,
    transfer: {"name":"transfer","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":"principal"},{"name":"memo","type":{"optional":{"buffer":{"length":34}}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<string, "recipient">, memo: TypedAbiArg<Uint8Array | null, "memo">], Response<boolean, bigint>>,
    updateBlacklisted: {"name":"update-blacklisted","access":"public","args":[{"name":"principal-to-update","type":"principal"},{"name":"set-blacklisted","type":"bool"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[principalToUpdate: TypedAbiArg<string, "principalToUpdate">, setBlacklisted: TypedAbiArg<boolean, "setBlacklisted">], Response<boolean, bigint>>,
    detectTransferRestriction: {"name":"detect-transfer-restriction","access":"read_only","args":[{"name":"amount","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":"principal"}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<string, "recipient">], Response<bigint, bigint>>,
    getBalance: {"name":"get-balance","access":"read_only","args":[{"name":"owner","type":"principal"}],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[owner: TypedAbiArg<string, "owner">], Response<bigint, null>>,
    getDecimals: {"name":"get-decimals","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>,
    getName: {"name":"get-name","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":32}},"error":"none"}}}} as TypedAbiFunction<[], Response<string, null>>,
    getSymbol: {"name":"get-symbol","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":32}},"error":"none"}}}} as TypedAbiFunction<[], Response<string, null>>,
    getTokenUri: {"name":"get-token-uri","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"optional":{"string-utf8":{"length":256}}},"error":"none"}}}} as TypedAbiFunction<[], Response<string | null, null>>,
    getTotalSupply: {"name":"get-total-supply","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>,
    hasRole: {"name":"has-role","access":"read_only","args":[{"name":"role-to-check","type":"uint128"},{"name":"principal-to-check","type":"principal"}],"outputs":{"type":"bool"}} as TypedAbiFunction<[roleToCheck: TypedAbiArg<number | bigint, "roleToCheck">, principalToCheck: TypedAbiArg<string, "principalToCheck">], boolean>,
    isBlacklisted: {"name":"is-blacklisted","access":"read_only","args":[{"name":"principal-to-check","type":"principal"}],"outputs":{"type":"bool"}} as TypedAbiFunction<[principalToCheck: TypedAbiArg<string, "principalToCheck">], boolean>,
    messageForRestriction: {"name":"message-for-restriction","access":"read_only","args":[{"name":"restriction-code","type":"uint128"}],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":70}},"error":"none"}}}} as TypedAbiFunction<[restrictionCode: TypedAbiArg<number | bigint, "restrictionCode">], Response<string, null>>
  },
  "maps": {
    blacklist: {"name":"blacklist","key":{"tuple":[{"name":"account","type":"principal"}]},"value":{"tuple":[{"name":"blacklisted","type":"bool"}]}} as TypedAbiMap<{
  "account": string;
}, {
  "blacklisted": boolean;
}>,
    roles: {"name":"roles","key":{"tuple":[{"name":"account","type":"principal"},{"name":"role","type":"uint128"}]},"value":{"tuple":[{"name":"allowed","type":"bool"}]}} as TypedAbiMap<{
  "account": string;
  "role": number | bigint;
}, {
  "allowed": boolean;
}>
  },
  "variables": {
    BLACKLISTER_ROLE: {
  name: 'BLACKLISTER_ROLE',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    BURNER_ROLE: {
  name: 'BURNER_ROLE',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    MINTER_ROLE: {
  name: 'MINTER_ROLE',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    OWNER_ROLE: {
  name: 'OWNER_ROLE',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    PERMISSION_DENIED_ERROR: {
  name: 'PERMISSION_DENIED_ERROR',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    RESTRICTION_BLACKLIST: {
  name: 'RESTRICTION_BLACKLIST',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    RESTRICTION_NONE: {
  name: 'RESTRICTION_NONE',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    REVOKER_ROLE: {
  name: 'REVOKER_ROLE',
  type: 'uint128',
  access: 'constant'
} as TypedAbiVariable<bigint>,
    deployerPrincipal: {
  name: 'deployer-principal',
  type: 'principal',
  access: 'variable'
} as TypedAbiVariable<string>,
    isInitialized: {
  name: 'is-initialized',
  type: 'bool',
  access: 'variable'
} as TypedAbiVariable<boolean>,
    tokenDecimals: {
  name: 'token-decimals',
  type: 'uint128',
  access: 'variable'
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
      length: 32
    }
  },
  access: 'variable'
} as TypedAbiVariable<string>,
    uri: {
  name: 'uri',
  type: {
    'string-utf8': {
      length: 256
    }
  },
  access: 'variable'
} as TypedAbiVariable<string>
  },
  constants: {
  BLACKLISTER_ROLE: 4n,
  BURNER_ROLE: 2n,
  MINTER_ROLE: 1n,
  OWNER_ROLE: 0n,
  PERMISSION_DENIED_ERROR: 403n,
  RESTRICTION_BLACKLIST: 5n,
  RESTRICTION_NONE: 0n,
  REVOKER_ROLE: 3n,
  deployerPrincipal: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  isInitialized: false,
  tokenDecimals: 0n,
  tokenName: '',
  tokenSymbol: '',
  uri: ''
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[{"name":"wrapped-bitcoin"}],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'Wrapped-Bitcoin',
  },
fixedFees: {
  "functions": {
    calcFees: {"name":"calc-fees","access":"private","args":[{"name":"xbtc","type":"uint128"}],"outputs":{"type":"uint128"}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">], bigint>,
    isCalledByChargingCtr: {"name":"is-called-by-charging-ctr","access":"private","args":[],"outputs":{"type":"bool"}} as TypedAbiFunction<[], boolean>,
    xbtcTransferTo: {"name":"xbtc-transfer-to","access":"private","args":[{"name":"amount","type":"uint128"},{"name":"to","type":"principal"},{"name":"memo","type":{"buffer":{"length":34}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, to: TypedAbiArg<string, "to">, memo: TypedAbiArg<Uint8Array, "memo">], Response<boolean, bigint>>,
    holdFees: {"name":"hold-fees","access":"public","args":[{"name":"xbtc","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">], Response<boolean, bigint>>,
    payFees: {"name":"pay-fees","access":"public","args":[{"name":"xbtc","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">], Response<boolean, bigint>>,
    releaseFees: {"name":"release-fees","access":"public","args":[{"name":"xbtc","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">], Response<boolean, bigint>>,
    getFees: {"name":"get-fees","access":"read_only","args":[{"name":"xbtc","type":"uint128"}],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">], Response<bigint, null>>
  },
  "maps": {
    
  },
  "variables": {
    ERR_NOT_AUTH: {
  name: 'ERR_NOT_AUTH',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    feeReceiver: {
  name: 'fee-receiver',
  type: 'principal',
  access: 'constant'
} as TypedAbiVariable<string>
  },
  constants: {
  ERR_NOT_AUTH: {
    isOk: false,
    value: 404n
  },
  feeReceiver: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'fixed-fees',
  },
ftTrait: {
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
  contractName: 'ft-trait',
  },
funNft: {
  "functions": {
    mint: {"name":"mint","access":"public","args":[],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[], Response<boolean, bigint>>,
    transfer: {"name":"transfer","access":"public","args":[{"name":"id","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":"principal"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<string, "recipient">], Response<boolean, bigint>>,
    getBalance: {"name":"get-balance","access":"read_only","args":[{"name":"account","type":"principal"}],"outputs":{"type":"uint128"}} as TypedAbiFunction<[account: TypedAbiArg<string, "account">], bigint>,
    getLastTokenId: {"name":"get-last-token-id","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>,
    getOwner: {"name":"get-owner","access":"read_only","args":[{"name":"id","type":"uint128"}],"outputs":{"type":{"response":{"ok":{"optional":"principal"},"error":"none"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">], Response<string | null, null>>,
    getTokenUri: {"name":"get-token-uri","access":"read_only","args":[{"name":"id","type":"uint128"}],"outputs":{"type":{"response":{"ok":{"optional":{"string-ascii":{"length":12}}},"error":"none"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">], Response<string | null, null>>
  },
  "maps": {
    tokenCount: {"name":"token-count","key":"principal","value":"uint128"} as TypedAbiMap<string, bigint>
  },
  "variables": {
    CONTRACT_OWNER: {
  name: 'CONTRACT-OWNER',
  type: 'principal',
  access: 'constant'
} as TypedAbiVariable<string>,
    lastId: {
  name: 'last-id',
  type: 'uint128',
  access: 'variable'
} as TypedAbiVariable<bigint>
  },
  constants: {
  cONTRACTOWNER: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  lastId: 0n
},
  "non_fungible_tokens": [
    {"name":"fun","type":"uint128"}
  ],
  "fungible_tokens":[],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'fun-nft',
  },
funToken: {
  "functions": {
    getTokenUri: {"name":"get-token-uri","access":"public","args":[],"outputs":{"type":{"response":{"ok":{"optional":{"string-utf8":{"length":39}}},"error":"none"}}}} as TypedAbiFunction<[], Response<string | null, null>>,
    mint: {"name":"mint","access":"public","args":[{"name":"amount","type":"uint128"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">], Response<boolean, bigint>>,
    transfer: {"name":"transfer","access":"public","args":[{"name":"amount","type":"uint128"},{"name":"sender","type":"principal"},{"name":"recipient","type":"principal"},{"name":"memo","type":{"optional":{"buffer":{"length":34}}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, sender: TypedAbiArg<string, "sender">, recipient: TypedAbiArg<string, "recipient">, memo: TypedAbiArg<Uint8Array | null, "memo">], Response<boolean, bigint>>,
    getBalance: {"name":"get-balance","access":"read_only","args":[{"name":"owner","type":"principal"}],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[owner: TypedAbiArg<string, "owner">], Response<bigint, null>>,
    getDecimals: {"name":"get-decimals","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>,
    getName: {"name":"get-name","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":9}},"error":"none"}}}} as TypedAbiFunction<[], Response<string, null>>,
    getSymbol: {"name":"get-symbol","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":{"string-ascii":{"length":2}},"error":"none"}}}} as TypedAbiFunction<[], Response<string, null>>,
    getTotalSupply: {"name":"get-total-supply","access":"read_only","args":[],"outputs":{"type":{"response":{"ok":"uint128","error":"none"}}}} as TypedAbiFunction<[], Response<bigint, null>>
  },
  "maps": {
    
  },
  "variables": {
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
    ERR_TX_IGNORED: {
  name: 'ERR_TX_IGNORED',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>
  },
  constants: {
  ERR_NATIVE_FAILURE: {
    isOk: false,
    value: 99n
  },
  ERR_TX_IGNORED: {
    isOk: false,
    value: 6n
  }
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[{"name":"fun-token"}],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'fun-token',
  },
nftTrait: {
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
  contractName: 'nft-trait',
  },
xbtcFtSwap: {
  "functions": {
    xbtcTransferTo: {"name":"xbtc-transfer-to","access":"private","args":[{"name":"amount","type":"uint128"},{"name":"to","type":"principal"},{"name":"memo","type":{"buffer":{"length":34}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, to: TypedAbiArg<string, "to">, memo: TypedAbiArg<Uint8Array, "memo">], Response<boolean, bigint>>,
    cancel: {"name":"cancel","access":"public","args":[{"name":"id","type":"uint128"},{"name":"fees","type":"trait_reference"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, fees: TypedAbiArg<string, "fees">], Response<boolean, bigint>>,
    createSwap: {"name":"create-swap","access":"public","args":[{"name":"xbtc","type":"uint128"},{"name":"amount-sell","type":"uint128"},{"name":"seller","type":{"optional":"principal"}},{"name":"ft-sell","type":"trait_reference"},{"name":"fees","type":"trait_reference"}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">, amountSell: TypedAbiArg<number | bigint, "amountSell">, seller: TypedAbiArg<string | null, "seller">, ftSell: TypedAbiArg<string, "ftSell">, fees: TypedAbiArg<string, "fees">], Response<bigint, bigint>>,
    submitSwap: {"name":"submit-swap","access":"public","args":[{"name":"id","type":"uint128"},{"name":"ft","type":"trait_reference"},{"name":"fees","type":"trait_reference"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, ft: TypedAbiArg<string, "ft">, fees: TypedAbiArg<string, "fees">], Response<boolean, bigint>>
  },
  "maps": {
    swaps: {"name":"swaps","key":"uint128","value":{"tuple":[{"name":"amount-sell","type":"uint128"},{"name":"buyer","type":"principal"},{"name":"fees","type":"principal"},{"name":"ft-sell","type":"principal"},{"name":"open","type":"bool"},{"name":"seller","type":{"optional":"principal"}},{"name":"when","type":"uint128"},{"name":"xbtc","type":"uint128"}]}} as TypedAbiMap<number | bigint, {
  "amountSell": bigint;
  "buyer": string;
  "fees": string;
  "ftSell": string;
  "open": boolean;
  "seller": string | null;
  "when": bigint;
  "xbtc": bigint;
}>
  },
  "variables": {
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
    ERR_INVALID_FEES_TRAIT: {
  name: 'ERR_INVALID_FEES_TRAIT',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_FUNGIBLE_TOKEN: {
  name: 'ERR_INVALID_FUNGIBLE_TOKEN',
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
    ERR_INVALID_RECEIVER: {
  name: 'ERR_INVALID_RECEIVER',
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
    ERR_TOO_EARLY: {
  name: 'ERR_TOO_EARLY',
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
  ERR_ALREADY_DONE: {
    isOk: false,
    value: 7n
  },
  ERR_INVALID_FEES_TRAIT: {
    isOk: false,
    value: 11n
  },
  ERR_INVALID_FUNGIBLE_TOKEN: {
    isOk: false,
    value: 8n
  },
  ERR_INVALID_ID: {
    isOk: false,
    value: 3n
  },
  ERR_INVALID_RECEIVER: {
    isOk: false,
    value: 9n
  },
  ERR_NATIVE_FAILURE: {
    isOk: false,
    value: 99n
  },
  ERR_TOO_EARLY: {
    isOk: false,
    value: 4n
  },
  expiry: 100n,
  nextId: 0n
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'xbtc-ft-swap',
  },
xbtcNftSwap: {
  "functions": {
    xbtcTransferTo: {"name":"xbtc-transfer-to","access":"private","args":[{"name":"amount","type":"uint128"},{"name":"to","type":"principal"},{"name":"memo","type":{"buffer":{"length":34}}}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[amount: TypedAbiArg<number | bigint, "amount">, to: TypedAbiArg<string, "to">, memo: TypedAbiArg<Uint8Array, "memo">], Response<boolean, bigint>>,
    cancel: {"name":"cancel","access":"public","args":[{"name":"id","type":"uint128"},{"name":"nft","type":"trait_reference"},{"name":"fees","type":"trait_reference"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, nft: TypedAbiArg<string, "nft">, fees: TypedAbiArg<string, "fees">], Response<boolean, bigint>>,
    createSwap: {"name":"create-swap","access":"public","args":[{"name":"xbtc","type":"uint128"},{"name":"nft-id","type":"uint128"},{"name":"nft-sender","type":{"optional":"principal"}},{"name":"nft","type":"trait_reference"},{"name":"fees","type":"trait_reference"}],"outputs":{"type":{"response":{"ok":"uint128","error":"uint128"}}}} as TypedAbiFunction<[xbtc: TypedAbiArg<number | bigint, "xbtc">, nftId: TypedAbiArg<number | bigint, "nftId">, nftSender: TypedAbiArg<string | null, "nftSender">, nft: TypedAbiArg<string, "nft">, fees: TypedAbiArg<string, "fees">], Response<bigint, bigint>>,
    submitSwap: {"name":"submit-swap","access":"public","args":[{"name":"id","type":"uint128"},{"name":"nft","type":"trait_reference"},{"name":"fees","type":"trait_reference"}],"outputs":{"type":{"response":{"ok":"bool","error":"uint128"}}}} as TypedAbiFunction<[id: TypedAbiArg<number | bigint, "id">, nft: TypedAbiArg<string, "nft">, fees: TypedAbiArg<string, "fees">], Response<boolean, bigint>>
  },
  "maps": {
    swaps: {"name":"swaps","key":"uint128","value":{"tuple":[{"name":"buyer","type":"principal"},{"name":"fees","type":"principal"},{"name":"nft","type":"principal"},{"name":"nft-id","type":"uint128"},{"name":"nft-sender","type":{"optional":"principal"}},{"name":"open","type":"bool"},{"name":"when","type":"uint128"},{"name":"xbtc","type":"uint128"}]}} as TypedAbiMap<number | bigint, {
  "buyer": string;
  "fees": string;
  "nft": string;
  "nftId": bigint;
  "nftSender": string | null;
  "open": boolean;
  "when": bigint;
  "xbtc": bigint;
}>
  },
  "variables": {
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
    ERR_INVALID_FEES: {
  name: 'ERR_INVALID_FEES',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_FEES_TRAIT: {
  name: 'ERR_INVALID_FEES_TRAIT',
  type: {
    response: {
      ok: 'none',
      error: 'uint128'
    }
  },
  access: 'constant'
} as TypedAbiVariable<Response<null, bigint>>,
    ERR_INVALID_FUNGIBLE_TOKEN: {
  name: 'ERR_INVALID_FUNGIBLE_TOKEN',
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
    ERR_INVALID_RECEIVER: {
  name: 'ERR_INVALID_RECEIVER',
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
    ERR_TOO_EARLY: {
  name: 'ERR_TOO_EARLY',
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
  ERR_ALREADY_DONE: {
    isOk: false,
    value: 7n
  },
  ERR_INVALID_FEES: {
    isOk: false,
    value: 10n
  },
  ERR_INVALID_FEES_TRAIT: {
    isOk: false,
    value: 11n
  },
  ERR_INVALID_FUNGIBLE_TOKEN: {
    isOk: false,
    value: 8n
  },
  ERR_INVALID_ID: {
    isOk: false,
    value: 3n
  },
  ERR_INVALID_RECEIVER: {
    isOk: false,
    value: 9n
  },
  ERR_NATIVE_FAILURE: {
    isOk: false,
    value: 99n
  },
  ERR_TOO_EARLY: {
    isOk: false,
    value: 4n
  },
  expiry: 100n,
  nextId: 0n
},
  "non_fungible_tokens": [
    
  ],
  "fungible_tokens":[],"epoch":"Epoch21","clarity_version":"Clarity1",
  contractName: 'xbtc-nft-swap',
  }
} as const;

export const accounts = {"deployer":{"address":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM","balance":"100000000000000"},"wallet_1":{"address":"ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5","balance":"100000000000000"},"wallet_2":{"address":"ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG","balance":"100000000000000"},"wallet_3":{"address":"ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC","balance":"100000000000000"},"wallet_4":{"address":"ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND","balance":"100000000000000"},"wallet_5":{"address":"ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB","balance":"100000000000000"},"wallet_6":{"address":"ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0","balance":"100000000000000"},"wallet_7":{"address":"ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ","balance":"100000000000000"},"wallet_8":{"address":"ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP","balance":"100000000000000"},"wallet_9":{"address":"STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6","balance":"100000000000000"}} as const;

export const identifiers = {"wrappedBitcoin":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.Wrapped-Bitcoin","fixedFees":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fixed-fees","ftTrait":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ft-trait","funNft":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fun-nft","funToken":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fun-token","nftTrait":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait","xbtcFtSwap":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.xbtc-ft-swap","xbtcNftSwap":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.xbtc-nft-swap"} as const

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;


export const deployments = {"wrappedBitcoin":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.Wrapped-Bitcoin","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.Wrapped-Bitcoin","testnet":null,"mainnet":null},"fixedFees":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fixed-fees","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fixed-fees","testnet":null,"mainnet":null},"ftTrait":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ft-trait","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ft-trait","testnet":null,"mainnet":null},"funNft":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fun-nft","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fun-nft","testnet":null,"mainnet":null},"funToken":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fun-token","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.fun-token","testnet":null,"mainnet":null},"nftTrait":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait","testnet":null,"mainnet":null},"xbtcFtSwap":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.xbtc-ft-swap","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.xbtc-ft-swap","testnet":null,"mainnet":null},"xbtcNftSwap":{"devnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.xbtc-nft-swap","simnet":"ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.xbtc-nft-swap","testnet":null,"mainnet":null}} as const;

export const project = {
  contracts,
  deployments,
} as const;
  