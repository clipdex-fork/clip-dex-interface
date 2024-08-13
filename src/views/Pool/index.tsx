import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@clipdex/clip-dex-sdk'
import { Text, Flex, CardBody, Button } from '@clipdex/clip-dex-uikit'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppBody } from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background-color: transparent;
  border: ${({ theme }) => (theme.isDark ? '1px dashed rgba(185, 185, 185, 0.5)' : '1px dashed rgba(0, 0, 0, 0.3)')};
  border-radius: 9px;
`

const StyledButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  background-color: ${({ theme }) => (theme.isDark ? '#ca492a' : '#ca492a')};
  color: white;
  padding: 12px 0px;
  width: 100%;
  border-radius: 9px;
  text-align: center;
  font-weight: 500;
  font-size: 17px;
  border: 1px solid transparent;
  display: table;
  margin-top: 30px;
  box-shadow: none;
  &:hover {
    opacity: 0.8;
  }
`
const StyledButton2 = styled.a`
  background-color: transparent;
  color: #ee6c4d;
  font-weight: 400;
  border: none;
  font-size: 15px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: underline;
`

const StyledButton3 = styled.a`
  background-color: transparent;
  color: #ee6c4d;
  font-weight: 600;
  border: none;
  font-size: 18px;
  cursor: pointer;
  text-decoration: underline;
`

const StyledText1 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  text-transform: uppercase;
`
const StyledText2 = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#B9B9B9' : '#757D93')};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem 0px;
`
export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return <StyledText2>{t('Connect to a wallet to view your liquidity.')}</StyledText2>
    }
    if (v2IsLoading) {
      return (
        <Text color="text" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <StyledText2 color="text" textAlign="center">
        {t('No liquidity found.')}
      </StyledText2>
    )
  }

  return (
    <Page>
      <AppBody>
        {/* <AppHeader title={t('Your Liquidity')} subtitle={t('Remove liquidity to receive tokens back')} /> */}
        <StyledButton
          id="join-pool-button"
          as={Link}
          to="/add"
          // startIcon={<AddIcon color="white" />}
        >
          {t('Add Liquidity')}
        </StyledButton>
        <StyledText1>{t('Your liquidity')}</StyledText1>
        <Body mt="20px">
          {renderBody()}
          {account && !v2IsLoading && (
            <Flex flexDirection="column" alignItems="center" mt="5px">
              <StyledText2 color="text" mb="8px">
                {t("Don't see a pool you joined?")}
              </StyledText2>
              <StyledButton3 href="/find">{t('Find other LP tokens')}</StyledButton3>
            </Flex>
          )}
        </Body>
        <StyledText2>
          {t("Don't see a pool you joined?")}
          <StyledButton2>{t(' Import it.')}</StyledButton2>
        </StyledText2>
      </AppBody>
    </Page>
  )
}
