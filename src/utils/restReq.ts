import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '../constants/urls'
import { Either, fold, left, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'

export const dataFronReq: AxiosRequestConfig = {
  headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
  method: 'POST',
  url: API_URL,
}

export const IOErrorRest = t.type({
  code: t.number,
  message: t.string,
  data: t.string,
})
export type ErrorRest = t.TypeOf<typeof IOErrorRest>

export interface Response<T> {
  jsonrpc: string
  result: T
  id: number
  error?: ErrorRest
}
export function isReqErrors(v: unknown): v is Errors {
  return true
}
const IOResponse = <C extends t.Mixed>(result: C) =>
  t.intersection([
    t.type({
      jsonrpc: t.string,
      result: result,
      id: t.number,
    }),
    t.partial({ error: IOErrorRest }),
  ])

//error: t.union([ IOErrorRest,t.void ])

const iOResponseU = IOResponse(t.unknown)
type IOResponseU = t.TypeOf<typeof iOResponseU>

export interface Errors {
  message: string
  code: number
  data: unknown
}

export const errorsM = new Map([
  [1, 'Undefined internal error'],
  [100, 'One of the required parameters was not passed or is invalid.'],
  [200, 'Invalid email or password'],
  [201, 'the user is blocked'],
  [202, 'User not activated'],
  [203, 'A user with this email already exists / is busy'],
  [204, 'Nick already exists'],
  [300, 'The hashtag already exists / is busy'],
  [400, 'Item not found'],
  [401, 'Element already exists / is in use '],
  [600, 'no access rights'],
  [610, 'restrictions imposed'],
  [700, 'Insufficient funds in the account'],
  [701, 'Sales are suspended'],

  [3000, 'hash is invalid or expired'],
  [3001, 'You did not select a file to upload'],
  [3002, 'The uploaded file exceeds the maximum allowed size in your PHP configuration file.'],
  [3003, 'The uploaded file exceeds the maximum size allowed by the submission form'],
  [3004, 'The file was only partially uploaded'],
  [3005, 'You did not select a file to upload'],
  [3006, 'The temporary folder is missing'],
  [3007, 'The file could not be written to disk'],
  [3008, 'The file upload was stopped by extension'],
  [3009, 'The filetype you are attempting to upload is not allowed'],
  [3010, 'The file you are attempting to upload is larger than the permitted size'],
  [3011, "The image you are attempting to upload doesn't fit into the allowed dimensions"],
  [3012, 'A problem was encountered while attempting to move the uploaded file to the final destination'],
  [3013, 'The file name you submitted already exists on the server'],
  [3014, 'You have not specified any allowed file types'],
  [3015, 'The upload path does not appear to be valid'],
  [3016, 'The upload destination folder does not appear to be writable'],

  [250, 'Error getting GA secret key'],
  [251, 'Binding already done'],
  [252, 'Required GA authorization'],
  [253, 'Invalid GA confirmation code'],
  [601, 'Meta tags update error'],

  [1000, 'Invalid token'],
])

export function getRestError<T>(data: Response<T>): Either<Errors, Response<T>> {
  if (data.error !== undefined) {
    console.error(data.error)
    return left({
      message: errorsM.get(data.error.code) || 'Unknown Error',
      code: data.error.code,
      data: data.error.data,
    })
  }
  return right(data)
}

export function changeTypeRunTime<D>(type: t.Type<D>) {
  return function (data: D): Either<string, D> {
    function onRight(data: D): Either<never, D> {
      return right(data)
    }

    function onLeft(errors: t.Errors) {
      let str: string = ''
      errors.forEach((item: t.ValidationError) => {
        str = `value ${JSON.stringify(item.context[0].actual)} does't match type ${item.context[0].type.name}`
      })

      return left(str)
    }

    return pipe(type.decode(data), fold<t.Errors, D, Either<string, D>>(onLeft, onRight))
  }
}

export function restReq<D, P>(
  method: string,
  dataReq?: AxiosRequestConfig
): (params: D, token?: string, isArrReq?: boolean) => Promise<Either<Errors, Response<P>>> {
  return async function (params, token = '', isArrReq = false) {
    let dataHeader = dataReq === undefined ? { ...dataFronReq } : { ...dataReq }

    if (token !== '') {
      dataHeader.headers.Authorization = 'Bearer ' + token
    }
    let data: object = {
      id: 1,
      method: method,
      jsonrpc: '2.0',
      params,
    }
    if (isArrReq === true && Array.isArray(params)) {
      data = params.map((item) => {
        return {
          id: 1,
          method: method,
          jsonrpc: '2.0',
          params: item,
        }
      })
    }
    try {
      const response: AxiosResponse<Response<P>> = await axios({
        ...dataHeader,
        data,
      })
      return right(response!.data)
    } catch (error: any) {
      console.error(error)
      return left({
        message: `Unknown Error in method ${method}`,
        code: 0,
        data: null,
      })
    }
  }
}
