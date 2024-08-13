import React from 'react'
import { Button, useWalletModal } from '@clipdex/clip-dex-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const ConnectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
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
  box-shadow: none;
`

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ConnectButton {...props} onClick={onPresentConnectModal}>
      {t('Connect to Wallet')}
    </ConnectButton>
  )
}

export default ConnectWalletButton
