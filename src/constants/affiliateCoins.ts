import { Token } from '@uniswap/sdk-core'
import buffTokenABI from '../abis/buffTokenABI.json'
import seoCoinABI from '../abis/seoCoinABI.json'
import BUFF_COIN_ICON_URL from '../assets/images/buff-coin.jpg'
import HASHTAG_COIN_ICON_URL from '../assets/images/hashtag-coin.png'
import SEO_COIN_ICON_URL from '../assets/images/seo-coin.png'
import GAMEBLING_COIN_ICON_URL from '../assets/images/bling-coin.png'
import OATH_COIN_ICON_URL from '../assets/images/oath-coin.png'

export const BUFFDOGE = new Token(1, '0x0A7e4D70e10b63FeF9F8dD19FbA3818d15154d2F', 18, 'BUFFDOGE', 'Buff Doge')
export const TEST_BUFFDOGE = new Token(4, '0x6d131b2ed4e49ded6a8cff806bc651d88d2439f2', 18, 'BUFFDOGE', 'Buff Doge')
export const NEW_BUFFDOGE = new Token(1, '0x784024c6C9a6c863d27f31b7F83F680AeEd405Af', 18, '$Buff', 'Official BuffDoge')
export const SEO_COIN = new Token(4, '0x784024c6C9a6c863d27f31b7F83F680AeEd405Af', 18, 'SEO', 'SEO Coin')
export const HASHTAG_COIN = new Token(4, '0x1FA322c468F5223CF2F8C1b22A352B68a5d4412f', 18, '$Hashtag', 'Hashtag Coin')
export const GAMEBLING_COIN = new Token(
  4,
  '0x1FA322c468F5223CF2F8C1b22A352B68a5d4412f',
  18,
  '$Gamebling',
  'Gamebling Coin'
)
export const OATH_COIN = new Token(4, '0x1FA322c468F5223CF2F8C1b22A352B68a5d4412f', 18, '$OATH', 'OATH Protocol')

export interface IAffiliateCoin {
  name: string
  symbol: string
  iconLink: string
  siteLink: string
  address?: string
  tokenABI?: any
}
export const AFFILIATE_COIN_LIST: { [key: string]: IAffiliateCoin } = {
  BUFF: {
    name: NEW_BUFFDOGE.name!,
    symbol: NEW_BUFFDOGE.symbol!,
    address: NEW_BUFFDOGE.address,
    iconLink: BUFF_COIN_ICON_URL,
    siteLink: 'https://buffdoge.org',
    tokenABI: buffTokenABI,
  },
  SEO: {
    name: SEO_COIN.name!,
    symbol: SEO_COIN.symbol!,
    address: SEO_COIN.address,
    iconLink: SEO_COIN_ICON_URL,
    siteLink: 'https://seo.money',
    tokenABI: seoCoinABI,
  },
  HASHTAG: {
    name: HASHTAG_COIN.name!,
    symbol: HASHTAG_COIN.symbol!,
    address: HASHTAG_COIN.address,
    iconLink: HASHTAG_COIN_ICON_URL,
    siteLink: 'https://hashtag.space',
  },
  GAMEBLING: {
    name: GAMEBLING_COIN.name!,
    symbol: GAMEBLING_COIN.symbol!,
    address: GAMEBLING_COIN.address,
    iconLink: GAMEBLING_COIN_ICON_URL,
    siteLink: 'https://beta.gamebling.com/',
  },
  OATH: {
    name: OATH_COIN.name!,
    symbol: OATH_COIN.symbol!,
    address: OATH_COIN.address,
    iconLink: OATH_COIN_ICON_URL,
    siteLink: 'https://hashtag.space',
  },
}
