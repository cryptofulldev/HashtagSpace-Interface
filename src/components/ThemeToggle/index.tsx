import React from 'react'
import { BsFillMoonFill, BsSun } from 'react-icons/bs'
import { useThemeContext } from '../../contexts/ThemeContext'

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useThemeContext()
  const isDark = window.localStorage.getItem('IS_DARK')

  return <>{isDark && isDark === 'true' ? <BsSun onClick={toggleTheme} /> : <BsFillMoonFill onClick={toggleTheme} />}</>
}

export default ThemeToggleButton
