import React from 'react'
import styled from 'styled-components'
import { useWalletModal } from '@clipdex/clip-dex-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectButton = styled.button`
  font-weight: 500;
  text-align: center;
  border-radius: 9px;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: #ca492a;
  color: white;
  margin: 54px auto 0px;
  width: initial;
  padding: 12px 123px;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 500px) {
    padding: 12px 30px;
  }
`

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ConnectButton onClick={onPresentConnectModal} {...props}>
      {t('Connect to a Wallet')}
    </ConnectButton>
  )
}

export default ConnectWalletButton
