import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, Grid } from '@clipdex/clip-dex-uikit'
import { useTranslation } from 'contexts/Localization'
import * as TokenBalance from 'hooks/useTokenBalance'
import { usePriceColaBusd } from 'state/farms/hooks'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { getColaAddress } from 'utils/addressHelpers'

import HomeCardList from 'views/Home/components/HomeCardList'
import CardValue from './components/CardValue'
// import Footer from '../../components/Menu/Footer'
import Lock from './components/Lock'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 233px);
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  background: ${({ theme }) => (theme.isDark ? '#343135' : '#faf9fa')};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  margin-top: 16px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 500;
  margin-bottom: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  width: 90%;
  justify-content: space-between;
  margin-bottom: 24px;
`

const LeftCol = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : 'white')};
  border-radius: 20px;
  padding: 20px 30px;
  height: inherit;
  font-size: 12px;
  width: 100%;
  margin-right: 12px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px;
  @media screen and (max-width: 800px) {
    margin: 12px 0;
    width: 100%;
  }
`

const LeftGridLayout = styled(Grid)`
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;
  @media screen and (min-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

// const RightGridLayout = styled(Grid)`
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 16px;
//   @media screen and (min-width: 300px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
//   @media screen and (min-width: 800px) {
//     grid-template-columns: repeat(1, 1fr);
//   }
//   @media screen and (min-width: 1200px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `

const StyledCardValue = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#d6d7e399' : '#19274b99')};
  font-size: 15px;
  word-break: break-word;
  line-height: 16px;
`

const CardContainer = styled.div`
  height: 100%;
  margin-bottom: 30px;
  justify-item: center;
`

const StyledVideo = styled.video`
  max-width: 450px;
  border-radius: 20px;
  // border: 2px solid #9f7853;
  @media screen and (max-width: 1400px) {
    max-width: 350px;
  }
`
const StyledTopSide = styled.div`
  display: flex;
  padding: 20px;
  @media screen and (max-width: 900px) {
    display: block;
  }
`
const VideoSide = styled.div`
  align-self: center;
  margin-right: 20px;
  @media screen and (max-width: 900px) {
    margin-right: 0px;
  }
`
const VideoSide1 = styled.div`
  align-self: center;
  margin-right: 20px;
  @media screen and (max-width: 900px) {
    margin-right: 0px;
  }
`
const StyledBoldText = styled.span`
  font-weight: 700;
  color: #ee6c4d;
`
const StyledText1 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
`
const StyledNFTitem = styled.div`
  display: flex;
  margin: 17px 20px;
  justify-content: space-between;
  align-items: center;
`
const StyledBorder = styled.span`
  background: ${({ theme }) => (theme.isDark ? '#33334B' : 'rgba(0, 0, 0, 0.2)')};
  height: 1px;
  display: block;
  opacity: 0.2;
  margin: 0px 20px;
`
const StyledCardValue1 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#B9B9B999' : '#00000066')};
  font-weight: 600;
  font-size: 12px;
  line-height: 120%;
`
const Home: React.FC = () => {
  const { t } = useTranslation()

  const totalSupply = TokenBalance.useTotalSupply()
  const burnedBalance = getBalanceNumber(TokenBalance.useBurnedBalance(getColaAddress()))
  const colaSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const colaPrice = usePriceColaBusd()
  const [colaUSDPrice, setColaUSDPrice] = useState(0)
  const { balance: colaBalance } = TokenBalance.default(getColaAddress())
  const [colaMarketCapUSDBalance, setColaMarketCapUSDBalance] = useState(0)
  const { account } = useWeb3React()

  useEffect(() => {
    setColaUSDPrice(Number(getFullDisplayBalance(colaPrice, 1, 18)))
    setColaMarketCapUSDBalance(new BigNumber(colaSupply).multipliedBy(colaPrice).toNumber())
  }, [colaPrice, colaSupply])

  return (
    <>
      <StyledPage>
        <StyledPage>
          {/* <StyledTopSide>
            <VideoSide>
              <StyledVideo className="videoTag" autoPlay loop muted>
                <source src="images/ad_zilionixx.mp4" type="video/mp4" />
                <source src="images/ad_zilionixx.mp4" type="video/ogg" />
              </StyledVideo>
            </VideoSide>
            <VideoSide1>
              <StyledVideo className="videoTag" autoPlay loop muted>
                <source src="images/ad_NFT.mp4" type="video/mp4" />
                <source src="images/ad_NFT.mp4" type="video/ogg" />
              </StyledVideo>
            </VideoSide1>
          </StyledTopSide> */}
          <Row>
            <LeftCol>
              <LeftGridLayout>
                <div>
                  <StyledText> {t('Your CLIP balance')} </StyledText>
                  {!account ? <Lock /> : <CardValue decimals={0} value={getBalanceNumber(colaBalance)} color="black" />}
                </div>

                <div>
                  <StyledText color="black"> {t('Pending Harvest')} </StyledText>
                  <StyledCardValue>
                    {' '}
                    <StyledBoldText>$</StyledBoldText> {t(' 0.000')}{' '}
                  </StyledCardValue>
                </div>

                <div>
                  <StyledText color="black"> {t('CLIP price')} </StyledText>
                  <CardValue decimals={10} value={colaUSDPrice} color="black" />
                </div>

                <div>
                  <StyledText color="black"> {t('CLIP Market Cap')} </StyledText>
                  <CardValue decimals={0} value={colaMarketCapUSDBalance} color="black" />
                </div>

                <div>
                  <StyledText color="black"> {t('CLIP in Circulation')} </StyledText>
                  <CardValue decimals={0} value={colaSupply} color="black" />
                </div>

                <div>
                  <StyledText color="black"> {t('Total Supply')} </StyledText>
                  <CardValue decimals={0} value={colaSupply + burnedBalance} color="black" />
                </div>

                <div>
                  <StyledText color="black"> {t('TVL')} </StyledText>
                  <CardValue decimals={0} value={burnedBalance} color="black" />
                </div>

                <div>
                  <StyledText color="black"> {t('Volume(24hr)')} </StyledText>
                  <Lock />
                </div>
              </LeftGridLayout>
            </LeftCol>
          </Row>
          <CardContainer>
            <HomeCardList />
          </CardContainer>
        </StyledPage>
        {/* <Footer /> */}
      </StyledPage>
    </>
  )
}

export default Home
