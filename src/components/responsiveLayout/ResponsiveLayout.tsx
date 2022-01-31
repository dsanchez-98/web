import React, { FunctionComponent as FC, createContext } from 'react'
import useResponsiveLayout from './hooks/useResponsiveLayout'
import { ReturnLayout } from './types'

export const Context = createContext<ReturnLayout>({
  breakPoint: 'xs',
  height: 0,
  width: 0,
  isMobile: true,
  isPortail: true,
  isBreakPoint: () => false
})

const ResponsiveLayout: FC<{}> = (props) => {
  const responsive = useResponsiveLayout()
  return <Context.Provider value={responsive}>{props.children}</Context.Provider>
}

export default ResponsiveLayout
