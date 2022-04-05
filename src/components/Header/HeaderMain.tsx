import React from 'react'
import { isMobile } from 'react-device-detect'
import { useLogin } from '../../hooks/useUser'
import { ContainerRow } from '../../styles/components'
import Hamburger from '../Icons/hamburgerIcon'
import Logo from '../Icons/logo'
import ThemeToggleButton from '../ThemeToggle'
import WalletConnector from '../WalletConnection'
import AuthContainer from './AuthContainer'

const HeaderMain: React.FC = () => {
  const isLogin = useLogin()

  return (
    <ContainerRow padding={'12px'}>
      <Logo />
      <ContainerRow width={'fit-content'} justifyContent={'flex-end'}>
        {!isLogin && !isMobile && <AuthContainer />}
        <WalletConnector />
        <ThemeToggleButton />
        <Hamburger />
      </ContainerRow>
    </ContainerRow>
  )
}

export default HeaderMain
