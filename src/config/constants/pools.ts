import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    stakingToken: tokens.cola,
    earningToken: tokens.usdt,
    contractAddress: {
      56: '0x26858Ed76395CeB9A804e1FC79B069477eB87022',
      97: '0xD93748Cc14C723b195e106d701262A208EEc3b85',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000001', // USDT 2
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: tokens.usdt,
    earningToken: tokens.cola,
    contractAddress: {
      56: '0x6e205D1fF7679336bFf93189F0978D171232B8D9',
      97: '0x93Ef1f618d662953367D2c048A70556E63103db7',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00003', // CLIP 100
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
