import { Record } from 'immutable'
import { Action } from '../../types'
import { TAffiliateRes, UserInfo } from '../../utils/api'
// import  { ToastId } from 'react-toastify';

export type Сondition3 = 'UNKNOWN' | 'NO' | 'YES'
export interface Init {
  errorRegistration: string
  errorAuth: string
  isLogin: boolean
  userInfo: UserInfo
  isAdmin: Сondition3
  urlQR: string
  unBindGA: string
  isOpenAuthGA: boolean
  toastId: null | string
  resetPwdCode: string
  isSentToEmail: null | boolean
  affiliateData: null | TAffiliateRes[]
}

export const init: Init = {
  errorRegistration: '',
  errorAuth: '',
  isLogin: false,
  userInfo: {
    id: 0,
    email: '',
    role: '',
    is_admin: false,
    first_name: null,
    last_name: null,
    img: null,
    enabled_ga: false,
    social_network: null,
    info: null,
    nick: '',
    mhc_address: '',
    paypal_address: '',
    referral_status: false,
  },
  isAdmin: 'UNKNOWN',
  urlQR: '',
  unBindGA: '',
  isOpenAuthGA: false,
  toastId: null,
  resetPwdCode: '',
  isSentToEmail: null,
  affiliateData: null,
}

type Actions =
  | Action<'ERROR_REGISTRATION', string>
  | Action<'ERROR_AUTH', string>
  | Action<'IS_LOGIN', boolean>
  | Action<'USER_INFO', UserInfo>
  | Action<'IS_ADMIN', Сondition3>
  | Action<'URL_QR_GA', string>
  | Action<'UN_BIND_GA', string>
  | Action<'TOAST_ID', Init['toastId']>
  | Action<'IS_OPEN_AUTH_GA', boolean>
  | Action<'RESET_PWD_CODE', string>
  | Action<'IS_SENT_EMAIL', boolean>
  | Action<'SAVE_AFFILIATE_DATA', TAffiliateRes[]>

const State: Record.Factory<Init> = Record(init)

const reducer = function (state: Record<Init> = new State(), action: Actions): Record<Init> {
  switch (action.type) {
    case 'ERROR_REGISTRATION':
      return state.set('errorRegistration', action.val)
    case 'ERROR_AUTH':
      return state.set('errorAuth', action.val)
    case 'IS_LOGIN':
      return state.set('isLogin', action.val)
    case 'USER_INFO':
      return state.set('userInfo', action.val)
    case 'IS_ADMIN':
      return state.set('isAdmin', action.val)
    case 'URL_QR_GA':
      return state.set('urlQR', action.val)
    case 'UN_BIND_GA':
      return state.set('unBindGA', action.val)
    case 'IS_OPEN_AUTH_GA':
      return state.set('isOpenAuthGA', action.val)
    case 'TOAST_ID':
      return state.set('toastId', action.val)
    case 'RESET_PWD_CODE':
      return state.set('resetPwdCode', action.val)
    case 'IS_SENT_EMAIL':
      return state.set('isSentToEmail', action.val)
    case 'SAVE_AFFILIATE_DATA':
      return state.set('affiliateData', action.val)

    default:
      return state
  }
}

export default reducer
