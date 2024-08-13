import { ChainId } from '@clipdex/clip-dex-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x249fA4C9034631dAfFdeae2d3208c885987aA187',
  [ChainId.TESTNET]: '0xfDa0C42c56CbE2236f14b5EFA8e5dA182Ab77F8e',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
