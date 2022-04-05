import React from 'react'
import { Text, TextProps } from 'rebass'
import styled, { DefaultTheme } from 'styled-components'
import { ThemeProps } from './themes'

const TextWrapper = styled(Text)<{ color: keyof ThemeProps; hover?: boolean }>`
  color: ${({ color, theme }) => (theme as any)[color]};
  transition: ease-in-out 0.3s;
  cursor: pointer;

  :hover {
    color: ${({ hover }) => (hover ? 'var(--goldenYellow)' : 'none')};
  }
`
const TextShadow = styled(Text)<{ color: keyof ThemeProps; isHover?: boolean }>`
  color: ${({ color, theme }) => (theme as any)[color]};
  text-shadow: ${({ theme }) =>
    `2px 0 0 ${theme.textShadow}, -2px 0 0 ${theme.textShadow}, 0 2px 0 ${theme.textShadow}, 0 -2px 0 ${theme.textShadow}, 1px 1px ${theme.textShadow}, -1px -1px 0 ${theme.textShadow}, 1px -1px 0 ${theme.textShadow}, -1px 1px 0 ${theme.textShadow}`};
  transition: ease-in-out 0.3s;
  cursor: pointer;

  :hover {
    color: ${({ isHover }) => (isHover ? 'var(--goldenYellow)' : 'inherit')};
  }
`

export const TextType = {
  main(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  link(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  label(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },
  body(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={700} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={600} fontSize={20} {...props} />
  },
  subHeader(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={500} fontSize={14} {...props} />
  },
  small(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={500} color={'aquaBlue'} {...props} />
  },
  yellow(props: TextProps & { isHover?: boolean }) {
    return <TextWrapper fontWeight={500} color={'goldenYellow'} {...props} />
  },
  error(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'red'} {...props} />
  },
  shadow(props: TextProps & { isHover?: boolean }) {
    return <TextShadow fontWeight={500} {...props} />
  },
}
