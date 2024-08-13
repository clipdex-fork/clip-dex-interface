import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { ZilionixxTheme } from '@clipdex/clip-dex-uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ZilionixxTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter';
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
    > iframe {
      display: none;
    }
  }
`

export default GlobalStyle
