import React from 'react'
import styled from 'styled-components'

const StyledText = styled.span`
  word-break: break-word;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #ee6c4d;
  text-shadow: 0px 1px 4px rgba(238, 108, 77, 0.27);
  img {
    margin-right: 8px;
  }
`

const Lock = () => {
  return (
    <StyledText>
      <img src="/images/home/lock.svg" alt="lock" />
      Locked
    </StyledText>
  )
}

export default Lock
