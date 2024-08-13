import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@clipdex/clip-dex-uikit'

const StyledNav = styled.nav`
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: center;
`

const StyledButtonMenu = styled(ButtonMenu)`
  background: ${({ theme }) => (theme.isDark ? '#27262c' : '#fff')};
  border: none;
`

const getActiveIndex = (pathname: string): number => {
  if (
    pathname.includes('/pool') ||
    pathname.includes('/create') ||
    pathname.includes('/add') ||
    pathname.includes('/remove') ||
    pathname.includes('/find') ||
    pathname.includes('/liquidity')
  ) {
    return 1
  }
  return 0
}

export default function Nav() {
  const location = useLocation()

  return (
    <StyledNav>
      <StyledButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          Swap
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          Liquidity
        </ButtonMenuItem>
      </StyledButtonMenu>
    </StyledNav>
  )
}
