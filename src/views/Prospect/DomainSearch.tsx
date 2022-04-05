import React from 'react'
import styled from 'styled-components'
import { MainButton } from '../../components/Buttons/MainButton'
import { useMainSearch } from '../../hooks/useHome'
import { ContainerColumn, ContainerRow, InputWrapperWithBG } from '../../styles/components'
import { TextType } from '../../styles/textWrapper'
import { GiWarPick } from 'react-icons/gi'

const SearchInputContainer = styled(ContainerRow)`
  background-color: ${({ theme }) => theme.reverseBackground};
  border-top: ${({ theme }) => theme.border1};
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

const DomainSearch: React.FC = () => {
  const { hashtag, setHashtag, errorCheckHashtag, setErrorCheckHashtag, goProspect, changeDomain } = useMainSearch()

  return (
    <ContainerColumn alignItems={'flex-start'}>
      <SearchInputContainer>
        <TagText>{'#'}</TagText>
        <InputWrapperWithBG
          width={'100%'}
          type="text"
          placeholder=""
          value={hashtag}
          onChange={changeDomain(setHashtag, setErrorCheckHashtag)}
        />
        <ProspectBtn type="button" onClick={() => goProspect()}>
          <GiWarPick />
          {'Prospect'}
        </ProspectBtn>
      </SearchInputContainer>
      {errorCheckHashtag && (
        <TextType.error>The minimum length is 3 characters. Valid characters a-zA-Z0-9_-</TextType.error>
      )}
    </ContainerColumn>
  )
}

export default DomainSearch
