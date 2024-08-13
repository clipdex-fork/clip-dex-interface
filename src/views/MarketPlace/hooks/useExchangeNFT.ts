import { useCallback } from 'react'
import {
  approveNFT,
  approveMatchaToken,
  buyToken,
  readyToSellToken,
  cancelSellToken,
  setCurrentPrice,
  getApproveNFT,
  getAskLength,
  getAsks,
  getAsksDesc,
  getAsksByPage,
  getAsksByPageDesc,
  getAsksByUser,
  getAsksByUserDesc,
  getApproveMatchaToken,
} from 'utils/calls'
import { useExchangeNftContract, useNftTokenContract, useERC20 } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import { getExchangeNFTAddress, getColaAddress } from 'utils/addressHelpers'

const useExchangeNFT = () => {
  const exchangeNftContract = useExchangeNftContract()
  const exchangeNftAddress = getExchangeNFTAddress()
  const nftTokenContract = useNftTokenContract()
  const matchaTokenContract = useERC20(getColaAddress())

  const handleApproveMatchaToken = useCallback(
    async (amount: string) => {
      await approveMatchaToken(matchaTokenContract, exchangeNftAddress, amount)
    },
    [matchaTokenContract, exchangeNftAddress],
  )

  const handleGetApproveMatchaToken = useCallback(
    async (owner: string) => {
      const value = await getApproveMatchaToken(matchaTokenContract, owner, exchangeNftAddress)
      return value
    },
    [matchaTokenContract, exchangeNftAddress],
  )

  const handleApproveNFT = useCallback(
    async (tokenID: string) => {
      await approveNFT(nftTokenContract, exchangeNftAddress, tokenID)
    },
    [nftTokenContract, exchangeNftAddress],
  )

  const handleGetApproveNFT = useCallback(
    async (tokenID: string) => {
      const address = await getApproveNFT(nftTokenContract, tokenID)
      return address
    },
    [nftTokenContract],
  )

  const handleBuyToken = useCallback(
    async (tokenID: string) => {
      const txHash = await buyToken(exchangeNftContract, tokenID)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleReadyToSellToken = useCallback(
    async (tokenID: string, price: any) => {
      const txHash = await readyToSellToken(
        exchangeNftContract,
        tokenID,
        new BigNumber(price).times(BIG_TEN.pow(18)).toString(),
      )
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleCancelSellToken = useCallback(
    async (tokenID: string) => {
      const txHash = await cancelSellToken(exchangeNftContract, tokenID)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleSetCurrentPrice = useCallback(
    async (tokenID: string, price: BigNumber) => {
      const txHash = await setCurrentPrice(exchangeNftContract, tokenID, price)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleGetAskLength = useCallback(async () => {
    const txHash = await getAskLength(exchangeNftContract)
    console.info(txHash)
  }, [exchangeNftContract])

  const handleGetAsks = useCallback(async () => {
    const txHash = await getAsks(exchangeNftContract)
    console.info(txHash)
  }, [exchangeNftContract])

  const handleGetAsksDesc = useCallback(async () => {
    const txHash = await getAsksDesc(exchangeNftContract)
    console.info(txHash)
  }, [exchangeNftContract])

  const handleGetAsksByPage = useCallback(
    async (page, size) => {
      const txHash = await getAsksByPage(exchangeNftContract, page, size)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleGetAsksByPageDesc = useCallback(
    async (page, size) => {
      const txHash = await getAsksByPageDesc(exchangeNftContract, page, size)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleGetAsksByUser = useCallback(
    async (user) => {
      const txHash = await getAsksByUser(exchangeNftContract, user)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  const handleGetAsksByUserDesc = useCallback(
    async (user) => {
      const txHash = await getAsksByUserDesc(exchangeNftContract, user)
      console.info(txHash)
    },
    [exchangeNftContract],
  )

  return {
    onApprove: handleApproveNFT,
    onApproveMatchaToken: handleApproveMatchaToken,
    onBuyToken: handleBuyToken,
    onReadyToSellToken: handleReadyToSellToken,
    onCancelSellToken: handleCancelSellToken,
    onSetCurrentPrice: handleSetCurrentPrice,
    onGetAskLength: handleGetAskLength,
    onGetAsks: handleGetAsks,
    onGetAsksDesc: handleGetAsksDesc,
    onGetAsksByPage: handleGetAsksByPage,
    onGetAsksByPageDesc: handleGetAsksByPageDesc,
    onGetAsksByUser: handleGetAsksByUser,
    onGetAsksByUserDesc: handleGetAsksByUserDesc,
    onGetApproved: handleGetApproveNFT,
    onGetApprovedMatchaToken: handleGetApproveMatchaToken,
  }
}

export default useExchangeNFT
