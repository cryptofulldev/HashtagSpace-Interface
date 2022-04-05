import { Record } from 'immutable'
import { Action } from '../../types'

export interface Init {
  showModalmanage: boolean
  showModalKeyWords: boolean
  showModalBuyDomen: boolean
  priceBuyDomen: number
  searchValDomens: string
}
const init: Init = {
  showModalmanage: false,
  showModalKeyWords: false,
  showModalBuyDomen: false,
  priceBuyDomen: 0,
  searchValDomens: '',
}

type Actions =
  | Action<'SHOW_MODALMANAGE', boolean>
  | Action<'SHOW_MODAL_KEYWORDS', boolean>
  | Action<'SHOW_MODAL_BUY_DOMEN', boolean>
  | Action<'PRICE_BUY_DOMEN', number>
  | Action<'SEARCH_VAL_DOMENS', string>

const State: Record.Factory<Init> = Record(init)

const reducer = function (state: Record<Init> = new State(), action: Actions): Record<Init> {
  switch (action.type) {
    case 'SHOW_MODALMANAGE':
      return state.set('showModalmanage', action.val)
    case 'SHOW_MODAL_KEYWORDS':
      return state.set('showModalKeyWords', action.val)
    case 'SHOW_MODAL_BUY_DOMEN':
      return state.set('showModalBuyDomen', action.val)
    case 'PRICE_BUY_DOMEN':
      return state.set('priceBuyDomen', action.val)
    case 'SEARCH_VAL_DOMENS':
      return state.set('searchValDomens', action.val)

    default:
      return state
  }
}

export default reducer
