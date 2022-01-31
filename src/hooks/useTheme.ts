import { Context } from 'context/ThemeContext'
import { useContext } from 'react'

const useTheme = () => {
  const context = useContext(Context)

  return context
}

export default useTheme
