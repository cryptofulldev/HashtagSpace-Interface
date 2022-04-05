import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ContainerRow } from '../../styles/components'
import { device } from '../../styles/globalStyles'
import CoinList from './CoinList'
import FooterInfoList from './InfoList'
import SpaceBG from './SpaceBackground'

const FooterWrapper = styled(ContainerRow)`
  height: 64px;
  background-color: transparent;
  border: none;
  padding: 0;
  @media screen and ${device.mobileL} {
    height: auto;
  }
`
const FooterSubWrapper = styled(ContainerRow)`
  position: relative;
  height: 64px;
  background-color: ${({ theme }) => theme.opacityColor};
  border-top: ${({ theme }) => theme.border1};
  @media screen and ${device.mobileL} {
    flex-direction: column;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const Footer: React.FC = () => {
  const locations = useLocation()
  console.log('[locations]', locations)

  return (
    <FooterWrapper>
      {locations.pathname === '/' && <SpaceBG />}
      <FooterSubWrapper>
        <FooterInfoList />
        <CoinList />
      </FooterSubWrapper>
    </FooterWrapper>
  )
}

export default Footer
