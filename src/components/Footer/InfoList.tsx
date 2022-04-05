import React, { useCallback, useState } from 'react'
import { useGetInfoItem } from '../../hooks/useInfo'
import { useToggleModal } from '../../hooks/useModal'
import { ApplicationModal } from '../../state/reducers/application'
import { ContainerRow } from '../../styles/components'
import { TextType } from '../../styles/textWrapper'
import { InfoItemModal } from '../Modals'
import { useFooter } from './hook'

const FooterInfoList: React.FC = () => {
  const infoList = useFooter()
  const toggleModal = useToggleModal(ApplicationModal.INFO_ITEM)
  const { getInfoItem } = useGetInfoItem()

  const handleOpenInfo = useCallback(
    (id: number) => {
      getInfoItem(id)
      toggleModal()
    },
    [getInfoItem, toggleModal]
  )

  return (
    <ContainerRow justifyContent={'flex-start'} flexWrap={'wrap'}>
      {infoList.map((info) => (
        <TextType.small key={info.id} isHover={true} marginLeft={32} onClick={() => handleOpenInfo(info.id)}>
          {info.title}
        </TextType.small>
      ))}
      <InfoItemModal />
    </ContainerRow>
  )
}

export default FooterInfoList
