import { DEFAULT_GAS_LIMIT } from 'config'
import { ethers } from 'ethers'

const options = {
  gasLimit: ethers.utils.parseEther('0.0000000000003'),
}

const overrides = {
  value: ethers.utils.parseEther('0.1'),
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const mintNFT = async (nftContract, tokenID) => {
  const tx = await nftContract.mint(tokenID, overrides)
  const receipt = await tx.wait()
  return receipt.status
}

export const burnNFT = async (nftContract, address, tokenID) => {
  const tx = await nftContract.burn(address, tokenID, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const getTokenURI = async (nftContract, address, tokenID) => {
  const uri = await nftContract.tokenURI(tokenID)
  return uri
}

// Exchange
export const approveMatchaToken = async (matchaTokenContract, nftExchangeAddr, amount) => {
  const tx = await matchaTokenContract.approve(nftExchangeAddr, amount, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const getApproveMatchaToken = async (matchaTokenContract, owner, spender) => {
  const value = await matchaTokenContract.allowance(owner, spender)
  return value
}

export const approveNFT = async (originalNftContract, nftExchangeAddr, tokenID) => {
  const tx = await originalNftContract.approve(nftExchangeAddr, tokenID, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const getApproveNFT = async (originalNftContract, tokenID) => {
  const address = await originalNftContract.getApproved(tokenID)
  return address
}

export const buyToken = async (nftExchangeContract, tokenID) => {
  const tx = await nftExchangeContract.buyToken(tokenID, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const readyToSellToken = async (nftExchangeContract, tokenID, price) => {
  const tx = await nftExchangeContract.readyToSellToken(tokenID, price, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const cancelSellToken = async (nftExchangeContract, tokenID) => {
  const tx = await nftExchangeContract.cancelSellToken(tokenID, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const setCurrentPrice = async (nftExchangeContract, tokenID, price) => {
  const tx = await nftExchangeContract.setCurrentPrice(tokenID, price, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const getAskLength = async (nftExchangeContract) => {
  const askLen = await nftExchangeContract.getAskLength()
  return askLen
}

export const getAsks = async (nftExchangeContract) => {
  const askLen = await nftExchangeContract.getAsks()
  return askLen
}

export const getAsksDesc = async (nftExchangeContract) => {
  const askLen = await nftExchangeContract.getAsksDesc()
  return askLen
}

export const getAsksByPage = async (nftExchangeContract, page, size) => {
  const askLen = await nftExchangeContract.getAsksByPage(page, size)
  return askLen
}

export const getAsksByPageDesc = async (nftExchangeContract, page, size) => {
  const askLen = await nftExchangeContract.getAsksByPageDesc(page, size)
  return askLen
}

export const getAsksByUser = async (nftExchangeContract, user) => {
  const askLen = await nftExchangeContract.getAsksByUser(user)
  return askLen
}

export const getAsksByUserDesc = async (nftExchangeContract, user) => {
  const askLen = await nftExchangeContract.getAsksByUserDesc(user)
  return askLen
}
