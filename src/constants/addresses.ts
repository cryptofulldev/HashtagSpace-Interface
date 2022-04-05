import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const DROPPER_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.ETH_MAIN]: '0x1378EfffDF1D56566CD87c3367bF041faA841AeA',
  [SupportedChainId.ETH_RINKEBY]: '0x44543506653b24f461CEC5e6D4eCEfF076b981a4',
}

export const COLLECTION_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.ETH_MAIN]: '0x9dD1dC7d8d85864Bfb313Cf4B35AFC556D02bAF2',
  [SupportedChainId.ETH_RINKEBY]: '0xe38e636CB98470Cc0ECb7dc2428719bf5423C868',
}

export const USDC_TOKEN_ADDRESSES: AddressMap = {
  [SupportedChainId.ETH_MAIN]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  [SupportedChainId.ETH_RINKEBY]: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
}
