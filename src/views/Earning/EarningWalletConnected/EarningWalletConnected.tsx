import React, { useState, useCallback, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'

import { useTranslation } from 'contexts/Localization'
import { getAddress } from 'utils/addressHelpers'
import { useFarms, usePollFarmsData, usePriceColaBusd } from 'state/farms/hooks'
// import { useFetchPublicPoolsData, usePools, useCakeVault } from 'state/pools/hooks'
import { useFetchPublicPoolsData, usePools } from 'state/pools/hooks'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
// import { Farm, Pool } from 'state/types'
import { Farm } from 'state/types'
import { getFarmApr } from 'utils/apr'
// import { orderBy, partition } from 'lodash'
import { partition } from 'lodash'

import { TabStatus, EarningWalletTab } from './components/EarningWalletTab'
import WalletCardItem, { FarmWithStakedValue } from './components/WalletCardItem'
import PoolCardItem from './components/Pool/PoolCardItem'
import BaseLayout from '../../../components/BaseLayout'
// import { getAprData, getCakeVaultEarnings } from './helpers'

const StyledFlexLayout = styled(BaseLayout)`
  justify-content: center;
  margin: 24px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 30px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  // overflow: hidden auto;
  z-index: 1;
  min-height: calc(100vh - 320px);
`

const StyledTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#171717')};
  padding: 10px 0;
  margin-bottom: 20px;
`

const EarningWalletConnected = () => {
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded: userFarmDataLoaded } = useFarms()
  const colaPrice = usePriceColaBusd()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded: userPoolDataLoaded } = usePools(account)
  const [tabStatus, setTabStatus] = useState(TabStatus.TabHot)
  // const [sortOption, setSortOption] = useState('hot')

  // const {
  //   userData: { cakeAtLastUserAction, userShares },
  //   fees: { performanceFee },
  //   pricePerFullShare,
  //   totalCakeInVault,
  // } = useCakeVault()
  // const accountHasVaultShares = userShares && userShares.gt(0)
  // const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  const [stakeColaPools] = useMemo(() => partition(pools, (pool) => pool.stakingToken.symbol === 'CLIP'), [pools])
  const [earnColaPools] = useMemo(() => partition(pools, (pool) => pool.earningToken.symbol === 'CLIP'), [pools])

  usePollFarmsData(false)
  useFetchPublicPoolsData()

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))

  const isActive = true
  const query = ''
  // const [query, setQuery] = useState('')
  // const [isActive, setActive] = useState(true)

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const lpAddress = getAddress(farm.lpAddresses)

        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), colaPrice, totalLiquidity, lpAddress)
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        // const lowercaseQuery = latinise(query.toLowerCase())
        const lowercaseQuery = latinise(query)
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [colaPrice, query, isActive],
  )

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    // const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    //   switch (sortOption) {
    //     case 'apr':
    //       return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
    //     case 'multiplier':
    //       return orderBy(
    //         farms,
    //         (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
    //         'desc',
    //       )
    //     case 'earned':
    //       return orderBy(
    //         farms,
    //         (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
    //         'desc',
    //       )
    //     case 'liquidity':
    //       return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
    //     default:
    //       return farms
    //   }
    // }

    switch (tabStatus) {
      case TabStatus.TabHot:
        chosenFarms = farmsList(activeFarms)
        break
      case TabStatus.TabEarnCola:
        break
      case TabStatus.TabColaStaking:
        break
      case TabStatus.TabNFT:
        break
      case TabStatus.TabOthers:
        break
      case TabStatus.TabEnded:
        break
      default:
        break
    }

    // return sortFarms(chosenFarms)
    return chosenFarms
  }, [activeFarms, farmsList, tabStatus])
  // }, [sortOption, activeFarms, farmsList, tabStatus])

  const chosenPoolsMemoized = useMemo(() => {
    let chosenPools
    // const sortPools = (poolsToSort: Pool[]): Pool[] => {
    //   switch (sortOption) {
    //     case 'apr':
    //       // Ternary is needed to prevent pools without APR (like MIX) getting top spot
    //       return orderBy(
    //         poolsToSort,
    //         (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
    //         'desc',
    //       )
    //     case 'earned':
    //       return orderBy(
    //         poolsToSort,
    //         (pool: Pool) => {
    //           if (!pool.userData || !pool.earningTokenPrice) {
    //             return 0
    //           }
    //           return pool.isAutoVault
    //             ? getCakeVaultEarnings(
    //                 account,
    //                 cakeAtLastUserAction,
    //                 userShares,
    //                 pricePerFullShare,
    //                 pool.earningTokenPrice,
    //               ).autoUsdToDisplay
    //             : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
    //         },
    //         'desc',
    //       )
    //     case 'totalStaked':
    //       return orderBy(
    //         poolsToSort,
    //         (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
    //         'desc',
    //       )
    //     default:
    //       return poolsToSort
    //   }
    // }
    chosenPools = []

    switch (tabStatus) {
      case TabStatus.TabHot:
        break
      case TabStatus.TabEarnCola:
        chosenPools = earnColaPools
        break
      case TabStatus.TabColaStaking:
        chosenPools = stakeColaPools
        break
      case TabStatus.TabNFT:
        break
      case TabStatus.TabOthers:
        break
      case TabStatus.TabEnded:
        break
      default:
        break
    }

    // return sortPools(chosenPools)
    return chosenPools
  }, [
    // sortOption,
    // pools,
    // account,
    // cakeAtLastUserAction,
    // performanceFeeAsDecimal,
    // pricePerFullShare,
    // totalCakeInVault,
    // userShares,
    tabStatus,
    stakeColaPools,
    earnColaPools,
  ])

  const callback = (status) => {
    setTabStatus(status)
  }

  return (
    <Wrapper>
      <StyledContent>
        <StyledTitle>{t('Earning')}</StyledTitle>

        <EarningWalletTab getCardCount={callback} />

        <StyledFlexLayout>
          {chosenFarmsMemoized.map((farm) => (
            <WalletCardItem
              key={farm.pid}
              farm={farm}
              earningToken="CLIP"
              account={account}
              isLoading={!userFarmDataLoaded}
            />
          ))}
          {chosenPoolsMemoized.map((pool) => (
            <PoolCardItem key={pool.sousId} pool={pool} account={account} isLoading={!userPoolDataLoaded} />
          ))}
        </StyledFlexLayout>
      </StyledContent>
    </Wrapper>
  )
}

export default EarningWalletConnected
