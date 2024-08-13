// eslint-disable-next-line
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Text, Input, AutoRenewIcon, Modal } from '@clipdex/clip-dex-uikit'

import { ModalActions } from 'components/Modal'
// import { NFT_API_SERVER } from 'config/constants'
import useToast from 'hooks/useToast'
import useExchangeNFT from '../hooks/useExchangeNFT'

const StyledInfo = styled(Text)`
  margin-bottom: 16px;
  font-size: 18px;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  margin-right: 8px;
  padding: 0 8px;
`

interface SellPriceSettingModalProps {
  art: any
  decimals?: number
  onDismiss?: () => void
}

const SellPriceSettingModal = ({ art, decimals = 18, onDismiss }: SellPriceSettingModalProps) => {
  // const tokenNo = art.tokenNo
  const { tokenNo } = art
  const [sellPrice, setSellPrice] = React.useState('')
  const { toastSuccess, toastError } = useToast()
  const { onReadyToSellToken } = useExchangeNFT()
  const [isSelling, setIsSelling] = React.useState(false)

  const onConfirmBtnClk = async () => {
    setIsSelling(true)

    try {
      await onReadyToSellToken(tokenNo, sellPrice)

      // axios.post(`${NFT_API_SERVER}/api/v0/nft/updateSellStatus`, { tokenNo, sellPrice }).then((res) => {
      //   try {
      //     if (res.data.status) {
      //       toastSuccess('Sell Success', 'Sell Artwork Success!')
      //     }
      //     setIsSelling(false)
      //   } catch (err) {
      //     toastError('Sell Error', 'Sell Artwork Failed!')
      //     setIsSelling(false)
      //   }
      // })
    } catch (err) {
      toastError('Sell Error', 'Sell Artwork Failed!')
      setIsSelling(false)
    }
  }

  const handleChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setSellPrice(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setSellPrice],
  )

  return (
    <Modal title="Sell Token" onDismiss={onDismiss}>
      <StyledInfo>
        <b>{art.artworkName}</b> - {art.artistName}
      </StyledInfo>
      <div style={{ display: 'flex' }}>
        <StyledInput
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode="decimal"
          step="any"
          min="0"
          onChange={handleChange}
          placeholder="0"
          value={sellPrice}
        />
        <Text style={{ fontSize: '16px', alignSelf: 'center' }}>COLA</Text>
      </div>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={isSelling}>
          Cancel
        </Button>
        <Button
          onClick={onConfirmBtnClk}
          isLoading={isSelling}
          endIcon={isSelling ? <AutoRenewIcon spin color="currentColor" /> : null}
          width="100%"
        >
          Confirm
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default SellPriceSettingModal
