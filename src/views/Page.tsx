import React from 'react'
import styled from 'styled-components'
import { Flex } from '@clipdex/clip-dex-uikit'
import SubNav from 'components/Menu/SubNav'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 16px;
  min-height: calc(100vh - 320px);
  // background-color: ${({ theme }) => (theme.isDark ? '#141c23' : '#cfcfcf')};
  // background-size: cover !important;
  // background: black;
  // background-image: ${({ theme }) => (theme.isDark ? `url('/images/black.png')` : `url('/images/light.png')`)};
  // background-repeat: no-repeat;
  // background-position: center top;
  background: ${({ theme }) => (theme.isDark ? '#343135' : '#faf9fa')};
`
const Div = styled.div`
  position: relative;
  max-width: 485px;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : '#fff')};
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px,
    rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 10px;
  padding: 1rem;
  padding-top: 30px;
  margin-top: 130px;

  // border: ${({ theme }) => (theme.isDark ? '1px solid white' : '1px solid #6c4b00')};
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <StyledPage {...props}>
      <Div>
        <SubNav />
        {children}
      </Div>
      <Flex flexGrow={1} />
    </StyledPage>
  )
}

export default Page
