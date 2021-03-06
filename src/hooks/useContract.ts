import { Contract } from 'ethers'
import { useMemo } from 'react'
import ERC20_ABI from '../abis/erc20.json'
import { COLLECTION_CONTRACT_ADDRESSES, DROPPER_CONTRACT_ADDRESSES, USDC_TOKEN_ADDRESSES } from '../constants/addresses'
import { getContract } from '../utils'
import { isSupportedNetwork } from '../utils/validateChainID'
import { useActiveWeb3React } from './useWeb3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || isSupportedNetwork(chainId) === false) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId!]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error: any) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export const useGetUSDCTokenContract = () => {
  return useContract(USDC_TOKEN_ADDRESSES, ERC20_ABI, true)
}
