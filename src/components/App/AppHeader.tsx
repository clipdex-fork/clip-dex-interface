import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, IconButton, ArrowBackIcon, Text } from '@clipdex/clip-dex-uikit'
import { Link } from 'react-router-dom'
// import Settings from './Settings'
// import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  display: block;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`
const StyledArrowBackIcon = styled(ArrowBackIcon)`
  width: 32px;
  fill: ${({ theme }) => (theme.isDark ? '#fff' : '#3a4651')};
`
const StyledHeading = styled(Heading)`
  font-weight: 500;
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#3a4651')};
`
const StyledFlex = styled(Flex)`
  justify-content: space-between;
`
const StyledEmptyDiv = styled.div`
  width: 50px;
`
const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  return (
    <AppHeaderContainer>
      <StyledFlex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <StyledArrowBackIcon />
          </IconButton>
        )}
        <StyledHeading as="h2" ml="10px">
          {title}
        </StyledHeading>
        {helper ? <QuestionHelper text={helper} ml="75px" /> : <StyledEmptyDiv />}
        <Text color="textSubtle" fontSize="14px" hidden>
          {subtitle}
        </Text>
      </StyledFlex>
      {/* {!noConfig && (
        <Flex>
          <Settings />
          <Transactions />
        </Flex>
      )} */}
    </AppHeaderContainer>
  )
}

export default AppHeader
