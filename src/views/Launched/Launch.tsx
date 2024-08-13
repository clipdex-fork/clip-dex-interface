import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Button, Text } from '@clipdex/clip-dex-uikit'
import LaunchCard from './components/LaunchCard'
import Page from './components/Page'
import BaseLayout from '../../components/BaseLayout'

const StyledTitle = styled.div`
  font-size: 32px;
  font-family: 'Roboto';
  font-weight: bold;
  color: ${({ theme }) => (theme.isDark ? '#ffcd84' : '#382820')};
  padding: 50px 0px 50px 0px;
`
const StyledFooter = styled.div`
  background-image: url('/images/launchpad/ido-card-bg.png');
  max-width: 1300px;
  border-radius: 20px;
  height: 220px;
  margin-top: 20px;
  padding: 20px 240px 10px 280px;
`

const FooterTitle = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#d6a485' : '#ac562a')};
  font-size: 28px;
  font-weight: 700;
  font-family: 'Roboto';
`
const FooterDescription = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#d6a485' : '#ac562a')};
  font-family: 'Yuanti SC';
  margin-top: 15px;
  font-size: 14px;
  letter-spacing: 0.01em;
`

const CardImageInfo = styled.div`
  max-width: 1360px;
  display: flex;
  flex-direction: column;
  font-size: 30px;
  text-align: center;
  @media screen and (min-width: 1300px) {
    flex-direction: row;
    text-align: left;
  }
`

const StyledParticipateBtn = styled(Button)`
  width: 152px;
  height: 36px;
  color: ${({ theme }) => (theme.isDark ? 'rgb(114, 47, 13)' : '#ffcd84')};
  line-height: 36px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 18px;
  background-color: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(180.24deg, rgb(189, 98, 52) 0.21%, rgb(165, 72, 25) 63.19%)`
      : `linear-gradient(
    180.24deg, rgb(189, 98, 52) 0.21%, rgb(165, 72, 25) 63.19%)`};
  align-self: center;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardScrollScope = styled(BaseLayout)`
  justify-content: left;
  padding: 16px 24px 0px 24px;
  max-width: 1500px;
  overflow: auto;
  // height: 420px;
  ::-webkit-scrollbar {
    display: none;
  }
`

const launchCardData = [
  {
    id: 1,
    imgurl: '/images/launchpad/card_img1.png',
    description: 'Build the central bank and reserve currency for DeFi.',
    title: 'Lorem ipsum',
    idoAmount: '123,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 2,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Build the central bank and reserve currency for DeFi.',
    title: 'Mars Ecosystem',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 3,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Build the central bank and reserve currency for DeFi.',
    title: 'Mars Ecosystem',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 4,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Build the central bank and reserve currency for DeFi.',
    title: 'Mars Ecosystem',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 5,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Build the central bank and reserve currency for DeFi.',
    title: 'Mars Ecosystem',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 6,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 7,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 8,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ips',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 9,
    imgurl: '/images/launchpad/card_img1.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 10,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 11,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 12,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 13,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 14,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 15,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
  {
    id: 16,
    imgurl: '/images/launchpad/card_img2.png',
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    title: 'Lorem ipsum',
    idoAmount: '300,000 ZNX',
    time: '9286652(07.19 7:00 UTC)',
  },
]

const Launch = () => {
  // const [onPresent1] = useModal(<LaunchModal showCommonBases />, false)
  const { t } = useTranslation()
  return (
    <Page>
      <StyledTitle>{t('LAUNCHPAD')}</StyledTitle>
      {/* <StyledIdoBtn onClick={onIdoBtnClk} scale="sm">
        {t('LAUNCH YOUR OWN IDO')}
      </StyledIdoBtn> */}
      <CardImageInfo>
        {/* <LeftWrapper style={{ textAlign: 'center' }}>
          <Card
            style={{
              padding: '12px',
              backgroundImage: 'linear-gradient(180deg, #19fff4, #abffb0)',
              width: '100px',
              textAlign: 'center',
              marginTop: '-10px',
              marginLeft: '-20px',
              position: 'absolute',
              fontSize: '14px',
              display: 'inline-block',
              zIndex: 1,
              color: '#000000',
            }}
          >
            {t('LIVE NOW!')}
          </Card>
          <video width="400" height="400" controls style={{ borderRadius: '20px' }}>
            <source src="images/launchpad/india app.mp4" type="video/mp4" />
            <source src="images/launchpad/india app.mp4" type="video/ogg" />
            {t('Your browser does not support HTML video.')}
          </video>
        </LeftWrapper> */}
        {/* <RightWrapper>
          <NowLive>
            <LoremText>{t('Lorem')}</LoremText>
            {t(' ipsum dolor sit amet')}
          </NowLive>
          <Text
            style={{ marginBottom: '24px', textAlign: 'left' }}
            fontWeight={600}
            color="#2594e1"
            fontFamily="Roboto"
          >
            {t(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore manage qliqua.',
            )}
          </Text>
          <Text
            style={{ marginBottom: '24px', textAlign: 'left' }}
            color={theme.isDark ? 'white' : '#414076'}
            fontFamily="poppins light"
          >
            {t(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt ut labore et dolore magna aliqua.',
            )}
          </Text>
          <StyledCardAmount>
            <CardAmountTime>
              <RightWrapper style={{ margin: '4px' }}>
                <StyledIdoTime mb={12}>{t('IDO Amount:    300,000 ZNX')}</StyledIdoTime>
                <StyledIdoTime>{t('Time:    9286652(07.19 7:00 UTC)')}</StyledIdoTime>
              </RightWrapper>
              <LeftWrapper style={{ margin: '4px', padding: '21px', textAlign: 'center' }}>
                <Button
                  // onClick={onPresent1}
                  scale="sm"
                  style={{ backgroundImage: 'linear-gradient(180deg, #0dccff, #4662ff)' }}
                >
                  <Text style={{ fontFamily: 'Roboto', color: 'white' }}>{t('PARTICIPATE')}</Text>
                </Button>
              </LeftWrapper>
            </CardAmountTime>
          </StyledCardAmount>
        </RightWrapper> */}
      </CardImageInfo>
      <StyledContent>
        <CardScrollScope>
          {launchCardData.map((card) => (
            <LaunchCard
              key={card.id}
              imgurl={card.imgurl}
              title={card.title}
              description={card.description}
              idoAmount={card.idoAmount}
              time={card.time}
            />
          ))}
        </CardScrollScope>
        <StyledFooter>
          <FooterTitle>{t('How to launch your own IDO ?')}</FooterTitle>
          <FooterDescription>
            {t(
              'Launch your project with BakerySwap, BakerySwap is a decentralized trading platform that uses the automatic market maker (AMM) model. At the same time BakerySwap is the 1st AMM+NFT exchange on Binance Smart Chain.Various data indicate the rapid growth of BakerySwap in the DEFI ecosystem.',
            )}
          </FooterDescription>
          <StyledParticipateBtn>{t('Apply Now')}</StyledParticipateBtn>
        </StyledFooter>
      </StyledContent>
      {/* {theme.isDark ? (
        <BottomGradientDark style={{ height: '100px', width: '100%', position: 'fixed', top: '90%' }} />
      ) : (
        <BottomGradient style={{ height: '100px', width: '100%', position: 'fixed', top: '90%' }} />
      )} */}
    </Page>
  )
}

export default Launch
