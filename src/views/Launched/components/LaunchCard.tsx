import React from 'react'
import styled from 'styled-components'
import { Text, Button, Card, useModal } from '@clipdex/clip-dex-uikit'
import { useTranslation } from 'contexts/Localization'
import LaunchModal from '../LaunchModal'

const FCard = styled.div`
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#080808' : '#fffdfa')};
  align-self: baseline;
  min-width: 280px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 16px;
  margin-left: 16px;
  position: relative;
  // height: 360px;

  // &:hover {
  //   background: rgba(200, 205, 255, 0.7);
  // }
`

const CardImage = styled.div<{ imgurl: string }>`
  border-radius: 20px 20px 0px 0px;
  background-image: ${({ imgurl }) => `url(${imgurl})`};
  align-self: baseline;
  min-width: 280px;
  height: 106px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin-bottom: 4px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  padding: 0px 24px 8px;
  justify-content: space-between;
  margin-bottom: 4px;
`
const CardInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardInfo = styled.div`
  border-radius: 10px;
  padding: 20px 24px 8px;
`

const CardProperty = styled.span`
  box-sizing: border-box;
  font-weight: bold;
  font-size: 15px;
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? '#ffcd84' : '#382820')};
`

const StyledIdoTime = styled(Text)`
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => (theme.isDark ? '#d6a485' : '#ac562a')};
`

const StyledBadge = styled(Card)`
  // padding: 8px;
  // background-color: #c1bfc3;
  // width: 80px;
  // text-align: center;
  // margin-top: -10px;
  // margin-left: -20px;
  // position: absolute;
  // z-index: 1;
  // color: ${({ theme }) => (theme.isDark ? 'black' : 'white')};
  z-index: 1;
  font-size: 12px;
  border-radius: 0px 12px 12px 0px;
  margin-left: 0px;
  margin-top: 16px;
  position: absolute;
  background: #a5a5a5;
  color: rgb(255, 253, 250);
  font-family: 'Roboto';
  font-weight: 400;
  padding: 6px 12px;
`

const StyledCardTitle = styled(Text)`
  width: 100%;
  color: ${({ theme }) => (theme.isDark ? '#ffcd84' : '#382820')};
  font-size: 20px;
  font-family: 'Roboto';
  font-weight: bold;
  line-height: 28px;
  letter-spacing: 0.01em;
`

const StyledCardDescription = styled(Text)`
  padding: 0px 24px 8px;
  color: ${({ theme }) => (theme.isDark ? '#d6a485' : '#ac562a')};
  font-size: 14px;
  min-height: 69px;
  font-family: 'Roboto';
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const StyledMoreBtn = styled(Button)`
  width: 44px;
  height: 13px;
  color: ${({ theme }) => (theme.isDark ? '#ac562a' : '#ac562a')};
  // font-family: 'Roboto';
  font-weight: bold;
  font-size: 10px;
  border-radius: 10px;
  box-shadow: none;
`

const StyledParticipateBtn = styled(Button)`
  width: 232px;
  height: 36px;
  color: ${({ theme }) => (theme.isDark ? 'rgb(114, 47, 13)' : 'white')};
  line-height: 36px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  border-radius: 10px;
  text-decoration: none;
  background-color: ${({ theme }) => (theme.isDark ? '#efc990' : '#ac562a')};
  align-self: center;
`

const LaunchCard: React.FC<{ imgurl: string; title: string; description: string; idoAmount: string; time: string }> = ({
  imgurl,
  title,
  description,
  idoAmount,
  time,
}) => {
  const { t } = useTranslation()
  const [onPresent1] = useModal(
    <LaunchModal
      imgurl={imgurl}
      title={title}
      description={description}
      time={time}
      idoAmount={idoAmount}
      // showCommonBases
    />,
    false,
  )
  return (
    <FCard>
      <StyledBadge>{t('ENDED')}</StyledBadge>
      <CardImage imgurl={imgurl} />
      <Row>
        <StyledCardTitle>{t(`${title}`)}</StyledCardTitle>
        <StyledMoreBtn onClick={onPresent1} variant="text">
          {t('MORE...')}
        </StyledMoreBtn>
      </Row>
      <StyledCardDescription>{t(`${description}`)}</StyledCardDescription>
      <CardInfo>
        <CardInfoDiv>
          <StyledIdoTime>{t('IDO Amount: ')}</StyledIdoTime>
          <CardProperty>{t(`${idoAmount}`)}</CardProperty>
        </CardInfoDiv>
        <CardInfoDiv>
          <StyledIdoTime>{t('time: ')}</StyledIdoTime>
          <CardProperty>{t(`${time}`)}</CardProperty>
        </CardInfoDiv>
      </CardInfo>
      <Row>
        <StyledParticipateBtn onClick={onPresent1}>{t('Participate')}</StyledParticipateBtn>
      </Row>
    </FCard>
  )
}

export default LaunchCard
