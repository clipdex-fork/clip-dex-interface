import styled from 'styled-components'
import { Grid } from '@clipdex/clip-dex-uikit'

const GridLayout = styled(Grid)`
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;
  @media screen and (min-width: 660px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }
  @media screen and (min-width: 1260px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
`

export default GridLayout
