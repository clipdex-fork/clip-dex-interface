import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import useToast from 'hooks/useToast'
import { Button, ArrowBackIcon, SearchIcon, ButtonMenu } from '@clipdex/clip-dex-uikit'
// import { NFT_API_SERVER } from 'config/constants'
// import useTheme from 'hooks/useTheme'
import BaseLayout from '../../components/BaseLayout'
import MyArtworkCard from './components/MyArtworkCard'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 320px);
  -webkit-box-align: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  // background-size: cover !important;
  // background-color: ${({ theme }) => (theme.isDark ? '#141c23' : '#cfcfcf')};
  // background-size: cover !important;
  // background: black;
  // background-image: ${({ theme }) => (theme.isDark ? `url('/images/black.png')` : `url('/images/light.png')`)};
  // background-repeat: no-repeat;
  // background-position: center top;
  background: ${({ theme }) => (theme.isDark ? '#10101c' : '#E5E5E5')};
  padding: 0px 16px;
`

const CustomBaseLayout = styled(BaseLayout)`
  padding: 16px;
`
const CardPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  max-width: 894px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin: 0 auto 24px auto;
`

const ButtonGroup = styled(ButtonMenu)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`

const CustomButton = styled(Button)<{ backgroundColor: string }>`
  font-weight: 500;
  text-align: center;
  border-radius: 9px;
  border: transparent;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  height: 40px;
  padding: 11px 21px;
  max-width: 100px;
  width: 100px;
  font-size: 15px;
  line-height: 18px;
  margin: 0px 0px 0px 20px !important;
  text-transform: none;
  box-shadow: none;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 500px) {
    margin: 5px 0 !important;
  }
`

const SortDetail = styled.div`
  align-items: center;
  word-break: break-word;
  text-align: right;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`

const LeftLabel = styled.span`
  color: ${({ theme }) => (theme.isDark ? '#70708A' : '#A1A5B1')};
  margin-right: 5px;
`

const RightLabel = styled.span`
  color: #ee6c4d;
`

const SearchPanel = styled.div`
  display: flex;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const SearchRow = styled.div`
  display: flex;
  margin: 20px 10px;
  flex-direction: column;
  width: 50%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

const SortLabel = styled.label`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin: 8px 0px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  text-align: left;
`

const SearchLabel = styled.label`
  font-size: 14px;
  min-width: 200px;
  font-weight: 600;
  line-height: 17px;
  margin: 8px 0px;
  color: ${({ theme }) => (theme.isDark ? '#7C7C84' : 'rgba(25, 39, 75, 0.6)')};
  text-align: left;
  text-transform: uppercase;
`
const SearchInput = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#32323E' : 'rgba(0, 0, 0, 0.1)')};
  height: 50px;
  display: flex;
  border-radius: 9px;
  padding: 0 10px;
  width: 100%;
`

const CustomInput = styled.input`
  margin: auto;
  border-radius: 9px;
  border: none;
  padding-right: 10px;
  background-color: transparent;
  height: 100%;
  font-size: 15px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#19274B')};
  outline: none;
  width: 100%;
`

const BackButton = styled(Button)`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274b99')};
  font-size: 18px;
  letter-spacing: -0.3px;
  cursor: pointer;
  box-shadow: none;
`

const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
`

const PageDescription = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 24px;
`

const HeaderTitle = styled.p`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274b')};
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  justify-content: center;
`

const HeaderDescription = styled.p`
  color: ${({ theme }) => (theme.isDark ? '#B9B9B9' : '#a4a4a4')};
  line-height: 1.5;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
`

const BackButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`
const StyledDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#222235' : '#f8f8f8')};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 24px;
`

const NFTMyArtworks: React.FC = () => {
  // const { theme } = useTheme()
  const { account } = useWeb3React()
  // const [isLoading, setIsLoading] = useState(true)
  const [artworks, setArtworks] = useState([])
  const { toastError } = useToast()

  const [artistSearchValue, setArtistSearchValue] = React.useState('')
  const [artworkSearchValue, setArtworkSearchValue] = React.useState('')
  const [isLatest, setIsLatest] = React.useState(false)
  const [isOldest, setIsOldest] = React.useState(false)

  // const handleSearchBtnClick = (latest, oldest) => {
  //   if (artistSearchValue !== '' || artworkSearchValue !== '' || latest === true || oldest === true) {
  //     if (account) {
        // axios
        //   .get(`${NFT_API_SERVER}/api/v0/nft/getSearchedMyArtworks`, {
        //     params: {
        //       address: account,
        //       artistSearchVal: artistSearchValue,
        //       artworkSearchVal: artworkSearchValue,
        //       latestVal: latest,
        //       oldestVal: oldest,
        //     },
        //   })
        //   .then(async (res) => {
        //     setArtworks(res.data.data)
        //   })
        //   .catch((err) => {
        //     toastError(err.name, err.message)
        //   })
  //     }
  //   } else {
  //     getMyArtworks()
  //   }
  // }

  // const getMyArtworks = React.useCallback(() => {
    // if (account) {
    //   axios
    //     .get(`${NFT_API_SERVER}/api/v0/nft/getMyArtworks?address=${account}`)
    //     .then(async (res) => {
    //       setArtworks(res.data.data)
    //     })
    //     .catch((err) => {
    //       toastError(err.name, err.message)
    //     })
    // }
  // }, [toastError, account])
  // useEffect(() => {
  //   getMyArtworks()
  // }, [getMyArtworks])

  // Header texts
  const headerTitle = 'My Artworks'
  const headerDescription = 'Your wonderful artworks are here'

  // const handleEnterKeyDown = (e) => {
  //   if (e.keyCode === 13) {
  //     handleSearchBtnClick(isLatest, isOldest)
  //   }
  // }

  const searchButtonArray = [
    { id: 0, btnName: 'Hottest' },
    { id: 1, btnName: 'Latest' },
    { id: 2, btnName: 'Oldest' },
  ]

  const [tabId, setTabIndex] = useState(0)
  // const handleClickTab = (newIndex) => {
  //   setTabIndex(newIndex)
  //   if (newIndex === 1) {
  //     setIsLatest(true)
  //     setIsOldest(false)
  //     handleSearchBtnClick(true, false)
  //   } else if (newIndex === 2) {
  //     setIsLatest(false)
  //     setIsOldest(true)
  //     handleSearchBtnClick(false, true)
  //   }
  // }

  return (
    <StyledPage>
      <Wrapper>
        <StyledDiv>
          <BackButtonContainer>
            <Link to="/marketplace">
              <BackButton>
                <ArrowBackIcon />
                Back
              </BackButton>
            </Link>
          </BackButtonContainer>
          <PageDescription>
            <HeaderTitle>{headerTitle}</HeaderTitle>
            <HeaderDescription>{headerDescription}</HeaderDescription>
          </PageDescription>
          <SearchPanel>
            <SearchRow>
              <SearchLabel>Search by Artwork: </SearchLabel>
              <SearchInput>
                <CustomInput
                  value={artworkSearchValue}
                  onChange={(e) => setArtworkSearchValue(e.target.value)}
                  // onKeyDown={handleEnterKeyDown}
                  placeholder="Type artwork name..."
                />
                <StyledSearchIcon />
              </SearchInput>
            </SearchRow>
            <SearchRow>
              <SearchLabel>Search by Artist: </SearchLabel>
              <SearchInput>
                <CustomInput
                  value={artistSearchValue}
                  placeholder="Type artist Name..."
                  onChange={(e) => setArtistSearchValue(e.target.value)}
                  // onKeyDown={handleEnterKeyDown}
                />
                <StyledSearchIcon />
              </SearchInput>
            </SearchRow>
          </SearchPanel>
          <SearchPanel>
            <SearchRow>
              <SortLabel>Sort Artwork by:</SortLabel>
            </SearchRow>
            <SearchRow>
              <ButtonGroup
                activeIndex={tabId}
                // onItemClick={handleClickTab}
              >
                {searchButtonArray.map((btn) => (
                  <CustomButton
                    key={btn.id}
                    id={btn.btnName.toLowerCase()}
                    backgroundColor={btn.id === tabId ? '#ca492a' : `#ca492a66`}
                  >
                    {btn.btnName}
                  </CustomButton>
                ))}
              </ButtonGroup>
              <SortDetail>
                <LeftLabel>Switch views or go back to</LeftLabel>
                <RightLabel>Default</RightLabel>
              </SortDetail>
            </SearchRow>
          </SearchPanel>
        </StyledDiv>
      </Wrapper>

      <CardPanel>
        <CustomBaseLayout>
          {artworks.map((art) => (
            <MyArtworkCard key={art._id} art={art} />
          ))}
        </CustomBaseLayout>
      </CardPanel>
    </StyledPage>
  )
}

export default NFTMyArtworks
