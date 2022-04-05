import React from 'react'
import { AFFILIATE_COIN_LIST } from '../../constants/affiliateCoins'
import { ContainerRow } from '../../styles/components'
import { ImgIcon } from '../Icons'
import { useCoinList } from './hook'

const CoinList: React.FC = () => {
  const { onClick } = useCoinList()
  return (
    <ContainerRow justifyContent={'flex-end'} rowWidth={'fit-content'} margin={'0 32px'}>
      {Object.keys(AFFILIATE_COIN_LIST).map((coin) => (
        <ImgIcon
          key={AFFILIATE_COIN_LIST[coin].name}
          iconLink={AFFILIATE_COIN_LIST[coin].iconLink}
          alt={AFFILIATE_COIN_LIST[coin].symbol}
          onClickImg={onClick}
        />
      ))}
    </ContainerRow>
  )
}

export default CoinList
