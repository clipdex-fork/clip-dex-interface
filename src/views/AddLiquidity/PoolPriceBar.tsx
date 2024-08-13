import React from 'react'
import styled from 'styled-components'
import { Currency, Percent, Price } from '@clipdex/clip-dex-sdk'
import { Text } from '@clipdex/clip-dex-uikit'
import { useTranslation } from 'contexts/Localization'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

const StyledText1 = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  font-size: 26px;
  line-height: 31px;
  color: ${({ theme }) => (theme.isDark ? '#b9b9b9b3' : '#19274Bb3')};
`

const StyledText2 = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => (theme.isDark ? '#b9b9b9b3' : '#19274Bb3')};
`

const StyledSpan = styled.span`
  width: 1px;
  height: 21px;
  background: #a1a5b1;
`

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around">
        <AutoColumn justify="center">
          <StyledText1>{price?.toSignificant(6) ?? '-'}</StyledText1>
          <StyledText2 pt={4}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_B]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_A]?.symbol ?? '',
            })}
          </StyledText2>
        </AutoColumn>
        <StyledSpan />
        <AutoColumn justify="center">
          <StyledText1>{price?.invert()?.toSignificant(6) ?? '-'}</StyledText1>
          <StyledText2 pt={4}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_A]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_B]?.symbol ?? '',
            })}
          </StyledText2>
        </AutoColumn>
        <StyledSpan />
        <AutoColumn justify="center">
          <StyledText1>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </StyledText1>
          <StyledText2 pt={4}>{t('Share of Pool')}</StyledText2>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

export default PoolPriceBar
