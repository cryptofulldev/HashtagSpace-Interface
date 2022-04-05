import { Record } from 'immutable'
import { Action } from '../../types'
import {
  ListHastagItemForAdmin,
  CategoryList,
  HashtagItem,
  ExpiredItem,
  hashtagGetItemRes,
  SettingItems,
  ListPremium,
  CheckHashtagR,
} from '../../utils/api'

export type IsHashtagBooked = Pick<
  CheckHashtagR,
  'status' | 'type' | 'is_demo' | 'allowedBuy' | 'price' | 'expire' | 'applyDiscount' | 'allowedDemoBuy'
>
export interface Init {
  checkHashtag: string
  isHashtagBooked: IsHashtagBooked
  showSearchResult: boolean
  isCheckHashtagErr: boolean
  hashtagList: Array<HashtagItem>
  expiredList: Array<ExpiredItem>
  hashtagListСount: number
  manageId: string
  listHastagForAdmin: Array<ListHastagItemForAdmin>
  categoryList: CategoryList
  hashtagListСountForAdm: number
  hashtagItem: hashtagGetItemRes | undefined
  settings: SettingItems
  priseCountKeyWords: number
  isLoadFEdit: boolean
  isLoadFSeting: boolean
  listPremium: ListPremium
  stopSale: boolean
}

const init: Init = {
  checkHashtag: '',
  isHashtagBooked: {
    status: false,
    type: 'normal',
    is_demo: false,
    allowedBuy: false,
    price: 0,
    expire: 0,
    applyDiscount: false,
    allowedDemoBuy: false,
  },
  showSearchResult: false,
  isCheckHashtagErr: false,
  hashtagList: [],
  expiredList: [],
  manageId: '',
  listHastagForAdmin: [],
  categoryList: [],
  hashtagListСount: 0,
  hashtagListСountForAdm: 0,
  hashtagItem: undefined,
  settings: {
    discount: 0,
    domain_price: [],
    keyword_price: 0,
    stop_sale: false,
    pay_mhc_address: '',
    pay_buff_address: '',
    pay_period: 0,
    meta: '',
    resale_commission: 0,
    referral: 'on',
    referral_reward: 0,
    notification: false,
    period_before_domain_renewal: 0,
  },
  priseCountKeyWords: 0,
  isLoadFEdit: false,
  isLoadFSeting: false,
  listPremium: [],
  stopSale: false,
}

type Actions =
  | Action<'CHECKING_HASHTAG', string>
  | Action<'IS_HASHTAG_BOOKED', IsHashtagBooked>
  | Action<'SHOW_SEARCH_RESULT', boolean>
  | Action<'IS_CHECK_HASHTAG_ERR', boolean>
  | Action<'HASHTAG_LIST', Array<HashtagItem>>
  | Action<'EXPIRED_LIST', Array<ExpiredItem>>
  | Action<'MANAGE_ID', string>
  | Action<'LIST_HASTAG_FOR_ADMIN', Array<ListHastagItemForAdmin>>
  | Action<'CATEGORY_LIST', CategoryList>
  | Action<'HASHTAG_LIST_СOUNT_FOR_ADMIN', number>
  | Action<'HASHTAG_LIST_СOUNT', number>
  | Action<'HASHTAG_ITEM', hashtagGetItemRes>
  | Action<'SETTINGS', SettingItems>
  | Action<'IS_LOAD_F_EDIT', boolean>
  | Action<'PRISE_COUNTKEY_WORDS', number>
  | Action<'IS_LOAD_FSETING', boolean>
  | Action<'LIST_PREMIUM', ListPremium>
  | Action<'STOP_SALE', boolean>

const State: Record.Factory<Init> = Record(init)

const reducer = function (state: Record<Init> = new State(), action: Actions): Record<Init> {
  switch (action.type) {
    case 'CHECKING_HASHTAG':
      return state.set('checkHashtag', action.val)
    case 'IS_HASHTAG_BOOKED':
      return state.set('isHashtagBooked', action.val)
    case 'SHOW_SEARCH_RESULT':
      return state.set('showSearchResult', action.val)
    case 'IS_CHECK_HASHTAG_ERR':
      return state.set('isCheckHashtagErr', action.val)
    case 'HASHTAG_LIST':
      return state.set('hashtagList', action.val)
    case 'EXPIRED_LIST':
      return state.set('expiredList', action.val)
    case 'MANAGE_ID':
      return state.set('manageId', action.val)
    case 'LIST_HASTAG_FOR_ADMIN':
      return state.set('listHastagForAdmin', action.val)
    case 'CATEGORY_LIST':
      return state.set('categoryList', action.val)
    case 'HASHTAG_LIST_СOUNT':
      return state.set('hashtagListСount', action.val)
    case 'HASHTAG_LIST_СOUNT_FOR_ADMIN':
      return state.set('hashtagListСountForAdm', action.val)
    case 'HASHTAG_ITEM':
      return state.set('hashtagItem', action.val)
    case 'SETTINGS':
      return state.set('settings', action.val)
    case 'PRISE_COUNTKEY_WORDS':
      return state.set('priseCountKeyWords', action.val)
    case 'IS_LOAD_F_EDIT':
      return state.set('isLoadFEdit', action.val)
    case 'IS_LOAD_FSETING':
      return state.set('isLoadFSeting', action.val)
    case 'LIST_PREMIUM':
      return state.set('listPremium', action.val)
    case 'STOP_SALE':
      return state.set('stopSale', action.val)

    default:
      return state
  }
}

export default reducer
