import * as T from './'

export const DEFAULT_TITLE = 'Timikimi | Mint your nft'
export const DEFAULT_KEYWORD = 'Timikimi, Mint nft'
export const DEFAULT_DEC = 'Timikimi a mint nft platform'

export const HTTP_SERVER = 'https://api.1move.finance/'
export const GRAPH_QL_SERVER = 'https://api.studio.thegraph.com/query/6981/volare/v0.23.0'

export const CONTRACT_ADDRESS = '0x7Ff0C96136CDB30bA9Cec487DB81De356f58dE81'

export const SUPPORTED_CHAIN_IDS = [1, 137, 80001]
export const DEFAULT_SUPPORTED_CHAIN_ID = 80001

export const DEFAULT_CHAIN: T.ChainType = {
  1: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://main-light.eth.linkpool.io/"],
  },
  4: {
    chainId: `0x${Number(4).toString(16)}`,
    chainName: "Rinkeby (ETH Testnet)",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby-light.eth.linkpool.io/"],
  },
  137: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet (Matic)",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  250: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  43114: {
    chainId: `0x${Number(43114).toString(16)}`,
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
  },
  80001: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai Testnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-mumbai.maticvigil.com",
      "https://rpc-mumbai.matic.today",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};

export const PLAY_ICON_BASE64 = `data:image/png;base64,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`