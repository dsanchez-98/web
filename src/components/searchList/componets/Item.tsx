/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useRef } from 'react'
import Icon, { IconNames } from 'components/icon'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'components/reanimated'
import { useHover } from 'react-native-web-hooks'
import Typography from 'components/typography'
import fontSize from 'styles/fontSize'
import Theme from 'components/theme'
import useButtonAction from 'hooks/useButtonAction'
import SwipeableItem from 'components/swipeableItem'
import {
  useResponsiveStyles,
  StyleSheet as RStyleSheet
} from 'components/responsiveLayout'

type KeyActions = keyof ReturnType<typeof useButtonAction>

export type OptionsType = {
  [P in KeyActions]?: {
    icon: IconNames
    name: string
    hide?: boolean
  }
}

const OptionButton = ({
  iconName,
  name,
  onPress
}: {
  iconName: IconNames
  name: string
  onPress: () => void
}) => {
  const ref = useRef<RectButton>(null)
  const isHover = useHover(ref)
  return (
    <RectButton
      ref={ref}
      onPress={onPress}
      style={[
        {
          backgroundColor: isHover ? '#b8d3f2' : '#BFDDFF'
        },
        nStyles.buttonOption
      ]}
    >
      <View style={{ height: 24 }}>
        <Icon name={iconName} />
      </View>
      <Typography
        content={name}
        numberOfLines={1}
        size={fontSize.xxs}
        disableThemeColor
      />
    </RectButton>
  )
}

type FC<T> = {
  (props: T): JSX.Element
}

type ItemType<T = any> = {
  item: T
  optionsForItem: (params: { item: T }) => OptionsType
  children?:
    | ((params: { item: T; progress: Animated.SharedValue<number> }) => JSX.Element)
    | React.ReactNode
}
const Item: FC<ItemType> = ({ item, optionsForItem, children }) => {
  const progress = useSharedValue(0)
  const actions = useButtonAction()
  const items = Object.entries(optionsForItem({ item }))
  const { styles } = useResponsiveStyles(rStyle)

  const swipeEnable = styles.numColumns.flex === 1
  return (
    <View>
      <SwipeableItem
        enabled={swipeEnable}
        leftContent={
          swipeEnable ? (
            <View style={[nStyles.optionsContainer, { width: (items.length - 1) * 50 }]}>
              {items.map(([key, option]) => {
                const keyAction = key as KeyActions
                if (keyAction === 'cancelDocument') {
                  return null
                }
                return (
                  <OptionButton
                    key={keyAction}
                    iconName={option.icon}
                    name={option.name}
                    onPress={() => {
                      actions[keyAction]?.({ item })
                    }}
                  />
                )
              })}
            </View>
          ) : undefined
        }
        rightContent={
          swipeEnable ? (
            <View style={[nStyles.optionsContainer, { width: 50 }]}>
              {items.map(([key, option]) => {
                const keyAction = key as KeyActions
                if (keyAction === 'cancelDocument') {
                  return (
                    <OptionButton
                      key={keyAction}
                      iconName={option.icon}
                      name={option.name}
                      onPress={() => {
                        actions[keyAction]?.({ item })
                      }}
                    />
                  )
                }
                return null
              })}
            </View>
          ) : undefined
        }
      >
        <Theme.View style={[nStyles.containerItem]} scheme="primary">
          {typeof children === 'function' ? children({ item, progress }) : children}
        </Theme.View>
      </SwipeableItem>
    </View>
  )
}

const rStyle = RStyleSheet.create({
  numColumns: {
    flex: '1 md:2 xl:3 xxl:4'
  }
})

export default Item

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2
}

const nStyles = StyleSheet.create({
  arrowContainer: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerItem: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    ...shadow
  },
  optionsContainer: {
    backgroundColor: '#BFDDFF',
    flexDirection: 'row',
    height: '100%'
  }
})
