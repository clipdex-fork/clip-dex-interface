import { MenuEntry } from '@clipdex/clip-dex-uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/pool',
      },
    ],
  },
  // {
  //   label: t('Earning'),
  //   icon: 'EarningIcon',
  //   href: '/earning',
  // },
  // {
  //   label: t('NFT Marketplace'),
  //   icon: 'NftIcon',
  //   href: '/marketplace',
  // },
  // {
  //   label: t('Launchpad'),
  //   icon: 'LaunchpadIcon',
  //   href: '/launchpad-test',
  //   // status: {
  //   //   text: t('Win').toLocaleUpperCase(),
  //   //   color: 'success',
  //   // },
  // },
  // {
  //   label: t('Gamification'),
  //   icon: 'GameIcon',
  //   href: '/gamification',
  // },
  // {
  //   label: t('Payment'),
  //   icon: 'GameIcon',
  //   href: '/payment',
  // },
  // {
  //   label: t('Info'),
  //   icon: 'InfoIcon',
  //   href: '/info',
  // },
  {
    label: t('Contact'),
    icon: 'ContactIcon',
    items: [
      {
        icon: 'TwitterIcon',
        label: t('Twitter'),
        href: 'https://twitter.com',
      },
      {
        icon: 'TelegramIcon',
        label: t('Telegram'),
        href: 'https://telegram.org',
      },
    ],
  },
]

export default config
