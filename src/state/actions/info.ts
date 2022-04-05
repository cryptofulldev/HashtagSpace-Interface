import { InfoItem, TitemEditInfo, TListInfoItem } from '../../utils/api'
import { List } from 'immutable'

export type TonAddInfo = {
  type: 'ON_ADD_INFO'
  payload: Omit<InfoItem, 'sort'>
}
export function onAddInfo(payload: TonAddInfo['payload']): TonAddInfo {
  return {
    type: 'ON_ADD_INFO',
    payload,
  }
}

export type TonGetListInfo = {
  type: 'ON_GET_LIST_INFO'
}
export function onGetListInfo(): TonGetListInfo {
  return {
    type: 'ON_GET_LIST_INFO',
  }
}

export type TonGetItemInfo = {
  type: 'ON_GET_ITEM_INFO'
  payload: number
}
export function onGetItemInfo(payload: TonGetItemInfo['payload']): TonGetItemInfo {
  return {
    type: 'ON_GET_ITEM_INFO',
    payload,
  }
}

export type TOnEditInfo = {
  type: 'ON_EDIT_INFO'
  payload: TitemEditInfo
}

export function onEditInfo(payload: TOnEditInfo['payload']): TOnEditInfo {
  return {
    type: 'ON_EDIT_INFO',
    payload,
  }
}

export type TonRerenderInfo = {
  type: 'ON_RERENDER_INFO'
}
export function onRerenderInfo(): TonRerenderInfo {
  return {
    type: 'ON_RERENDER_INFO',
  }
}

export type TonRemoveIteminfo = {
  type: 'ON_REMOVE_ITEM_INFO'
  payload: number
}
export function onRemoveIteminfo(payload: TonRemoveIteminfo['payload']): TonRemoveIteminfo {
  return {
    type: 'ON_REMOVE_ITEM_INFO',
    payload,
  }
}

export type TonOpenTexTModal = {
  type: 'ON_OPEN_TEXT_MODAL'
  payload: number
}
export function onOpenTexTModal(payload: TonOpenTexTModal['payload']): TonOpenTexTModal {
  return {
    type: 'ON_OPEN_TEXT_MODAL',
    payload,
  }
}
export type TonCloseTexTModal = {
  type: 'ON_CLOSE_TEXT_MODAL'
}
export function onCloseTexTModal(): TonCloseTexTModal {
  return {
    type: 'ON_CLOSE_TEXT_MODAL',
  }
}

export type TOnSortInfoList = {
  type: 'ON_SORT_INFO_LIST'
  payload: List<TListInfoItem>
}
export function onSortInfoList(payload: TOnSortInfoList['payload']): TOnSortInfoList {
  return {
    type: 'ON_SORT_INFO_LIST',
    payload,
  }
}
