import { useCallback, useState } from 'react'
import { useAppDispatch } from './useRedux'
import { checkHashtag as isCheckHashtag } from '../state/sagas/helper'
import { checkHashtag, searchEngineHashtag } from '../state/actions/hashtag'

export const useMainSearch = () => {
  const [hashtag, setHashtag] = useState<string>('')
  const [errorCheckHashtag, setErrorCheckHashtag] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const goProspect = useCallback(() => {
    const val = '#' + hashtag

    if (isCheckHashtag(val)) dispatch(checkHashtag(val))
    setErrorCheckHashtag(!isCheckHashtag(val))
  }, [dispatch, hashtag])

  type SetHashtag = (val: string) => void
  type setErrorCheckHashtag = (val: boolean) => void

  const changeDomain = useCallback(
    (setHashtag: SetHashtag, setErrorCheckHashtag: setErrorCheckHashtag) => (e: React.FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setHashtag(value.replace(/\s+/g, ''))
      setErrorCheckHashtag(!isCheckHashtag('#' + value.replace(/\s+/g, '')))
    },
    []
  )

  return { hashtag, setHashtag, errorCheckHashtag, setErrorCheckHashtag, goProspect, changeDomain }
}
