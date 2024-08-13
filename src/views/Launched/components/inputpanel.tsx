import React from 'react'
import { Currency, Pair } from '@clipdex/clip-dex-sdk'
import useTheme from 'hooks/useTheme'
import { Button, ChevronDownIcon, Text, Flex } from '@clipdex/clip-dex-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CurrencyLogo, DoubleCurrencyLogo } from '../../../components/Logo'
import { Input as NumericalInput } from './numinput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => (theme.isDark ? '#080808' : 'white')};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  // background-color: ${({ theme }) => theme.colors.input};
  // box-shadow: ${({ theme }) => theme.shadows.inset};
`
const BuyBtn = styled(Button)`
  margin-left: 20px;
  margin-top: 19px;
  margin-right: 15px;
  color: ${({ theme }) => (theme.isDark ? '#382820' : 'white')};
  background-color: ${({ theme }) => (theme.isDark ? '#efc990' : '#ac562a')};
  letter-spacing: -1.3px;
  font-size: 13px;
  width: 110px;
  height: 30px;
  box-shadow: none;
`

interface CurrencyInputPanelProps {
  onMax?: () => void
  label?: string
  currency?: Currency | null
  disableCurrencySelect?: boolean
  pair?: Pair | null
  hideInput?: boolean
}
export default function CurrencyInputPanel({
  onMax,
  label,
  currency,
  disableCurrencySelect = false,
  pair = null, // used for double token logo
  hideInput = false,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { theme } = useTheme()
  return (
    <InputPanel>
      <Container hideInput={hideInput}>
        <Flex>
          <InputRow
            style={
              hideInput
                ? {}
                : {
                    marginLeft: '30px',
                    marginTop: '20px',
                    padding: '0',
                    borderRadius: '8px',
                    width: '65%',
                    height: '30px',
                    backgroundColor: theme.isDark ? 'transparent' : 'transparent',
                  }
            }
            selected={disableCurrencySelect}
          >
            {!hideInput && (
              <>
                <NumericalInput />
                {account && currency && label !== 'To' && (
                  <Button onClick={onMax} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
              </>
            )}
            <Button variant="text" style={{ padding: '0px 3px' }}>
              <Text style={{ fontFamily: 'Roboto', color: '#ac562a' }}>{t('MAX')}</Text>
            </Button>
            <Text style={{ color: '#ac562a' }}>|</Text>
            <Button variant="text" style={{ padding: '0px 3px' }}>
              <Flex alignItems="center" justifyContent="space-between">
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                ) : null}
                {pair ? (
                  <Text id="pair">
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </Text>
                ) : (
                  <Text id="pair" style={{ fontFamily: 'Roboto', color: '#ac562a' }}>
                    {(currency && currency.symbol && currency.symbol.length > 20
                      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                          currency.symbol.length - 5,
                          currency.symbol.length,
                        )}`
                      : currency?.symbol) || t('BNB')}
                  </Text>
                )}
                {!disableCurrencySelect && <ChevronDownIcon />}
              </Flex>
            </Button>
          </InputRow>
          <BuyBtn>BUY NOW</BuyBtn>
        </Flex>
      </Container>
    </InputPanel>
  )
}
