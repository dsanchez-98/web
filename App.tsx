/* eslint-disable camelcase */
import React, { FC } from 'react'
import AppComponent from './src/pages/app'
import {
  useFonts,
  Baloo2_400Regular,
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold
} from '@expo-google-fonts/baloo-2'
import Spinner from 'components/lottie/components/Spinner'

interface Props {}

const App: FC<Props> = () => {
  const [fontsLoaded, error] = useFonts({
    Baloo2_400Regular,
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold
  })

  return (
    <>
      {!fontsLoaded && !error ? <Spinner type="indicator" showIcon /> : <AppComponent />}
    </>
  )
}

export default App
