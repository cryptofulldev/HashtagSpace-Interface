import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import LOGO_IMG from '../../assets/images/logo.png'
import { device } from '../../styles/globalStyles'

const LogoContainer = styled.img`
  width: 200px;
  height: auto;
  @media screen and ${device.mobileL} {
    width: 100px;
  }
`

const Logo: React.FC = () => {
  return (
    <NavLink to="/">
      <LogoContainer src={LOGO_IMG} />
    </NavLink>
  )
}

export default Logo
