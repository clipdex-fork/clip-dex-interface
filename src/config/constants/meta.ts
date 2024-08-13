import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ZilionixxSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CLIP through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by ZilionixxSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://matchaswap.zilionixx.com/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('ZilionixxSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('ZilionixxSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('ZilionixxSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('ZilionixxSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('ZilionixxSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('ZilionixxSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('ZilionixxSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('ZilionixxSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('ZilionixxSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('ZilionixxSwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('ZilionixxSwap')}`,
      }
    default:
      return null
  }
}
