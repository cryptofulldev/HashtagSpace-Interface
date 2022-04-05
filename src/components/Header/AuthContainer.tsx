import React from 'react'
import { ContainerRow, NavLinkButton } from '../../styles/components'
import { TextType } from '../../styles/textWrapper'

const AuthContainer = () => {
  return (
    <ContainerRow width={'fit-content'} justifyContent={'flex-end'}>
      <NavLinkButton to="/signin">
        <TextType.label color={'var(--dark-black)'}>LogIn</TextType.label>
      </NavLinkButton>
      <NavLinkButton to="/signup">
        <TextType.label color={'var(--dark-black)'}>SignUp</TextType.label>
      </NavLinkButton>
    </ContainerRow>
  )
}

export default AuthContainer
