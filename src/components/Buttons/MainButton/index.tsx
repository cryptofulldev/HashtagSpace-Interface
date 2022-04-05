import React from 'react'
import styled from 'styled-components'
import { gradient } from '../../../styles/globalStyles'

export const MainButton = styled.button<{
  width?: string
  height?: string
  padding?: string
  color?: string
  borderRadius?: string
  backgroundColor?: string
  margin?: string
}>`
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 600;
  transition: 0.3s;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  &:hover {
    background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : gradient.hover)};
    color: ${({ theme }) => theme.text1};
  }

  &:disabled {
    color: var(--disabled);
    cursor: default;
    pointer-events: none;
  }

  color: ${({ color }) => (color ? color : 'var(--dark-black)')};
  padding: ${({ padding }) => (padding ? padding : '8px 16px')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : 'fit-content')};
  height: ${({ height }) => (height ? height : '32px')};
  background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : gradient.normal)};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '4px')};
`

export const TransparentBtn = styled(MainButton)`
  background: transparent;
  color: ${({ theme }) => theme.text1};
  border: ${({ theme }) => theme.border2};
  &:hover {
    color: var(--goldenYellow);
  }
  &:disabled {
    border: 2px solid var(--disabled);
  }
`
