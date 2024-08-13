import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, IconButton, AddIcon, useModal } from '@clipdex/clip-dex-uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
// import { useLpTokenPrice } from 'state/farms/hooks'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import useUnstakeFarms from '../../hooks/useUnstakeFarms'
import useStakeFarms from '../../hooks/useStakeFarms'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
}

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

const ActionPlusButton = styled(IconButton)`
  background-color: ${({ theme }) => (theme.isDark ? '#44a574' : '#85ce36')};
  color: ${({ theme }) => (theme.isDark ? '#221d1d' : '#221d1d')};
  font-weight: 400;
  padding: 0px;
  width: 100%;
  height: 50px;
  margin-left: 10px !important;
  border-radius: 10px;
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  // const lpPrice = useLpTokenPrice(tokenName)

  const handleStake = async (amount: string) => {
    await onStake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  // const displayBalance = useCallback(() => {
  //   const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
  //   if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
  //     return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
  //   }
  //   if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
  //     return getFullDisplayBalance(stakedBalance).toLocaleString()
  //   }
  //   return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  // }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={handleStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <ActionButtonContainer>
        <ActionButton onClick={onPresentDeposit}>{t('Stake LP')}</ActionButton>
      </ActionButtonContainer>
    ) : (
      <ActionButtonContainer>
        <ActionButton onClick={onPresentWithdraw} style={{ marginRight: '5px' }}>
          {t('UnStake')}
        </ActionButton>
        {/* <IconButton variant="tertiary" scale="sm" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton> */}
        <ActionPlusButton variant="tertiary" scale="sm" onClick={onPresentDeposit}>
          <AddIcon color="white" width="30px" />
        </ActionPlusButton>
      </ActionButtonContainer>
    )
  }

  return <>{renderStakingButtons()}</>
}

export default StakeAction
