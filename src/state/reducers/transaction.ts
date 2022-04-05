import { ItemTransaction, TGetNickNameListR } from '../../utils/api'
import { Record } from 'immutable'
import { Action } from '../../types'

export interface AdminBalance {
  paypal: number
  metahash: number
}

export type ListTransaction = Array<Omit<ItemTransaction, 'user_email'>>

export interface Init {
  listTransaction: ListTransaction
  balance: number
  adminBalance: AdminBalance
  isLoadSendPay: boolean
  isLoadSendWithdraw: boolean
  listTransactionForAdm: Array<ItemTransaction>
  listTransactionCountForAdm: number
  listTransactionWithdrawReqCountForAdm: number
  listTransactionFilterTextForAdmin: string
  price: number
  isLoadingRecheckIncomplete: boolean
  listNickName: Array<TGetNickNameListR>
}

export const init: Init = {
  listTransaction: [],
  balance: 0.0,
  adminBalance: { paypal: 0.0, metahash: 0.0 },
  isLoadSendPay: false,
  isLoadSendWithdraw: false,
  listTransactionForAdm: [],
  listTransactionCountForAdm: 0,
  listTransactionWithdrawReqCountForAdm: 0,
  listTransactionFilterTextForAdmin: '',
  price: 0,
  isLoadingRecheckIncomplete: false,
  listNickName: [],
}

export type Actions =
  | Action<'LIST_TRANSACTION', ListTransaction>
  | Action<'BALANCE', number>
  | Action<'ADMIN_BALANCE', AdminBalance>
  | Action<'IS_LOAD_SEND_PAY', boolean>
  | Action<'IS_LOAD_SEND_WITHDRAW', boolean>
  | Action<'LIST_TRANSACTION_FOR_ADM', Array<ItemTransaction>>
  | Action<'PRICE_#', number>
  | Action<'LIST_TRANSACTION_СOUNT_FOR_ADM', number>
  | Action<'LIST_TRANSACTION_WITHDRAW_REQ_СOUNT_FOR_ADM', number>
  | Action<'LIST_TRANSACTION_FILTER_TEXT_FOR_ADM', string>
  | Action<'IS_LOADING_RECHECKINCOMPLETE', boolean>
  | Action<'LIST_NICK_NAME', Array<TGetNickNameListR>>

const State: Record.Factory<Init> = Record(init)

const reducer = function (state: Record<Init> = new State(), action: Actions): Record<Init> {
  switch (action.type) {
    case 'LIST_TRANSACTION':
      return state.set('listTransaction', action.val)
    case 'BALANCE':
      return state.set('balance', action.val)
    case 'ADMIN_BALANCE':
      return state.set('adminBalance', action.val)
    case 'IS_LOAD_SEND_PAY':
      return state.set('isLoadSendPay', action.val)
    case 'IS_LOAD_SEND_WITHDRAW':
      return state.set('isLoadSendWithdraw', action.val)
    case 'LIST_TRANSACTION_FOR_ADM':
      return state.set('listTransactionForAdm', action.val)
    case 'LIST_TRANSACTION_СOUNT_FOR_ADM':
      return state.set('listTransactionCountForAdm', action.val)
    case 'LIST_TRANSACTION_WITHDRAW_REQ_СOUNT_FOR_ADM':
      return state.set('listTransactionWithdrawReqCountForAdm', action.val)
    case 'LIST_TRANSACTION_FILTER_TEXT_FOR_ADM':
      return state.set('listTransactionFilterTextForAdmin', action.val)
    case 'PRICE_#':
      return state.set('price', action.val)
    case 'IS_LOADING_RECHECKINCOMPLETE':
      return state.set('isLoadingRecheckIncomplete', action.val)
    case 'LIST_NICK_NAME':
      return state.set('listNickName', action.val)

    default:
      return state
  }
}

export default reducer
