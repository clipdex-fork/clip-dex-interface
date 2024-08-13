import React from 'react'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { ModalContainer, InjectedModalProps, ModalCloseButton } from '@clipdex/clip-dex-uikit'
import { Pool } from 'state/types'
import styled from 'styled-components'
// import TopStakers from '../TopStakers'
import PoolHavestCard from './PoolHavestCard'
import PoolStakeCard from './PoolStakeCard'

const StyledModal = styled(ModalContainer)`
  border: none;
  box-shadow: none;
  background-color: ${({ theme }) => (theme.isDark ? `#10101C` : `#F0F2FA`)};
  position: relative;
  padding: 24px;
  max-width: 840px;
  // min-width: 1000px;
  overflow: auto;
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
  margin: 0 35px;
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
  margin: 0px;
  min-width: 0px;
  font-size: 45px;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? '#ccccd2' : '#4f5f6f')};
  line-height: 1.7;
`

const Description = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#ccccd2' : '#4f5f6f')};
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-size: 18px;
  font-weight: 500;
`

const StyledTokenImage = styled.img`
  height: 54px;
`

interface PoolCardSelectedModalProps extends InjectedModalProps {
  pool: Pool
  account?: string
}

export default function CustomModal({ onDismiss = () => null, pool, account }: PoolCardSelectedModalProps) {
  const { pendingReward: earningsAsString = 0 } = pool.userData || {}

  const earnings = new BigNumber(earningsAsString)

  return (
    <StyledModal minWidth="370px">
      <div style={{ textAlign: 'end' }}>
        <ModalCloseButton onDismiss={onDismiss} />
      </div>
      <StyledCard>
        <StyledHeader>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StyledTokenImage src={`/images/tokens/${getAddress(pool.stakingToken.address)}.png`} alt="card-logo" />
            <StyledTokenImage src={`/images/tokens/${getAddress(pool.earningToken.address)}.png`} alt="card-logo" />
          </div>
          <TokenName>
            {pool.stakingToken.symbol} to {pool.earningToken.symbol}
          </TokenName>
          <Description>
            Deposite {pool.stakingToken.symbol} and earn {pool.earningToken.symbol}
          </Description>
        </StyledHeader>
        <Row>
          <Col>
            <PoolHavestCard pool={pool} earning={earnings} />
          </Col>
          <Col>
            <PoolStakeCard pool={pool} account={account} />
          </Col>
        </Row>
        {/* <TopStakers /> */}
      </StyledCard>
    </StyledModal>
  )
}
