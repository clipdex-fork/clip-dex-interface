import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { Text } from '@clipdex/clip-dex-uikit'

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#d6d7e399' : '#19274b99')};
  font-size: 15px;
  word-break: break-word;
  line-height: 16px;
`

export interface CardValueProps {
  color: string
  value: number
  decimals?: number
  prefix?: string
  bold?: boolean
}

const CardValue: React.FC<CardValueProps> = ({ color, value, decimals, prefix = '', bold = false }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <StyledText bold={bold} color={color}>
      {prefix}
      {countUp}
    </StyledText>
  )
}

export default CardValue
