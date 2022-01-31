/* eslint-disable no-unused-vars */
import React, { createContext, FC } from 'react'
import Theme from 'components/theme'
import useEventListener from 'hooks/useEventListener'
import { StatusBar } from 'react-native'
import { useAppSelector, useAppDispatch } from 'redux-core/hooks'
import { actionSetTheme } from 'redux-core/actions/theme.action'

export type Scheme = {
  primary: string
  secondary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
}
export type SchemesKeys = 'dark' | 'light'
export type Schemes = { [P in SchemesKeys]: Scheme }
export type ThemeContextType = {
  scheme: SchemesKeys
  setTheme: (theme: SchemesKeys) => void
  toggleTheme: () => void
  schemes: Schemes
  addThemeLister: (listener: (theme: string) => void) => () => void
}

const schemes: Schemes = {
  light: {
    primary: '#FFFFFF',
    secondary: '#FBFAFB',
    background: '#FBFAFB',
    card: '#FBFAFB',
    text: '#222326',
    border: 'rgba(48,54,60,.3)',
    notification: '#222326'
  },
  dark: {
    primary: '#0F2132',
    secondary: '#1b1c1d',
    background: '#060A10',
    card: '#12273D',
    text: '#FBFAFB',
    border: 'rgba(48,54,60,.3)',
    notification: '#FBFAFB'
  }
}

const initialValues: ThemeContextType = {
  scheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  schemes,
  addThemeLister: () => () => {}
}

export const Context = createContext<ThemeContextType>(initialValues)

export const ThemeContext: FC<{}> = (props) => {
  const scheme = useAppSelector<SchemesKeys>((s) => s?.app.theme) || 'light'
  const dispatch = useAppDispatch()
  const { addEventListener, emit } = useEventListener()

  const updateListeners = (theme: string) => {
    // emit('theme', theme)
  }

  const setTheme = async (theme: SchemesKeys) => {
    dispatch(actionSetTheme(theme))
    updateListeners(theme)
  }

  const toggleTheme = async () => {
    const theme = scheme === 'dark' ? 'light' : 'dark'
    setTheme(theme)
  }

  const addThemeLister = (listener: (theme: string) => void) => {
    return addEventListener('theme', listener)
  }

  return (
    <Context.Provider
      value={{
        setTheme,
        scheme,
        toggleTheme,
        schemes,
        addThemeLister
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {props.children}
      <Theme.Load setTheme={setTheme} />
    </Context.Provider>
  )
}

export default ThemeContext
