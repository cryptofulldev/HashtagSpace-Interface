import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/themes'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: true, toggleTheme: () => null })
export const useThemeContext = () => React.useContext(ThemeContext)

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true)

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? darkTheme : lightTheme}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}
