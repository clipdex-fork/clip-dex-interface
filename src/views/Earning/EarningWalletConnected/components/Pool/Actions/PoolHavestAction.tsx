import React, { useState } from 'react'
import { Button, AutoRenewIcon } from '@clipdex/clip-dex-uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import useHarvestPool from '../../../../hooks/useHavestPool'
import useStakePool from '../../../../hooks/useStakePool'

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

interface PoolHavestActionProps {
  earnings: BigNumber
  earningToken: Token
  sousId: number
  isBnbPool: boolean
}

const PoolHavestAction: React.FC<PoolHavestActionProps> = ({ earnings, earningToken, sousId, isBnbPool }) => {
  const { t } = useTranslation()

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0

  const { toastSuccess, toastError } = useToast()
  const { onReward } = useHarvestPool(sousId, isBnbPool)
  const { onStake } = useStakePool(sousId, isBnbPool)
  const [pendingTx, setPendingTx] = useState(false)

  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    // compounding
    if (isCompoundPool) {
      try {
        await onStake(fullBalance, earningToken.decimals)
        toastSuccess(
          `${t('Compounded')}!`,
          t('Your %symbol% earnings have been re-invested into the pool!', { symbol: earningToken.symbol }),
        )
        setPendingTx(false)
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        console.error(e)
        setPendingTx(false)
      }
    } else {
      // harvesting
      try {
        await onReward()
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningToken.symbol }),
        )
        setPendingTx(false)
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        console.error(e)
        setPendingTx(false)
      }
    }
  }

  return (
    <ActionButtonContainer>
      <ActionButton
        disabled={!hasEarnings}
        onClick={handleHarvestConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        <span style={{ verticalAlign: 'text-top' }}>{isCompoundPool ? t('Collect') : t('Harvest')}</span>
      </ActionButton>
    </ActionButtonContainer>
  )
}

export default PoolHavestAction
