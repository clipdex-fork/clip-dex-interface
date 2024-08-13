// eslint-disable-next-line
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { fetchFarmUserDataAsync } from 'state/farms'
import { getBalanceAmount } from 'utils/formatBalance'
import { Button } from '@clipdex/clip-dex-uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import ConnectWalletButton from 'components/ConnectWalletButton'
import StakeAction from './StakeAction'
import useApproveFarm from '../../hooks/useApproveFarm'

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
    display: inline !important;
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

const SelectedModalCard1: React.FC<{ farm: FarmWithStakedValue; account?: string; addLiquidityUrl?: string }> = ({
  farm,
  account,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
  } = farm.userData || {}

  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()

  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={farm.pid}
        addLiquidityUrl={addLiquidityUrl}
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
        {/* <img src={`/images/earning/${lpAddress}.png`} alt="LP Token" /> */}
        <img src={`/images/tokens/${getAddress(farm.token.address)}.png`} alt="card-logo" />
        <img src={`/images/tokens/${getAddress(farm.quoteToken.address)}.png`} alt="card-logo" />
      </TokenImageContainer>
      <TokenAmount>{getBalanceAmount(stakedBalance).toNumber()}</TokenAmount>
      <Earned>{farm.lpSymbol + t(' Staked')}</Earned>

      {!account ? <ConnectWalletButton scale="sm" /> : renderApprovalOrStakeButton()}
    </Card>
  )
}

export default SelectedModalCard1
