import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { API_URL } from '../../constants/urls'
import errorServeApi from './errorServeApi'

if (!process.env.REACT_APP_API) {
  console.warn('process.env.REACT_APP_API not specified')
}

const axiosOptions: AxiosRequestConfig = {
  headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
  baseURL: API_URL,
}

type TPRequest = {
  method: string
  showError?: boolean
  token?: boolean
}

function request<R>({ method, showError, token }: TPRequest): () => Promise<R>
function request<R, P extends Record<string, unknown>>({
  method,
  showError,
  token,
}: TPRequest): (params: P) => Promise<R>

function request<R, P extends Record<string, unknown> | undefined = undefined>({
  method,
  showError,
  token = true,
}: TPRequest): (params?: P) => Promise<R> {
  return async function (params?: P) {
    const instance: AxiosInstance = axios.create(axiosOptions)
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const access_tokenStr = window.localStorage.getItem('access_token')

      const access_token: {
        token: string
        ttl: string
      } | null = access_tokenStr ? JSON.parse(access_tokenStr) : null
      const clonedConfig = config

      if (access_token && token) {
        clonedConfig.headers.common = {
          ...clonedConfig.headers,
          Authorization: `Bearer ${access_token.token}`,
        }
      }

      return clonedConfig
    })
    try {
      const response = await instance.post(``, {
        id: 1,
        method,
        jsonrpc: '2.0',
        params: params ?? {},
      })

      if (response?.data?.error) {
        throw response.data.error
      }

      return response.data.result
    } catch (err: any) {
      if (!window.navigator.onLine) {
        throw err
      }
      errorServeApi(err, method, showError)

      throw err
    }
  }
}

export default request
