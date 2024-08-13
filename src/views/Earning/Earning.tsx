import React from 'react'
// import { useWeb3React } from '@web3-react/core'
// import styled from 'styled-components'
// import { useTranslation } from 'contexts/Localization'
// import ConnectWalletButton from './ConnectWalletButton'
// import Page from './Page'
import EarningWalletConnected from './EarningWalletConnected'

// const StyledTitle = styled.div`
//   box-sizing: border-box;
//   margin: 0px;
//   min-width: 0px;
//   color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274b')};
//   padding: 10px 0;
//   font-weight: 600;
//   font-size: 25px;
//   line-height: 30px;
//   display: flex;
//   align-items: center;
//   letter-spacing: 1px;
// `

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   -webkit-box-align: center;
//   align-items: center;
//   flex: 1 1 0%;
//   overflow: hidden auto;
//   z-index: 1;
// `

// const StyledImg = styled.img`
//   margin-top: 67px;
//   margin-bottom: 40px;
// `

const Earning: React.FC = () => {
  //  const { account } = useWeb3React()

  //  const { t } = useTranslation()
  return (
    <>
      {/* {!account ? (
        <Page>
          <Wrapper>
            <StyledTitle>{t('Earning')}</StyledTitle>
            <StyledImg src="/images/earning/pig.svg" alt="pig" />
            <ConnectWalletButton />
          </Wrapper>
        </Page>
      ) : ( */}
      <EarningWalletConnected />
    </>
  )
}

export default Earning
