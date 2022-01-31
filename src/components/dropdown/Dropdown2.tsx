/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import HighlightText from 'components/highlightText'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  getStyle
} from 'components/reanimated'
import { getResponsiveLayout } from 'components/responsiveLayout/common'
import useMeasure from 'hooks/core/useMeasure'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import {
  TouchableOpacity,
  // Modal,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  View,
  TextInput,
  Platform,
  FlatList,
  StyleSheet
} from 'react-native'
import { useHover } from 'react-native-web-hooks'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import useTheme from 'hooks/useTheme'
import Modal from 'components/modal/PortalModal'
const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

type Layout = {
  height: number
  width: number
  y: number
  x: number
}

type ItemType<V> = { label: string; value: V }
interface Props<M extends boolean, V, T = ItemType<V>> {
  items: T[]
  children:
    | ((props: {
        progress: Animated.SharedValue<number>
        value?: M extends false ? T : T[]
        open: () => void
        isClone: boolean
      }) => React.ReactNode)
    | React.ReactNode
  value?: V
  onBlur?: () => void
  onFocus?: () => void
  onChange?: (value: T, isSelected?: boolean) => void
  style?: StyleProp<ViewStyle>
  disableButton?: boolean
  widthOnLayout?: (
    layout: { [P in keyof Layout]: Animated.SharedValue<number> }
  ) => number
  renderItem?: (params: {
    index: number
    item: T
    isHover: boolean
    selected: boolean
    onPress: () => void
  }) => JSX.Element
  multiple: M
  showSearch?: boolean
  maxHeight?: number
  offset?: {
    top?: number
    left?: number
  }
  closeOnSelect?: boolean
  onPress?: () => void
}

function getScrollParent(node: any): any | null {
  if (node == null) {
    return null
  }

  if (node.scrollHeight > node.clientHeight) {
    return node
  } else {
    return getScrollParent(node.parentNode)
  }
}

const valueLayout = { height: 0, width: 0, y: 0, x: 0 }

const useDropDown = () => {
  const refView = useRef<any>(null)
  const [visible, setVisible] = useState(false)
  const layoutHeight = useSharedValue(valueLayout.height)
  const layoutWidth = useSharedValue(valueLayout.width)
  const layoutY = useSharedValue(valueLayout.y)
  const layoutX = useSharedValue(valueLayout.x)
  const progress = useSharedValue(0)

  const { getMeasure } = useMeasure(refView)

  const setValue = (l: Layout) => {
    layoutHeight.value = l.height
    layoutWidth.value = l.width
    layoutX.value = l.x
    layoutY.value = l.y
  }

  const open = async () => {
    await updateMeasure()
    setVisible(true)
  }

  const updateMeasure = async () => {
    const l = await getMeasure()
    l && setValue(l)
  }

  const close = () => {
    setVisible(false)
    setValue(valueLayout)
  }

  return {
    open,
    close,
    visible,
    refView,
    layout: {
      height: layoutHeight,
      width: layoutWidth,
      x: layoutX,
      y: layoutY
    },
    progress,
    updateMeasure
  }
}

export type DropdownProps = {
  <M extends boolean, V, T extends ItemType<V>>(props: Props<M, V, T>): JSX.Element
}

const Dropdown: DropdownProps = (props) => {
  const state = useDropDown()
  const { refView, open, visible, progress } = state
  const { children, disableButton } = props
  const { items, multiple } = props

  const onChange = (item: any, isSelected?: boolean) => {
    props.onChange?.(item, isSelected)
  }

  const value = multiple
    ? items.filter(
        ({ value }) => Array.isArray(props.value) && props.value?.includes?.(value)
      )
    : (items.find((i) => props.value === i.value) as any)
  const Wrapper = (disableButton ? View : TouchableOpacity) as any

  const onPress = () => {
    props.onPress?.()
    open()
  }

  const _getScrollParent = () => {
    return getScrollParent(refView.current)
  }

  return (
    <>
      <Wrapper
        activeOpacity={disableButton ? 1 : 0.2}
        onPress={disableButton ? undefined : onPress}
        ref={refView}
        onLayout={Platform.OS === 'android' ? () => {} : undefined}
        style={props.style}
      >
        {typeof children === 'function'
          ? children({ progress, value, open: onPress, isClone: false })
          : children}
      </Wrapper>
      {visible && (
        <DropdownContent
          {...state}
          {...props}
          onChange={onChange}
          getScrollParent={_getScrollParent}
        />
      )}
    </>
  )
}

interface DropdownContentType extends Props<any, any, any> {
  open: () => void
  close: () => void
  visible: boolean
  layout: { [P in keyof Layout]: Animated.SharedValue<number> }
  progress: Animated.SharedValue<number>
  updateMeasure: () => void
  getScrollParent: () => any
}

const MAX_HEIGHT = 250
const DropdownContent = (props: DropdownContentType) => {
  const [searchText, setText] = useState('')
  const dimension = useWindowDimensions()
  const height = useSharedValue(0)
  const focus = useSharedValue(false)
  const aRef = useRef<Animated.View>(null)
  const { getMeasure } = useMeasure(aRef)
  const { scheme, schemes } = useTheme()
  const enableScroll = useRef(true)
  const isTop = useDerivedValue(() => {
    const botom = dimension.height - (props.layout.y.value + props.layout.height.value)
    return botom < height.value
  })

  const open = async () => {
    enableScroll.current = false
    const measure = await getMeasure()
    if (measure) {
      height.value = measure.height
      props.progress.value = withTiming(1)
    }
  }

  const close = () => {
    enableScroll.current = true
    props.progress.value = withTiming(0, {}, () => {
      runOnJS(props.close)()
    })
  }

  const onPressItem = (value: any, isSelected = true) => {
    const { closeOnSelect = true } = props
    props.onChange?.(value, isSelected)
    closeOnSelect && close()
  }

  useEffect(() => {
    open()
  }, [])

  useEffect(() => {
    props.updateMeasure()
  }, [dimension])

  useEffect(() => {
    const onScroll = (e: any) => {
      if (!enableScroll.current) {
        e.preventDefault()
        e.stopPropagation()
        return false
      } else {
        return true
      }
    }

    const navigator = props.getScrollParent()
    navigator?.addEventListener('wheel', onScroll)
    return () => {
      navigator?.removeEventListener('wheel', onScroll)
    }
  }, [])

  const style = useAnimatedStyle(() => {
    const scale = interpolate(props.progress.value, [0, 1], [-10, 0])
    const opacity = interpolate(props.progress.value, [0, 1], [0, 1])
    const width = props.widthOnLayout
      ? props.widthOnLayout(props.layout)
      : props.layout.width.value
    const top = focus.value
      ? withTiming((dimension.height - (props.maxHeight || MAX_HEIGHT)) / 3)
      : isTop.value
      ? props.layout.y.value - height.value
      : props.layout.y.value + props.layout.height.value
    const left = focus.value ? (dimension.width - width) / 2 : props.layout.x.value
    return getStyle({
      width,
      position: 'absolute',
      top: (props.offset?.top || 0) + top,
      left: (props.offset?.left || 0) + left,
      opacity,
      transform: [
        {
          translateY: scale
        }
      ]
    })
  })

  const opacity = useAnimatedStyle(() => {
    const alpha = interpolate(props.progress.value, [0, 1], [0, 0.1])
    const backgroundColor = `rgba(0,0,0,${alpha})`
    return getStyle({
      backgroundColor
    })
  })

  const items = props.showSearch
    ? props.items.filter((item) => {
        const text = item.label.toLowerCase()
        return text.indexOf(searchText.toLowerCase()) !== -1
      })
    : props.items

  const search = (
    <TextInput
      autoFocus={Platform.OS === 'web'}
      placeholder="Buscar"
      onChangeText={setText}
      value={searchText}
      onFocus={() => {
        const { isMobile } = getResponsiveLayout(dimension)
        isMobile && (focus.value = true)
      }}
      onBlur={() => {
        const { isMobile } = getResponsiveLayout(dimension)
        isMobile && (focus.value = false)
      }}
      style={styles.inputSearch}
    />
  )

  return (
    <Modal visible transparent statusBarTranslucent onRequestClose={close}>
      <ATouchableOpacity
        onPress={() => close()}
        onPressIn={() => close()}
        style={[{ flex: 1 }, opacity]}
        activeOpacity={1}
      />
      <Animated.View
        ref={aRef}
        style={[
          {
            backgroundColor: schemes[scheme].primary,
            maxHeight: props.maxHeight || MAX_HEIGHT,
            // borderRadius: 8,
            overflow: 'hidden'
          },
          shadow,
          style
        ]}
        onLayout={(e) => {
          height.value = height.value = e.nativeEvent.layout.height
        }}
      >
        {props.showSearch && search}
        <FlatList
          data={items}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ index, item }) => (
            <Item
              index={index}
              item={item}
              onPressItem={onPressItem}
              value={props.value}
              renderItem={props.renderItem}
              searchText={searchText}
            />
          )}
        />
      </Animated.View>
    </Modal>
  )
}

const defaultRenderItem = ({ item, isHover, selected, onPress, searchText }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isHover ? colors.primaryLight : undefined
      }}
    >
      <View style={{ height: 35, justifyContent: 'center', paddingHorizontal: 10 }}>
        <HighlightText
          numberOfLines={1}
          textToHighlight={item.label}
          searchWords={[searchText]}
          color={selected ? colors.primary : 'black'}
          highlightStyle={{
            color: selected ? 'black' : colors.primary
          }}
          fontFamily={selected ? fonts.baloo2SemiBold600 : fonts.baloo2Regular400}
          disableThemeColor
        />
      </View>
    </TouchableOpacity>
  )
}

const Item: FC<{
  value: any
  item: any
  index: number
  onPressItem: (item: any, select: boolean) => void
  renderItem?: (params: {
    index: number
    item: any
    isHover: boolean
    selected: boolean
    onPress: () => void
    searchText: string
  }) => JSX.Element
  searchText: string
}> = (props) => {
  const {
    item,
    onPressItem,
    value,
    renderItem = defaultRenderItem,
    searchText,
    index
  } = props
  const ref = useRef(null)
  const isHover = useHover(ref)
  const selected = Array.isArray(value)
    ? value.includes(item.value)
    : value === item?.value

  return (
    <View ref={ref}>
      {renderItem({
        index,
        searchText,
        item,
        isHover,
        selected,
        onPress: () => {
          onPressItem(item, !selected)
        }
      })}
    </View>
  )
}

const shadow = Platform.select({
  web: {
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'
  },
  native: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
})

const styles = StyleSheet.create({
  inputSearch: {
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    }),
    padding: 10
  }
})
export default Dropdown
