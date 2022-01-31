/* eslint-disable no-unused-vars */
import React, { FunctionComponent as FC, ReactNode, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import Spinner from 'components/lottie/components/Spinner'
import { statusBarHeight } from 'constants/core'
import { IconNames } from 'components/icon'
import createBottomTabNavigator from './components/createBottomTabNavigator'

const Tab = createBottomTabNavigator()

type OptionsType = {
  title?: string
  icon?: IconNames
}

export type RoutesType<T> = {
  [P in keyof T]: {
    parentName?: keyof T
    path: string
    options?: OptionsType
    component?: React.ComponentType<any>
  }
}
interface NavigationProps {
  innerRef: any
  wrapperComponent?: (params: {
    children: ReactNode
    routes: any
    initialRouteName: string
  }) => ReactNode
  initialRouteName?: string
}

const prefix = Linking.createURL('/')

const defaultWrapperComponent = ({ children }: any) => {
  return <>{children}</>
}

const getScreens = (children: ReactNode) => {
  const screens = {} as any
  const links = {} as any
  const get = (node: ReactNode, path = '') => {
    React.Children.toArray(node).forEach((child: any, index) => {
      const name = child.props.name
      const currPath = `${path}${path ? '/' : ''}${child.props.path || ''}`
      if (name) {
        const { children, ...props } = child.props
        screens[name] = {
          ...props,
          path: currPath
        }
        links[name] = {
          path: currPath
          // exact: true
        }
      }
      get(child.props.children, currPath)
    })
  }
  get(children)

  return { screens: Object.values(screens), links }
}

const Navigation: FC<NavigationProps> = (props) => {
  const { wrapperComponent = defaultWrapperComponent, initialRouteName, children } = props
  const { screens, links } = useMemo(() => getScreens(children), [children])

  const linking = {
    prefixes: [prefix],
    config: { screens: links, initialRouteName }
  }

  const _children = (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      backBehavior="order"
      tabBar={() => null}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
        marginTop: statusBarHeight
      }}
      screenOptions={{ headerShown: false }}
    >
      {screens.map((props: any) => (
        <Tab.Screen
          key={props.name}
          navigationKey={props.name}
          {...props}
          initialParams={{}}
        />
      ))}
    </Tab.Navigator>
  )

  return (
    <NavigationContainer
      // onStateChange={(state) => console.log('New state is', state)}
      ref={props.innerRef}
      linking={linking}
      onStateChange={(e) => {
        // console.log('e', e)
      }}
      fallback={<Spinner type="indicator" showIcon />}
    >
      {wrapperComponent({ children: _children, routes: children, initialRouteName })}
    </NavigationContainer>
  )
}

export default Navigation
