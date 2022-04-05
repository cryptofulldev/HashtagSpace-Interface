import { AppState } from '../state'
import { useAppSelector } from './useRedux'

export const useLogin = () => {
  return useAppSelector((state: AppState) => state.user.get('isLogin'))
}
