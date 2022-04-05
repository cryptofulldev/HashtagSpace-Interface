import { useCallback } from 'react'
import { AppState } from '../state'
import { onGetItemInfo } from '../state/actions/info'
import { useAppDispatch, useAppSelector } from './useRedux'

export const useInfoList = () => {
  return useAppSelector((state: AppState) => state.info.get('listInfo'))
}

export const useInfoItem = () => {
  return useAppSelector((state: AppState) => state.info.get('itemInfo'))
}

export const useGetInfoItem = () => {
  const dispatch = useAppDispatch()

  const handleGetItem = useCallback(
    (infoId: number) => {
      dispatch(onGetItemInfo(infoId))
    },
    [dispatch]
  )

  return { getInfoItem: handleGetItem }
}
