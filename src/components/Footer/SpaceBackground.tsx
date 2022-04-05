import React from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import HOME_BG_1 from '../../assets/images/home-bg-1-1.png'
import HOME_BG_2 from '../../assets/images/home-bg-2-1.png'
import HOME_BG_3 from '../../assets/images/home-bg-3-1.png'
import { ImgContainer } from '../../components/ImageContainer'

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const SpaceBG: React.FC = () => {
  return (
    <ImageContainer>
      <ImgContainer
        imgUrl={HOME_BG_2}
        position={'absolute'}
        bottom={'0px'}
        right={'0px'}
        width={isMobile ? '70%' : '24%'}
        borderRadius={'0px'}
      />
      <ImgContainer
        imgUrl={HOME_BG_3}
        position={'absolute'}
        bottom={'0px'}
        right={'0px'}
        width={isMobile ? '70%' : '24%'}
        borderRadius={'0px'}
      />
      <ImgContainer
        imgUrl={HOME_BG_1}
        position={'absolute'}
        bottom={'0px'}
        right={'24px'}
        width={isMobile ? '70%' : '20%'}
        borderRadius={'0px'}
      />
    </ImageContainer>
  )
}

export default SpaceBG
