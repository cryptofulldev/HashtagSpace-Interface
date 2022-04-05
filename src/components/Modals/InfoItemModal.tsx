import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ModalWrapper } from '.'
import { ReactComponent as Close } from '../../../assets/images/x.svg'
import { useInfoItem } from '../../hooks/useInfo'
import { useModalOpen, useToggleModal } from '../../hooks/useModal'
import { ApplicationModal } from '../../state/reducers/application'
import { BoxCard } from '../../styles/components'
import { TextType } from '../../styles/textWrapper'
import { MainButton } from '../Buttons/MainButton'
import { InfoModal } from './ModalTemplate'

const InfoItemModal: React.FC = () => {
  const infoItem = useInfoItem()
  const content = useMemo(() => infoItem.description.replace(/\n/gi, '\n\n &nbsp;'), [infoItem])
  const isOpen = useModalOpen(ApplicationModal.INFO_ITEM)
  const toggleModal = useToggleModal(ApplicationModal.INFO_ITEM)
  console.log(infoItem)

  return (
    <ModalWrapper isOpen={isOpen} onDismiss={toggleModal} minHeight={false} maxHeight={90}>
      <InfoModal title={infoItem.title} contentText={content} toggleModal={toggleModal} />
    </ModalWrapper>
  )
}

export default InfoItemModal
