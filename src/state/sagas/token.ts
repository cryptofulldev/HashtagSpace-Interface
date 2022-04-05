import { Channel } from 'redux-saga'
import { actionChannel, call, take } from 'redux-saga/effects'
import { tokenRefresh, TokenRefresh } from '../../utils/api'
import { setToken, TokenS } from './helper'

export default function* watcherSaga() {
  const requestChan: string = yield actionChannel('REQUEST')

  while (true) {
    const { chanel } = yield take(requestChan)
    yield call(handleRequest, chanel)
  }
}
function* handleRequest(chanel: Channel<'END_GET_TOKEN'>) {
  try {
    const refreshTokenSJson: string | null = window.localStorage.getItem('refresh_token')

    if (!refreshTokenSJson) {
      return chanel.put('END_GET_TOKEN')
    }
    const accessTokenSJson: string | null = window.localStorage.getItem('access_token')

    if (!accessTokenSJson) {
      return chanel.put('END_GET_TOKEN')
    }

    const refreshToken: TokenS = JSON.parse(refreshTokenSJson)
    const accessToken: TokenS = JSON.parse(accessTokenSJson)
    if (refreshToken.ttl <= +new Date()) {
      return chanel.put('END_GET_TOKEN')
    }
    if (accessToken.ttl <= +new Date()) {
      const rfToken: TokenRefresh = yield call(tokenRefresh, {
        token: refreshToken.token,
      })
      setToken(rfToken)
      return chanel.put('END_GET_TOKEN')
    }

    return chanel.put('END_GET_TOKEN')
  } catch (e: any) {
    console.error(e)
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('access_token')
    console.error('errorgetToken')
    return chanel.put('END_GET_TOKEN')
  }
}
