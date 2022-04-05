import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearErrorRegistration, onRegistration } from '../../../state/actions/user'
import { MainButton } from '../../../components/Buttons/MainButton'
import { AppState } from '../../../state'
import { Init } from '../../../state/reducers/user'
import {
  BigBox,
  ContainerColumn,
  ContainerRow,
  InputWrapper,
  PageWrapper,
  TextTitle,
  SpacerSmall,
  NavLinkButton,
  SpacerLarge,
} from '../../../styles/components'
import { device, gradient } from '../../../styles/globalStyles'
import { TextType } from '../../../styles/textWrapper'

const MainConainter = styled(ContainerRow)`
  min-height: 92vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const SignupFormContainer = styled(BigBox)`
  background: transparent;
  border: none;
  width: 30%;
  align-items: flex-start;
  z-index: 999;
  @media screen and ${device.tablet} {
    width: 60%;
    box-shadow: none;
  }
  @media screen and ${device.mobileL} {
    width: 100%;
  }
`
const NavLinkCustomButton = styled(NavLinkButton)`
  border: none;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.text1};
  &:hover {
    background: transparent;
    border: none;
    text-decoration-color: var(--goldenYellow);
    div {
      color: var(--goldenYellow);
    }
  }
`
function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

const Signup: React.FC = () => {
  const errorRegistration = useSelector<AppState, Init['errorRegistration']>(({ user }) =>
    user.get('errorRegistration')
  )
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cPassword, setCPassword] = useState<string>('')
  const [errors, setErrors] = useState<Array<string>>([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearErrorRegistration())
    return () => {
      dispatch(clearErrorRegistration())
    }
  }, [dispatch])

  const signUp = () => {
    const errors = []

    if (!validateEmail(email)) {
      errors.push('email')
    }
    if (!password) {
      errors.push('password')
    }
    if (password.length < 6) {
      errors.push('password')
    }
    if (password !== cPassword) {
      errors.push('cPassword')
    }
    setErrors(errors)
    if (!errors.length) dispatch(onRegistration({ email, password }))
  }

  return (
    <PageWrapper>
      <MainConainter>
        <SignupFormContainer>
          <ContainerRow width={'100%'} justifyContent={'center'} margin={'0 0 40px 0'}>
            <TextTitle>Sign up</TextTitle>
          </ContainerRow>
          <ContainerColumn alignItems={'flex-start'} gap={'10px'}>
            {errors.includes('email') ? (
              <TextType.label color={'var(--red)'}>Invalid Email address</TextType.label>
            ) : (
              <TextType.label>Email address</TextType.label>
            )}
            <InputWrapper borderRadius={'25px'} height={'50px'} onChange={(e) => setEmail(e.target.value)} />
            <SpacerSmall />
            {errors.includes('password') ? (
              <TextType.label color={'var(--red)'}>Invalid password</TextType.label>
            ) : (
              <TextType.label>Password</TextType.label>
            )}
            <InputWrapper
              type={'password'}
              borderRadius={'25px'}
              height={'50px'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SpacerSmall />
            {errors.includes('cPassword') ? (
              <TextType.label color={'var(--red)'}>No match password</TextType.label>
            ) : (
              <TextType.label>Confirm password</TextType.label>
            )}
            <InputWrapper
              type={'password'}
              borderRadius={'25px'}
              height={'50px'}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </ContainerColumn>
          <SpacerLarge />
          <ContainerRow justifyContent={'flex-end'} margin={'10px 0'}>
            <MainButton
              backgroundColor={gradient.normal}
              borderRadius={'25px'}
              width={'100%'}
              height={'50px'}
              onClick={() => signUp()}
            >
              <TextType.label color={'var()'} fontSize={'1.2rem'}>
                Sign up
              </TextType.label>
            </MainButton>
          </ContainerRow>
          <ContainerRow justifyContent={'center'} margin={'10px 0'}>
            <TextType.label color={'var()'} fontSize={'1.2rem'}>
              Have an account?
            </TextType.label>
            <NavLinkCustomButton
              to="/signin"
              isTransparent={true}
              style={{ textDecorationColor: 'var(--goldenYellow)' }}
            >
              <TextType.label color={'var(--goldenYellow)'} fontSize={'1.2rem'}>
                Sign in
              </TextType.label>
            </NavLinkCustomButton>
          </ContainerRow>
        </SignupFormContainer>
      </MainConainter>
    </PageWrapper>
  )
}

export default Signup
