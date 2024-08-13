// eslint-disable-next-line
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Button, useModal } from '@clipdex/clip-dex-uikit'
import { ChainId } from '@clipdex/clip-dex-sdk'

import { Address } from 'config/constants/types'
import addresses from 'config/constants/contracts'
import useExchangeNFT from '../hooks/useExchangeNFT'

import SellPriceSettingModal from './sellPriceSettingModal'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 28px;
  width: 276px;
  height: 508px;
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
const CardImage = styled.div<{ cardBackgroundUrl: string }>`
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

const CardBody = styled.div`
  padding: 16px;
  justify-content: space-between;
`
const TitleName = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#000000')};
  width: 100%;
  font-size: 15px;
  line-height: 120%;
  display: flex;
  justify-content: space-between;
`

const AuthorLink = styled(Link)`
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  text-align: right;
  letter-spacing: -0.4px;
  text-decoration-line: underline;
  color: #ee6c4d;
`

const Price = styled.div`
  width: 100%;
  margin-top: 11px;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: ${({ theme }) => (theme.isDark ? '#F8F8F8' : '#ca492a')};
  text-align: right;
`

const ActionButton = styled(Button)`
  background-color: #ca492a;
  color: white;
  padding: 12px 0px;
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

const ActionFilledButton = styled(Button)`
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

const ActionFilledButton1 = styled(Button)`
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

const MyArtworkCard: React.FC<{ art: any }> = ({ art }) => {
  const [onSellBtnClick] = useModal(<SellPriceSettingModal art={art} />)

  const [approved, setApproved] = React.useState(false)
  const [isApproving, setIsApproving] = React.useState(false)
  const { onApprove, onGetApproved } = useExchangeNFT()

  const getAddress = (address: Address): string => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
  }

  onGetApproved(art.tokenNo).then((addr) => {
    const exchangeNftAddr = getAddress(addresses.exchangeNFT)

    if (addr.toLowerCase() === exchangeNftAddr.toLowerCase()) {
      setApproved(true)
    }
  })

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      await onApprove(art.tokenNo)
      setApproved(true)
      setIsApproving(false)
    } catch (err) {
      setIsApproving(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {art.sellStatus === 1 ? <StateText>On Sale</StateText> : ''}
      <StyledFarmStakingCard>
        <CardImage cardBackgroundUrl={art.filePath} />
        <CardBody>
          <TitleName>
            {art.artworkName}
            <AuthorLink to="#">{art.artistName}</AuthorLink>
          </TitleName>
          <Price>{art.sellPrice} COLA</Price>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {approved || art.sellStatus === 1 ? (
              <>
                <ActionButton variant="secondary">Auction</ActionButton>
                {art.sellStatus === 1 ? (
                  <ActionFilledButton>Cancel</ActionFilledButton>
                ) : (
                  <ActionFilledButton onClick={onSellBtnClick}>Sell</ActionFilledButton>
                )}
              </>
            ) : (
              <ActionFilledButton1 onClick={handleApprove} disabled={isApproving}>
                Approve NFT Marketplace
              </ActionFilledButton1>
            )}
          </div>
          <ActionFilledButton1>Transfer</ActionFilledButton1>
        </CardBody>
      </StyledFarmStakingCard>
    </div>
  )
}

export default MyArtworkCard
