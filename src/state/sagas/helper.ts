import { push } from 'connected-react-router'
import { toast } from 'react-toastify'
import { buffers, Channel, SagaIterator } from 'redux-saga'
import { actionChannel, call, put, select, take } from 'redux-saga/effects'
import { AppState } from '../../state'
import { TokenRefresh } from '../../utils/api'
import { Errors } from '../../utils/restReq'
import { getUserInfo } from './user'

const getToastId = ({ user }: AppState) => user.get('toastId')

export function checkHashtag(hashtag: string): boolean {
  const pattern = /^[#,/,-]{1}[a-zA-Z0-9_-]{3,255}$/
  return pattern.test(hashtag)
}
export function checkSearchEngineHashtag(hashtag: string): boolean {
  const pattern = /^[#,/,-]{1}[a-zA-Z0-9\s_-]{3,255}$/
  return pattern.test(hashtag)
}
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const lastEl = parts.pop()
    if (lastEl === undefined) return undefined
    return lastEl.split(';').shift()
  }
  return undefined
}

export function setToken(tokensR: TokenRefresh): void {
  const timeEnd: (ttl: number) => number = (ttl) => ttl * 1000 - 60000

  localStorage.setItem(
    'access_token',
    JSON.stringify({
      token: tokensR.access_token,
      ttl: timeEnd(tokensR.expire_access || 0),
    })
  )
  localStorage.setItem(
    'refresh_token',
    JSON.stringify({
      token: tokensR.refresh_token,
      ttl: timeEnd(tokensR.expire_refresh || 0),
    })
  )
}

export interface TokenS {
  token: string
  ttl: number
}

export function* getToken(): SagaIterator<string> {
  const endChanel: Channel<'END_GET_TOKEN'> = yield actionChannel('END_GET_TOKEN', buffers.sliding(1))
  const { chanel } = yield put({ type: 'REQUEST', chanel: endChanel })
  yield take(chanel)
  const accessTokenSJson: string | null = window.localStorage.getItem('access_token')
  if (!accessTokenSJson) {
    return ''
  }
  const accessToken: TokenS = JSON.parse(accessTokenSJson)
  return accessToken.token
}

export function* checkErorr(e: Errors) {
  const tID: string = yield select(getToastId)
  if (tID !== null) {
    toast.dismiss()
    yield put({ type: 'TOAST_ID', val: null })
  }
  console.error(e.message)

  if (window.navigator.onLine === false) {
    const toastID = toast.info('Connection problem please refresh page', {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    })
    yield put({ type: 'TOAST_ID', val: toastID })
    return
  }

  if (e.code === 100 && typeof e.data === 'string') {
    toast.error(e.data, {
      position: 'top-center',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    })
    return
  }

  if (e.code === 1000) {
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('access_token')
    yield put(push(`/login/`))
    yield call(getUserInfo)
  }

  if (e.code === 700) {
    yield put(push(`/pay`))
  }

  toast.error(e.message, {
    position: 'top-center',
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
  })
}
