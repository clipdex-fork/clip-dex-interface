import React from 'react'
// import axios from 'axios'
import styled from 'styled-components'
// import { NFT_API_SERVER } from 'config/constants'

import { Button, Text, Flex, ButtonMenu } from '@clipdex/clip-dex-uikit'

import useToast from 'hooks/useToast'
import HomeArtworkCard from './HomeArtworkCard'
import BaseLayout from '../../../components/BaseLayout'

const CardListHeader = styled.div`
  width: 100%;
  text-align: center;
  font-size: 24px;
  line-height: 60px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#171717')};
  @media screen and (max-width: 1280px) {
    text-align: center;
  }
`

const TitleContainer = styled(Flex)`
  flex-direction: column;
  flex: 1;
  margin: 0 48px 24px 48px;
`

const NowLive = styled(Text)`
  text-align: center;
  display: inline;
`

const LeftText = styled(Text)<{ fontSize: string }>`
  background-color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#171717')};
  font-size: ${({ fontSize }) => `(${fontSize})`};
  font-weight: 700;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
`

const BlackButton = styled(Button)<{ buttonStyle: boolean }>`
  background-color: ${({ buttonStyle }) => (buttonStyle ? '#EE6C4D' : 'transparent')};
  color: ${({ theme, buttonStyle }) =>
    buttonStyle ? 'white' : theme.isDark ? 'rgba(185, 185, 185, 0.39)' : 'rgba(0, 0, 0, 0.39)'};};
  height: 50px;
  border-radius: 5px;
  &:active {
    box-shadow: none !important;
  }
  font-size: 17px;
  margin: 5px 12px !important;
  
  text-transform: uppercase;
  @media screen and (max-width: 700px) {
    align-self: center;
    width: 260px;
  }
`

const ActionButtonGroup = styled(ButtonMenu)`
  background: ${({ theme }) => (theme.isDark ? '#343135' : 'white')};
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 660px) {
    flex-direction: row;
  }
`

const StyledHomeCardList = styled.div`
  max-width: 1188px;
  margin: 0px auto 0px;
  align-self: center;
`

const HomeCardList: React.FC = () => {
  const { toastError } = useToast()

  // const [isLoading, setIsLoading] = React.useState(true)
  const [artworks, setArtworks] = React.useState([])
  const [btnId, setButtonIndex] = React.useState(0)

  const viewArtworksMethods = React.useMemo(() => {
    return [
      { id: 0, btnName: 'WEEKLY', period: 'week' },
      { id: 1, btnName: 'MONTHLY', period: 'month' },
      { id: 2, btnName: 'YEARLY', period: 'year' },
    ]
  }, [])

  // React.useEffect(() => {
  //   axios
  //     .get(`${NFT_API_SERVER}/api/v0/nft/getPeriodArtworks/${viewArtworksMethods[btnId].period}`)
  //     .then(async (res) => {
  //       setArtworks(res.data.data)
  //     })
  //     .catch((err) => {
  //       toastError(err.name, err.message)
  //     })
  // }, [toastError, btnId, viewArtworksMethods])

  const handleViewArtworksBtn = (newIndex) => {
    setButtonIndex(newIndex)
  }

  return (
    <StyledHomeCardList>
      <TitleContainer>
        <NowLive>
          <LeftText fontSize="25px"> Out of This World NFTs in 1 {viewArtworksMethods[btnId].period} </LeftText>
        </NowLive>
      </TitleContainer>
      <ActionButtonGroup activeIndex={btnId} onItemClick={handleViewArtworksBtn}>
        {viewArtworksMethods.map((viewMethod) => (
          <BlackButton key={viewMethod.id} buttonStyle={viewMethod.id === btnId}>
            {viewMethod.btnName}
          </BlackButton>
        ))}
      </ActionButtonGroup>
      <TitleContainer style={{ marginTop: '16px' }}>
        <NowLive>
          <LeftText fontSize="16px">SWITCHVIEWS OR GO BACK TO DEFAULT</LeftText>
        </NowLive>
      </TitleContainer>
      <CardListHeader>Hottest Artworks in 1 {viewArtworksMethods[btnId].period}</CardListHeader>
      <BaseLayout style={{ justifyItems: 'center' }}>
        {artworks.map((art) => (
          <HomeArtworkCard key={art._id} art={art} />
        ))}
      </BaseLayout>
    </StyledHomeCardList>
  )
}

export default HomeCardList
