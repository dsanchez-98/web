import React, { FunctionComponent as FC, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'components/reanimated'
import DrawerContent from './DrawerContent'

interface Props {}

const WIDTH_MIN = 80
const WIDTH_MAX = 200

const useDrawer = () => {
  const progress = useSharedValue(0)
  const [statick, setStatick] = useState(false)
  const style = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [WIDTH_MIN, WIDTH_MAX])
    return {
      height: '100%',
      width
    }
  })
  const events = {
    onMouseEnter: () => {
      if (!statick) {
        progress.value = withTiming(1)
        console.log('onMouseEnter')
      }
    },
    onMouseLeave: () => {
      if (!statick) {
        progress.value = withTiming(0)
      }

      console.log('onMouseLeave')
    }
  }
  const _setStatick = (val: any) => {
    progress.value = withTiming(val ? 1 : 0)
    setStatick(val)
  }

  return { events, style, setStatick: _setStatick, statick, progress }
}

const Drawer: FC<Props> = (props) => {
  const { events, style, setStatick, statick, progress } = useDrawer()

  return (
    <>
      <Animated.View style={[style, styles.container]}>
        <View {...events} style={[styles.contentDrawer]}>
          <Text
            onPress={() => {
              setStatick(!statick)
            }}
          >
            Drawer
          </Text>

          <DrawerContent progress={progress} />
        </View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20
  },
  contentDrawer: { flex: 1, borderRadius: 10 }
})
export default Drawer
