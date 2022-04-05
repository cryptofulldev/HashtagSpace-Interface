import { chain, fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
// import {
//   ICurrentDate,
//   TDashboardBridgeEarning,
//   TDashboardDomainAnalytics,
//   TDashboardMonthlyRevenue,
//   TDashboardPurchases,
// } from 'views/Admin/Dashboard/types'
import { TAffiliateData, TonResetPassword, TUserInfo } from '../state/actions/user'
// import { TInstructionItem, TResponseS } from '../views/Search/types'
import { Errors, getRestError, Response, restReq } from './restReq'

interface CheckHashtag {
  id: string
  new?: boolean
}

export interface Restriction {
  code: number
  description: string
}
export interface CheckHashtagR {
  status: boolean //true - если домен занят, в противном случае false
  type: 'normal' | 'premium'
  restriction: Array<Restriction>
  is_demo: boolean
  allowedBuy: boolean // информирует о возможности покупки домена (именно покупка)
  price: number
  expire: number
  applyDiscount: boolean
  allowedDemoBuy: boolean
}

export const checkHashtagExists = async (params: CheckHashtag): Promise<Error | CheckHashtagR> => {
  const data = await restReq<CheckHashtag, CheckHashtagR>('hashtag.checkExists')(params)
  return pipe(
    data,
    chain(getRestError),
    //chain(changeTypeRunTime<boolean>(t.boolean)),
    fold<Errors, Response<CheckHashtagR>, Error | CheckHashtagR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface TokenRefresh {
  access_token: string
  refresh_token: string
  expire_access: number
  expire_refresh: number
}

export interface TokenRefreshP {
  token: string
}

export const tokenRefresh = async (params: TokenRefreshP): Promise<Error | TokenRefresh> => {
  return pipe(
    await restReq<TokenRefreshP, TokenRefresh>('user.tokenRefresh')(params),
    chain(getRestError),
    fold<Errors, Response<TokenRefresh>, Error | TokenRefresh>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export function errtest({ typeData, resolve, reject, responseData }: any) {
  if (typeof responseData === typeData) {
    return resolve(responseData)
  }
  reject('error')
}

export interface RegistrationP {
  email: string
  password: string
  referral?: string
}

export const registration = async (params: RegistrationP): Promise<Error | boolean> => {
  return pipe(
    await restReq<RegistrationP, boolean>('user.registration')(params),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface AuthRes {
  token: {
    access_token: string
    refresh_token: string
    expire_access: number
    expire_refresh: number
  }
  userDetail: {
    id: number
    email: string
    first_name: string
    last_name: string
    nickName: string
    img: string
    isDomain: boolean
  }
}

export const auth = async (params: RegistrationP): Promise<Error | AuthRes> => {
  return pipe(
    await restReq<RegistrationP, AuthRes>('user.auth')(params),
    chain(getRestError),
    fold<Errors, Response<AuthRes>, Error | AuthRes>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface HashtagAddP {
  id: string
  url: string | null
  demo: boolean
  gacode?: string | null
  txHash?: string
}

export const hashtagAdd = async (params: Array<HashtagAddP>, token: string): Promise<Errors | unknown> => {
  return pipe(
    await restReq<Array<HashtagAddP>, unknown>('hashtag.add')(params, token, true),
    fold<Errors, unknown, Errors | unknown>(
      (data: any) => {
        throw data
      },
      (data: any) => data
    )
  )
}

export interface HashtagItem {
  id: string
  url: string
  expire: string
  is_demo: boolean
  expire_timestamp: number
  category: Array<number>
  category_name: Array<string>
  resale: {
    status: boolean
    price: number
  }
  auto_renewal: boolean
}

export interface ExpiredItem {
  id: string
  expire: string
  auto_renewal: boolean
}

export interface HashtagListRes {
  total_count: number
  items: Array<HashtagItem>
  expireList: Array<ExpiredItem>
}

interface HashtagGetListP {
  filter: {
    search: string
    limit: number
    offset: number
  }
}

export const hashtagGetList = async (params: HashtagGetListP, token: string): Promise<Error | HashtagListRes> => {
  const data = await restReq<HashtagGetListP, HashtagListRes>('hashtag.getList')(params, token)

  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<HashtagListRes>, Error | HashtagListRes>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface CategoryItem {
  id: string
  name: string
  parent: number
}

export type CategoryList = Array<CategoryItem>

export const getCategoryGetList = async (): Promise<Error | CategoryList> => {
  const data = await restReq<object, CategoryList>('category.getList')({})
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<CategoryList>, Error | CategoryList>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface CategoryAddForAdm {
  name: string
}

export const categoryAddForAdm = async (params: CategoryAddForAdm, token: string): Promise<Error | boolean> => {
  const data = await restReq<CategoryAddForAdm, boolean>('category.add')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface СategoryRemoveForAdmP {
  id: string
}

export const categoryRemoveForAdm = async (params: СategoryRemoveForAdmP, token: string): Promise<Error | boolean> => {
  const data = await restReq<СategoryRemoveForAdmP, boolean>('category.remove')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

interface categoryEditForAdmP {
  id: string
  fields: {
    name: string
  }
}

export const categoryEditForAdm = async (params: categoryEditForAdmP, token: string): Promise<Error | boolean> => {
  const data = await restReq<categoryEditForAdmP, boolean>('category.edit')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type Roles = '' | 'USER' | 'MANAGER' | 'ADMIN' | 'SUPERADMIN'

export interface UserInfo {
  id: number
  email: string
  role: Roles
  is_admin: boolean
  first_name: string | null
  last_name: string | null
  nick: string | null
  mhc_address: string | null
  paypal_address: string | null
  img: string | null
  info: string | null
  enabled_ga: boolean
  referral_status: boolean
  social_network: {
    instagram: string | null
    facebook: string | null
    telegram: string | null
    skype: string | null
  } | null
}

export const userGetInfo = async (token: string): Promise<Error | UserInfo> => {
  const data = await restReq<object, UserInfo>('user.getInfo')({}, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<UserInfo>, Error | UserInfo>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

interface GetAdminListHastag {
  filter: {
    search: string
    limit: number
    offset: number
  }
}
export interface ListHastagItemForAdmin {
  id: string
  url: string
  date: string
  expire: string
  category: Array<string>
  user_email: string
  expire_timestamp: number
  is_demo: boolean
}
export interface ListHastagForAdmin {
  total_count: number
  items: Array<ListHastagItemForAdmin>
}

export const getListHastagForAdmin = async (
  params: GetAdminListHastag,
  token: string
): Promise<Error | ListHastagForAdmin> => {
  const data = await restReq<GetAdminListHastag, ListHastagForAdmin>('hashtag.getAdminList')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<ListHastagForAdmin>, Error | ListHastagForAdmin>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

interface HashtagFields {
  url?: string
  date?: string
  expire?: string
  first_name?: string
  last_name?: string
  email?: string
  phone_code?: string
  phone?: string
  company_name?: string
  address?: string
  city?: string
  country?: string
  zip?: string
  keywords?: Array<string> | null
  is_service_domain?: number
  is_product_domain?: number
  is_info_domain?: number
  is_local_target?: number
  is_national_target?: number
  is_international_target?: number
  soc_facebook?: string
  soc_twitter?: string
  soc_instagram?: string
  expire_timestamp?: number
  description?: string
  file?: FormData | null
  imageUrl?: string
  imageSrc?: string
}

export interface HashtagEditP {
  id: string
  fields: HashtagFields
  gacode?: string
}

export const hashtagEdit = async (params: HashtagEditP, token: string): Promise<Error | boolean> => {
  const data = await restReq<HashtagEditP, boolean>('hashtag.edit')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface HashtagGetItemP {
  id: string
}
export interface hashtagGetItemRes {
  id: string
  url: string | null
  date: string
  expire: string
  first_name: string | null
  last_name: string | null
  email: string | null
  phone_code: string | null
  phone: string | null
  company_name: string | null
  address: string | null
  city: string | null
  country: string | null
  zip: string | null
  keywords: Array<string>
  is_service_domain: number | undefined
  is_product_domain: number | undefined
  is_info_domain: number | undefined
  is_local_target: number | undefined
  is_national_target: number | undefined
  is_international_target: number | undefined
  privacy: number | undefined
  soc_facebook: string | null
  soc_twitter: string | null
  soc_instagram: string | null
  expire_timestamp: number
  category: string | string[]
  description: string | null
  imageUrl: string | null
  imageSrc: string | null
  file: FormData | null
  clearFile: boolean | null
  img: string | null
  max_keywords: string
  is_demo: boolean
}

export const hashtagGetItem = async (params: HashtagGetItemP, token: string): Promise<Error | hashtagGetItemRes> => {
  const data = await restReq<HashtagGetItemP, hashtagGetItemRes>('hashtag.getItem')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<hashtagGetItemRes>, Error | hashtagGetItemRes>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface AddCategoryP {
  id: string
  category: string
}

export const addCategory = async (params: AddCategoryP, token: string): Promise<Error | boolean> => {
  const data = await restReq<AddCategoryP, boolean>('hashtag.setCategory')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface PayP {
  amount: number
  type: 'paypal' | 'metahash'
  transactionType: 'pay' | 'withdraw'
}

export interface PayR {
  paymentId: string
  redirectLink: string
}

export const pay = async (params: PayP, token: string): Promise<Error | PayR> => {
  const data = await restReq<PayP, PayR>(`transaction.${params.transactionType}`)(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<PayR>, Error | PayR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface WithdrawReqP {
  amount: number
  fee: number
  type: 'paypal' | 'metahash'
  withdrawAddress: string
}

export interface WithdrawReqR {
  balance: number
}

export const withdrawReq = async (params: WithdrawReqP, token: string): Promise<Error | WithdrawReqR> => {
  const data = await restReq<WithdrawReqP, WithdrawReqR>('transaction.withdrawReq')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<WithdrawReqR>, Error | WithdrawReqR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface ConfirmWithdrawReqP {
  id: number
  amount: number
  type: 'paypal' | 'metahash'
  withdrawAddress: string
}

export interface ConfirmWithdrawReqR {
  paymentId: string
  redirectLink: string
}

export const confirmWithdraw = async (
  params: ConfirmWithdrawReqP,
  token: string
): Promise<Error | ConfirmWithdrawReqR> => {
  const data = await restReq<ConfirmWithdrawReqP, ConfirmWithdrawReqR>('transaction.confirmWithdraw')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<ConfirmWithdrawReqR>, Error | ConfirmWithdrawReqR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface RejectWithdrawReqP {
  id: number
}

export interface RejectWithdrawReqR {
  status: boolean
}

export const rejectWithdraw = async (
  params: RejectWithdrawReqP,
  token: string
): Promise<Error | RejectWithdrawReqR> => {
  const data = await restReq<RejectWithdrawReqP, RejectWithdrawReqR>('transaction.rejectWithdraw')(params, token)
  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<RejectWithdrawReqR>, Error | RejectWithdrawReqR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface ItemTransaction {
  amount: number
  pay_system: string
  description: string
  type: 'deposit' | 'purchase'
  status: 'SUCCESS' | 'PENDING' | 'ERROR'
  hash: string
  date: string
  date_timestamp: number
  user_email: string
  currency: string
  reason: number
  product: null | 'Domain' | 'KEYWORDS'
  origin_amount: string
  origin_currency: string
  discount: string
}

export interface GetListTransactionR {
  total_count: number
  items: Array<Omit<ItemTransaction, 'user_email'>>
}

export const getListTransaction = async (token: string): Promise<Error | GetListTransactionR> => {
  return pipe(
    await restReq<object, GetListTransactionR>('transaction.getList')({}, token),
    chain(getRestError),
    fold<Errors, Response<GetListTransactionR>, Error | GetListTransactionR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const getBalance = async (token: string): Promise<Error | number> => {
  return pipe(
    await restReq<object, number>('transaction.getBalance')({}, token),
    chain(getRestError),
    fold<Errors, Response<number>, Error | number>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface GetAdminBalanceR {
  paypal: number
  metahash: number
}

export const getAdminBalance = async (token: string): Promise<Error | GetAdminBalanceR> => {
  return pipe(
    await restReq<object, GetAdminBalanceR>('transaction.getAdminBalance')({}, token),
    chain(getRestError),
    fold<Errors, Response<GetAdminBalanceR>, Error | GetAdminBalanceR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface IGetUserMHCBalanceP {
  address: string
}
export const getUserMHCBalance = async (params: IGetUserMHCBalanceP, token: string): Promise<Error | number> => {
  return pipe(
    await restReq<IGetUserMHCBalanceP, number>('transaction.getUserMHCBalance')(params, token),
    chain(getRestError),
    fold<Errors, Response<number>, Error | number>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface GetListTransactionRForAdm {
  total_count: number
  withdraw_req_count: number
  items: Array<ItemTransaction>
}

export interface ListTransactionP {
  filter: {
    search: string
    limit: number
    offset: number
  }
}

export const getListTransactionForAdmin = async (
  params: ListTransactionP,
  token: string
): Promise<Error | GetListTransactionRForAdm> => {
  return pipe(
    await restReq<ListTransactionP, GetListTransactionRForAdm>('transaction.getAdminList')(params, token),
    chain(getRestError),
    fold<Errors, Response<GetListTransactionRForAdm>, Error | GetListTransactionRForAdm>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TDomainPrice = {
  name: string
  value: number
}

export interface SettingItems {
  //price: number;
  keyword_price: number
  stop_sale: boolean
  pay_mhc_address: string
  pay_buff_address: string
  pay_period: number //sec
  domain_price: Array<TDomainPrice>
  meta: string
  discount: number
  resale_commission: number
  referral: 'on' | 'off' | 'custom'
  referral_reward: number
  notification: boolean
  period_before_domain_renewal: number
}
export const getSettings = async (token: string): Promise<Error | SettingItems> => {
  return pipe(
    await restReq<object, SettingItems>('settings.get')({}, token),
    chain(getRestError),
    fold<Errors, Response<SettingItems>, Error | SettingItems>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface SettingItemsP {
  fields: Omit<Partial<SettingItems>, 'pay_period'>
}

export const setSettings = async (params: SettingItemsP, token: string): Promise<Error | boolean> => {
  return pipe(
    await restReq<SettingItemsP, boolean>('settings.set')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

interface AddPremium {
  id: string
}

export const addPremium = async (params: AddPremium, token: string): Promise<Error | boolean> => {
  return pipe(
    await restReq<AddPremium, boolean>('settings.addPremium')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}
export const removePremium = async (params: AddPremium, token: string): Promise<Error | boolean> => {
  return pipe(
    await restReq<AddPremium, boolean>('settings.removePremium')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type ListPremium = Array<{ id: string }>

export interface ListPremiumFilter {
  filter?: {
    search?: string
  }
}

export const getListPremium = async (token: string, params: ListPremiumFilter = {}): Promise<Error | ListPremium> => {
  return pipe(
    await restReq<ListPremiumFilter, ListPremium>('settings.getListPremium')(params, token),
    chain(getRestError),
    fold<Errors, Response<ListPremium>, Error | ListPremium>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type InfoItem = {
  title: string
  description: string
  sort: number
}
export type InfoItemAdd = Omit<InfoItem, 'sort'>
export const addInfo = async (token: string, params: InfoItemAdd): Promise<Error | boolean> => {
  return pipe(
    await restReq<InfoItemAdd, boolean>('info.add')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TListInfoItem = {
  id: number
  title: string
  sort: number
}
export type TListInfo = Array<TListInfoItem>

export const getListInfo = async (): Promise<Error | TListInfo> => {
  return pipe(
    await restReq<object, TListInfo>('info.getList')({}),
    chain(getRestError),
    fold<Errors, Response<TListInfo>, Error | TListInfo>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TgetItemInfo = {
  id: number
}
export type InfoItemID = InfoItem & { id: number }

export const getItemInfo = async (params: TgetItemInfo): Promise<Error | InfoItemID> => {
  return pipe(
    await restReq<TgetItemInfo, InfoItemID>('info.getItem')(params),
    chain(getRestError),
    fold<Errors, Response<InfoItemID>, Error | InfoItemID>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TitemEditInfo = {
  id: number
  fields: Partial<InfoItem>
}

export const editInfo = async (token: string, params: TitemEditInfo): Promise<Error | boolean> => {
  return pipe(
    await restReq<TitemEditInfo, boolean>('info.edit')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const removeItemInfo = async (token: string, params: TgetItemInfo): Promise<Error | boolean> => {
  return pipe(
    await restReq<TgetItemInfo, boolean>('info.remove')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TAccountItem = {
  id: number
  email: string
  balance: number
  domains: number
  domains_stat: {
    demo: number
    live: number
  }
  referral_status: boolean
  referral_status_personal: boolean
}

export type TAccountList = Array<TAccountItem>

export const accountGetList = async (token: string): Promise<Error | TAccountList> => {
  return pipe(
    await restReq<object, TAccountList>('account.getList')({}, token),
    chain(getRestError),
    fold<Errors, Response<TAccountList>, Error | TAccountList>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

type PaccountGetItemDomains = {
  id: string
}

export type TAccountDomainItem = {
  id: string
  url: string
  date: string
  expire: string
  category: number[]
  user_email: string
  expire_timestamp: number
  is_demo: boolean
  category_name: string[]
}
export type TAccountDomains = {
  total_count: number
  items: Array<TAccountDomainItem>
}

export const accountGetItemDomains = async (
  token: string,
  params: PaccountGetItemDomains
): Promise<Error | TAccountDomains> => {
  return pipe(
    await restReq<PaccountGetItemDomains, TAccountDomains>('account.getItemDomains')(params, token),
    chain(getRestError),
    fold<Errors, Response<TAccountDomains>, Error | TAccountDomains>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type PUserEdit = {
  fields: {
    first_name?: string
    last_name?: string
    password?: string
    social_network?: {
      instagram?: string
      facebook?: string
      telegram?: string
      skype?: string
    }
    info?: string
    nick?: string
    mhc_address?: string
    paypal_address?: string
  }
}

export const userEdit = async (token: string, params: PUserEdit): Promise<Error | boolean> => {
  return pipe(
    await restReq<PUserEdit, boolean>('user.edit')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type PuserSavePhoto = {
  file: string
}

export const userSavePhoto = async (token: string, params: PuserSavePhoto): Promise<Error | boolean> => {
  return pipe(
    await restReq<PuserSavePhoto, boolean>('user.savePhoto')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const getUploadPhotoUrl = async (token: string): Promise<Error | string> => {
  return pipe(
    await restReq<object, string>('user.getUploadPhotoUrl')({}, token),
    chain(getRestError),
    fold<Errors, Response<string>, Error | string>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TsendImmageRes = {
  file: string
}
export type TsendImage = (url: string, file: FormData) => Promise<TsendImmageRes>

export const sendImage: TsendImage = async (url, file): Promise<TsendImmageRes> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: file,
    })
    const result = await response.json()
    if (result.error) {
      console.error(result.error)
      throw new Error(result.error.message)
    }
    return result.result
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

export const forgotPassword = async (params: { email: string }): Promise<Error | boolean> => {
  return pipe(
    await restReq<{ email: string }, boolean>('user.resetPassword')(params),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const resetPassword = async (params: TonResetPassword['val']): Promise<Error | boolean> => {
  return pipe(
    await restReq<TonResetPassword['val'], boolean>('user.changeForgotPassword')(params),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const userAuthGA = async (token: string): Promise<Error | string> => {
  return pipe(
    await restReq<object, string>('user.authGA')({}, token),
    chain(getRestError),
    fold<Errors, Response<string>, Error | string>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

type PUserBindGA = {
  code: string
}

export const userBindGA = async (token: string, params: PUserBindGA): Promise<Error | string> => {
  return pipe(
    await restReq<PUserBindGA, string>('user.bindGA')(params, token),
    chain(getRestError),
    fold<Errors, Response<string>, Error | string>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const userUnBindGA = async (token: string, params: PUserBindGA): Promise<Error | boolean> => {
  return pipe(
    await restReq<PUserBindGA, boolean>('user.unbindGA')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const addAffiliateData = async (params: TAffiliateData): Promise<Error | boolean> => {
  return pipe(
    await restReq<TAffiliateData, boolean>('affiliate.addAffiliateData')(params),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const getUserEmailInfo = async (params: TUserInfo): Promise<Error | boolean> => {
  return pipe(
    await restReq<TUserInfo, boolean>('user.getUserInfo')(params),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TAffiliateRes = {
  ownerID: number
  userWalletAddress: string
  affiliateLink: string
  affiliateType: string
  date: string
}
export const getAffiliateData = async (token: string): Promise<Error | TAffiliateRes[]> => {
  return pipe(
    await restReq<{}, TAffiliateRes[]>('affiliate.getAffiliateData')({}, token),
    chain(getRestError),
    fold<Errors, Response<TAffiliateRes[]>, Error | TAffiliateRes[]>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type searchTagP = { search: string }

// export const searchTag1 = async (params: searchTagP): Promise<Error | TResponseS> => {
//   return pipe(
//     await restReq<searchTagP, TResponseS>('search', {
//       headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
//       method: 'post',
//       url: 'http://app.metahash.io/api/search/',
//     })(params, ''),
//     chain(getRestError),
//     fold<Errors, Response<TResponseS>, Error | TResponseS>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }

// export async function searchTag(search: string) {
//   let response = await fetch('https://app.metahash.io/api/search/', {
//     method: 'POST',
//     //mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({
//       id: 1,
//       method: 'search',
//       params: { search },
//     }),
//   })

//   if (response.ok) {
//     const json: TResponseS = await response.json()
//     return json
//   } else {
//     console.error({ response })
//     return undefined
//   }
// }

export interface IGetAllDomainListR {
  id: number
  domainName: string
  userId: number
  url: string
  description: string
  img: string
  date: string
  expire: string
  keywords: Array<string>
  maxKeywords: number
  isRenewal: boolean
  autoRenewal: boolean
  isDemo: boolean
  isAddress: boolean
  isLocalTarget: boolean
  isNationalTarget: boolean
  isInternationalTarget: boolean
  isInfoDomain: boolean
  isProductDomain: boolean
  isServiceDomain: boolean
  socialFacebook: boolean
  socialInstagram: boolean
  socialTwitter: boolean
  privacy: boolean
  point: number
}

export const getAllDomainList = async (): Promise<Error | IGetAllDomainListR[]> => {
  return pipe(
    await restReq<object, any>('hashtag.getAllDomainList')({}),
    chain(getRestError),
    fold<Errors, Response<IGetAllDomainListR[]>, Error | IGetAllDomainListR[]>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export interface ISEODomainKeywords {
  restitle: string
  resshorttext: string
}
export interface IGetAllSEODomainListR {
  businessName: string
  businessAddress: string
  businessPhone: string
  category: string
  keywords: ISEODomainKeywords[]
  domainId: number
  domainName: string
  categoryId: number
  parentCategoryId: number
  parentCategory: string
}

export const getAllSEODomainList = async (): Promise<Error | IGetAllSEODomainListR[]> => {
  return pipe(
    await restReq<object, any>('searchEngine.getSEODomains')({}),
    chain(getRestError),
    fold<Errors, Response<IGetAllSEODomainListR[]>, Error | IGetAllSEODomainListR[]>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

// export const getSearchEngineInstruction = async (token: string): Promise<Error | TInstructionItem[]> => {
//   return pipe(
//     await restReq<{}, TInstructionItem[]>('searchEngine.getInstruction')({}, token),
//     chain(getRestError),
//     fold<Errors, Response<TInstructionItem[]>, Error | TInstructionItem[]>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }

// export const updateSearchEngineInstruction = async (
//   token: string,
//   params: { instructions: TInstructionItem[] }
// ): Promise<Error | boolean> => {
//   return pipe(
//     await restReq<{ instructions: TInstructionItem[] }, boolean>('searchEngine.updateInstruction')(params, token),
//     chain(getRestError),
//     fold<Errors, Response<boolean>, Error | boolean>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }

export type TDiscount = {
  discount: number
  amount: number
}

export const getDiscount = async (token: string): Promise<TDiscount> => {
  const data = await restReq<{}, TDiscount>('user.getDiscount')({}, token)

  return pipe(
    data,
    chain(getRestError),
    fold<Errors, Response<TDiscount>, TDiscount>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TPResale = {
  id: string
  price: number
}
export const hashtagResale = async (token: string, params: TPResale): Promise<Error | boolean> => {
  return pipe(
    await restReq<TPResale, boolean>('hashtag.resale')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}
export type TPСancelResale = { id: string }

export const hashtagСancelResale = async (token: string, params: TPСancelResale): Promise<Error | boolean> => {
  return pipe(
    await restReq<TPСancelResale, boolean>('hashtag.cancelResale')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TPuserGetInfoByNick = {
  nick: string
}
export type TRInfoByNick = {
  name: string
  img: string
  info: string
  nick: string
  social_network: {
    instagram: string
    facebook: string
    telegram: string
    skype: string
  }
}

export const userGetInfoByNick = async (params: TPuserGetInfoByNick): Promise<Error | TRInfoByNick> => {
  return pipe(
    await restReq<TPuserGetInfoByNick, TRInfoByNick>('user.getInfoByNick')(params),
    chain(getRestError),
    fold<Errors, Response<TRInfoByNick>, Error | TRInfoByNick>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

// export type TGetNicNameListP = {
//   isRequiredMHCAddress: boolean
// }

export type TGetNickNameListR = {
  nick: string
  paypalAddress: string
  mhcAddress: string
}

export const getNickList = async (token: string): Promise<Error | Array<TGetNickNameListR>> => {
  return pipe(
    await restReq<Object, Array<TGetNickNameListR>>('user.getNickList')({}, token),
    chain(getRestError),
    fold<Errors, Response<Array<TGetNickNameListR>>, Error | Array<TGetNickNameListR>>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TSendCreditP = {
  receiver: string
  amount: number
}

export const sendCredit = async (params: TSendCreditP, token: string): Promise<Error | boolean> => {
  return pipe(
    await restReq<TSendCreditP, boolean>('transaction.sendCredit')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TDirectlyPaymentP = {
  type: 'paypal' | 'metahash'
  nick: string
  amount: number
  address: string
}

export type TDirectlyPaymentR = {
  paymentId: string
  redirectLink: string
}

export const directlyPayment = async (params: TDirectlyPaymentP, token: string): Promise<Error | TDirectlyPaymentR> => {
  return pipe(
    await restReq<TDirectlyPaymentP, TDirectlyPaymentR>('transaction.directlyPayment')(params, token),
    chain(getRestError),
    fold<Errors, Response<TDirectlyPaymentR>, Error | TDirectlyPaymentR>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TChangeReferrerStatus = {
  id: number
  status: boolean
}
export const changeReferrerStatus = async (token: string, params: TChangeReferrerStatus): Promise<Error | boolean> => {
  return pipe(
    await restReq<TChangeReferrerStatus, boolean>('account.changeReferrerStatus')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export type TPsetAutorenewal = {
  id: string
  status: boolean
}
export const setAutorenewal = async (token: string, params: TPsetAutorenewal): Promise<Error | boolean> => {
  return pipe(
    await restReq<TPsetAutorenewal, boolean>('hashtag.setAutorenewal')(params, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

export const recheckIncomplete = async (token: string): Promise<Error | boolean> => {
  return pipe(
    await restReq<{}, boolean>('transaction.recheckIncomplete')({}, token),
    chain(getRestError),
    fold<Errors, Response<boolean>, Error | boolean>(
      (data: any) => {
        throw data
      },
      (data: any) => data.result
    )
  )
}

// export const dashboardGetPurchases = async (
//   payloads: ICurrentDate,
//   token: string
// ): Promise<Error | TDashboardPurchases> => {
//   return pipe(
//     await restReq<ICurrentDate, TDashboardPurchases>('dashboard.getDashboardPurchases')(payloads, token),
//     chain(getRestError),
//     fold<Errors, Response<TDashboardPurchases>, Error | TDashboardPurchases>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }

// export const dashboardGetMothlyRevenue = async (
//   payloads: ICurrentDate,
//   token: string
// ): Promise<Error | TDashboardMonthlyRevenue> => {
//   return pipe(
//     await restReq<ICurrentDate, TDashboardMonthlyRevenue>('dashboard.getDashboardMonthlyRevenue')(payloads, token),
//     chain(getRestError),
//     fold<Errors, Response<TDashboardMonthlyRevenue>, Error | TDashboardMonthlyRevenue>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }
// export const dashboardGetDomainAnalytics = async (
//   payloads: ICurrentDate,
//   token: string
// ): Promise<Error | TDashboardDomainAnalytics> => {
//   return pipe(
//     await restReq<ICurrentDate, TDashboardDomainAnalytics>('dashboard.getDashboardDomainAnalytics')(payloads, token),
//     chain(getRestError),
//     fold<Errors, Response<TDashboardDomainAnalytics>, Error | TDashboardDomainAnalytics>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }
// export const dashboardGetBridgeEarning = async (
//   payloads: ICurrentDate,
//   token: string
// ): Promise<Error | TDashboardBridgeEarning> => {
//   return pipe(
//     await restReq<ICurrentDate, TDashboardBridgeEarning>('dashboard.getDashboardBridgeEarning')(payloads, token),
//     chain(getRestError),
//     fold<Errors, Response<TDashboardBridgeEarning>, Error | TDashboardBridgeEarning>(
//       (data: any) => {
//         throw data
//       },
//       (data: any) => data.result
//     )
//   )
// }
