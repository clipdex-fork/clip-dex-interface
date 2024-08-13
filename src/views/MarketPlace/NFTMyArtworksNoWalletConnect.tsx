import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from './components/ConnectWalletButton'
import Page from './components/Page'
import NFTMyArtworks from './NFTMyArtworks'

const StyledTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  font-size: 25px;
  font-weight: 600;
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  margin-bottom: 20px;
  text-align: center;
`

const Wrapper = styled.div`
  max-width: 894px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin: 0 auto 24px auto;
`
const Div = styled.div`
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#222235' : '#f8f8f8')};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 9px;
  padding: 40px;
  padding-bottom: 80px;
  margin-bottom: 24px;
`

const NFTMyArtworksNoWalletConnect: React.FC = () => {
  const { account } = useWeb3React()

  const { t } = useTranslation()
  return (
    <Page>
      {!account ? (
        <Wrapper>
          <Div>
            <StyledTitle>{t('My Artworks')}</StyledTitle>
            <ConnectWalletButton />
          </Div>
        </Wrapper>
      ) : (
        <NFTMyArtworks />
      )}
    </Page>
  )
}

export default NFTMyArtworksNoWalletConnect
