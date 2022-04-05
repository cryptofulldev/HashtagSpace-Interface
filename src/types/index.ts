import React from 'react'

export type TransformedType<T> = { [K in keyof T]: { type: K; payload: T[K] } }
export type TActionsR<T> = TransformedType<T> extends {
  [K in keyof TransformedType<T>]: infer P
}
  ? P
  : never

export interface Action<T, V> {
  val: V
  type: T
}

export type TItemR<I extends { [K: string]: unknown }, T extends string> = T extends keyof I
  ? { type: T; payload: I[T] }
  : never

//Flex Layout
export type TFlexDirections = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type TFlexJustifyContents =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
export type TFlexAlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'

export interface ISidebarItem {
  label: string
  detail: string
  url?: string
  icon?: React.ReactNode
  isHref?: boolean
  isDropdown?: boolean
  dropdownList?: ISidebarItem[]
}
