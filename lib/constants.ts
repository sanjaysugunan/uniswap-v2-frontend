
export interface NetworkContracts {
    factory: `0x${string}`
    router: `0x${string}`
    weth: `0x${string}`

    tokens: {
        tokenA: `0x${string}`
        tokenB: `0x${string}`
        tokenC: `0x${string}`
    }
}

interface ContractsConfig {
    [chainId: number]: NetworkContracts
}

export const contracts: ContractsConfig = {
    // -----------------------
    // Anvil
    // -----------------------
    31337: {
        factory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        router: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        weth: "0x5FbDB2315678afecb367f032d93F642f64180aa3",

        tokens: {
            tokenA: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
            tokenB: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
            tokenC: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
        },
    },

    // -----------------------
    // Sepolia
    // -----------------------
    11155111: {
        factory: "0x96E606463d41DAeFf0246D905013aE0CDC5CCef2",
        router: "0xb15a4579E05Da61E9aDBE77bdD28479E7f6301A3",
        weth: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",

        tokens: {
            tokenA: "0x3fA373A4dD14D51204Ae9fA4a304d27ace75618b",
            tokenB: "0xA8fCf35bacd4bb5524E356A58d7Cda632446c37b",
            tokenC: "0x646151fae8178D2fe68Ef8095129AeB78332979A",
        },
    },
}

export const erc20Abi = [
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "FAUCET_AMOUNT",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" },
        { "name": "spender", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "mint",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        { "name": "from", "type": "address", "internalType": "address" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "ERC20InsufficientAllowance",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "allowance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InsufficientBalance",
      "inputs": [
        { "name": "sender", "type": "address", "internalType": "address" },
        { "name": "balance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidApprover",
      "inputs": [
        { "name": "approver", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidReceiver",
      "inputs": [
        { "name": "receiver", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSender",
      "inputs": [
        { "name": "sender", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSpender",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" }
      ]
    }
  ]

  export const routerAbi = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_factory", "type": "address", "internalType": "address" },
        { "name": "_WETH", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    { "type": "receive", "stateMutability": "payable" },
    {
      "type": "function",
      "name": "WETH",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "addLiquidity",
      "inputs": [
        { "name": "tokenA", "type": "address", "internalType": "address" },
        { "name": "tokenB", "type": "address", "internalType": "address" },
        {
          "name": "amountADesired",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amountBDesired",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "amountAMin", "type": "uint256", "internalType": "uint256" },
        { "name": "amountBMin", "type": "uint256", "internalType": "uint256" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountA", "type": "uint256", "internalType": "uint256" },
        { "name": "amountB", "type": "uint256", "internalType": "uint256" },
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addLiquidityETH",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        {
          "name": "amountTokenDesired",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amountTokenMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amountETHMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountToken", "type": "uint256", "internalType": "uint256" },
        { "name": "amountETH", "type": "uint256", "internalType": "uint256" },
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "factory",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAmountIn",
      "inputs": [
        { "name": "amountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "reserveIn", "type": "uint256", "internalType": "uint256" },
        { "name": "reserveOut", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountIn", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "getAmountOut",
      "inputs": [
        { "name": "amountIn", "type": "uint256", "internalType": "uint256" },
        { "name": "reserveIn", "type": "uint256", "internalType": "uint256" },
        { "name": "reserveOut", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountOut", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "getAmountsIn",
      "inputs": [
        { "name": "amountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "path", "type": "address[]", "internalType": "address[]" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAmountsOut",
      "inputs": [
        { "name": "amountIn", "type": "uint256", "internalType": "uint256" },
        { "name": "path", "type": "address[]", "internalType": "address[]" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "quote",
      "inputs": [
        { "name": "amountA", "type": "uint256", "internalType": "uint256" },
        { "name": "reserveA", "type": "uint256", "internalType": "uint256" },
        { "name": "reserveB", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountB", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "removeLiquidity",
      "inputs": [
        { "name": "tokenA", "type": "address", "internalType": "address" },
        { "name": "tokenB", "type": "address", "internalType": "address" },
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" },
        { "name": "amountAMin", "type": "uint256", "internalType": "uint256" },
        { "name": "amountBMin", "type": "uint256", "internalType": "uint256" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountA", "type": "uint256", "internalType": "uint256" },
        { "name": "amountB", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeLiquidityETH",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" },
        {
          "name": "amountTokenMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amountETHMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amountToken", "type": "uint256", "internalType": "uint256" },
        { "name": "amountETH", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeLiquidityETHWithPermit",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" },
        {
          "name": "amountTokenMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amountETHMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" },
        { "name": "approveMax", "type": "bool", "internalType": "bool" },
        { "name": "v", "type": "uint8", "internalType": "uint8" },
        { "name": "r", "type": "bytes32", "internalType": "bytes32" },
        { "name": "s", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [
        { "name": "amountToken", "type": "uint256", "internalType": "uint256" },
        { "name": "amountETH", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeLiquidityWithPermit",
      "inputs": [
        { "name": "tokenA", "type": "address", "internalType": "address" },
        { "name": "tokenB", "type": "address", "internalType": "address" },
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" },
        { "name": "amountAMin", "type": "uint256", "internalType": "uint256" },
        { "name": "amountBMin", "type": "uint256", "internalType": "uint256" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" },
        { "name": "approveMax", "type": "bool", "internalType": "bool" },
        { "name": "v", "type": "uint8", "internalType": "uint8" },
        { "name": "r", "type": "bytes32", "internalType": "bytes32" },
        { "name": "s", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [
        { "name": "amountA", "type": "uint256", "internalType": "uint256" },
        { "name": "amountB", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "swapETHForExactTokens",
      "inputs": [
        { "name": "amountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "path", "type": "address[]", "internalType": "address[]" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "swapExactETHForTokens",
      "inputs": [
        {
          "name": "amountOutMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "path", "type": "address[]", "internalType": "address[]" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "swapExactTokensForETH",
      "inputs": [
        { "name": "amountIn", "type": "uint256", "internalType": "uint256" },
        {
          "name": "amountOutMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "path", "type": "address[]", "internalType": "address[]" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "swapExactTokensForTokens",
      "inputs": [
        { "name": "amountIn", "type": "uint256", "internalType": "uint256" },
        {
          "name": "amountOutMin",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "path", "type": "address[]", "internalType": "address[]" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "swapTokensForExactETH",
      "inputs": [
        { "name": "amountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "amountInMax", "type": "uint256", "internalType": "uint256" },
        { "name": "path", "type": "address[]", "internalType": "address[]" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "swapTokensForExactTokens",
      "inputs": [
        { "name": "amountOut", "type": "uint256", "internalType": "uint256" },
        { "name": "amountInMax", "type": "uint256", "internalType": "uint256" },
        { "name": "path", "type": "address[]", "internalType": "address[]" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "error",
      "name": "SafeERC20FailedOperation",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "TransferHelper__ETHTransferFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Library__IdenticalAddresses",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Library__InsufficientAmount",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Library__InsufficientInputAmount",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Library__InsufficientLiquidity",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Library__InsufficientOutputAmount",
      "inputs": []
    },
    { "type": "error", "name": "UniswapV2Library__InvalidPath", "inputs": [] },
    { "type": "error", "name": "UniswapV2Library__ZeroAddress", "inputs": [] },
    {
      "type": "error",
      "name": "UniswapV2Router__ExcessiveInputAmount",
      "inputs": []
    },
    { "type": "error", "name": "UniswapV2Router__Expired", "inputs": [] },
    {
      "type": "error",
      "name": "UniswapV2Router__InsufficientAmountA",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Router__InsufficientAmountB",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Router__InsufficientOutputAmount",
      "inputs": []
    },
    { "type": "error", "name": "UniswapV2Router__InvalidPath", "inputs": [] },
    { "type": "error", "name": "UniswapV2Router__OnlyWETH", "inputs": [] },
    {
      "type": "error",
      "name": "UniswapV2Router__WETHTransferFailed",
      "inputs": []
    }
  ]

export const factoryAbi = [
    {
      "type": "function",
      "name": "allPairs",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "allPairsLength",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "createPair",
      "inputs": [
        { "name": "tokenA", "type": "address", "internalType": "address" },
        { "name": "tokenB", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "pair", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getPair",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "PairCreated",
      "inputs": [
        {
          "name": "token0",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "token1",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "pair",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "Create2EmptyBytecode", "inputs": [] },
    { "type": "error", "name": "FailedDeployment", "inputs": [] },
    {
      "type": "error",
      "name": "InsufficientBalance",
      "inputs": [
        { "name": "balance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "UniswapV2Factory__IdenticalAddresses",
      "inputs": []
    },
    { "type": "error", "name": "UniswapV2Factory__PairExists", "inputs": [] },
    { "type": "error", "name": "UniswapV2Factory__ZeroAddress", "inputs": [] }
  ]

export const pairAbi = [
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "BURN_ADDRESS",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "DOMAIN_SEPARATOR",
      "inputs": [],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "MINIMUM_LIQUIDITY",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" },
        { "name": "spender", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "burn",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "amount0", "type": "uint256", "internalType": "uint256" },
        { "name": "amount1", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "eip712Domain",
      "inputs": [],
      "outputs": [
        { "name": "fields", "type": "bytes1", "internalType": "bytes1" },
        { "name": "name", "type": "string", "internalType": "string" },
        { "name": "version", "type": "string", "internalType": "string" },
        { "name": "chainId", "type": "uint256", "internalType": "uint256" },
        {
          "name": "verifyingContract",
          "type": "address",
          "internalType": "address"
        },
        { "name": "salt", "type": "bytes32", "internalType": "bytes32" },
        {
          "name": "extensions",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "factory",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getReserves",
      "inputs": [],
      "outputs": [
        { "name": "_reserve0", "type": "uint112", "internalType": "uint112" },
        { "name": "_reserve1", "type": "uint112", "internalType": "uint112" },
        {
          "name": "_blockTimestampLast",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "initialize",
      "inputs": [
        { "name": "_token0", "type": "address", "internalType": "address" },
        { "name": "_token1", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "mint",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "liquidity", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "nonces",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "permit",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" },
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" },
        { "name": "deadline", "type": "uint256", "internalType": "uint256" },
        { "name": "v", "type": "uint8", "internalType": "uint8" },
        { "name": "r", "type": "bytes32", "internalType": "bytes32" },
        { "name": "s", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "price0CumulativeLast",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "price1CumulativeLast",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "skim",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "swap",
      "inputs": [
        { "name": "amount0Out", "type": "uint256", "internalType": "uint256" },
        { "name": "amount1Out", "type": "uint256", "internalType": "uint256" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "data", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "sync",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "token0",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "token1",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        { "name": "from", "type": "address", "internalType": "address" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Burn",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount0",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "amount1",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "EIP712DomainChanged",
      "inputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Mint",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount0",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "amount1",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Swap",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount0In",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "amount1In",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "amount0Out",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "amount1Out",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Sync",
      "inputs": [
        {
          "name": "reserve0",
          "type": "uint112",
          "indexed": false,
          "internalType": "uint112"
        },
        {
          "name": "reserve1",
          "type": "uint112",
          "indexed": false,
          "internalType": "uint112"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "ECDSAInvalidSignature", "inputs": [] },
    {
      "type": "error",
      "name": "ECDSAInvalidSignatureLength",
      "inputs": [
        { "name": "length", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ECDSAInvalidSignatureS",
      "inputs": [{ "name": "s", "type": "bytes32", "internalType": "bytes32" }]
    },
    {
      "type": "error",
      "name": "ERC20InsufficientAllowance",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "allowance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InsufficientBalance",
      "inputs": [
        { "name": "sender", "type": "address", "internalType": "address" },
        { "name": "balance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidApprover",
      "inputs": [
        { "name": "approver", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidReceiver",
      "inputs": [
        { "name": "receiver", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSender",
      "inputs": [
        { "name": "sender", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSpender",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC2612ExpiredSignature",
      "inputs": [
        { "name": "deadline", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC2612InvalidSigner",
      "inputs": [
        { "name": "signer", "type": "address", "internalType": "address" },
        { "name": "owner", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "InvalidAccountNonce",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" },
        { "name": "currentNonce", "type": "uint256", "internalType": "uint256" }
      ]
    },
    { "type": "error", "name": "InvalidShortString", "inputs": [] },
    {
      "type": "error",
      "name": "StringTooLong",
      "inputs": [{ "name": "str", "type": "string", "internalType": "string" }]
    },
    { "type": "error", "name": "UniswapV2Pair_InvalidTo", "inputs": [] },
    {
      "type": "error",
      "name": "UniswapV2Pair__InsufficientInputAmount",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Pair__InsufficientLiquidity",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Pair__InsufficientLiquidityBurned",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Pair__InsufficientLiquidityMinted",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UniswapV2Pair__InsufficientOutputAmount",
      "inputs": []
    },
    { "type": "error", "name": "UniswapV2Pair__K", "inputs": [] },
    { "type": "error", "name": "UniswapV2Pair__Locked", "inputs": [] },
    { "type": "error", "name": "UniswapV2Pair__NotFactory", "inputs": [] },
    { "type": "error", "name": "UniswapV2Pair__Overflow", "inputs": [] },
    { "type": "error", "name": "UniswapV2Pair__TransferFailed", "inputs": [] }
  ]