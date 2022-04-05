import React from 'react'
import styled from 'styled-components'
import { PageWrapper } from '../../styles/components'
import MainSearch from './MainSearch'
import SpaceBG from './SpaceBackground'

const HomeContainer = styled(PageWrapper)`
  justify-content: center;
  align-items: flex-start;
  padding-left: 10%;
`

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <MainSearch />
      {/* <SpaceBG /> */}
    </HomeContainer>
  )
}

export default Home
