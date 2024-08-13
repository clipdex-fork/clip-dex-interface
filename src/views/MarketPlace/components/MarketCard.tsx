// eslint-disable-next-line
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Card, CardBody, Button, AutoRenewIcon, useWalletModal } from '@clipdex/clip-dex-uikit'

// import { NFT_API_SERVER } from 'config/constants'
import useAuth from 'hooks/useAuth'
import useToast from 'hooks/useToast'
import useExchangeNFT from '../hooks/useExchangeNFT'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 28px;
  width: 276px;
  height: 430px;
  background-size: 100% 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#222235' : 'white')};
  border-radius: 10px;
  // border: ${({ theme }) => (theme.isDark ? '1px solid #e5b84c' : 'none')};
  // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;

  cursor: pointer;
`
const NftImage = styled.div<{ cardBackgroundUrl: string }>`
  display: block;
  width: 250px;
  height: 266px;

  background-image: ${({ cardBackgroundUrl }) => `url(${cardBackgroundUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  border-radius: 10px;

  // :hover {
  //   opacity: 0.7;
  // }
`
const AuctionBtn = styled(Button)`
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
  margin-top: 22px;
  margin: 22px 0px 0px 0px !important;
  box-shadow: none;
`
const SaleBtn = styled(Button)`
  background-color: #ca492a;
  color: white;
  padding: 6px 0px;
  width: 110px;
  border-radius: 9px;
  text-align: center;
  border: 1px solid transparent;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-transform: none;
  height: fit-content;
  margin-top: 22px;
  margin: 22px 0px 0px 0px !important;
  box-shadow: none;
`
const SaleBtn2 = styled(Button)`
  background-color: #ee6c4d;
  color: white;
  padding: 6px 0px;
  width: 110px;
  border-radius: 9px;
  text-align: center;
  border: 1px solid transparent;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-transform: none;
  height: fit-content;
  margin-top: 22px;
  margin: 22px 0px 0px 0px !important;
  box-shadow: none;
`

const StateText = styled.div`
  background-color: #ee6c4d;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: white;
  padding: 5px 15px;
  heigth: 17px;
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  top: 25px;
  right: 23px;
`

const StyledCardBody = styled(CardBody)`
  padding: 16px;
  // display: flex;
  justify-content: space-between;
`

const ArtworkInfo = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#000000')};
  width: 100%;
  font-size: 15px;
  line-height: 120%;
  display: flex;
  justify-content: space-between;
`

const ArtistName = styled(Link)`
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  text-align: right;
  letter-spacing: -0.4px;
  text-decoration-line: underline;
  color: #ee6c4d;
`

const ArtworkPrice = styled.div`
  width: 100%;
  margin-top: 11px;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: ${({ theme }) => (theme.isDark ? '#F8F8F8' : '#ca492a')};
  text-align: right;
`

const MarketCard: React.FC<{ art: any }> = ({ art }) => {
  const [isBuying, setIsBuying] = React.useState(false)
  const [isApproving, setIsApproving] = React.useState(false)
  const [approved, setApproved] = React.useState(false)

  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { onApproveMatchaToken, onGetApprovedMatchaToken, onBuyToken } = useExchangeNFT()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  React.useEffect(() => {
    setApproved(false)
    if (account) {
      onGetApprovedMatchaToken(account).then((value) => {
        if (value > 0) {
          setApproved(true)
        }
      })
    }
  }, [account, onGetApprovedMatchaToken, art.sellPrice])

  const handleApprove = async () => {
    setIsApproving(true)

    try {
      const price = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      await onApproveMatchaToken(price)
      setApproved(true)
      setIsApproving(false)
    } catch (err) {
      setIsApproving(false)
    }
  }

  const onBuyBtnClick = async () => {
    setIsBuying(true)

    try {
      await onBuyToken(art.tokenNo)

      // axios.post(`${NFT_API_SERVER}/api/v0/nft/updateOwner`, { art, account }).then((res) => {
      //   try {
      //     if (res.data.status) {
      //       toastSuccess('Buy Success', 'Buy Artwork Success!')
      //     }
      //     setIsBuying(false)
      //   } catch (err) {
      //     toastError('Sell Error', 'Buy Artwork Failed!')
      //     setIsBuying(false)
      //   }
      // })
    } catch (err) {
      toastError('Buy Error', 'Buy Artwork Failed!')
      setIsBuying(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {art.sellStatus === 1 ? <StateText>On Sale</StateText> : ''}
      <StyledFarmStakingCard>
        <NftImage cardBackgroundUrl={art.filePath} />
        <StyledCardBody>
          <ArtworkInfo>
            {art.artworkName}
            <ArtistName to="#">{art.artistName}</ArtistName>
          </ArtworkInfo>
          <ArtworkPrice>{art.sellPrice} COLA</ArtworkPrice>
          {account ? (
            approved ? (
              art.sellStatus === 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <SaleBtn>Bidding</SaleBtn>
                  <SaleBtn2
                    onClick={onBuyBtnClick}
                    isLoading={isBuying}
                    endIcon={isBuying ? <AutoRenewIcon spin color="currentColor" /> : null}
                    style={{ marginLeft: '16px' }}
                  >
                    Buy
                  </SaleBtn2>
                </div>
              )
            ) : (
              <AuctionBtn onClick={handleApprove} disabled={isApproving}>
                Approve NFT Marketplace
              </AuctionBtn>
            )
          ) : (
            <AuctionBtn onClick={onPresentConnectModal}>Connect Wallet</AuctionBtn>
          )}
        </StyledCardBody>
      </StyledFarmStakingCard>
    </div>
  )
}

export default MarketCard
