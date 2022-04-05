import { Сondition3 } from '../reducers/user'

export interface RegistrationVal {
  email: string
  password: string
}
export function onRegistration(val: RegistrationVal) {
  return {
    type: 'ON_REGISTRATION',
    val,
  }
}
export function onAuth(val: RegistrationVal) {
  return {
    type: 'ON_AUTH',
    val,
  }
}
export function clearErrorRegistration() {
  return {
    type: 'ERROR_REGISTRATION',
    val: '',
  }
}
export function clearErrorAuth() {
  return {
    type: 'ERROR_AUTH',
    val: '',
  }
}
export function checkLogin() {
  return {
    type: 'CHECK_LOGIN',
  }
}
export function onLogOut() {
  return {
    type: 'ON_LOG_OUT',
  }
}

export function checkedRole(val: Сondition3) {
  return {
    type: 'CHECKED_ROLE',
    val,
  }
}
export type TonUserEdit = {
  type: 'ON_USER_EDIT'
  val: {
    file: FormData | null
    last_name: string
    first_name: string
    password: string
    info: string | null
    instagram: string | null
    facebook: string | null
    telegram: string | null
    skype: string | null
    nick: string
    mhc_address: string
    paypal_address: string
  }
}
export function onUserEdit(val: TonUserEdit['val']): TonUserEdit {
  return {
    type: 'ON_USER_EDIT',
    val,
  }
}

export type TonForgotPassword = {
  type: 'ON_FORGOTPASSWORD'
  val: string
}
export function onForgotPassword(val: TonForgotPassword['val']): TonForgotPassword {
  return {
    type: 'ON_FORGOTPASSWORD',
    val,
  }
}

export type TonResetPassword = {
  type: 'ON_RESETPASSWORD'
  val: {
    code: string
    password: string
  }
}
export function onResetPassword(val: TonResetPassword['val']): TonResetPassword {
  return {
    type: 'ON_RESETPASSWORD',
    val,
  }
}

export type TonGetResetCode = {
  type: 'ON_GET_RESET_CODE'
}
export function onGetResetCode(): TonGetResetCode {
  return {
    type: 'ON_GET_RESET_CODE',
  }
}

export type TonGetQRGA = {
  type: 'ON_GET_QR_GA'
}
export function onGetQRGA(): TonGetQRGA {
  return {
    type: 'ON_GET_QR_GA',
  }
}
export type TonClear = {
  type: 'ON_CLEAR_QR_GA'
}
export function onClear(): TonClear {
  return {
    type: 'ON_CLEAR_QR_GA',
  }
}

export type TonRegistrationGA = {
  type: 'ON_REGISTRATION_GA'
  val: string
}

export function onRegistrationGA(val: TonRegistrationGA['val']): TonRegistrationGA {
  return {
    type: 'ON_REGISTRATION_GA',
    val,
  }
}
export type TonCloseModalCode = {
  type: 'ON_CLOSE_MODAL_CODE'
}
export function onCloseModalCode(): TonCloseModalCode {
  return {
    type: 'ON_CLOSE_MODAL_CODE',
  }
}

export type TonUnbindGA = {
  type: 'ON_UNBIND_GA'
  val: string
}

export function onUnbindGA(val: TonUnbindGA['val']): TonUnbindGA {
  return {
    type: 'ON_UNBIND_GA',
    val,
  }
}
export type TonAnswerAuthGA = {
  type: 'ON_ANSWER_AUTH_GA'
  val: string
}

export function onAnswerAuthGA(val: TonAnswerAuthGA['val']): TonAnswerAuthGA {
  return {
    type: 'ON_ANSWER_AUTH_GA',
    val,
  }
}

export interface TAffiliateData {
  userWalletAddress: string
  affiliateLink: { ref: string; cryptoRef: string; cryptoType: string; userID: number }
}
export function addAffiliateData(val: TAffiliateData) {
  return {
    type: 'ADD_AFFILIATE_DATA',
    val,
  }
}
export function getAffiliateData() {
  return {
    type: 'GET_AFFILIATE_DATA',
  }
}
export interface TUserInfo {
  userEmailList: Array<string>
}
export function getUserEmailInfo(val: TUserInfo) {
  return {
    type: 'GET_USER_INFO',
    val,
  }
}
