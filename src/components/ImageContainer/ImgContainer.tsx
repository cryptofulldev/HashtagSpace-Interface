import React from 'react'
import styled from 'styled-components'
import { ImageContainer } from '../../styles/components'

interface IImgContainerProps {
  imgUrl: string
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
}

const Img: React.FC<IImgContainerProps> = (props) => {
  return (
    <ImageContainer
      src={props.imgUrl}
      width={props.width}
      maxWidth={props.maxWidth}
      height={props.height}
      margin={props.margin}
      objectFit={props.objectFit}
      borderRadius={props.borderRadius}
      position={props.position}
      top={props.top}
      left={props.left}
      right={props.right}
      bottom={props.bottom}
      zIndex={props.zIndex}
    />
  )
}

export default Img
