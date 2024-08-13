import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@clipdex/clip-dex-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectButton = styled(Button)`
  align-items: center;
  background-color: #ca492a;
  color: white;
  margin-top: 52px;
  font-weight: 400;
  padding: 0px;
  width: 100%;
  border-radius: 9px;
  padding: 12px 0px;
  font-size: 17px;
  line-height: 26px;
  box-shadow: none;
`

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ConnectButton onClick={onPresentConnectModal} {...props}>
      {t('Connect to a wallet')}
    </ConnectButton>
  )
}

export default ConnectWalletButton
