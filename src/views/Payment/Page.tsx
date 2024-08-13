import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 64px);
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;

  background-color: ${({ theme }) => (theme.isDark ? `#141C23` : `#cfcfcf`)};
  background-size: cover !important;
  background-repeat: no-repeat;
  background-position: center top;
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <StyledPage {...props}>{children}</StyledPage>
}

export default Page
