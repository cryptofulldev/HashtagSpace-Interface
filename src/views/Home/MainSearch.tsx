import React from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { MainButton } from '../../components/Buttons/MainButton'
import { useMainSearch } from '../../hooks/useHome'
import { ContainerColumn, ContainerRow, InputWrapperWithBG } from '../../styles/components'
import { TextType } from '../../styles/textWrapper'
import { GiWarPick } from 'react-icons/gi'
import HASHTAG_BG from '../../assets/images/home-bg-4.png'
import { ImgContainer } from '../../components/ImageContainer'
import { device } from '../../styles/globalStyles'

const SearchInputContainer = styled(ContainerRow)`
  background-color: var(--light-background1);
  border-radius: 50px;
  border: 1px solid var(--dark-opacityColor);
  height: 42px;
  padding-left: 24px;
  margin: 12px 0;
  z-index: 1;
`
const TagText = styled(TextType.largeHeader)`
  color: ${({ theme }) => theme.reverseText};
`
const ProspectBtn = styled(MainButton)`
  border-radius: 0 50px 50px 0;
  width: 120px;
  height: 42px;
`

const MainSearch: React.FC = () => {
  const { hashtag, setHashtag, errorCheckHashtag, setErrorCheckHashtag, goProspect, changeDomain } = useMainSearch()

  return (
    <ContainerColumn width={isMobile ? '90%' : '40%'} height={'100%'} alignItems={'flex-start'}>
      <TextType.shadow fontSize={isMobile ? 30 : 60} fontWeight={700}>
        #HashtagSpace
      </TextType.shadow>
      <SearchInputContainer>
        <TagText color={'var(--light-text1)'}>{'#'}</TagText>
        <InputWrapperWithBG
          width={'100%'}
          type="text"
          placeholder=""
          backgroundColor={'var(--light-background1)'}
          border={'1px solid transparent'}
          color={'var(--light-text1)'}
          height={'40px'}
          value={hashtag}
          onChange={changeDomain(setHashtag, setErrorCheckHashtag)}
        />
        <ProspectBtn type="button" onClick={() => goProspect()}>
          <GiWarPick />
          {'Prospect'}
        </ProspectBtn>
      </SearchInputContainer>
      <TextType.shadow fontSize={isMobile ? 20 : 30} fontWeight={700}>
        Decentralized Hashtag #domains!
      </TextType.shadow>
      <ImgContainer imgUrl={HASHTAG_BG} position={'absolute'} left={'10%'} borderRadius={'0px'} />
      {errorCheckHashtag && (
        <TextType.error>The minimum length is 3 characters. Valid characters a-zA-Z0-9_-</TextType.error>
      )}
    </ContainerColumn>
  )
}

export default MainSearch
