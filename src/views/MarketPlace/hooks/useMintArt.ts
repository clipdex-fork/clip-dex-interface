import { useCallback } from 'react'
import { mintNFT, burnNFT, getTokenURI } from 'utils/calls'
import { useNftContract } from 'hooks/useContract'

const useMintArt = (address: string) => {
  const nftMintContract = useNftContract()

  const handleMintArt = useCallback(
    async (tokenID: string) => {
      const txHash = await mintNFT(nftMintContract, tokenID)
      console.info(txHash)
    },
    [nftMintContract],
  )

  const handleBurnArt = useCallback(
    async (tokenID: string) => {
      const txHash = await burnNFT(nftMintContract, address, tokenID)
      console.info(txHash)
    },
    [nftMintContract, address],
  )

  const handleGetTokenURI = useCallback(
    async (tokenID: string) => {
      const tokenURI = await getTokenURI(nftMintContract, address, tokenID)
      return tokenURI
    },
    [nftMintContract, address],
  )

  return { onMintArt: handleMintArt, onBurnArt: handleBurnArt, onGetTokenURI: handleGetTokenURI }
}

export default useMintArt
