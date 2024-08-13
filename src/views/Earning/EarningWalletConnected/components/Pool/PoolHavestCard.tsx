// eslint-disable-next-line
import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { getAddress } from 'utils/addressHelpers'
import { roundMath } from 'utils'
import { Pool } from 'state/types'
import { getBalanceAmount } from 'utils/formatBalance'
import PoolHavestAction from './Actions/PoolHavestAction'

const StyledCard = styled.div`
  background: right top no-repeat ${({ theme }) => (theme.isDark ? `#222235` : `#FFFFFF`)};
  border-radius: 10px;
  width: 321px;
  position: relative;
  color: rgb(197, 133, 96);
  text-align: center;
  padding: 19px 15px 25px 15px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

const TokenImageContainer = styled.div`
  text-align: center;
  padding: 18px 0px;
  border-radius: 9px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  & img {
    height: 75px;
    width: 75px;
    margin-bottom: 0px;
    margin-top: 0px;
  }
`

const TokenAmount = styled.div`
  box-sizing: border-box;
  margin: 16px 0px 7px 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 40px;
  line-height: 48px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#000000')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Earned = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#B9B9B999' : '#00000099')};
  box-sizing: border-box;
  margin-top: 8px;
  min-width: 0px;
  font-size: 16px;
  font-weight: 600;
`

const PoolHavestCard: React.FC<{ earning: BigNumber; pool: Pool }> = ({ earning, pool }) => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <TokenImageContainer>
        <img src={`/images/tokens/${getAddress(pool.earningToken.address)}.png`} alt="card-logo" />
      </TokenImageContainer>
      <TokenAmount>{roundMath(getBalanceAmount(earning).toNumber())}</TokenAmount>
      <Earned>{t(`${pool.earningToken.symbol} Earned`)}</Earned>
      <PoolHavestAction earnings={earning} earningToken={pool.earningToken} sousId={pool.sousId} isBnbPool={false} />
    </StyledCard>
  )
}

export default PoolHavestCard
