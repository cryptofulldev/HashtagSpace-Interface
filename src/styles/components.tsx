import React, { HTMLProps, useCallback } from 'react'
import ReactGA from 'react-ga'
import { ToastContainer } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { TFlexAlignItems, TFlexDirections, TFlexJustifyContents } from '../types'
import { device, gradient } from './globalStyles'
import { ThemeProps } from './themes'

// Used for wrapping a page component
export const PageWrapper = styled.div<{ image?: string }>`
  position: relative;
  background-color: ${({ theme }) => theme.background1};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  min-height: calc(100vh - 74px - 64px); // screenViewPort - headerHeight - footerHeight
  display: flex;
  flex-direction: column;
  align-items: center;
`

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`
export const ComponentWrapper = styled.div<{ width?: string; padding?: string; margin?: string }>`
  position: relative;
  width: ${({ width }) => (width ? width : '100%')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : '0')};
`
// Used for providing a wrapper around a component
export const ContainerRow = styled.div<{
  rowWidth?: string
  justifyContent?: TFlexJustifyContents
  alignItems?: TFlexAlignItems
  backgroundColor?: string
  image?: string
  padding?: string
  margin?: string
  width?: string
  flexWrap?: string
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : 'no-wrap')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'space-between')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'none')};
  width: ${({ rowWidth }) => (rowWidth ? rowWidth : '100%')};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  gap: 12px;
`
export const ContainerColumn = styled.div<{
  justifyContent?: TFlexJustifyContents
  alignItems?: TFlexAlignItems
  backgroundColor?: string
  image?: string
  padding?: string
  margin?: string
  width?: string
  height?: string
  gap?: string
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'center')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'none')};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  gap: ${({ gap }) => (gap ? gap : '0')};
`
export const ResponsiveContainer = styled(ContainerColumn)`
  @media ${device.laptop} {
    flex-direction: row;
    gap: 12px;
  }
`
export const ToastWrapper = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})``

export const BigBox = styled.div<{ padding?: string; margin?: string; width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ width }) => (width ? width : '100%')};
  height: auto;
  padding: ${({ padding }) => (padding ? padding : '24px')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  border: ${({ theme }) => theme.border1};
  border-radius: 10px;
  background: black;
  box-shadow: ${({ theme }) => theme.boxShadow2};
`
export const BoxCard = styled.div<{ boxWidth?: string; boxHeight?: string }>`
  position: relative
  width: ${({ boxWidth }) => (boxWidth ? boxWidth : 'fit-content')};
  height: ${({ boxHeight }) => (boxHeight ? boxHeight : 'auto')};
  text-align: center;
  padding: 10px;
  margin: 12px;
  border-radius: 10px;
  border: ${({ theme }) => theme.border2};
`
export const TextTitle = styled.span`
  color: var(--primary-text);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.6;
  display: inline-block;
`
export const TextSubTitle = styled.span`
  color: var(--primary-text);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.6;
  margin: 1rem 0;
`
export const TextMain = styled.span`
  color: var(--primary-text);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.6;
  margin: 1rem 0;
  text-align: center;
`
export const TextDescription = styled.span`
  color: var(--primary-text);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
`
export const TextCustom = styled.p<{
  color?: string
  fontSize?: string
  fontWeight?: number
  lineHeight?: number
  textAlign?: string
}>`
  color: ${({ color }) => (color ? color : 'var(--primary-text)')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.25rem')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 600)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 1.6)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
`
export const Divider = styled.div<{ width?: string; height?: string; margin?: string }>`
  width: ${({ width }) => (width ? width : '50%')};
  height: ${({ height }) => (height ? height : '4px')};
  background-color: var(--secondary);
  margin: ${({ margin }) => (margin ? margin : '2rem 0')};
`
export const AvatarContainer = styled.img<{ width?: string }>`
  border-radius: 50%;
  width: ${({ width }) => (width ? width : '100%')};
  max-width: 240px;
  cursor: pointer;
`

export const InputWrapper = styled.input<{
  width?: string
  height?: string
  color?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '42px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '4px')};
  outline: none;
  border: ${({ border, theme }) => (border ? border : `1px solid ${theme.reverseBackground}`)};
  padding: 12px 20px;
  background-color: transparent;
  color: ${({ color, theme }) => (color ? color : theme.text1)};
`
export const InputWrapperWithBG = styled(InputWrapper)<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor, theme }) => (backgroundColor ? backgroundColor : theme.reverseBackground)};
  color: ${({ color, theme }) => (color ? color : theme.reverseText)};
`

export const ImageContainer = styled.img<{
  width?: string
  height?: string
  maxWidth?: string
  margin?: string
  objectFit?: string
  borderRadius?: string
  position?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  zIndex?: number
}>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  object-fit: ${({ objectFit }) => (objectFit ? objectFit : 'cover')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '50%')};
  cursor: pointer;
  position: ${({ position }) => (position ? position : 'unset')};
  top: ${({ top }) => (top ? top : 'unset')};
  left: ${({ left }) => (left ? left : 'unset')};
  right: ${({ right }) => (right ? right : 'unset')};
  bottom: ${({ bottom }) => (bottom ? bottom : 'unset')};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 0)};
`
export const NavLinkButton = styled(NavLink)<{ isTransparent?: boolean; borderColor?: keyof ThemeProps }>`
  height: 35px;
  padding: 12px 20px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ isTransparent }) => (isTransparent ? 'transparent' : gradient.normal)};
  border: 1px solid ${({ borderColor, theme }) => (borderColor ? (theme as any)[borderColor] : 'var(--goldenYellow)')};
  &:hover {
    background: ${gradient.hover};
    color: ${({ theme }) => theme.text1};
  }
  &:active {
    background: ${gradient.active};
  }
`
const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: var(--secondary);
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: href }, () => {
          console.debug('Fired outbound link event', href)
        })
      } else {
        event.preventDefault()
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: href }, () => {
          window.location.href = href
        })
      }
    },
    [href, target]
  )
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
}

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#C3C5CB' : 'var(--secondary)')};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`
