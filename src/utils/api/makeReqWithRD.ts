import { SagaIterator } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { Action } from '@reduxjs/toolkit'
import { FetchedData, genFetchedData } from './fetchedData'
import { getToken } from '../../state/sagas/helper'

/** Возврощает тип из промисов */
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

/**
 * Описывает тип аргумента для makeReqWithRD
 * @fetcher - функция запрашивающая данные
 * @fill - креате экшен который отправляет полученные данные в редюсер
 * @parameters - параметры для запроса данных
 */

export type OptionsType<T extends (params: Parameters<T>[0]) => ReturnType<T>> = T extends () => ReturnType<T>
  ? {
      fetcher: T
      fill: (v: FetchedData<ThenArg<ReturnType<T>>>) => Action<string>
      parameters?: undefined
      softUpdate?: boolean
    }
  : {
      fetcher: T
      fill: (v: FetchedData<ThenArg<ReturnType<T>>>) => Action<string>
      parameters: Parameters<T>[0]
      softUpdate?: boolean
    }

/**
 * Описывает тип для функции итератора makeReqWithRD
 * нужен для ефектов саги чтобы указывать параметр дженерика
 */
export type TMakeReqWithRD<T extends (v: Parameters<T>[0]) => ReturnType<T>> = (options: OptionsType<T>) => SagaIterator

export function* makeReqWithRD<T extends (params: Parameters<T>[0]) => ReturnType<T>>(
  options: OptionsType<T>
): SagaIterator {
  const { fetcher, fill, parameters, softUpdate } = options
  type TreceivedData = FetchedData<ThenArg<ReturnType<T>>>

  let receivedData: TreceivedData = yield call<(data: ThenArg<ReturnType<T>> | null) => TreceivedData>(
    genFetchedData,
    null
  )

  try {
    yield call(getToken)
    receivedData = receivedData.set('isLoading', true)

    if (softUpdate !== true) {
      yield put(fill(receivedData))
    }

    const result: ThenArg<ReturnType<T>> = yield call<(params: Parameters<T>[0]) => ReturnType<T>>(fetcher, parameters)

    receivedData = receivedData.set('data', result)
    yield put(fill(receivedData))
  } catch (error: any) {
    console.error({ error })
    receivedData = receivedData.set('error', {
      isError: true,
      message: error.message,
      code: error?.code,
    })
    yield put(fill(receivedData))
  } finally {
    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now())
    yield put(fill(receivedData))
  }
}

/** Функция позволяет прокинуть значение loading, error, LTS в время обработки fill */
interface PFetchedDataProps<T, S> {
  /** Объект FetchData для извлечения атрибутов */
  fillFetchedData: FetchedData<T>
  /** Новые данные какие необходимо сохранить */
  newData: S
}
export function updateFillFetchedData<T, S>({ fillFetchedData, newData }: PFetchedDataProps<T, S>): FetchedData<S> {
  const loading = fillFetchedData.get('isLoading')
  const error = fillFetchedData.get('error')
  const LTU = fillFetchedData.get('LTU')
  let fetchedData = genFetchedData<S>(null).set('data', newData)
  fetchedData = fetchedData.set('isLoading', loading)
  fetchedData = fetchedData.set('error', error)
  fetchedData = fetchedData.set('LTU', LTU)
  return fetchedData
}
