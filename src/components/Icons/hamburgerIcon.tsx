import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HAMBURGER_IMG from '../../assets/images/menu.png'
import { useLogin } from '../../hooks/useUser'
import { ContainerColumn, ContainerRow } from '../../styles/components'
import { device } from '../../styles/globalStyles'
import AuthContainer from '../Header/AuthContainer'

const HamburgerContainer = styled.img`
  display: none;

  @media ${device.laptop} {
    display: fixed;
  }
`

const HamburgerMenuWrapper = styled(ContainerColumn)`
  position: absolute;
  top: 72px;
  right: 0;
  z-index: 1;
  background-color: var(--primary);
  padding: 24px;
  border-radius: 12px;
  border: 2px solid var(--secondary);
  transition: background-color 3000ms ease-in-out 0s, opacity 8000ms ease-in-out 0s;
`
const HamburgerMenuItem: React.FC<{ label: string; navLink: string }> = ({ label, navLink }) => {
  return <ContainerRow margin={'24px 0 0 0'} justifyContent={'center'}></ContainerRow>
}

const HamburgerMenu: React.FC<{ setIsOpen: (isOpen: boolean) => void; isLogin: boolean }> = ({
  setIsOpen,
  isLogin,
}) => {
  return (
    <HamburgerMenuWrapper justifyContent={'flex-start'} onClick={() => setIsOpen(false)}>
      <HamburgerMenuItem label={'Creators'} navLink={'creators'} />
      <HamburgerMenuItem label={'My Account'} navLink={'account'} />
      <HamburgerMenuItem label={'Rankings'} navLink={''} />
      {!isLogin && <AuthContainer />}
    </HamburgerMenuWrapper>
  )
}
const Hamburger: React.FC = () => {
  const isLogin = useLogin()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [])

  return (
    <>
      <HamburgerContainer src={HAMBURGER_IMG} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <HamburgerMenu setIsOpen={setIsOpen} isLogin={isLogin} />}
    </>
  )
}

export default Hamburger
