import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  /** 
  {
    pid: 0,
    lpSymbol: 'GRIMEX',
    lpAddresses: {
      93: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      90: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  }, */
  {
    pid: 1,
    lpSymbol: 'CLIP-BNB LP',
    lpAddresses: {
      56: '0xB2E779aaE4EAdc6b8538Cc8c43e8d7bE040C8E9c',
      97: '0x703861adA1F173562c8209aB056334dcc5052FdE',
    },
    token: tokens.cola,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      56: '0x53ad47aB2a8110A9156d1469002A881E9C984442',
      97: '0x668dd0a3b5fF47A6bDA9e06c55c582644D1A159D',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'CLIP-BUSD LP',
    lpAddresses: {
      56: '0x25C8a292bC56f4038D68F3C16c0d6441abD2F873',
      97: '0x369921746146cc76E152c59F727c834341c9550A',
    },
    token: tokens.cola,
    quoteToken: tokens.busd,
  },
  {
    pid: 4,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      56: '0x8F4C0d03F41ca50765BdE59818177e809AB5c24B',
      97: '0xe4f971ceB4f76780B96A858D6B105eE68d397405',
    },
    token: tokens.usdt,
    quoteToken: tokens.wbnb,
  },
]

export default farms
