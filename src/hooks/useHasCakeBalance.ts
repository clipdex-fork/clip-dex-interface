import BigNumber from 'bignumber.js'
import { getColaAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's CLIP balance is at least the amount passed in
 */
const useHasCakeBalance = (minimumBalance: BigNumber) => {
  const { balance: cakeBalance } = useTokenBalance(getColaAddress())
  return cakeBalance.gte(minimumBalance)
}

export default useHasCakeBalance
