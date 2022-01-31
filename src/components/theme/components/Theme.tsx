import { FC, useEffect } from 'react'
import { useColorScheme } from 'react-native'

interface Props {
  setTheme: (theme: any) => void
}

const Theme: FC<Props> = (props) => {
  const scheme = useColorScheme()

  useEffect(() => {
    // props.setTheme(scheme);
  }, [scheme])

  return null
}

export default Theme
