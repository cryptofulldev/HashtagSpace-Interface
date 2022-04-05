import { PayP, WithdrawReqP, ConfirmWithdrawReqP, RejectWithdrawReqP, TDirectlyPaymentP } from '../../utils/api'

export function payHashtag(val: PayP): { type: string; val: PayP } {
  return {
    type: 'PAY_HASHTAG',
    val,
  }
}

export function withdrawHashtagReq(val: WithdrawReqP): { type: string; val: WithdrawReqP } {
  return {
    type: 'WITHDRAW_HASHTAG_REQ',
    val,
  }
}

export function confirmWithdrawReq(val: ConfirmWithdrawReqP): { type: string; val: ConfirmWithdrawReqP } {
  return {
    type: 'CONFIRM_WITHDRAW_REQ',
    val,
  }
}

export function rejectWithdrawReq(val: RejectWithdrawReqP): { type: string; val: RejectWithdrawReqP } {
  return {
    type: 'REJECT_WITHDRAW_REQ',
    val,
  }
}

export type TAsendMhcWithdrawData = {
  type: 'SEND_MHC_WITHDRAW_DATA'
  payload: {
    id: string
    amount: string
    type: string
    withdrawAddress: string
  }
}
export function sendMhcWithdrawData(payload: TAsendMhcWithdrawData['payload']): TAsendMhcWithdrawData {
  return {
    type: 'SEND_MHC_WITHDRAW_DATA',
    payload,
  }
}

export function getListTransaction(): { type: string } {
  return {
    type: 'GET_LIST_TRANSACTION',
  }
}
export function getBalance(): { type: string } {
  return {
    type: 'GET_BALANCE',
  }
}

export function getAdminBalance(): { type: string } {
  return {
    type: 'GET_ADMIN_BALANCE',
  }
}

export type TAgetUserMHC = {
  type: 'GET_USER_MHC_BALANCE'
  payload: {
    address: string
  }
}

export function getUserMHCBalance(payload: TAgetUserMHC['payload']): TAgetUserMHC {
  return {
    type: 'GET_USER_MHC_BALANCE',
    payload,
  }
}

type forListSearch = { search: string; limit: number; isClear: boolean }
export function getListTransactionForAdm(val: forListSearch): {
  type: 'GET_LIST_TRANSACTION_FOR_ADM'
  val: forListSearch
} {
  return {
    type: 'GET_LIST_TRANSACTION_FOR_ADM',
    val,
  }
}

export function rernderListTransactionForAdm(): { type: string } {
  return {
    type: 'RERNDER_LIST_TRANSACTION_FORADM',
  }
}

export function setListTransactionFilterTextForAdmin(val: string): { type: string; val: string } {
  return {
    type: 'LIST_TRANSACTION_FILTER_TEXT_FOR_ADM',
    val,
  }
}

export type TAsendPayData = {
  type: 'SEND_PAY_DATA'
  payload: {
    amount: string
    type: string
    transactionType: PayP['transactionType']
  }
}

export function sendPayData(payload: TAsendPayData['payload']): TAsendPayData {
  return {
    type: 'SEND_PAY_DATA',
    payload,
  }
}
export function onRecheckIncomplete() {
  return {
    type: 'RECHECK_IN_COMPLETE',
  }
}

export type TAgetNickList = {
  type: 'GET_LIST_NICK'
}

export function getNickList(): TAgetNickList {
  return {
    type: 'GET_LIST_NICK',
  }
}

export type TAsendCredit = {
  type: 'SEND_CREDIT'
  payload: {
    receiver: string
    amount: number
  }
}

export function sendCredit(payload: TAsendCredit['payload']): TAsendCredit {
  return {
    type: 'SEND_CREDIT',
    payload,
  }
}

export function directlyPay(val: TDirectlyPaymentP): { type: string; val: TDirectlyPaymentP } {
  return {
    type: 'DIRECT_PAYMENT',
    val,
  }
}
