import React from 'react'
import styled from 'styled-components'

interface IImgIconWrapper {
  size?: number
  borderRadius?: string
  iconLink?: string
  onClickImg?: (e: React.FormEvent<HTMLImageElement>) => void
  alt?: string
}

const ImageContainer = styled.img<{ size?: number; borderRadius?: string }>`
  width: ${({ size }) => (size ? size + 'px' : '32px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '50%')};
  cursor: pointer;
`
const Icon: React.FC<IImgIconWrapper> = ({ size, borderRadius, iconLink, onClickImg, alt }) => {
  return <ImageContainer src={iconLink} size={size} borderRadius={borderRadius} onClick={onClickImg} alt={alt} />
}

export default Icon
