// eslint-disable-next-line

import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { ButtonMenu, ButtonMenuItem } from '@clipdex/clip-dex-uikit'

const StyledButtonMenu = styled(ButtonMenu)`
  background: ${({ theme }) => (theme.isDark ? '#27262c' : '#fff')};
  @media screen and (max-width: 840px) {
    display: grid;
    width: 90%;
  }
`
const StyledButtonMenuItem = styled(ButtonMenuItem)<{ isActive: boolean }>`
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  color: ${({ theme, isActive }) =>
    isActive ? 'white' : theme.isDark ? 'rgba(185, 185, 185, 0.39)' : 'rgba(0, 0, 0, 0.39)'};
`
// const TabContainer = styled(ButtonMenu)`
//   background: transparent;
//   border: none;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   flex-wrap: wrap;
//   justify-content: center;
// `

// const TabItem = styled(Text)<{ isActive: boolean }>`
//   position: relative;
//   color: ${({ isActive, theme }) =>
//     theme.isDark ? (isActive ? '#959596' : '#4f5f6f') : isActive ? '#4f5f6f' : '#959596'};
//   cursor: pointer;
//   font-size: 22px;
//   font-weight: bold;
//   text-decoration: none;
//   border-bottom: ${({ isActive, theme }) =>
//     theme.isDark ? (isActive ? '4px solid #959596' : 'none') : isActive ? '4px solid #4f5f6f' : 'none'};
//   white-space: nowrap;
//   margin: 10px 30px;
//   font-family: 'Roboto';
// `

const tabBtnArray = [
  { id: 0, btnName: 'Hot' },
  { id: 1, btnName: 'Earn CLIP' },
  { id: 2, btnName: 'CLIP Staking' },
  { id: 3, btnName: 'Others' },
  { id: 4, btnName: 'NFT' },
  { id: 5, btnName: 'Ended' },
]

export enum TabStatus {
  TabHot,
  TabEarnCola,
  TabColaStaking,
  TabOthers,
  TabNFT,
  TabEnded,
}

export const EarningWalletTab = ({ getCardCount }) => {
  const { t } = useTranslation()

  // const [tabId, setTabIndex] = useState(0)

  const [tabId, setTabIndex] = React.useState(0)

  const handleClickTab = (newIndex) => {
    setTabIndex(newIndex)
    if (newIndex === 0) {
      getCardCount(TabStatus.TabHot)
    } else if (newIndex === 1) {
      getCardCount(TabStatus.TabEarnCola)
    } else if (newIndex === 2) {
      getCardCount(TabStatus.TabColaStaking)
    } else if (newIndex === 3) {
      getCardCount(TabStatus.TabOthers)
    } else if (newIndex === 4) {
      getCardCount(TabStatus.TabNFT)
    } else if (newIndex === 5) {
      getCardCount(TabStatus.TabEnded)
    }
  }

  return (
    <StyledButtonMenu activeIndex={tabId} onItemClick={handleClickTab}>
      {tabBtnArray.map((tabBtn) => (
        <StyledButtonMenuItem key={tabBtn.id} isActive={tabBtn.id === tabId}>
          {t(`${tabBtn.btnName}`)}
        </StyledButtonMenuItem>
      ))}
    </StyledButtonMenu>
  )
}
