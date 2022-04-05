import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useInfoList } from '../../hooks/useInfo'
import { useAppDispatch } from '../../hooks/useRedux'
import { onGetListInfo } from '../../state/actions/info'

export const useFooter = () => {
  const dispatch = useAppDispatch()
  const infoList = useInfoList()

  useEffect(() => {
    dispatch(onGetListInfo())
  }, [dispatch])

  return infoList
}

export const useCoinList = () => {
  const history = useHistory()

  const handleOnClick = useCallback(() => {
    history.push('/Affiliates/')
  }, [history])

  return { onClick: handleOnClick }
}
