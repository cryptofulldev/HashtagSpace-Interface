import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ContainerColumn, ContainerRow } from '../../styles/components'
import { TextType } from '../../styles/textWrapper'
import { ISidebarItem } from '../../types'

const Item: React.FC<ISidebarItem> = ({ label, detail, url }) => {
  return (
    <ContainerColumn alignItems={'flex-start'} padding={'0 0 0 12px'}>
      <TextType.label>{label}</TextType.label>
      <TextType.small>{detail}</TextType.small>
      {url && <NavLink to={url} />}
    </ContainerColumn>
  )
}

const IconWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: #2b2b2b;
  padding: 10px;
  font-size: 14px;
`
export const HrefItem: React.FC<ISidebarItem & { isActive: boolean }> = ({ label, detail, url, icon, isActive }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <ContainerRow padding={'8px 35px 8px 20px'}>
        <IconWrapper>{icon}</IconWrapper>
        <ContainerColumn alignItems={'flex-start'} padding={'0 0 0 12px'}>
          <TextType.label>{label}</TextType.label>
          <TextType.small>{detail}</TextType.small>
        </ContainerColumn>
      </ContainerRow>
    </a>
  )
}

export default Item
