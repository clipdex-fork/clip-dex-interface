import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link } from '@clipdex/clip-dex-uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'bignumber.js'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background: right top no-repeat ${({ theme }) => (theme.isDark ? `#222235` : `rgb(255, 253, 250)`)};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px;
  width: 100%;
  margin-bottom: 8px;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: auto;
  margin: 0 8px;
  padding: 0 8px;
  border-radius: 10px;
  height: 32px;
  background-color: ${({ theme }) => (theme.isDark ? `#141C23` : `#f0f3f6`)};
  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 8px 0;
  }
`

const StyledErrorMessage = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'rgb(255, 205, 132)' : 'rgb(114, 47, 13)')};
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const StyledMaxButton = styled(Button)`
  background-color: ${({ theme }) => (theme.isDark ? '#44a574' : '#85ce36')};
  color: white;
  margin-top: 16px;
  font-weight: 400;
  padding: 0px;
  width: 110px;
  height: 32px;
  border-radius: 10px;
  box-shadow: none;
`

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#ccccd2' : '#4f5f6f')};
`

const StyledInputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-around;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0'
    }
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.0001)) {
      return balanceBigNumber.toLocaleString()
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  return (
    <>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between">
          <StyledText fontSize="14px">{inputTitle}</StyledText>
          <StyledText fontSize="14px">{t('Balance: %balance%', { balance: displayBalance(max) })}</StyledText>
        </Flex>
        <StyledInputContainer>
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <StyledMaxButton onClick={onSelectMax} mr="8px">
              {t('Max')}
            </StyledMaxButton>
            <StyledText fontSize="16px">{symbol}</StyledText>
          </div>
        </StyledInputContainer>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px">
          {t('No tokens to stake')}:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external>
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )}
    </>
  )
}

export default ModalInput
