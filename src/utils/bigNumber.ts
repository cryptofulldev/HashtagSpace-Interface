import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const BIG_ZERO = new BigNumber(0)

// export const ethersToSerializedBigNumber = (ethersBn: ethers.BigNumber): SerializedBigNumber =>
//   ethersToBigNumber(ethersBn).toJSON()

// export const ethersToBigNumber = (ethersBn: ethers.BigNumber): BigNumber => new BigNumber(ethersBn.toString())

// export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
//   const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
//   return displayBalance.toNumber()
// }
