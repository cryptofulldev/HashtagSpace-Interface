import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { ReactComponent as Close } from '../../../assets/images/x.svg'
import { BoxCard, ContainerColumn } from '../../../styles/components'
import { TextType } from '../../../styles/textWrapper'

const ModalContainer = styled(BoxCard)`
  position: relative;
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const CloseColor = styled(Close)`
  path {
    stroke: #b2b9d2;
  }
`

interface ModalProps {
  title: string
  contentText: string
  toggleModal: () => void
}

const Modal: React.FC<ModalProps> = ({ title, contentText, toggleModal }) => {
  return (
    <ModalContainer>
      <TextType.largeHeader marginY={24}>{title}</TextType.largeHeader>
      <TextType.body textAlign={'left'} overflowY={'auto'} maxHeight={'calc(90vh - 120px)'} padding={24}>
        <ReactMarkdown>{contentText}</ReactMarkdown>
      </TextType.body>
      <CloseIcon onClick={toggleModal}>
        <CloseColor />
      </CloseIcon>
    </ModalContainer>
  )
}

export default Modal
