import { Record, List } from 'immutable'
import { Action } from '../../types'
import { InfoItemID, TListInfo, TListInfoItem } from '../../utils/api'

export const defaultItemInfo = {
  id: -1,
  title: '',
  description: '',
  sort: 500,
}
export interface Init {
  listInfo: List<TListInfoItem>
  itemInfo: InfoItemID
  isOpenTextModal: boolean
  itemInfoForModal: InfoItemID
}
export const init: Init = {
  listInfo: List(),
  itemInfo: defaultItemInfo,
  itemInfoForModal: defaultItemInfo,
  isOpenTextModal: false,
}
export type Actions =
  | Action<'LIST_INFO', List<TListInfoItem>>
  | Action<'ITEM_INFO', InfoItemID>
  | Action<'IS_OPEN_TEXT_MODAL', boolean>
  | Action<'ITEM_INFO_FOR_MODAL', InfoItemID>

const State: Record.Factory<Init> = Record(init)

const reducer = function (state: Record<Init> = new State(), action: Actions): Record<Init> {
  switch (action.type) {
    case 'LIST_INFO':
      return state.set('listInfo', action.val)
    case 'ITEM_INFO':
      console.log(action)
      return state.set('itemInfo', action.val)
    case 'IS_OPEN_TEXT_MODAL':
      return state.set('isOpenTextModal', action.val)
    case 'ITEM_INFO_FOR_MODAL':
      return state.set('itemInfoForModal', action.val)

    default:
      return state
  }
}

export default reducer
