export interface ThemeProps {
  //color
  background1: string
  background2: string
  background3: string
  text1: string
  text2: string
  reverseText: string
  textShadow: string
  opacityColor: string
  goldenYellow: string
  aquaBlue: string
  red: string
  reverseBackground: string
  //border
  border1: string
  border2: string
  //box shadow
  boxShadow1: string
  boxShadow2: string
}

export const darkTheme: ThemeProps = {
  background1: 'var(--dark-background1)',
  background2: 'var(--dark-background2)',
  background3: 'var(--dark-background3)',
  text1: 'var(--dark-text1)',
  text2: 'var(--dark-text2)',
  reverseText: 'var(--light-text1)',
  textShadow: 'var(--dark-textShadow)',
  opacityColor: 'var(--dark-opacityColor)',
  goldenYellow: 'var(--goldenYellow)',
  aquaBlue: 'var(--aquaBlue)',
  red: 'var(--red)',
  reverseBackground: 'var(--light-background1)',
  border1: '1px solid var(--light-opacityColor)',
  border2: '2px solid var(--aquaBlue)',
  boxShadow1: 'box-shadow: 0px 3px 10px var(--aquaBlue)',
  boxShadow2: '3px 3px 12px 2px var(--dark-boxShadow)',
}

export const lightTheme: ThemeProps = {
  background1: 'var(--light-background1)',
  background2: 'var(--light-background2)',
  background3: 'var(--light-background3)',
  text1: 'var(--light-text1)',
  text2: 'var(--light-text2)',
  reverseText: 'var(--dark-text1)',
  textShadow: 'var(--light-textShadow)',
  opacityColor: 'var(--light-opacityColor)',
  goldenYellow: 'var(--goldenYellow)',
  aquaBlue: 'var(--aquaBlue)',
  red: 'var(--red)',
  reverseBackground: 'var(--dark-background1)',
  border1: '1px solid var(--dark-opacityColor)',
  border2: '2px solid var(--aquaBlue)',
  boxShadow1: 'box-shadow: 0px 3px 10px var(--aquaBlue)',
  boxShadow2: '3px 3px 12px 2px var(--light-boxShadow)',
}
