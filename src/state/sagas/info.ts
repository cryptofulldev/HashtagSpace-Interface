import { all, call, delay, fork, put, takeLatest } from '@redux-saga/core/effects'
import { push } from 'connected-react-router'
import { List } from 'immutable'
import {
  TonAddInfo,
  TOnEditInfo,
  TonGetItemInfo,
  TonOpenTexTModal,
  TonRemoveIteminfo,
  TOnSortInfoList,
} from '../actions/info'
import { defaultItemInfo } from '../reducers/info'
import { addInfo, editInfo, getItemInfo, getListInfo, InfoItemID, removeItemInfo, TListInfo } from '../../utils/api'
import { checkErorr, getToken } from './helper'

export function* watcherSaga() {
  yield takeLatest('ON_ADD_INFO', workerAddInfo)
  yield takeLatest('ON_GET_LIST_INFO', workerGetListInfo)
  yield takeLatest('ON_GET_ITEM_INFO', workerGetItemInfo)
  yield takeLatest('ON_EDIT_INFO', workerOnEditInfo)
  yield takeLatest('ON_RERENDER_INFO', workerOnRerenderInfo)
  yield takeLatest('ON_REMOVE_ITEM_INFO', workerOnRemoveIteminfo)
  yield takeLatest('ON_OPEN_TEXT_MODAL', workerOnOpenTexTModal)
  yield takeLatest('ON_CLOSE_TEXT_MODAL', workerOnCloseTexTModal)
  yield takeLatest('ON_SORT_INFO_LIST', workerOnSortInfoList)
}

function* workerAddInfo({ payload }: TonAddInfo) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(addInfo, token, payload)

    yield put(push(`/admin/changeInfo/`))
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerGetListInfo() {
  try {
    const listInfo: TListInfo = yield call(getListInfo)
    listInfo.sort((a, b) => a.sort - b.sort)

    yield put({
      type: 'LIST_INFO',
      val: List(listInfo),
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerGetItemInfo({ payload }: TonGetItemInfo) {
  try {
    const itemInfo: InfoItemID = yield call(getItemInfo, { id: payload })
    console.log('itemInfoSaga===>>>', itemInfo)
    yield put({
      type: 'ITEM_INFO',
      val: itemInfo,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerOnEditInfo({ payload }: TOnEditInfo) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(editInfo, token, payload)
    yield put(push(`/admin/changeInfo/`))
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerOnRerenderInfo() {
  try {
    yield put({
      type: 'ITEM_INFO',
      payload: {
        id: -1,
        title: '',
        description: '',
      },
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerOnRemoveIteminfo({ payload }: TonRemoveIteminfo) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(removeItemInfo, token, { id: payload })
    yield fork(workerGetListInfo)
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerOnOpenTexTModal({ payload }: TonOpenTexTModal) {
  try {
    yield put({
      type: 'IS_OPEN_TEXT_MODAL',
      payload: true,
    })
    const itemInfo: InfoItemID = yield call(getItemInfo, { id: payload })
    yield put({
      type: 'ITEM_INFO_FOR_MODAL',
      payload: itemInfo,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerOnCloseTexTModal() {
  try {
    yield put({
      type: 'IS_OPEN_TEXT_MODAL',
      payload: false,
    })
    yield delay(200)
    yield put({
      type: 'ITEM_INFO_FOR_MODAL',
      payload: defaultItemInfo,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerOnSortInfoList({ payload }: TOnSortInfoList) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const listIndex: { id: number; sort: number }[] = []
    payload.forEach((item, index) => {
      if (item.sort !== index) {
        listIndex.push({ id: item.id, sort: index })
      }
    })

    yield all(listIndex.map((item, index) => call(editInfo, token, { id: item.id, fields: { sort: item.sort } })))

    yield fork(workerGetListInfo)
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

export default watcherSaga
