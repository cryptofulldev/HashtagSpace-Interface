import { all, call, delay, fork, put, select, takeLatest, throttle } from '@redux-saga/core/effects'
import { push } from 'connected-react-router'
import { Record } from 'immutable'
import { fetchSetAutorenewal } from '../actions/hashtag'
import {
  getListTransactionForAdm as onGetListTransactionForAdm,
  TAgetUserMHC,
  TAsendCredit,
  TAsendMhcWithdrawData,
  TAsendPayData,
} from '../actions/transaction'
import { Actions as ActionsTransaction, Init as Transaction } from '../reducers/transaction'
import {
  confirmWithdraw,
  ConfirmWithdrawReqP,
  ConfirmWithdrawReqR,
  directlyPayment,
  getAdminBalance,
  GetAdminBalanceR,
  getBalance,
  getListTransaction,
  getListTransactionForAdmin,
  GetListTransactionR,
  GetListTransactionRForAdm,
  getNickList,
  getSettings,
  getUserMHCBalance,
  ItemTransaction,
  pay,
  PayP,
  PayR,
  recheckIncomplete,
  rejectWithdraw,
  RejectWithdrawReqP,
  sendCredit,
  setAutorenewal,
  SettingItems,
  TDirectlyPaymentP,
  TDirectlyPaymentR,
  TGetNickNameListR,
  withdrawReq,
  WithdrawReqP,
  WithdrawReqR,
} from '../../utils/api'
import { checkErorr, getToken } from './helper'

interface Action<T> {
  val: T
  type: string
}

export function* watcherSaga() {
  yield takeLatest('PAY_HASHTAG', workerPay)
  yield takeLatest('WITHDRAW_HASHTAG_REQ', workerWithdrawRequest)
  yield takeLatest('CONFIRM_WITHDRAW_REQ', workerConfirmWithdrawReq)
  yield takeLatest('REJECT_WITHDRAW_REQ', workerRejectWithdrawReq)
  yield takeLatest('SEND_MHC_WITHDRAW_DATA', workerMhcWithdrawReq)
  yield takeLatest('GET_LIST_TRANSACTION', workerGetListTransaction)
  yield takeLatest('GET_BALANCE', workerGetBalance)
  yield takeLatest('GET_ADMIN_BALANCE', workerGetAdminBalance)
  yield takeLatest('GET_USER_MHC_BALANCE', workerGetUserMHCBalance)
  yield takeLatest('SEND_PAY_DATA', workerSendPayData)
  yield takeLatest('ON_FETCHSETAUTORENEWAL', workerSetAutorenewal)
  yield takeLatest('RERNDER_LIST_TRANSACTION_FORADM', workerRernderListTransactionForAdm)
  yield takeLatest('RECHECK_IN_COMPLETE', workerRecheckIncomplete)

  yield throttle(500, 'GET_LIST_TRANSACTION_FOR_ADM', workerGetListTransactionForAdm)

  yield takeLatest('GET_LIST_NICK', getListNick)
  yield takeLatest('SEND_CREDIT', workerSendCredit)
  yield takeLatest('DIRECT_PAYMENT', workerDirectlyPayment)
}

const getListTransactionForAdm = ({ transaction }: { transaction: Record<Transaction> }): Array<ItemTransaction> =>
  transaction.get('listTransactionForAdm')

function* workerGetListTransaction() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield fork(workerGetPrice)
    const listTransaction: GetListTransactionR = yield call(getListTransaction, token)

    yield put({
      type: 'LIST_TRANSACTION',
      val: listTransaction.items,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerPay({ val }: Action<PayP>) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })
    const url = new URL(window.location.protocol + '//' + window.location.host + window.location.pathname + 'payment')
    url.searchParams.set('amount', val.amount.toFixed(2))
    url.searchParams.set('type', val.type)
    url.searchParams.set('transactionType', val.transactionType)

    window.open(url.toString(), '_blank')
    yield delay(10)
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

function* workerWithdrawRequest({ val }: Action<WithdrawReqP>) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_WITHDRAW',
      val: true,
    })
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    if (!(val.type === 'paypal' || val.type === 'metahash')) {
      return
    }

    const withdrawRes: WithdrawReqR = yield call(
      withdrawReq,
      {
        amount: val.amount,
        fee: val.fee,
        type: val.type,
        withdrawAddress: val.withdrawAddress,
      },
      token
    )

    if (withdrawRes) {
      const listTransaction: GetListTransactionR = yield call(getListTransaction, token)

      yield put({
        type: 'LIST_TRANSACTION',
        val: listTransaction.items,
      })
    }
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_WITHDRAW',
      val: false,
    })
  }
}

function* workerConfirmWithdrawReq({ val }: Action<ConfirmWithdrawReqP>) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    if (!(val.type === 'paypal' || val.type === 'metahash')) {
      return
    }

    if (val.type === 'paypal') {
      yield call(
        confirmWithdraw,
        {
          id: val.id,
          amount: val.amount,
          type: val.type,
          withdrawAddress: val.withdrawAddress,
        },
        token
      )
    } else {
      const url = new URL(window.location.protocol + '//' + window.location.host + '/admin/confirmWithdraw')
      url.searchParams.set('id', val.id.toString())
      url.searchParams.set('amount', val.amount.toString())
      url.searchParams.set('type', val.type)
      url.searchParams.set('withdrawAddress', val.withdrawAddress)

      window.open(url.toString(), '_blank')
      yield delay(10)
    }
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

function* workerMhcWithdrawReq({ payload }: TAsendMhcWithdrawData) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    if (!(payload.type === 'paypal' || payload.type === 'metahash')) {
      return
    }
    const resPay: ConfirmWithdrawReqR = yield call(
      confirmWithdraw,
      {
        id: parseInt(payload.id),
        amount: parseFloat(payload.amount),
        type: payload.type,
        withdrawAddress: payload.withdrawAddress,
      },
      token
    )

    window.location.href = resPay.redirectLink
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

function* workerRejectWithdrawReq({ val }: Action<RejectWithdrawReqP>) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    yield call(
      rejectWithdraw,
      {
        id: val.id,
      },
      token
    )
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

function* workerGetBalance() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      //yield put(push(`/login/`));
      return
    }
    const balance: number = yield call(getBalance, token)
    yield put({
      type: 'BALANCE',
      val: balance,
    })
  } catch (e: any) {
    console.error({ e })
  }
}

function* workerGetAdminBalance() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      return
    }
    const adminBalance: GetAdminBalanceR = yield call(getAdminBalance, token)

    yield put({
      type: 'ADMIN_BALANCE',
      val: adminBalance,
    })
  } catch (e: any) {
    console.error({ e })
  }
}

function* workerGetUserMHCBalance({ payload }: TAgetUserMHC) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      return
    }

    const userMHCBalance: number = yield call(
      getUserMHCBalance,
      {
        address: payload.address,
      },
      token
    )

    // yield put({
    //   type: 'ADMIN_BALANCE',
    //   val: adminBalance,
    // });
  } catch (e: any) {
    console.error({ e })
  }
}

function* workerGetListTransactionForAdm({ val }: Action<{ search: string; limit: number; isClear: boolean }>) {
  try {
    const { search, limit, isClear } = val
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const oldList: ItemTransaction[] = isClear ? [] : yield select(getListTransactionForAdm)

    const list: GetListTransactionRForAdm = yield call(
      getListTransactionForAdmin,
      { filter: { search: search, limit, offset: oldList.length } },
      token
    )

    const newList = [...oldList, ...list.items]

    if (newList.length > list.total_count) {
      return
    }

    yield all([
      put({
        type: 'LIST_TRANSACTION_FOR_ADM',
        val: newList,
      }),
      put({
        type: 'LIST_TRANSACTION_СOUNT_FOR_ADM',
        val: list.total_count,
      }),
      put({
        type: 'LIST_TRANSACTION_WITHDRAW_REQ_СOUNT_FOR_ADM',
        val: list.withdraw_req_count,
      }),
    ])
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerRernderListTransactionForAdm() {
  yield all([
    put({
      type: 'LIST_TRANSACTION_FOR_ADM',
      val: [],
    }),
    put({
      type: 'LIST_TRANSACTION_СOUNT_FOR_ADM',
      val: 0,
    }),
  ])
}

function* workerGetPrice() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const { domain_price }: SettingItems = yield call(getSettings, token)
    const itemPrice = domain_price.find((item) => item.name === '#')
    const price = typeof itemPrice === 'undefined' ? 0 : itemPrice.value
    yield put({
      type: 'PRICE_#',
      val: price,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerSendPayData({ payload }: TAsendPayData) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    if (!(payload.type === 'paypal' || payload.type === 'metahash')) {
      return
    }
    const resPay: PayR = yield call(
      pay,
      {
        amount: parseFloat(payload.amount),
        type: payload.type,
        transactionType: payload.transactionType,
      },
      token
    )

    if (resPay) {
      const listTransaction: GetListTransactionR = yield call(getListTransaction, token)

      yield put({
        type: 'LIST_TRANSACTION',
        val: listTransaction.items,
      })
    }
    window.location.href = resPay.redirectLink
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

function* workerSetAutorenewal({ payload }: ReturnType<typeof fetchSetAutorenewal>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(setAutorenewal, token, payload)
  } catch (e: any) {
    console.error(e.message)
  }
}
function* workerRecheckIncomplete() {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOADING_RECHECKINCOMPLETE',
      val: true,
    })
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(recheckIncomplete, token)

    yield put(onGetListTransactionForAdm({ search: '', limit: 10, isClear: true }))
  } catch (e: any) {
    console.error(e.message)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOADING_RECHECKINCOMPLETE',
      val: false,
    })
  }
}

function* getListNick() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const nickList: TGetNickNameListR[] = yield call(getNickList, token)
    yield put({
      type: 'LIST_NICK_NAME',
      val: nickList,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerSendCredit({ payload }: TAsendCredit) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const res: boolean = yield call(
      sendCredit,
      {
        receiver: payload.receiver,
        amount: payload.amount,
      },
      token
    )

    if (res) {
      const listTransaction: GetListTransactionR = yield call(getListTransaction, token)

      yield put({
        type: 'LIST_TRANSACTION',
        val: listTransaction.items,
      })
    }
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

function* workerDirectlyPayment({ val }: Action<TDirectlyPaymentP>) {
  try {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: true,
    })

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    if (!(val.type === 'paypal' || val.type === 'metahash')) {
      return
    }

    const resPay: TDirectlyPaymentR = yield call(
      directlyPayment,
      {
        amount: val.amount,
        nick: val.nick,
        type: val.type,
        address: val.address,
      },
      token
    )

    window.open(resPay.redirectLink, '_blank')
  } catch (e: any) {
    console.error(e.message)
    yield fork(checkErorr, e)
  } finally {
    yield put<ActionsTransaction>({
      type: 'IS_LOAD_SEND_PAY',
      val: false,
    })
  }
}

export default watcherSaga
