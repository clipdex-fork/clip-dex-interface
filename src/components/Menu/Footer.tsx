import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  -webkit-box-align: center;
  align-items: center;
  height: max-content;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => (theme.isDark ? '#343135' : '#faf9fa')};
  display: inline-flex;
`
const FooterRoot = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 30px;
  text-align: center;
`

const FooterLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => (theme.isDark ? '#70708A' : '#A4A4A4')};
  margin-right: 12px;
  &:hover {
    color: ${({ theme }) => (theme.isDark ? 'white' : 'black')};
  }
`

const StyledFooterDescription = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  line-height: 1.5;
  color: ${({ theme }) => (theme.isDark ? '#70708A' : '#A4A4A4')};
  font-size: 16px;
  font-weight: 500;
`

const StyledBoldText = styled.span`
  font-weight: 700;
  color: #ee6c4d;
`

const Divider = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#8585851a' : '#8585851a')};
  height: 1px;
  width: 100%;
`
const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`
const Text1 = styled.p`
  color: ${({ theme }) => (theme.isDark ? '#70708A' : '#A4A4A4')};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin-top: 20px;
`

const StyledLinkContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-wrap: wrap;
  @media screen and (max-width: 660px) {
    align-self: flex-start;
    margin-top: 8px;
  }
`

const StyledLogoImg = styled.img`
  width: 150px;
  height: 60px;
`

const Footer = () => {
  const linkArray = [
    {
      id: 0,
      linkName: 'Twitter',
      url: 'https://twitter.com/bakery_swap',
    },
    {
      id: 1,
      linkName: 'Telegram',
      url: 'https://t.me/bakeryswap',
    },
    {
      id: 2,
      linkName: 'Medium',
      url: 'https://medium.com/@BakerySwap',
    },
    {
      id: 3,
      linkName: 'Github',
      url: 'https://github.com/clip-dex',
    },
    {
      id: 4,
      linkName: 'Contact us',
      url: '/',
    },
  ]
  return (
    <FooterContainer>
      <FooterRoot>
        {/* <StyledLogoImg src="/images/logo-text.png" alt="" /> */}
        <StyledFooterDescription>
          <StyledBoldText>ClipDex</StyledBoldText> is a one stop solution for creating, trading and buying / selling
          NFTs that is already used by hundreds of thousands of loyal users.
        </StyledFooterDescription>
        <Divider />
        <ContactInfo>
          <Text1>2024 - 2025 Emoney.com</Text1>
          <StyledLinkContainer>
            {linkArray.map((link) => {
              return (
                <FooterLink key={link.id} target="_blank" href={link.url}>
                  {link.linkName}
                </FooterLink>
              )
            })}
          </StyledLinkContainer>
        </ContactInfo>
      </FooterRoot>
    </FooterContainer>
  )
}

export default Footer
