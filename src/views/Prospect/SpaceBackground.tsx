import React from 'react'
import HOME_BG_1 from '../../assets/images/home-bg-1-1.png'
import HOME_BG_2 from '../../assets/images/home-bg-2-1.png'
import HOME_BG_3 from '../../assets/images/home-bg-3-1.png'
import { ImgContainer } from '../../components/ImageContainer'

const SpaceBG: React.FC = () => {
  return (
    <div>
      <ImgContainer
        imgUrl={HOME_BG_2}
        position={'absolute'}
        bottom={'-64px'}
        right={'0px'}
        width={'24%'}
        borderRadius={'0px'}
      />
      <ImgContainer
        imgUrl={HOME_BG_3}
        position={'absolute'}
        bottom={'-64px'}
        right={'0px'}
        width={'24%'}
        borderRadius={'0px'}
      />
      <ImgContainer
        imgUrl={HOME_BG_1}
        position={'absolute'}
        bottom={'-64px'}
        right={'24px'}
        width={'20%'}
        borderRadius={'0px'}
      />
    </div>
  )
}

export default SpaceBG
