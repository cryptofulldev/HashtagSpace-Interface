// import { Item } from '../components/DomainEditForm/events'
import { SettingItems, SettingItemsP, TPsetAutorenewal } from '../../utils/api'
import { Action } from 'redux'

export function checkHashtag(val: string) {
  return {
    type: 'CHECK_HASHTAG',
    val,
  }
}

export function searchEngineHashtag(val: string) {
  return {
    type: 'SEARCH_ENGINE_HASHTAG',
    val,
  }
}

// export function setErrorCheckHashtag(val: string) {
//   return {
//     type: 'ERROR_CHECK_HASHTAG',
//     val,
//   };
// }

export function onLoadingDomainsresult() {
  return {
    type: 'ON_LOADING_DOMAINSRESULT',
  }
}

export function searchHashtag(val: string) {
  return {
    type: 'SEARCH_HASHTAG',
    val,
  }
}

export function setShowSearchResult(val: boolean) {
  return {
    type: 'SHOW_SEARCH_RESULT',
    val,
  }
}

export type TbindDomain = {
  type: 'ON_BIND_DOMAIN'
  payload: boolean
}
// export function onbindDomain(payload: boolean): TbindDomain {
//   return {
//     type: 'ON_BIND_DOMAIN',
//     payload,
//   };
// }

export type TgetHashtagList = {
  type: 'GET_HASHTAG_LIST'
  payload: {
    search: string
    limit: number
    isClear: boolean
  }
}

export function getHashtagList(payload: TgetHashtagList['payload']): TgetHashtagList {
  return {
    type: 'GET_HASHTAG_LIST',
    payload,
  }
}

export type TonShowModalManage = {
  type: 'ON_SHOW_MODAL_MANAGE'
  payload: {
    id: string
    searchVal: string
  }
}

export function onShowModalManage(payload: TonShowModalManage['payload']): TonShowModalManage {
  return {
    type: 'ON_SHOW_MODAL_MANAGE',
    payload,
  }
}
export function onCloseModalManage() {
  return {
    type: 'ON_CLOSE_MODAL_MANAGE',
  }
}
export function onEditUrl(val: string) {
  return {
    type: 'ON_EDIT_URL',
    val,
  }
}

export function getListHastagForAdmin() {
  return {
    type: 'GET_LIST_HASTAG_FOR_ADMIN',
  }
}
export function getCategoryList() {
  return {
    type: 'GET_CATEGORY_LIST',
  }
}

export function categoryAddForAdm(val: string): { type: string; val: string } {
  return {
    type: 'ADD_CATEGORY_FOR_ADM',
    val,
  }
}

export function categoryRemoveForAdm(val: string): { type: string; val: string } {
  return {
    type: 'REMOVE_CATEGORY_FOR_ADM',
    val,
  }
}

export function categoryEditForAdm(val: { id: string; name: string }): {
  type: string
  val: { id: string; name: string }
} {
  return {
    type: 'EDIT_CATEGORY_FOR_ADM',
    val,
  }
}
// export function onSearchHashtagInList(
//   val: string
// ): { type: string; val: string } {
//   return {
//     type: 'ON_SEARCH_HASHTAG_IN_LIST',
//     val,
//   };
// }

export function onSearchHashtagInListForAdm(val: string): { type: string; val: string } {
  return {
    type: 'ON_SEARCH_HASHTAG_IN_LIST_FOR_ADM',
    val,
  }
}

export function onClearHashtagListForAdm() {
  return {
    type: 'ON_CLEAR_HASHTAG_LIST_FOR_ADM',
  }
}
export function onClearHashtagList() {
  return {
    type: 'ON_CLEAR_HASHTAG_LIST',
  }
}

// export function onDomainEdit(val: Item) {
//   return {
//     type: 'ON_DOMAIN_EDIT',
//     val,
//   }
// }
export function onHashtagGetItem() {
  return {
    type: 'ON_HASHTAG_GET_ITEM',
  }
}
export function onGetSettings() {
  return {
    type: 'ON_GET_SETTINGS',
  }
}
export type TonSetSettings = {
  type: 'ON_SET_SETTINGS'
  payload: SettingItemsP['fields'] //Omit<SettingItems, 'pay_period'>;
}
export function onSetSettings(payload: TonSetSettings['payload']): TonSetSettings {
  return {
    type: 'ON_SET_SETTINGS',
    payload,
  }
}
export function onChangeModalKeyWords(val: boolean) {
  return {
    type: 'ON_CHANGE_MODAL_KEYWORDS',
    val,
  }
}
export function onRerenderEditForm() {
  return {
    type: 'ON_RERENDER_EDITFORM',
  }
}
export function onGetListPremium(val: { search: string }) {
  return {
    type: 'ON_GET_LIST_PREMIUM',
    val,
  }
}
export function onAddPremium(val: string) {
  return {
    type: 'ON_ADD_PREMIUM',
    val,
  }
}
export function onDelPremium(val: string) {
  return {
    type: 'ON_DEL_PREMIUM',
    val,
  }
}

export function onChangeModalBuyDomen(val: boolean) {
  return {
    type: 'ON_CHANGE_MODAL_BUYDOMEN',
    val,
  }
}
export function onSetResale(val: { idResale: string; costResale: string }) {
  return {
    type: 'ON_SET_RESALE',
    val,
  }
}

export type TActStopResale = { type: 'ON_STOP_RESALE'; payload: string }
export function stopResale(id: string): TActStopResale {
  return {
    type: 'ON_STOP_RESALE',
    payload: id,
  }
}
export function fetchSetAutorenewal(payload: TPsetAutorenewal) {
  return {
    type: 'ON_FETCHSETAUTORENEWAL',
    payload,
  }
}
