// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { Card } from '@clipdex/clip-dex-uikit'

const StyledFarmStakingCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background-color: transparent;
  border-radius: 9px;
  width: 273px;
  height: 273px;
  border: none;
  cursor: pointer;
`
const Image = styled.img`
  margin-right: 5px;
  width: 23px;
  height: 23px;
`

const CardImage = styled.div<{ cardBackgroundUrl: string }>`
  display: block;
  width: 273px;
  height: 273px;
  background-image: ${({ cardBackgroundUrl }) => `url(${cardBackgroundUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  :hover {
    opacity: 0.7;
  }
`

const StyledCardInfo = styled.div`
  position: absolute;
  width: 251px;
  height: 65px;
  padding: 4px 15px;
  bottom: 11px;
  left: 11px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(36px);
  border-radius: 9px;
`
const CardTitle = styled.div`
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 15px;
  line-height: 34px;
  letter-spacing: 0.75px;
`
const CardPrice = styled.div`
  color: white;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.859533px;
`
const CardStar = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
`

const CardInfo = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  color: rgb(114, 47, 13);
`

const CardInfoChild = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`

const NewCardItem: React.FC<{
  art: any
}> = ({ art }) => {
  return (
    <StyledFarmStakingCard>
      <CardImage cardBackgroundUrl={art.filePath} />
      <StyledCardInfo>
        <CardInfo>
          <CardInfoChild>
            <div>
              <CardTitle>{art.artworkName}</CardTitle>
              <CardPrice>{art.sellPrice} COLA</CardPrice>
            </div>
          </CardInfoChild>
          <CardInfoChild>
            <Image src="/images/home/vote_emoji_1.svg" />
            <CardStar>23</CardStar>
          </CardInfoChild>
        </CardInfo>
      </StyledCardInfo>
    </StyledFarmStakingCard>
  )
}

export default NewCardItem
