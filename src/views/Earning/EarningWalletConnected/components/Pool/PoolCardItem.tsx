import React from 'react'
import styled from 'styled-components'
import { Button, useModal, AutoRenewIcon } from '@clipdex/clip-dex-uikit'
import useTheme from 'hooks/useTheme'
import { getAddress } from 'utils/addressHelpers'
import { roundMath } from 'utils'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceAmount } from 'utils/formatBalance'
import PoolCardSelectedModal from './PoolCardSelectedModal'
import ConnectWalletButton from '../../../ConnectWalletButton'

const StyledCard = styled.div`
  background: right top no-repeat ${({ theme }) => (theme.isDark ? `#27262c` : `rgb(255, 253, 250);`)};
  border-radius: 10px;
  position: relative;
  width: 321px;
  margin-bottom: 24px;
  padding: 19px 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const StyledCardTitle = styled.div`
  text-align: center;
  margin: 18px 0 15px 0;
  white-space: nowrap;
  box-sizing: border-box;
  min-width: 0px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  white-space: break-spaces;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#000000')};
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  padding: 12px 0px;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
`
const StyledBorder = styled.span`
  background: rgba(0, 0, 0, 0.1);
  height: 1px;
  display: block;
`
const ColLeft = styled.div`
  text-align: left;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#000000')};
`

const ColLeftMin = styled.div`
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#000000')};
`

const ColRight = styled.div`
  text-align: right;
  word-break: break-word;
  color: ${({ theme }) => (theme.isDark ? '#B9B9B999' : '#00000099')};
`

const ColRightMin = styled.div`
  text-align: right;
  font-size: 14px;
  word-break: break-word;
  color: ${({ theme }) => (theme.isDark ? '#B9B9B999' : '#00000099')};
`

const StyledBadge = styled.div`
  position: absolute;
  top: -4px;
  right: 25px;
  width: 30px;
  height: 40px;
  background: url(/images/earning/mark.svg);
  background-repeat: no-repeat;
  background-position: center top;
`

const StyledBadgeStar = styled.img`
  filter: ${({ theme }) =>
    theme.isDark
      ? `brightness(5) contrast(5) hue-rotate(217deg) saturate(9.9)`
      : `brightness(5) contrast(5) hue-rotate(217deg) saturate(9.9)`};
  position: absolute;
  top: 7px;
  right: 5px;
`

const StyledTokenImage = styled.div`
  text-align: center;
  padding: 18px 0px;
  border-radius: 9px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  & img {
    height: 76.5px;
    width: 76.5px;
    margin-bottom: 0px;
    margin-top: 0px;
  }
`

const StyledSelectButton = styled(Button)`
  background-color: #ca492a;
  color: white;
  padding: 12px 0px;
  width: 100%;
  border-radius: 9px;
  text-align: center;
  border: 1px solid transparent;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-transform: none;
  height: fit-content;
  margin: 0px !important;
  box-shadow: none;
`

const PoolCardItem: React.FC<{ pool: Pool; account?: string; isLoading: boolean }> = ({ pool, account, isLoading }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [onCardClick] = useModal(<PoolCardSelectedModal pool={pool} account={account} />)

  return (
    <StyledCard>
      <StyledBadge>
        <StyledBadgeStar
          src={theme.isDark ? 'images/earning/icon_star.svg' : 'images/earning/icon_star_white.svg'}
          alt="card-logo"
        />
      </StyledBadge>
      <StyledTokenImage>
        <img src={`/images/tokens/${getAddress(pool.stakingToken.address)}.png`} alt="card-logo" />
        <img src={`/images/tokens/${getAddress(pool.earningToken.address)}.png`} alt="card-logo" />
      </StyledTokenImage>
      <StyledCardTitle>{t(`${pool.stakingToken.symbol} to ${pool.earningToken.symbol}`)}</StyledCardTitle>
      <Row>
        <ColLeft>{t('Stake:')}</ColLeft>
        <ColRight>{t(`${getBalanceAmount(pool.userData.stakedBalance)} ${pool.stakingToken.symbol}`)}</ColRight>
      </Row>
      <StyledBorder />
      <Row>
        <ColLeft>{t('Earn:')}</ColLeft>
        <ColRight>
          {roundMath(getBalanceAmount(pool.userData.pendingReward).toNumber())} ${pool.earningToken.symbol}
        </ColRight>
      </Row>
      <StyledBorder />
      <Row>
        <ColLeft>{t('APR:')}</ColLeft>
        <ColRight>{roundMath(pool.apr)} %</ColRight>
      </Row>
      <StyledBorder />
      <Row>
        <ColLeftMin>{t('Total staked:')}</ColLeftMin>
        <ColRightMin>{t(`${getBalanceAmount(pool.totalStaked)}`)}</ColRightMin>
      </Row>
      <Row>
        <ColLeftMin>{t('End in:')}</ColLeftMin>
        <ColRightMin>{t(`${pool.endBlock} block`)}</ColRightMin>
      </Row>
      <Row>
        <ColLeftMin>{t('Max stake per user:')}</ColLeftMin>
        <ColRightMin>{t(`${getBalanceAmount(pool.stakingLimit)}`)}</ColRightMin>
        {/* <ColRightMin style={{ width: '50px', overflow: 'hidden', textOverflow: 'clip' }}>
          {t(`${pool.stakingLimit}`)}
        </ColRightMin> */}
      </Row>
      {account === undefined ? (
        <ConnectWalletButton />
      ) : (
        <StyledSelectButton
          onClick={onCardClick}
          isLoading={isLoading}
          endIcon={isLoading ? <AutoRenewIcon spin color="currentColor" /> : null}
        >
          {isLoading ? 'Loading' : 'Select'}
        </StyledSelectButton>
      )}
    </StyledCard>
  )
}

export default PoolCardItem
