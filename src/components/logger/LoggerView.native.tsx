import React, { FunctionComponent as FC, useRef } from 'react'
import { View, useWindowDimensions, TouchableOpacity, Text } from 'react-native'
import { startNetworkLogging } from 'react-native-network-logger'
import Animated from 'components/reanimated'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import BottomSheet from 'reanimated-bottom-sheet'
import NetworkLogger from './components/NetworkLogger'
import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

startNetworkLogging({ ignoredHosts: [prefix] })

interface Props {}
const STAUS_BAR = getStatusBarHeight()
const HEADER = 40

const Logger: FC<Props> = (props) => {
  const ref = useRef<any>(null)
  const { height: wheight } = useWindowDimensions()
  const height = wheight - STAUS_BAR
  const renderContent = () => (
    <View
      style={{
        height
      }}
    >
      <NetworkLogger />
    </View>
  )

  return (
    <>
      <Animated.View
        style={{
          height: HEADER
        }}
      />
      <BottomSheet
        ref={ref}
        enabledContentGestureInteraction={false}
        snapPoints={[HEADER, height / 2, height]}
        renderContent={renderContent}
        enabledImperativeSnapping
        renderHeader={() => (
          <View
            style={{
              backgroundColor: 'white',
              height: HEADER,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              elevation: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                ref.current.snapTo(2)
              }}
            >
              <Text style={{ fontSize: 12 }}>Ver api logs</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  )
}

export default Logger
