// eslint-disable-next-line
import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { Pool } from 'state/types'
import { getBalanceAmount } from 'utils/formatBalance'
import { Button } from '@clipdex/clip-dex-uikit'
import { PoolCategory } from 'config/constants/types'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useApprovePool } from '../../../hooks/useApprovePool'
import PoolStakeAction from './Actions/PoolStakeAction'

const Card = styled.div`
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

const ActionButtonContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 29px;
`

const ActionButton = styled(Button)`
  background-color: #ca492a;
  color: white;
  padding: 12px 0px;
  width: 100%;
  height: 50px;
  border-radius: 9px;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  text-align: center;
  color: #f8f8f8;
  box-shadow: none;
  margin: 0px !important;
`

const PoolStakeCard: React.FC<{
  pool: Pool
  account?: string
}> = ({ pool, account }) => {
  const { t } = useTranslation()
  const {
    allowance: allowanceAsString = 0,
    stakingTokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
  } = pool.userData || {}
  const [isApproved, setIsApproved] = useState(false)

  const stakingTokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)

  useEffect(() => {
    const allowance = new BigNumber(allowanceAsString)
    const isAppr = account && allowance && allowance.isGreaterThan(0)
    setIsApproved(isAppr)
  }, [account, allowanceAsString])

  const { sousId, stakingToken, earningToken, poolCategory } = pool

  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const isStaked = stakedBalance.gt(0)

  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { handleApprove, requestedApproval } = useApprovePool(stakingTokenContract, sousId, earningToken.symbol)

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <PoolStakeAction
        pool={pool}
        stakingTokenBalance={stakingTokenBalance}
        stakedBalance={stakedBalance}
        isBnbPool={isBnbPool}
        isStaked={isStaked}
      />
    ) : (
      <ActionButtonContainer>
        <ActionButton disabled={requestedApproval} onClick={handleApprove}>
          {t('Approve')}
        </ActionButton>
      </ActionButtonContainer>
    )
  }

  return (
    <Card>
      <TokenImageContainer>
        <img src={`/images/tokens/${getAddress(pool.stakingToken.address)}.png`} alt="card-logo" />
      </TokenImageContainer>
      <TokenAmount>{getBalanceAmount(stakedBalance).toNumber()}</TokenAmount>
      <Earned>{pool.stakingToken.symbol + t(' Staked')}</Earned>

      {!account ? <ConnectWalletButton scale="sm" /> : renderApprovalOrStakeButton()}
    </Card>
  )
}

export default PoolStakeCard
