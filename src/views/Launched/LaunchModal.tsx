import React from 'react'
import {
  Heading,
  Button,
  Flex,
  ModalContainer,
  //   ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
} from '@clipdex/clip-dex-uikit'
import styled from 'styled-components'
import CurrencyInputPanel from './components/inputpanel'

const StyledModal = styled(ModalContainer)`
  // background-image: url('/images/launchpad/ooo.png');
  background-color: ${({ theme }) => (theme.isDark ? '#080808' : '#fffdfa')};
  background-position: center;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 550px;
  // height: 80%;
  font-family: Roboto;
  box-shadow: 0 0 10px white;
}
  .overlay3{
    left: 40px;
    top: 20px;
    z-index:3;
    font-weight: 10px;
    text-align: justify;
    font-family: Roboto;
  }
  .leftbutton{
    width: 20px;
    height: 30px;
    margin-top:30px;
    background-color: ${({ theme }) => (theme.isDark ? '#efc990' : '#ac562a')};
    color:  ${({ theme }) => (theme.isDark ? '#382820' : '#fffdfa')};
  }
  .officialbutton{
    color:  ${({ theme }) => (theme.isDark ? '#382820' : '#fffdfa')};
    height: 36px;
    width: 136px;
    margin-top: 50px;
    border-radius: 10px;
    background-color: ${({ theme }) => (theme.isDark ? '#efc990' : '#ac562a')};
    font-family: "Roboto"
    line-height: 36px;
    font-size: 14px;
  }
  .cancel{
    width:30px;
    height:30px;
    margin-top: 15px;
    margin-right:20px;

  }
  .buycontent{
    height: 70px;
    background-color: ${({ theme }) => (theme.isDark ? '#080808' : 'white')};
    border-radius: 20px;
    border: ${({ theme }) => (theme.isDark ? '1px solid #754d38' : '1px solid #ac562a')};
    margin-bottom: 20px;
    margin-top:30px;

    @media screen and (min-width: 1300px) {
      width: 100%;
    }
  }
  .burn{
      margin-right:10px;
      float: left;
      margin-top: -10px;
  }
  .valueTitle{
    font-size: 14px;
    font-weight: 400;
    color:  ${({ theme }) => (theme.isDark ? '#d6a485' : '#c58560')};
    float: left;
  }
  .value{
    font-weight: bold;
    font-size: 14px;
    color:  ${({ theme }) => (theme.isDark ? '#d6a485' : '#c58560')};
    float: right;
  }
  .title{
    font-size: 24px;
    margin-top: 20px;
    font-weight: bold;
    color:  ${({ theme }) => (theme.isDark ? '#d6a485' : '#c58560')};
  }
  .divider{
    border-bottom: ${({ theme }) => (theme.isDark ? '1px solid #754d38' : '1px solid #eed9cc')};
  }
  .description{
    color:  ${({ theme }) => (theme.isDark ? '#754d38' : '#d6a485')};
    line-height: 1.5rem;
  }
`
const CardImage = styled.div<{ imgurl: string }>`
  border-radius: 20px 20px 0px 0px;
  background-image: ${({ imgurl }) => `url(${imgurl})`};
  background-size: cover;
  align-self: baseline;
  min-width: 280px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin-bottom: 4px;
`
interface CurrencySearchModalProps extends InjectedModalProps {
  // showCommonBases?: boolean
  title: string
  description: string
  idoAmount: string
  time: string
  imgurl: string
}

export default function CustomModal({
  onDismiss = () => null,
  // showCommonBases = false,
  imgurl,
  title,
  description,
  idoAmount,
  time,
}: CurrencySearchModalProps) {
  return (
    <StyledModal minWidth="400px">
      <ModalBody>
        <div className="overlay3">
          <CardImage imgurl={imgurl}>
            <Flex>
              <ModalTitle>
                <Heading>
                  <div style={{ marginLeft: '15px' }}>
                    <Button className="leftbutton">IDO</Button>
                  </div>
                </Heading>
              </ModalTitle>
              <div className="cancel">
                <ModalCloseButton onDismiss={onDismiss} />
              </div>
            </Flex>
          </CardImage>

          <div>
            <div style={{ width: '100%', padding: '15px 32px 24px', display: 'flex' }}>
              <div style={{ width: '50%', color: 'white' }}>
                <p className="title">{title}</p>
                <Button className="officialbutton">WEBSITE</Button>
              </div>
              <div style={{ width: '50%', color: 'white' }}>
                <p style={{ paddingBottom: '13px' }}>
                  <span className=" valueTitle"> IDO Amount:</span>
                  <span className=" value">{idoAmount}</span>
                </p>
                <br />
                <p style={{ paddingBottom: '13px' }}>
                  <span className=" valueTitle">Supported Coin:</span>
                  <span className=" value">BNB</span>
                </p>
                <br />
                <p style={{ paddingBottom: '13px' }}>
                  <span className=" valueTitle">Price:</span>
                  <span className=" value">0.005BNB</span>
                </p>
                <br />
                <p style={{ paddingBottom: '13px' }}>
                  <span className=" valueTitle">Start Block:</span>
                  <span className=" value">0</span>
                </p>
                <br />
                <p style={{ paddingBottom: '13px' }}>
                  <span className=" valueTitle">Time:</span>
                  <span className=" value">{time}</span>
                </p>
                <br />
                {/* <p style={{ borderTop: '5px solid white', width: '100%', marginTop: '20px', marginBottom: '30px' }} /> */}
                {/* <p style={{ fontSize: '25px', float: 'right', textShadow: '0px 0px 5px white' }}>FEATURES</p>
                <br />
                <p style={{ marginBottom: '20px', marginTop: '60px' }}>
                  <img src="/images/launchpad/burn.png" alt="Cinque Terre" className="burn" />

                  <span>Burn %:</span>
                  <span style={{ float: 'right' }}>{burn}</span>
                </p>
                <br />
                <p style={{ marginBottom: '20px' }}>
                  <img src="/images/launchpad/holder.png" alt="Cinque Terre" className="burn" />
                  <span>%Redistributed to Holders:</span>
                  <span style={{ float: 'right' }}>{holder}%</span>
                </p>

                <br />
                <p style={{ marginBottom: '20px' }}>
                  <img src="/images/launchpad/slipage.png" alt="Cinque Terre" className="burn" />
                  <span>Slippage%:</span>
                  <span style={{ float: 'right' }}>{slip}%</span>
                </p>

                <br />
                <p style={{ marginBottom: '20px' }}>
                  <img src="/images/launchpad/locked.png" alt="Cinque Terre" className="burn" />
                  <span>LP Locked:</span>
                  <span style={{ float: 'right' }}>250Years</span>
                </p>
                <br />
                <p style={{ marginBottom: '20px' }}>
                  <img src="/images/launchpad/initial.png" alt="Cinque Terre" className="burn" />
                  <span>Initial Supply:</span>
                  <span style={{ float: 'right' }}>{initial}(34 Trilion)</span>
                </p> */}
              </div>
            </div>
            <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
              <p className="divider" />
            </div>
            <div style={{ width: '100%', padding: '15px 32px 24px' }}>
              <div className="buycontent">
                <CurrencyInputPanel />
              </div>
            </div>
            <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
              <p className="divider" />
            </div>
            <div style={{ width: '100%', padding: '15px 32px 24px' }}>
              <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna alliqua.
              </div>
              <div className="description">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </StyledModal>
  )
}
