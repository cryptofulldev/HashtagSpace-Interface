import { all, call, fork, put, select, takeLatest, throttle } from '@redux-saga/core/effects'
import { push } from 'connected-react-router'
import { Record } from 'immutable'
import { toast } from 'react-toastify'
import { TonSetSettings } from '../actions/hashtag'
import { Init as Actions } from '../reducers/actions'
import { Init as User } from '../reducers/user'
import {
  addPremium,
  categoryAddForAdm,
  categoryEditForAdm,
  categoryRemoveForAdm,
  getListHastagForAdmin,
  getListPremium,
  getSettings,
  ListHastagForAdmin,
  ListHastagItemForAdmin,
  ListPremium,
  ListPremiumFilter,
  removePremium,
  setSettings,
  SettingItems,
} from '../../utils/api'
import { workerGetCategoryList } from './domain'
import { checkErorr, getToken } from './helper'

function* watcherSaga() {
  yield takeLatest('GET_LIST_HASTAG_FOR_ADMIN', workerGetListHastagForAdmin)
  yield takeLatest('ADD_CATEGORY_FOR_ADM', workerCategoryAddForAdm)
  yield takeLatest('REMOVE_CATEGORY_FOR_ADM', workerCategoryRemoveForAdm)
  yield takeLatest('EDIT_CATEGORY_FOR_ADM', workerCategoryEditForAdm)
  yield takeLatest('ON_GET_SETTINGS', workerGetSettings)
  yield takeLatest('ON_SET_SETTINGS', workerSetSettings)
  yield takeLatest('ON_ADD_PREMIUM', workerOnAddPremium)
  yield takeLatest('ON_DEL_PREMIUM', workerOnDelPremium)

  yield throttle(500, 'ON_SEARCH_HASHTAG_IN_LIST_FOR_ADM', workerOnSearchHashtagInListForAdm)
  yield throttle(500, 'ON_GET_LIST_PREMIUM', workerOnGetListPremium)
  yield takeLatest('ON_CLEAR_HASHTAG_LIST_FOR_ADM', workerOnClearHashtagListForAdm)
}

const getIsAdmin = ({ user }: { user: Record<User> }): string => user.get('isAdmin')
const getHashtagListForAdm = ({ actions }: { actions: Record<Actions> }): Array<ListHastagItemForAdmin> =>
  actions.get('listHastagForAdmin')

interface Action<T> {
  val: T
  type: string
}

function* workerGetListHastagForAdmin(search: string = '') {
  try {
    const limit = 10
    const IsAdmin: string = yield select(getIsAdmin)
    if (IsAdmin !== 'YES') {
      return
      //throw new Error('Role is not admin');
    }

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const oldList: Array<ListHastagItemForAdmin> = yield select(getHashtagListForAdm)

    const list: ListHastagForAdmin = yield call(
      getListHastagForAdmin,
      { filter: { search, limit, offset: oldList.length } },
      token
    )

    const newList = [...oldList, ...list.items]

    if (newList.length > list.total_count) {
      return
    }

    yield all([
      put({
        type: 'LIST_HASTAG_FOR_ADMIN',
        val: newList,
      }),
      put({
        type: 'HASHTAG_LIST_СOUNT_FOR_ADMIN',
        val: list.total_count,
      }),
    ])
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerCategoryAddForAdm({ val }: Action<string>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const IsAdmin: string = yield select(getIsAdmin)
    if (IsAdmin !== 'YES') {
      throw new Error('Role is not admin')
    }

    const isAdd: boolean = yield call(categoryAddForAdm, { name: val }, token)
    if (!isAdd) {
      throw new Error('Category does not add')
    }

    yield call(workerGetCategoryList)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerCategoryRemoveForAdm({ val }: Action<string>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const IsAdmin: string = yield select(getIsAdmin)
    if (IsAdmin !== 'YES') {
      throw new Error('Role is not admin')
    }

    const isAdd: boolean = yield call(categoryRemoveForAdm, { id: val }, token)
    if (!isAdd) {
      throw new Error('Category does not remove')
    }

    yield call(workerGetCategoryList)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerCategoryEditForAdm({ val }: Action<{ id: string; name: string }>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const IsAdmin: string = yield select(getIsAdmin)
    if (IsAdmin !== 'YES') {
      throw new Error('Role is not admin')
    }

    const isAdd: boolean = yield call(categoryEditForAdm, { id: val.id, fields: { name: val.name } }, token)
    if (!isAdd) {
      throw new Error('Category does not edit')
    }

    yield call(workerGetCategoryList)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

let lastValForAdm: string = ''
function* workerOnSearchHashtagInListForAdm({ val }: Action<string>) {
  try {
    if (lastValForAdm === val) {
      return
    }

    if (!val) {
      yield all([
        put({
          type: 'LIST_HASTAG_FOR_ADMIN',
          val: [],
        }),
        put({
          type: 'HASHTAG_LIST_СOUNT',
          val: 0,
        }),
      ])

      lastValForAdm = val
      yield call(workerGetListHastagForAdmin)

      return
    }
    if (val.length < 3) {
      return
    }

    yield all([
      put({
        type: 'LIST_HASTAG_FOR_ADMIN',
        val: [],
      }),
      put({
        type: 'HASHTAG_LIST_СOUNT_FOR_ADMIN',
        val: 0,
      }),
    ])

    lastValForAdm = val
    yield call(workerGetListHastagForAdmin, val)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerOnClearHashtagListForAdm() {
  yield all([
    put({
      type: 'LIST_HASTAG_FOR_ADMIN',
      val: [],
    }),
    put({
      type: 'HASHTAG_LIST_СOUNT_FOR_ADMIN',
      val: 0,
    }),
  ])
}

function* workerGetSettings() {
  yield put({
    type: 'IS_LOAD_FSETING',
    val: false,
  })
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const settings: SettingItems = yield call(getSettings, token)

    yield put({
      type: 'SETTINGS',
      val: { ...settings, domain_price: settings.domain_price.filter((item) => item.name === '#') },
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerSetSettings({ payload }: TonSetSettings) {
  yield put({
    type: 'IS_LOAD_FSETING',
    val: true,
  })
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const settings: boolean = yield call(setSettings, { fields: payload }, token)

    if (settings) {
      yield call(workerGetSettings)
    }
    yield put({
      type: 'IS_LOAD_FSETING',
      val: true,
    })
    yield put({
      type: 'IS_LOAD_FSETING',
      val: true,
    })
    toast.success('Changes saved.', {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
    yield put({
      type: 'IS_LOAD_FSETING',
      val: false,
    })
  }
}

function* workerOnGetListPremium({ val }: Action<{ search: string }>) {
  try {
    const { search } = val
    const params: ListPremiumFilter = {}
    if (search) {
      params.filter = { search }
    }
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    const listPremium: ListPremium = yield call(getListPremium, token, params)

    yield put({
      type: 'LIST_PREMIUM',
      val: listPremium,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerOnAddPremium({ val }: Action<string>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(addPremium, { id: val }, token)
    yield fork(workerOnGetListPremium, {
      type: 'ON_GET_LIST_PREMIUM',
      val: { search: '' },
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}
function* workerOnDelPremium({ val }: Action<string>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(removePremium, { id: val }, token)
    yield fork(workerOnGetListPremium, {
      type: 'ON_GET_LIST_PREMIUM',
      val: { search: '' },
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

export default watcherSaga
