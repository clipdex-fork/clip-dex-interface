import React from 'react'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { ModalContainer, InjectedModalProps, ModalCloseButton } from '@clipdex/clip-dex-uikit'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import SelectedModalCard from './SelectedModalCard'
import SelectedModalCard1 from './SelectedModalCard1'
// import TopStakers from './TopStakers'

const StyledModal = styled(ModalContainer)`
  border: none;
  box-shadow: none;
  background-color: ${({ theme }) => (theme.isDark ? `#10101C` : `#F0F2FA`)};
  position: relative;
  border: white;
  padding: 50px;
  overflow: auto;
  max-width: 840px;
  ::-webkit-scrollbar {
    display: none;
  }
  .cancel {
    width: 30px;
    height: 30px;
    margin-top: 15px;
    margin-right: 20px;
  }
  @media screen and (max-width: 940px) {
    width: 90%;
  }
`

const StyledCard = styled.div`
  position: relative;
  justify-content: center;
  & Button {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  & img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
  @media screen and (max-width: 940px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`

const Col = styled.div`
  text-align: center;
  margin: 0 20px;
  @media screen and (max-width: 940px) {
    margin: 12px auto;
  }
  @media screen and (max-width: 480px) {
    margin: 12px 0;
  }
`

const StyledHeader = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#ccccd2' : '#4f5f6f')};
  text-align: center;
  margin-bottom: 50px;
`

const TokenName = styled.div`
  box-sizing: border-box;
  font-weight: 600;
  font-size: 35px;
  line-height: 32px;
  margin: 0px;
  min-width: 0px;
  margin-top: 18px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
`

const Description = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#B9B9B9' : '#19274B')};
  box-sizing: border-box;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin: 0px;
  margin-top: 22px;
  min-width: 0px;
`

const LogoHeaderContent = styled.div`
  display: inline-flex;
`

interface CurrencySearchModalProps extends InjectedModalProps {
  farm: FarmWithStakedValue
  earningToken: string
  account?: string
  addLiquidityUrl?: string
}

export default function CustomModal({
  onDismiss = () => null,
  farm,
  earningToken,
  account,
  addLiquidityUrl,
}: CurrencySearchModalProps) {
  const { pid } = farm
  const { earnings: earningsAsString = 0 } = farm.userData || {}

  const earnings = new BigNumber(earningsAsString)
  // const lpAddress = getAddress(lpAddresses)

  return (
    <StyledModal minWidth="370px">
      <div style={{ textAlign: 'end' }}>
        <ModalCloseButton onDismiss={onDismiss} />
      </div>
      <StyledCard>
        <StyledHeader>
          <LogoHeaderContent>
            <img
              src={`/images/tokens/${getAddress(farm.token.address)}.png`}
              style={{ height: '68px' }}
              alt="card-logo"
            />
            <img
              src={`/images/tokens/${getAddress(farm.quoteToken.address)}.png`}
              style={{ height: '68px' }}
              alt="card-logo"
            />
          </LogoHeaderContent>
          {/* <img src={`/images/earning/${lpAddress}.png`} style={{ height: '68px' }} alt="LP Token" /> */}
          <TokenName>{farm.lpSymbol}</TokenName>
          <Description>
            Deposit {farm.lpSymbol} Tokens and earn {earningToken}
          </Description>
        </StyledHeader>
        <Row>
          <Col>
            <SelectedModalCard earning={earnings} pid={pid} earningToken={earningToken} />
          </Col>
          <Col>
            <SelectedModalCard1 farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
          </Col>
        </Row>
      </StyledCard>
    </StyledModal>
  )
}
