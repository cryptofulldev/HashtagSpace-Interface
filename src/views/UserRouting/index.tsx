import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import SideBar from '../../components/Menu'
import { ContainerRow, PageWrapper } from '../../styles/components'

const Prospect = lazy(() => import('../Prospect'))
const Domains = lazy(() => import('../Domains'))

const MainContainerWithSideBar = styled(PageWrapper)`
  flex-direction: row;
  align-items: flex-start;
`

const UserRouting = () => {
  return (
    <MainContainerWithSideBar>
      <SideBar />
      <Switch>
        <Route path="/prospect" component={Prospect} />
        <Route path="/domains" component={Domains} />
      </Switch>
    </MainContainerWithSideBar>
  )
}

export default UserRouting
