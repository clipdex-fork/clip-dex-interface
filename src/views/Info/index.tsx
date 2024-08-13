import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 320px);
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  background: #06070a;
  background-image: ${({ theme }) =>
    theme.isDark ? "url('/images/info/background_dark.png')" : "url('/images/info/background_white.png')"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 80px auto 50px auto;
  max-width: 1188px;
  width: 90%;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const WhiteRow = styled.div`
  width: 100%;
  background: ${({ theme }) => (theme.isDark ? '#222235' : 'white')};
`

const LeftTopCol = styled.div`
  width: 50%;
  align-self: center;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`
const RightTopCol = styled.div`
  width: 50%;
  text-align-last: center;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`
const Title = styled.p`
  color: ${({ theme }) => (theme.isDark ? '#D6D7E3' : '#19274B')};
  font-weight: 600;
  font-size: 25px;
  line-height: 32px;
  margin-bottom: 20px;
`
const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? '#B9B9B9' : '#19274B')};
  margin-top: 10px;
  font-weight: 500;
  line-height: 28px;
`
const Description1 = styled.div`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? '#B9B9B9' : '#19274B')};
  margin-top: 10px;
  font-weight: 500;
  line-height: 28px;
  display: flex;
  align-items: center;
`
const StyledDot = styled.span`
  background: #ee6c4d;
  width: 8px;
  height: 8px;
  border-radius: 100px;
  margin-right: 12px;
`

const Info: React.FC = () => {
  return (
    <>
      <StyledPage>
        <Row style={{ marginTop: '60px' }}>
          <LeftTopCol>
            <Description>
              Matcha swap is the fastest blockchain that ever built on the planet that enable the zero elapse time for
              cross border currency transfer, zero gas fee and real time money transfer.
            </Description>
          </LeftTopCol>
          <RightTopCol>
            <img src="/images/info/blockchain.png" alt="icon" width="400px" height="270px" />
          </RightTopCol>
        </Row>
        <WhiteRow>
          <Row>
            <LeftTopCol>
              <img src="/images/info/dex.png" alt="icon" width="400px" height="270px" />
            </LeftTopCol>
            <LeftTopCol>
              <Title>
                Applying super smart contract, <br />
                Matcha will decentralize the world finanance by revolutionizing
              </Title>
              <Description1>
                <StyledDot /> PayTech
              </Description1>
              <Description1>
                <StyledDot /> Real-time
              </Description1>
              <Description1>
                <StyledDot /> Zero gas fee cross
              </Description1>
              <Description1>
                <StyledDot /> border money transfer{' '}
              </Description1>
              <Description1>
                <StyledDot /> InsureTech{' '}
              </Description1>
              <Description1>
                <StyledDot /> RegTech{' '}
              </Description1>
              <Description1>
                <StyledDot /> MedTech{' '}
              </Description1>
              <Description1>
                <StyledDot /> Smart contract and AI
              </Description1>
              <Description1>
                <StyledDot /> Enabled micro and nanolending
              </Description1>
            </LeftTopCol>
          </Row>
        </WhiteRow>
        <Row>
          <LeftTopCol>
            <Title>Matcha Liquidity Protocol</Title>
            <Description>
              A next-generation automated market maker that protects users from front-running attacks and offers capital
              efficiency to liquidity providers.
            </Description>
          </LeftTopCol>
          <RightTopCol>
            <img src="/images/info/liquidity.png" alt="icon" width="400px" height="270px" />
          </RightTopCol>
        </Row>
        <WhiteRow>
          <Row>
            <LeftTopCol>
              <img src="/images/info/aggregation.png" alt="icon" width="400px" height="270px" />
            </LeftTopCol>
            <LeftTopCol>
              <Title>Matcha Aggregation Protocol</Title>
              <Description>
                A protocol that facilitates cost-efficient and secure atomic transactions by utilizing a wide range of
                protocols and performing argument validation and execution verification.
              </Description>
            </LeftTopCol>
          </Row>
        </WhiteRow>
      </StyledPage>
    </>
  )
}

export default Info
