import React from 'react'
import styled from 'styled-components'
import {
  Flex,
  Button,
  IconButton,
  AddIcon,
  useModal,
  Skeleton,
  useTooltip,
} from '@clipdex/clip-dex-uikit'
import BigNumber from 'bignumber.js'

import { useTranslation } from 'contexts/Localization'
import { Pool } from 'state/types'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'

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
  height: 36px;
  border-radius: 10px;
`

interface PoolStakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
}

const PoolStakeAction: React.FC<PoolStakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  isBnbPool,
  isStaked,
  isLoading = false,
}) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData } = pool
  const { t } = useTranslation()

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('You’ve already staked the maximum amount you can stake in this pool!'),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    return isStaked ? (
      <ActionButtonContainer>
        <ActionButton onClick={onPresentUnstake} style={{ marginRight: '5px' }}>
          {t('UnStake')}
        </ActionButton>

        {reachStakingLimit ? (
          <span ref={targetRef}>
            <ActionPlusButton variant="tetiary" disabled>
              <AddIcon color="textDisabled" width="30px" height="30px" />
            </ActionPlusButton>
          </span>
        ) : (
          <ActionPlusButton
            variant="tetiary"
            onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
            disabled={isFinished}
          >
            <AddIcon color="white" width="30px" height="30px" />
          </ActionPlusButton>
        )}
        {tooltipVisible && tooltip}
      </ActionButtonContainer>
    ) : (
      <ActionButtonContainer>
        <ActionButton
          disabled={isFinished}
          onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
        >
          {t('Stake')}
        </ActionButton>
      </ActionButtonContainer>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default PoolStakeAction
