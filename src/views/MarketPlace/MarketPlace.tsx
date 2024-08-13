import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Button, SearchIcon } from '@clipdex/clip-dex-uikit'
import useToast from 'hooks/useToast'
// import { NFT_API_SERVER } from 'config/constants'
import BaseLayout from '../../components/BaseLayout'
import MarketCard from './components/MarketCard'

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
  padding: 20px;
`

const CarouselBody = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  max-width: 894px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin: 0 auto 24px auto;
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

const StyledDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#222235' : '#f8f8f8')};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 24px;
`

const SearchBox = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`

const SearchRow = styled.div`
  display: flex;
  margin: 20px 10px;
  flex-direction: column;
  width: 50%;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
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

const SearchInput = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#32323E' : 'rgba(0, 0, 0, 0.1)')};
  height: 50px;
  display: flex;
  border-radius: 9px;
  padding: 0 10px;
  width: 100%;
`

const MyArtworkButton = styled(Button)`
  background-color: #ca492a;
  color: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 9px;
  font-size: 17px;
  cursor: pointer;
  width: 243px;
  height: 50px;
  padding: 12px 0px;
  margin: 12px 0;
  box-shadow: none;
`

const MintButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#3a4651')};
  border-radius: 9px;
  border: 2px solid #ca492a;
  font-size: 17px;
  cursor: pointer;
  width: 243px;
  height: 50px;
  padding: 12px 0px;
  margin: 12px 0;
  color: ${({ theme }) => (theme.isDark ? '#ca492a' : '#ca492a')};
`

const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
`

const StyledNavigationBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 540px) {
    flex-direction: column;
    align-items: center;
  }
`

const MarketPlace: React.FC = () => {
  const { toastError } = useToast()

  // const [isLoading, setIsLoading] = useState(true)
  const [artworks, setArtworks] = useState([])

  const [artistSearchValue, setArtistSearchValue] = React.useState('')
  const [artworkSearchValue, setArtworkSearchValue] = React.useState('')

  // const handleSearchBtnClick = () => {
  //   if (artistSearchValue !== '' || artworkSearchValue !== '') {
  //     axios
  //       .get(`${NFT_API_SERVER}/api/v0/nft/getSearchedArtworks`, {
  //         params: { artistSearchVal: artistSearchValue, artworkSearchVal: artworkSearchValue },
  //       })
  //       .then(async (res) => {
  //         setArtworks(res.data.data)
  //       })
  //       .catch((err) => {
  //         toastError(err.name, err.message)
  //       })
  //   } else {
  //     getAllArtworks()
  //   }
  // }

  // const getAllArtworks = React.useCallback(() => {
  //   axios
  //     .get(`${NFT_API_SERVER}/api/v0/nft/getAllArtworks`)
  //     .then(async (res) => {
  //       setArtworks(res.data.data)
  //     })
  //     .catch((err) => {
  //       toastError(err.name, err.message)
  //     })
  // }, [toastError])

  // useEffect(() => {
  //   getAllArtworks()
  // }, [getAllArtworks])

  const handleEnterKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log('key down.')
      // handleSearchBtnClick()
    }
  }

  return (
    <StyledPage>
      <Wrapper>
        <StyledDiv>
          <PageDescription>
            <HeaderTitle>NFT Marketplace</HeaderTitle>
            <HeaderDescription>
              NFTs are no longer confined the limited goods available on earth.
              <br />
              New frontiers are now open.
            </HeaderDescription>
          </PageDescription>
          <SearchBox>
            <SearchRow>
              <SearchLabel>Search by Artwork: </SearchLabel>
              <SearchInput>
                <CustomInput
                  value={artworkSearchValue}
                  onChange={(e) => setArtworkSearchValue(e.target.value)}
                  onKeyDown={handleEnterKeyDown}
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
                  onKeyDown={handleEnterKeyDown}
                />
                <StyledSearchIcon />
              </SearchInput>
            </SearchRow>
          </SearchBox>
        </StyledDiv>
        <StyledNavigationBtnContainer>
          <Link to="/myartwork">
            <MyArtworkButton>My Artworks</MyArtworkButton>
          </Link>
          <Link to="mintartworks">
            <MintButton>Mint Artworks</MintButton>
          </Link>
        </StyledNavigationBtnContainer>
      </Wrapper>
      <CarouselBody>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <CustomBaseLayout>
            {artworks.map((art) => (
              <MarketCard key={art._id} art={art} />
            ))}
          </CustomBaseLayout>
        </div>
      </CarouselBody>
    </StyledPage>
  )
}

export default MarketPlace
