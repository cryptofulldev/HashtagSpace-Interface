import { SagaIterator } from '@redux-saga/core'
import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects'
import { push } from 'connected-react-router'
import { Record } from 'immutable'
import { match, matchPath } from 'react-router-dom'
import { toast } from 'react-toastify'
import { select } from 'redux-saga/effects'
import {
  RegistrationVal,
  TAffiliateData,
  TonForgotPassword,
  TonRegistrationGA,
  TonResetPassword,
  TonUnbindGA,
  TonUserEdit,
  TUserInfo,
} from '../actions/user'
import { init, Сondition3 } from '../reducers/user'
import {
  addAffiliateData,
  auth,
  AuthRes,
  forgotPassword,
  getAffiliateData,
  getUploadPhotoUrl,
  getUserEmailInfo,
  PUserEdit,
  registration,
  RegistrationP,
  resetPassword,
  sendImage,
  TAffiliateRes,
  TsendImmageRes,
  userAuthGA,
  userBindGA,
  userEdit,
  userGetInfo,
  UserInfo,
  userSavePhoto,
  userUnBindGA,
} from '../../utils/api'
import { checkErorr, getToken, setToken } from './helper'

interface Action<T> {
  val: T
  type: string
}

export function* watcherSaga() {
  yield fork(getUserInfo)
  yield takeLatest('ON_REGISTRATION', onRegistration)
  yield takeLatest('ON_AUTH', onAuth)
  yield takeLatest('CHECK_LOGIN', checkLogin)
  yield takeLatest('ON_LOG_OUT', onLogOut)
  yield takeLatest('CHECKED_ROLE', checkedRole)
  yield takeLatest('ON_INSUFFICIENT_FUNDS', worcerOnInsufficientFunds)
  yield takeLatest('ON_USER_EDIT', worceronUserEdit)
  yield takeLatest('ON_GET_QR_GA', worceronGetQRGA)
  yield takeLatest('ON_CLEAR_QR_GA', worcerOnClear)
  yield takeLatest('ON_REGISTRATION_GA', worcerOnRegistrationGA)
  yield takeLatest('ON_CLOSE_MODAL_CODE', worcerOnCloseModalCode)
  yield takeLatest('ON_UNBIND_GA', worcerOnUnbindGA)
  yield takeLatest('ON_FORGOTPASSWORD', workerOnForgotPassword)
  yield takeLatest('ON_RESETPASSWORD', workerOnResetPassword)
  yield takeLatest('ON_GET_RESET_CODE', workeronGetCode)
  yield takeLatest('ADD_AFFILIATE_DATA', workerAddAffiliateData)
  yield takeLatest('GET_AFFILIATE_DATA', workerGetAffiliateData)
  yield takeLatest('GET_USER_INFO', workerGetUserEmailInfo)
}

const getPathname = ({ router }: { router: Record<any> }) => router.get('location').get('pathname')

function getLogin(): boolean {
  if (!window.localStorage.refresh_token) {
    return false
  }
  const token = JSON.parse(window.localStorage.refresh_token)

  if (token.ttl < +new Date()) {
    return false
  }
  return true
}
function* setLogin(): SagaIterator<boolean> {
  const isLogin = getLogin()
  yield put({
    type: 'IS_LOGIN',
    val: isLogin,
  })

  return isLogin
}

export function* getUserInfo(): SagaIterator<UserInfo | void> {
  try {
    const isLogin = yield call(setLogin)
    let userInfo = init.userInfo
    let isAdmin: Сondition3 = 'NO'
    if (!isLogin) {
      yield all([
        put({
          type: 'USER_INFO',
          val: userInfo,
        }),
        put({
          type: 'IS_ADMIN',
          val: isAdmin,
        }),
      ])
      return userInfo
    }

    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    userInfo = yield call(userGetInfo, token)
    isAdmin = ['ADMIN', 'SUPERADMIN'].includes(userInfo.role) ? 'YES' : 'NO'
    yield all([
      put({
        type: 'USER_INFO',
        val: userInfo,
      }),
      put({
        type: 'IS_ADMIN',
        val: isAdmin,
      }),
    ])
    return userInfo
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* onAuth({ val }: Action<RegistrationVal>) {
  try {
    const { email, password } = val
    yield put({ type: 'ERROR_AUTH', val: '' })

    const res: AuthRes = yield call(auth, { email, password })

    setToken(res.token)

    // const currentDate = new Date()
    window.document.cookie = `_mh_usr=${JSON.stringify(
      res.userDetail
    )}; max-age=31536000; path=/; domain=.hashtag.space`

    const lastHashtag = window.sessionStorage.getItem('lastHashtag') || ''
    if (lastHashtag) {
      window.sessionStorage.removeItem('lastHashtag')
    }

    yield put(push(`/domainsresult/${encodeURIComponent(lastHashtag)}`))
    yield call(getUserInfo)
  } catch (e: any) {
    yield fork(checkErorr, e)
    yield put({ type: 'ERROR_AUTH', val: e.message })
  }
}

function* onRegistration({ val }: Action<RegistrationVal>) {
  try {
    const { email, password } = val

    yield put({ type: 'ERROR_REGISTRATION', val: '' })

    const params: RegistrationP = { email, password }
    const referralLink = JSON.parse(localStorage.getItem('referralLink')!)
    if (referralLink && referralLink.ref) {
      params.referral = `${referralLink.ref}`
    }
    const isRegistration: boolean = yield call(registration, params)

    if (!isRegistration) {
      yield put({
        type: 'ERROR_REGISTRATION',
        val: 'Undefined internal error',
      })
      return
    }
    localStorage.removeItem('referralLink')
    yield call(onAuth, { val, type: 'auto' })
  } catch (e: any) {
    yield fork(checkErorr, e)
    yield put({ type: 'ERROR_REGISTRATION', val: e.message })
  }
}

function* checkLogin() {
  try {
    const isLogin: SagaIterator<boolean> = yield call(setLogin)
    if (!isLogin) {
      yield put(push(`/login/`))
      return
    }
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

export function* onLogOut() {
  try {
    window.sessionStorage.removeItem('cart_listItems')
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('access_token')
    window.document.cookie = `_mh_usr=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.hashtag.space;`
    // yield put<TActionlistItems>({
    //   type: 'cart_listItems',
    //   payload: Map(),
    // })
    yield put(push(`/`))
    yield call(getUserInfo)
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* checkedRole({ val }: Action<Сondition3>) {
  try {
    if (val === 'NO') {
      yield put(push(`/No_access`))
    }
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* worceronUserEdit({ val }: TonUserEdit) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const updateData: PUserEdit = { fields: {} }
    updateData.fields.nick = val.nick
    updateData.fields.mhc_address = val.mhc_address || ''
    updateData.fields.paypal_address = val.paypal_address || ''

    updateData.fields.first_name = val.first_name || ''
    updateData.fields.last_name = val.last_name || ''

    if (val.password) {
      updateData.fields.password = val.password
    }

    updateData.fields.info = val.info || ''

    updateData.fields.social_network = {}
    updateData.fields.social_network.facebook = val.facebook || ''
    updateData.fields.social_network.instagram = val.instagram || ''
    updateData.fields.social_network.telegram = val.telegram || ''
    updateData.fields.social_network.skype = val.skype || ''

    if (Object.keys(updateData.fields).length) {
      yield call(userEdit, token, updateData)
    }

    if (val.file !== null) {
      const url: string = yield call(getUploadPhotoUrl, token)
      const sendI: TsendImmageRes = yield call(sendImage, url, val.file)
      yield call(userSavePhoto, token, sendI)
    }

    toast.success('Saved', {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
    yield fork(getUserInfo)
  }
}

function* workerOnForgotPassword({ val }: TonForgotPassword) {
  try {
    const isSent: boolean = yield call(forgotPassword, { email: val })
    yield put({
      type: 'IS_SENT_EMAIL',
      val: isSent,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workerOnResetPassword({ val }: TonResetPassword) {
  try {
    const isSet: boolean = yield call(resetPassword, val)
    if (isSet) {
      yield put(push(`/login/`))
      return
    }
  } catch (e: any) {
    yield fork(checkErorr, e)
  }
}

function* workeronGetCode() {
  const pathname: string = yield select(getPathname)

  interface Params {
    code: string
  }

  const matchD = matchPath(pathname, {
    path: '/resetPassword/:code',
    strict: true,
  }) as match<Params> | null

  let code = ''

  if (matchD) {
    code = decodeURIComponent(matchD.params.code)
  }

  yield put({
    type: 'RESET_PWD_CODE',
    val: code,
  })
}

function* worceronGetQRGA() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }

    const urlQR: string = yield call(userAuthGA, token)
    yield put({
      type: 'URL_QR_GA',
      val: urlQR,
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* worcerOnClear() {
  try {
    yield put({
      type: 'URL_QR_GA',
      val: '',
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}
function* worcerOnCloseModalCode() {
  try {
    yield put({
      type: 'UN_BIND_GA',
      val: '',
    })
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* worcerOnRegistrationGA({ val }: TonRegistrationGA) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    const code: string = yield call(userBindGA, token, { code: val })

    yield put({
      type: 'UN_BIND_GA',
      val: code,
    })
    yield fork(getUserInfo)
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* worcerOnUnbindGA({ val }: TonUnbindGA) {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    yield call(userUnBindGA, token, { code: val })
    yield fork(getUserInfo)
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* worcerOnInsufficientFunds() {
  yield put(push(`/pay`))
}

function* workerAddAffiliateData({ val }: Action<TAffiliateData>) {
  try {
    const params = val
    const code: boolean = yield call(addAffiliateData, params)

    if (code) {
      const referralLink = JSON.parse(window.localStorage.getItem('referralLink')!)
      window.localStorage.removeItem('referralLink')
      window.localStorage.setItem(
        'referralLink',
        JSON.stringify({ ...referralLink, cryptoRef: undefined, cryptoType: undefined })
      )
    }
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerGetAffiliateData() {
  try {
    const token: string = yield call(getToken)
    if (!token) {
      yield put(push(`/login/`))
      return
    }
    const data: TAffiliateRes[] = yield call(getAffiliateData, token)
    if (data.length > 0) {
      yield put({
        type: 'SAVE_AFFILIATE_DATA',
        val: data,
      })
    }
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

function* workerGetUserEmailInfo({ val }: Action<TUserInfo>) {
  try {
    const params = val
    const code: boolean = yield call(getUserEmailInfo, params)
  } catch (e: any) {
    yield fork(checkErorr, e)
  } finally {
  }
}

export default watcherSaga
