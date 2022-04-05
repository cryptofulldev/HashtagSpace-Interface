import { Record } from 'immutable'

/**
 * Описывает тип полученных данных
 * data сами данные
 * isLoading флаг загрузки
 * время последней загрузки если 0 загрузки не было
 * error описание ошибки
 */
export type FetchedDataObj<T> = {
  data: T | null
  isLoading: boolean
  LTU: number
  error: {
    isError: boolean
    message: string
    code?: number
    fields?: string[]
  }
}

export type FetchedData<T> = Record<FetchedDataObj<T>>
/**
 * генерирует обьект FetchedData с данными по умолчанию
 */
export function genFetchedData<T>(data: T | null): FetchedData<T> {
  const initData: FetchedDataObj<T> = {
    data,
    isLoading: false,
    LTU: 0,
    error: {
      isError: false,
      message: '',
      code: 0,
      fields: [],
    },
  }
  const FetchedDataF: Record.Factory<FetchedDataObj<T>> = Record(initData)
  return new FetchedDataF()
}
