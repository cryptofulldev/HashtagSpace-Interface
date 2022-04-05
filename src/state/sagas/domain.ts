import { takeLatest, all, call, put, select, throttle, fork, take } from '@redux-saga/core/effects'
import {
  checkHashtagExists,
  hashtagGetList,
  hashtagEdit,
  getCategoryGetList,
  HashtagListRes,
  HashtagItem,
  hashtagGetItem,
  addCategory,
  hashtagGetItemRes,
  getBalance,
  SettingItems,
  getSettings,
  CheckHashtagR,
  userGetInfo,
  UserInfo,
  HashtagEditP,
  hashtagResale,
  hashtagСancelResale,
  CategoryList,
  getUploadPhotoUrl,
  sendImage,
  TsendImmageRes,
} from '../../utils/api'
import { push } from 'connected-react-router'
import { match, matchPath } from 'react-router-dom'
import { getToken, checkHashtag as isCheckHashtag, checkErorr } from './helper'
import { Init as Actions, IsHashtagBooked } from '../reducers/actions'
import { Record } from 'immutable'
// import { Item } from '../components/DomainEditForm/events'
import { toast } from 'react-toastify'
import { SagaIterator } from 'redux-saga'
import { TActStopResale, TgetHashtagList, TonShowModalManage } from '../actions/hashtag'
import { AppState } from '../index'
import { TonAnswerAuthGA } from '../actions/user'

interface Action<T> {
  val: T
  type: string
}
export function* watcherSaga() {
  yield takeLatest('CHECK_HASHTAG', checkHashtag)
  yield takeLatest('SEARCH_ENGINE_HASHTAG', searchEngineHashtag)
  yield takeLatest('ON_LOADING_DOMAINSRESULT', onLoadingDomainsresult)
  yield takeLatest('SEARCH_HASHTAG', searchHashtag)
  // yield takeLatest('ON_BIND_DOMAIN', onbindDomain);

  yield takeLatest('ON_SHOW_MODAL_MANAGE', onShowModalManage)
  yield takeLatest('ON_CLOSE_MODAL_MANAGE', onCloseModalManage)
  yield takeLatest('ON_EDIT_URL', onEditUrl)

  yield takeLatest('GET_CATEGORY_LIST', workerGetCategoryList)

  //yield takeLatest('ON_SEARCH_HASHTAG_IN_LIST', workerOnSearchHashtagInList);
  //yield takeLatest('GET_HASHTAG_LIST', worcerGetHashtagList);
  //yield throttle(500, 'ON_SEARCH_HASHTAG_IN_LIST', workerOnSearchHashtagInList);
  yield throttle(500, 'GET_HASHTAG_LIST', worcerGetHashtagList)

  yield takeLatest('ON_CLEAR_HASHTAG_LIST', workerOnClearHashtagList)

  // yield takeLatest('ON_DOMAIN_EDIT', workerOnDomainEdit)
  yield takeLatest('ON_HASHTAG_GET_ITEM', workerOnHashtagGetItem)
  yield takeLatest('ON_RERENDER_EDITFORM', workerOnRerenderEditForm)
  // yield takeLatest('*', workerlog);
  yield takeLatest('ON_SET_RESALE', workeronSetResale)
  yield takeLatest('ON_STOP_RESALE', workeronStoResale)
}

const getPathname = ({ router }: { router: Record<any> }) => router.get('location').get('pathname')
const getManageId = ({ actions }: { actions: Record<Actions> }): string => actions.get('manageId')
const getSearchValDomens = ({ modals }: AppState): string => modals.get('searchValDomens')

const getHashtagList = ({ actions }: { actions: Record<Actions> }): Array<HashtagItem> => actions.get('hashtagList')

const getHashtagItem = ({ actions }: { actions: Record<Actions> }): hashtagGetItemRes | undefined =>
  actions.get('hashtagItem')

function* checkHashtag({ val }: Action<string>) {
  try {
    yield put(push(`/prospect/${encodeURIComponent(val)}`))
  } catch (error: any) {
    console.error({ error })
  }
}

function* searchEngineHashtag({ val }: Action<string>) {
  try {
    yield put(push(`/search?q=${encodeURIComponent(val)}`))
  } catch (error: any) {
    console.error({ error })
  }
}

function* onLoadingDomainsresult() {
  const pathname: string = yield select(getPathname)

  interface Params {
    hastag: string
  }

  yield put({
    type: 'IS_CHECK_HASHTAG_ERR',
    val: false,
  })

  const matchD = matchPath(pathname, {
    path: '/domainsresult/:hastag',
    strict: true,
  }) as match<Params> | null

  let hastag = ''

  if (matchD) {
    const mHastag = decodeURIComponent(matchD.params.hastag)
    hastag = isCheckHashtag(mHastag) ? mHastag : ''
  }

  yield put({
    type: 'CHECKING_HASHTAG',
    val: hastag,
  })
  if (hastag) {
    yield call(searchHashtag, { val: hastag, type: 'auto' })
  }
}

function* searchHashtag({ val, type }: Action<string>) {
  try {
    const hashTag: string = val

    if (!isCheckHashtag(hashTag)) {
      yield all([
        put({
          type: 'SHOW_SEARCH_RESULT',
          val: true,
        }),
        put({
          type: 'IS_CHECK_HASHTAG_ERR',
          val: true,
        }),
      ])
      return
    }

    const isHashtagBooked: CheckHashtagR = yield call(checkHashtagExists, {
      id: hashTag,
    })

    const isHash: IsHashtagBooked = {
      status: isHashtagBooked.status,
      type: isHashtagBooked.type,
      is_demo: isHashtagBooked.is_demo,
      allowedBuy: isHashtagBooked.allowedBuy,
      price: isHashtagBooked.price,
      expire: isHashtagBooked.expire,
      applyDiscount: isHashtagBooked.applyDiscount,
      allowedDemoBuy: isHashtagBooked.allowedDemoBuy,
    }

    yield all([
      put({
        type: 'IS_HASHTAG_BOOKED',
        val: isHash,
      }),
      put({
        type: 'CHECKING_HASHTAG',
        val: hashTag,
      }),
      put({
        type: 'SHOW_SEARCH_RESULT',
        val: true,
      }),
      put({
        type: 'IS_CHECK_HASHTAG_ERR',
        val: false,
      }),
    ])
    yield put(push(`/domainsresult/${encodeURIComponent(hashTag)}`))
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

// function* onbindDomain({ payload }: TbindDomain) {
//   try {
//     const hashtag: string = yield select(getHashtag);
//     const isLogin: boolean = getLogin();
//
//     if (!isLogin) {
//       if (getCookie('isAuth') === 'true') {
//         yield put(push(`/login/`));
//       } else {
//         yield put(push(`/login/SignUP/`));
//       }
//
//       window.sessionStorage.setItem('lastHashtag', hashtag);
//       return;
//     }
//
//     const token: string = yield call(getToken);
//     if (!token) {
//       yield put(push(`/login/`));
//       return;
//     }
//
//     const isAdmin = yield select(getIsAdmin);
//
//     let gacode: string = '';
//     if (payload === false && isAdmin !== 'YES') {
//       const [{ domain_price }, balance]: [SettingItems, number] = yield all([
//         call(getSettings, token),
//         call(getBalance, token),
//       ]);
//
//       const tag = hashtag[0];
//       const itemPrice = domain_price.find(item => item.name === tag);
//       const price = typeof itemPrice === 'undefined' ? 0 : itemPrice.value;
//
//       if (price > balance) {
//         toast.error('Insufficient Funds!', {
//           position: 'top-center',
//           autoClose: 5000,
//           closeOnClick: true,
//           pauseOnHover: true,
//         });
//         yield put(push(`/pay/`));
//         return false;
//       }
//
//       const modalReq: boolean = yield call(workerCheckedBuyDomen, price);
//
//       if (!modalReq) {
//         return;
//       }
//     }
//
//     if (payload === false) {
//       const { enabled_ga }: UserInfo = yield call(userGetInfo, token);
//
//       if (enabled_ga) {
//         gacode = yield call(modalQA);
//
//         if (gacode === '') return;
//       }
//     }
//
//     const params: HashtagAddP = { id: hashtag, url: null, demo: payload };
//
//     if (gacode !== '') {
//       params.gacode = gacode;
//     }
//
//     const add = yield call(hashtagAdd, params, token);
//
//     if (add) {
//       yield put(push(`/domainsdashboard/`));
//     }
//     yield put({ type: 'GET_BALANCE' });
//   } catch (e: any) {
//     yield fork(checkErorr, e);
//   }
// }

function* worcerGetHashtagList({ payload }: TgetHashtagList) {
  try {
    const { search, limit, isClear } = payload
    const oldList: Array<HashtagItem> = isClear ? [] : yield select(getHashtagList)
    const token: string = yield call(getToken)

    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const list: HashtagListRes = yield call(
      hashtagGetList,
      { filter: { search: search, limit, offset: oldList.length } },
      token
    )

    const newList = [...oldList, ...list.items]

    if (newList.length > list.total_count) {
      return
    }

    yield all([
      put({
        type: 'HASHTAG_LIST',
        val: newList,
      }),
      put({
        type: 'EXPIRED_LIST',
        val: list.expireList,
      }),
      put({
        type: 'HASHTAG_LIST_СOUNT',
        val: list.total_count,
      }),
      put({
        type: 'SEARCH_VAL_DOMENS',
        val: search,
      }),
    ])
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerOnClearHashtagList() {
  yield all([
    put({
      type: 'HASHTAG_LIST',
      val: [],
    }),
    put({
      type: 'HASHTAG_LIST_СOUNT',
      val: 0,
    }),
  ])
}

function* onShowModalManage({ payload }: TonShowModalManage) {
  try {
    const { id, searchVal } = payload
    yield all([
      put({
        type: 'SHOW_MODALMANAGE',
        val: true,
      }),
      put({
        type: 'MANAGE_ID',
        val: id,
      }),
      put({
        type: 'SEARCH_VAL_DOMENS',
        val: searchVal,
      }),
    ])
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}
function* onCloseModalManage() {
  try {
    yield all([
      put({
        type: 'SHOW_MODALMANAGE',
        val: false,
      }),
      put({
        type: 'MANAGE_ID',
        val: '',
      }),
    ])
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* onEditUrl({ val }: Action<string>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const hashtag: string = yield select(getManageId)

    const edit: Promise<Error | boolean> = yield call(hashtagEdit, { id: hashtag, fields: { url: val } }, token)
    if (!!edit) {
      yield fork(reloadHashagList)
    }
    yield call(onCloseModalManage)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

export function* workerGetCategoryList() {
  try {
    const catigories: CategoryList = yield call(getCategoryGetList)
    yield put({
      type: 'CATEGORY_LIST',
      val: catigories,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

// function* workerOnDomainEdit({ val }: Action<Item>) {
//   try {
//     yield put({
//       type: 'IS_LOAD_F_EDIT',
//       val: true,
//     })

//     const pathname: string = yield select(getPathname)

//     interface Params {
//       hastag: string
//     }

//     const matchD = matchPath(pathname, {
//       path: '/domain_edit/:hastag',
//       strict: true,
//     }) as match<Params> | null

//     let hastag = ''

//     if (matchD) {
//       const mHastag = decodeURIComponent(matchD.params.hastag)
//       hastag = isCheckHashtag(mHastag) ? mHastag : ''
//     }

//     if (!hastag) {
//       console.error('!hastag')
//       return
//     }

//     const token: string = yield call(getToken)
//     if (!token) {
//       yield put(push(`/login/`))
//       return
//     }

//     const { category, ...fields } = val

//     const countKeyWord: number = Array.isArray(fields.keywords) ? fields.keywords.length : 0
//     const checkedPayKeyWords: TcheckedPayKeyWords = yield call(worcerCheckedPayKeyWords, countKeyWord, token)

//     if (!checkedPayKeyWords.isPay) {
//       return
//     }

//     let gacode = ''
//     if (checkedPayKeyWords.count > 0) {
//       const { enabled_ga }: UserInfo = yield call(userGetInfo, token)
//       if (enabled_ga) {
//         gacode = yield call(modalQA)
//         if (gacode === '') return
//       }
//     }

//     const params: HashtagEditP = { id: hastag, fields }

//     if (gacode !== '') {
//       params.gacode = gacode
//     }

//     if (val.file !== null) {
//       const url: string = yield call(getUploadPhotoUrl, token)
//       const sendI: TsendImmageRes = yield call(sendImage, url, val.file)
//       params.fields.imageUrl = sendI.file
//     }

//     if (category === '') {
//       yield call(hashtagEdit, params, token)
//     } else {
//       yield all([call(hashtagEdit, params, token), call(addCategory, { id: hastag, category }, token)])
//     }

//     yield put({ type: 'GET_BALANCE' })
//     yield put(push(`/domainsdashboard/`))
//   } catch (e: any) {
//     yield fork(checkErorr, e)
//     yield call(workerOnHashtagGetItem)
//   } finally {
//     yield put({
//       type: 'IS_LOAD_F_EDIT',
//       val: false,
//     })
//   }
// }

type TcheckedPayKeyWords = {
  isPay: boolean
  count: number
}
function* worcerCheckedPayKeyWords(countKeyWord: number, token: string): SagaIterator<TcheckedPayKeyWords> {
  try {
    const { max_keywords } = yield select(getHashtagItem)
    const countFreeWords = Number(max_keywords)
    if (countKeyWord <= countFreeWords) {
      return { isPay: true, count: 0 }
    }

    const { keyword_price }: SettingItems = yield call(getSettings, token)
    const balance: number = yield call(getBalance, token)
    const count = countKeyWord - countFreeWords
    const prise = count * keyword_price
    if (prise === 0) {
      return { isPay: true, count }
    }
    if (prise > balance) {
      toast.error('INSUFFICIENT FUNDS. Please top up.', {
        position: 'top-center',
        autoClose: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
      return { isPay: false, count }
    }

    yield all([
      put({
        type: 'SHOW_MODAL_KEYWORDS',
        val: true,
      }),
      put({
        type: 'PRISE_COUNTKEY_WORDS',
        val: prise,
      }),
    ])

    const modal = yield take('ON_CHANGE_MODAL_KEYWORDS')

    yield put({
      type: 'SHOW_MODAL_KEYWORDS',
      val: false,
    })

    return { isPay: modal.val, count }
  } catch (e: any) {
    yield fork(checkErorr, e)
    return { isPay: false, count: 0 }
  }
}

function* workerOnRerenderEditForm() {
  yield all([
    put({
      type: 'SHOW_MODAL_KEYWORDS',
      val: false,
    }),
    put({
      type: 'PRISE_COUNTKEY_WORDS',
      val: 0,
    }),
    put({
      type: 'ON_CHANGE_MODAL_KEYWORDS',
      val: false,
    }),
    put({
      type: 'IS_LOAD_F_EDIT',
      val: false,
    }),
  ])
}

function* workerOnHashtagGetItem(): any {
  try {
    const pathname: string = yield select(getPathname)

    interface Params {
      hastag: string
    }

    const matchD = matchPath(pathname, {
      path: '/domain_edit/:hastag',
      strict: true,
    }) as match<Params> | null

    let hastag = ''

    if (matchD) {
      const mHastag = decodeURIComponent(matchD.params.hastag)
      hastag = isCheckHashtag(mHastag) ? mHastag : ''
    }

    if (!hastag) {
      console.error('!hastag')
      return
    }

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    let [item, { stop_sale }] = yield all([call(hashtagGetItem, { id: hastag }, token), call(getSettings, token)])

    if (Array.isArray(item.category)) {
      item.category = item.category[0] || ''
    }

    yield all([
      put({
        type: 'HASHTAG_ITEM',
        val: item,
      }),
      put({
        type: 'STOP_SALE',
        val: stop_sale,
      }),
    ])

    yield call(workerGetCategoryList)
  } catch (e: any) {
    yield fork(checkErorr, e)
    yield put(push(`/not_found/`))
  }
}

export function* workerCheckedBuyDomen(price: number): SagaIterator<boolean> {
  if (price === 0) {
    return true
  }
  yield all([
    put({
      type: 'SHOW_MODAL_BUY_DOMEN',
      val: true,
    }),
    put({
      type: 'PRICE_BUY_DOMEN',
      val: price,
    }),
  ])

  const modal = yield take('ON_CHANGE_MODAL_BUYDOMEN')

  yield put({
    type: 'SHOW_MODAL_BUY_DOMEN',
    val: false,
  })

  return modal.val
}

export function* modalQA(): SagaIterator<string> {
  yield put({
    type: 'IS_OPEN_AUTH_GA',
    val: true,
  })

  const modal: TonAnswerAuthGA = yield take('ON_ANSWER_AUTH_GA')

  yield put({
    type: 'IS_OPEN_AUTH_GA',
    val: false,
  })

  return modal.val
}

export function* reloadHashagList() {
  const searchValDomens: string = yield select(getSearchValDomens)
  const oldList: Array<HashtagItem> = yield select(getHashtagList)
  const action: TgetHashtagList = {
    type: 'GET_HASHTAG_LIST',
    payload: {
      search: searchValDomens,
      limit: oldList.length,
      isClear: true,
    },
  }
  yield call(worcerGetHashtagList, action)
}

function* workeronSetResale({ val }: Action<{ idResale: string; costResale: string }>) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    yield call(hashtagResale, token, {
      id: val.idResale,
      price: parseFloat(val.costResale),
    })

    yield fork(reloadHashagList)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workeronStoResale({ payload }: TActStopResale) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    yield call(hashtagСancelResale, token, { id: payload })
    toast.success(`Domain ${payload} has been removed from sale`, {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    })
    yield fork(reloadHashagList)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

export default watcherSaga
