import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Modal, Text, Button, OpenNewIcon, Link } from '@clipdex/clip-dex-uikit'
import useTheme from 'hooks/useTheme'

interface NotEnoughTokensModalProps {
  tokenSymbol: string
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    text-decoration: none;
  }
`
const StyledButton = styled(Button)`
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
  margin: 25px 0px 0px 0px !important;
`
const StyledButton1 = styled(Button)`
  background-color: #ee6c4d;
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
  margin: 15px 0px 0px 0px !important;
  border: none;
  svg {
    fill: white;
  }
`
const NotEnoughTokensModal: React.FC<NotEnoughTokensModalProps> = ({ tokenSymbol, onDismiss }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Modal
      title={t('%symbol% required', { symbol: tokenSymbol })}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Text color="failure" bold>
        {t('Insufficient %symbol% balance', { symbol: tokenSymbol })}
      </Text>
      <Text mt="24px">{t('You’ll need %symbol% to stake in this pool!', { symbol: tokenSymbol })}</Text>
      <Text>
        {t('Buy some %symbol%, or make sure your %symbol% isn’t in another pool or LP.', {
          symbol: tokenSymbol,
        })}
      </Text>
      <StyledLink href="/swap">
        <StyledButton variant="secondary" mt="24px" width="100%">
          {t('Buy')} {tokenSymbol}
        </StyledButton>
      </StyledLink>
      <StyledLink href="https://yieldwatch.net" external>
        <StyledButton1 variant="secondary" mt="8px" width="100%">
          {t('Locate Assets')}
          <OpenNewIcon color="primary" ml="4px" />
        </StyledButton1>
      </StyledLink>
      <Button mt="24px" variant="text" onClick={onDismiss}>
        {t('Close Window')}
      </Button>
    </Modal>
  )
}

export default NotEnoughTokensModal
