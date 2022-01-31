import React, {
  createContext,
  FunctionComponent as FC,
  useContext,
  useEffect,
  useState
} from 'react'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  getStyle
} from 'components/reanimated'
import { useResponsiveStyles } from 'components/responsiveLayout'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import usePopState from 'hooks/web/usePopState'
import { useNavigation } from '@react-navigation/native'
import Theme from 'components/theme'

export type DrawerParams = {
  toggleDrawer: () => void
  progress: Animated.SharedValue<number>
  navigate: (routeName: string, params?: any) => void
  focusedRouteName: string
}

interface Props {
  drawerContent: (params: DrawerParams) => JSX.Element
  initialRouteName?: string
}

const width = 300
const minWidth = 70
const border = 20
const duration = 300
const aConfigs = { duration, easing: Easing.out(Easing.quad) }

const useDrawer = () => {
  const { isMobile } = useResponsiveStyles({})
  const progress = useSharedValue(isMobile ? 0 : 1)
  const dragging = useSharedValue(false)

  const hide = (calback?: () => void, back = true) => {
    progress.value = withTiming(0, aConfigs, () => {
      calback && runOnJS(calback)()
    })
  }

  const { pushState } = usePopState(() => {
    isMobile && hide()
  }, true)

  const show = (calback?: () => void) => {
    isMobile && pushState()
    progress.value = withTiming(1, aConfigs, () => {
      calback && runOnJS(calback)()
    })
  }

  const toggleDrawer = () => {
    if (progress.value) {
      hide()
    } else {
      show()
    }
  }

  const navigate = (routeName: string, params: any) => {
    if (isMobile) {
      hide(() => {
        navigation.navigate(routeName, params)
      })
    } else {
      navigation.navigate(routeName, params)
    }
  }

  const styleContainer = useAnimatedStyle(() => {
    return getStyle(
      {
        width: isMobile
          ? 0
          : interpolate(progress.value, [0, 1], [minWidth, width - border])
      },
      !dragging.value
    )
  })

  const styleDrawer = useAnimatedStyle(() => {
    const translate = isMobile ? -width : -(width - minWidth)
    return getStyle(
      {
        transform: [
          {
            translateX: interpolate(progress.value, [0, 1], [translate + border, 0])
          }
        ]
      },
      !dragging.value
    )
  })

  const styleBackground = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: progress.value ? 0 : -9999
        }
      ],
      backgroundColor: `rgba(0,0,0,${interpolate(progress.value, [0, 1], [0, 0.3])})`
    }
  })

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      dragging.value = true
      ctx.x = interpolate(progress.value, [0, 1], [0, width])
    },
    onActive: ({ translationX }, ctx) => {
      const value = ctx.x + translationX
      if (value > width) {
        return
      }
      progress.value = interpolate(value, [0, width], [0, 1])
    },
    onEnd: ({ translationX }) => {
      dragging.value = false
      if (translationX > width / 4) {
        runOnJS(show)()
      } else {
        runOnJS(hide)()
      }
    }
  })

  return {
    gestureHandler,
    isMobile,
    toggleDrawer,
    styleContainer,
    show,
    hide,
    styleBackground,
    progress,
    styleDrawer,
    navigate
  }
}

const Context = createContext({
  toggleDrawer: () => {}
})
type DrawerContextType = Omit<ReturnType<typeof useDrawer>, 'gestureHandler'>

export const useDrawerContext = () => {
  return useContext<DrawerContextType>(Context as any)
}

const Drawer: FC<Props> = (props) => {
  const { gestureHandler, ...drawer } = useDrawer()

  return (
    <Context.Provider value={drawer}>
      <Theme.View style={styles.container} scheme="background">
        <Animated.View style={drawer.styleContainer} />
        <Animated.View style={[styles.containerRight]}>{props.children}</Animated.View>
        {drawer.isMobile && (
          <Animated.View style={[styles.background, drawer.styleBackground]}>
            <TouchableOpacity
              style={{ height: '100%', width: '100%' }}
              onPress={() => drawer.hide()}
              activeOpacity={1}
            />
          </Animated.View>
        )}
        <PanGestureHandler
          failOffsetY={[-20, 20]}
          activeOffsetX={[-5, 5]}
          onGestureEvent={gestureHandler}
        >
          <Animated.View style={[styles.containerDrawer, drawer.styleDrawer]}>
            <ContentDrawer {...props} {...drawer} />
          </Animated.View>
        </PanGestureHandler>
      </Theme.View>
    </Context.Provider>
  )
}

const getFocusedRouteName = (state: any = {}) => {
  if (state.stale) {
    const index = state.index || 0
    return state.routes?.[index]?.name
  }
  let currentRoute = state.routes?.[state.index]
  let focused = currentRoute?.name

  while (currentRoute?.state) {
    const currState = currentRoute.state
    currentRoute =
      currState.routes.length > 1
        ? currState.routes[currState.index]
        : currState.routes[0]
    focused = currentRoute?.name
  }

  return focused
}

const ContentDrawer: FC<DrawerContextType & Props> = (props) => {
  const navigation = useNavigation()
  const [focusedRouteName, setFocused] = useState(
    getFocusedRouteName(navigation.getState()) || props.initialRouteName
  )
  useEffect(() => {
    return navigation.addListener('state', () => {
      const routeName = getFocusedRouteName(navigation.getState())
      routeName && setFocused(routeName)
    })
  }, [])

  return (
    <>
      {props.drawerContent({
        toggleDrawer: props.toggleDrawer,
        progress: props.progress,
        navigate: props.navigate,
        focusedRouteName
      })}
    </>
  )
}
export default Drawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  containerRight: {
    flex: 1
  },
  containerDrawer: {
    position: Platform.select({
      web: 'fixed',
      native: 'absolute'
    }) as any,
    left: 0,
    top: 0,
    right: 0,
    width,
    height: '100%',
    overflow: 'hidden',
    paddingRight: border
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
