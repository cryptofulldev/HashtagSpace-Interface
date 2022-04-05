import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FaGem, FaHeart } from 'react-icons/fa'
import Item, { HrefItem } from './MenuItem'
import { MenuList } from './MenuList'
import { ContainerRow } from '../../styles/components'

const SidebarContainer = styled.div`
  .pro-sidebar {
    height: calc(100vh - 74px - 64px);
  }
`

const SideBar: React.FC = () => {
  const [activatedItem, setActivatedItem] = useState<string>('/propsect')
  const url = useMemo(() => new URL(window.location.href), [])

  useEffect(() => {
    setActivatedItem(url.pathname)
    return () => {
      setActivatedItem('/prospect')
    }
  }, [url])

  return <SidebarContainer></SidebarContainer>
}

export default SideBar
