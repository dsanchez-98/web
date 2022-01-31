/* eslint-disable camelcase */
import React, { FC } from 'react'
import { createReduxStore } from 'redux-core/store'
import { Provider } from 'react-redux'
import AppContext from 'context/AppContext'
import ThemeContext from 'context/ThemeContext'
import TranslationContext from 'context/TranslationContext'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from 'navigation'
// import Logger from 'components/logger/LoggerView'
import ResponsiveLayout from 'components/responsiveLayout'
import Spinner from 'components/lottie/components/Spinner'
import 'helpers/yup'

const { store, persistor } = createReduxStore()

const App: FC<{}> = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner type="indicator" showIcon />}>
        <ThemeContext>
          <ResponsiveLayout>
            <TranslationContext>
              <AppContext>
                <Navigation />
                {/* <Logger /> */}
              </AppContext>
            </TranslationContext>
          </ResponsiveLayout>
        </ThemeContext>
      </PersistGate>
    </Provider>
  )
}

export default App
