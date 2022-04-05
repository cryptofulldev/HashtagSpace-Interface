import { createGlobalStyle, withTheme } from 'styled-components'
import { ThemeProps } from './themes'

export type GlobalThemeProps = {
  theme: ThemeProps
}

const GlobalStyles = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background1: #1b1c1f;
    --dark-background2: #1c1c20;
    --dark-background3: #171717;
    --dark-text1: #fafafa;
    --dark-text2: #919599;
    --dark-textShadow: #000000;
    --dark-boxShadow: #171717;

    --dark-black: #000000;
    --dark-opacityColor: #00000030;

    //light-mode
    --light-background1: #ffffff;
    --light-background2: #fafafa;
    --light-background3: #e1e1e1;
    --light-text1: #1c1c20;
    --light-text2: #1b1c1f;
    --light-textShadow: #ffffff;
    --light-boxShadow: #e1e1e1;

    --light-white: #ffffff;
    --light-opacityColor: #ffffff30;

    //static colors
    --goldenYellow: #e8a80a;
    --aquaBlue: #008bff;
    --red: #e74c3c;
    --yellow1: #ffc600;
    --yellow2: #fbb212;
    --yellow3: #f48f33;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-repeat: repeat;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background1};
    background-size: cover;
    color: ${({ theme }: GlobalThemeProps) => theme.text1};
    font-family: 'Montserrat', monospace !important;
    font-size: 16px;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    opacity: 1;
    z-index: 0;
    transition: background-color 300ms ease-in-out 0s, opacity 800ms ease-in-out 0s;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
  }

  /* For Chrome */
  /* width */
  ::-webkit-scrollbar {
    @media all and (min-width: 990px) {
      width: 4px;
      height: 2px;
    }
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }: GlobalThemeProps) => theme.background3};
    border-radius: 4px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }: GlobalThemeProps) => theme.background1};
    height: 48px;
    width: 48px;
    border-radius: 4px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }: GlobalThemeProps) => theme.text2};
  }
`
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
}

export const gradient = {
  normal: 'linear-gradient(var(--yellow1), var(--yellow3))',
  hover: 'linear-gradient(var(--yellow2), var(--yellow3))',
  active: 'linear-gradient(var(--yellow3), var(--yellow2))',
}

export default withTheme(GlobalStyles)
