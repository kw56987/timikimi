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