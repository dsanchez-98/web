/* eslint-disable no-unused-vars */
import React, { FunctionComponent as FC, useCallback, useRef, useState } from 'react'
import {
  StyleSheet,
  Platform,
  ScrollView,
  NativeModules,
  findNodeHandle,
  UIManager
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  withTiming,
  withDelay
} from 'components/reanimated'
import {
  SpringScrollViewPropType,
  ScrollEvent,
  RefreshStatus,
  LoadingStatus,
  Offset,
  RefreshStyle,
  LoadingStyle
} from './types'
import { NormalHeader } from './NormalHeader'
import { NormalFooter } from './NormalFooter'
import { idx } from './idx'
import { SpringScrollContentViewNative, SpringScrollViewNative } from './NativeComponents'

const AnimatedSpringScrollView = Animated.createAnimatedComponent(SpringScrollViewNative)

interface Props extends SpringScrollViewPropType {}

const useSpringScrollView = (props: Props) => {
  const [, updateState] = useState({})
  const forceUpdate = useCallback(() => updateState({}), [])
  const _scrollView = useRef<any>(null)
  const _offsetY = useSharedValue(0)
  const _offsetX = useSharedValue(0)
  const _offsetYValue = useSharedValue(0)
  const _refreshStatus = useSharedValue('waiting')
  const _loadingStatus = useSharedValue('waiting')
  const _contentHeight = useSharedValue<number | undefined>(undefined)
  const _contentWidth = useSharedValue<number | undefined>(undefined)
  const _height = useSharedValue<number | undefined>(undefined)
  const _width = useSharedValue<number | undefined>(undefined)
  const _refreshHeader = useRef<any>()
  const _loadingFooter = useRef<any>()
  const _indicatorOpacity = useSharedValue(1)
  // scrolls
  const _onScroll = (e: ScrollEvent) => {
    const {
      contentOffset: { y },
      refreshStatus,
      loadingStatus
    } = e.nativeEvent
    _offsetYValue.value = y

    if (_refreshStatus.value !== refreshStatus) {
      _toRefreshStatus(refreshStatus)
      refreshStatus === 'refreshing' && props.onRefresh?.()
    }

    if (_loadingStatus.value !== loadingStatus) {
      _toLoadingStatus(loadingStatus)
      loadingStatus === 'loading' && props.onLoading?.()
    }

    props.onScroll?.(e)

    // if (!this._indicatorAnimation) {
    //   this._indicatorOpacity.setValue(1)
    // }
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e, ctx) => {
      _offsetY.value = e.contentOffset.y
      if (props.scrollHandler) {
        const onScroll = props.scrollHandler().onScroll
        onScroll?.(e, ctx)
      }
      runOnJS(_onScroll)({ nativeEvent: e })
    }
  })

  const scrollTo = (offset: Offset, animated: boolean = true) => {
    if (Platform.OS === 'ios') {
      NativeModules.SpringScrollView.scrollTo(
        findNodeHandle(_scrollView.current),
        offset.x,
        offset.y,
        animated
      )
    } else if (Platform.OS === 'android') {
      UIManager.dispatchViewManagerCommand(findNodeHandle(_scrollView.current), 10002, [
        offset.x,
        offset.y,
        animated
      ])
    } else if (Platform.OS === 'web') {
      _scrollView.current.scrollTo({ ...offset, animated })
    }
    return new Promise((resolve) => {
      if (animated) setTimeout(resolve, 500)
      else resolve(true)
    })
  }

  const scroll = (offset: Offset, animated: boolean = true) => {
    return scrollTo({ x: offset.x, y: offset.y + _offsetYValue.value }, animated)
  }

  const scrollToBegin = (animated: boolean) => {
    return scrollTo({ x: 0, y: 0 }, animated)
  }

  const scrollToEnd = (animated: boolean = true) => {
    let toOffsetY = _contentHeight.value! - _height.value!
    if (toOffsetY < 0) toOffsetY = 0
    return scrollTo({ x: 0, y: toOffsetY }, animated)
  }

  const _onTouchBegin = () => {
    // if (props.hideKeyboardOnDrag) {
    //   if (TextInputState.currentlyFocusedInput())
    //     TextInputState.blurTextInput(TextInputState.currentlyFocusedInput())
    // }
    // props.tapToHideKeyboard && Keyboard.dismiss()
    // props.onTouchBegin?.()
  }

  const _beginIndicatorDismissAnimation = () => {
    _indicatorOpacity.value = withTiming(1, {}, () => {
      _indicatorOpacity.value = withDelay(500, withTiming(0, { duration: 500 }))
    })
  }

  const _onMomentumScrollEnd = () => {
    _beginIndicatorDismissAnimation()
    props.onMomentumScrollEnd?.()
  }

  // scrolls

  // refresh
  const endRefresh = () => {
    if (Platform.OS === 'ios') {
      NativeModules.SpringScrollView.endRefresh(findNodeHandle(_scrollView.current))
    } else if (Platform.OS === 'android') {
      UIManager.dispatchViewManagerCommand(findNodeHandle(_scrollView.current), 10000, [])
    }
  }

  const endLoading = () => {
    if (Platform.OS === 'ios') {
      NativeModules.SpringScrollView.endLoading(findNodeHandle(_scrollView.current))
    } else if (Platform.OS === 'android') {
      UIManager.dispatchViewManagerCommand(findNodeHandle(_scrollView.current), 10001, [])
    }
  }

  const _toRefreshStatus = (status: RefreshStatus) => {
    _refreshStatus.value = status
    idx(() => _refreshHeader.current.changeToState(status))
  }

  const _toLoadingStatus = (status: LoadingStatus) => {
    _loadingStatus.value = status
    idx(() => _loadingFooter.current.changeToState(status))
  }

  // refresh

  // keyboard
  const _onKeyboardWillShow = (evt) => {
    // this.showKeyboard = true
    // if (this.props.isFocus && !this.state?.disableUpdateOnKeyboad) {
    //   this.props.textInputRefs.every((input) => {
    //     if (idx(() => input.current.isFocused())) {
    //       input.current.measure((x, y, w, h, l, t) => {
    //         this._keyboardHeight =
    //           t + h - evt.endCoordinates.screenY + this.props.inputToolBarHeight
    //         this._keyboardHeight > 0 && this.scroll({ x: 0, y: this._keyboardHeight })
    //       })
    //       return false
    //     }
    //     return true
    //   })
    // }
  }

  const _onKeyboardWillHide = () => {
    // this.showKeyboard = false
    // if (this.props.isFocus && !this.state?.disableUpdateOnKeyboad) {
    //   if (this._keyboardHeight > 0) {
    //     this.scroll({ x: 0, y: -this._keyboardHeight })
    //     this._keyboardHeight = 0
    //   }
    // }
  }
  // keyboard

  // layout
  const _onWrapperLayoutChange = ({
    nativeEvent: {
      layout: { x, y, width, height }
    }
  }: any) => {
    if (_height.value !== height || _width.value !== width) {
      props.onSizeChange?.({ width, height })
      _height.value = height
      _width.value = width
      if (!_contentHeight.value) return
      if (_contentHeight.value < _height.value!) _contentHeight.value = height
      if (_offsetYValue.value > _contentHeight.value! - _height.value!) {
        scrollToEnd()
      }

      forceUpdate()
    }
  }

  const _onContentLayoutChange = ({
    nativeEvent: {
      layout: { x, y, width, height }
    }
  }: any) => {
    if (_contentHeight.value !== height || _contentWidth.value !== width) {
      props.onContentSizeChange?.({ width, height })
      _contentHeight.value = height
      _contentWidth.value = width
      if (!_height.value!) return
      if (_contentHeight.value! < _height.value!) _contentHeight.value = _height.value!
      if (_offsetYValue.value > _contentHeight.value! - _height.value!) {
        scrollToEnd(false)
      }
      forceUpdate()
    }
  }

  return {
    _indicatorOpacity,
    _offsetX,
    _offsetY,
    _scrollView,
    scrollHandler,
    _onScroll,
    scroll,
    scrollToBegin,
    scrollToEnd,
    endRefresh,
    endLoading,
    _height,
    _width,
    _contentHeight,
    _contentWidth,
    _onTouchBegin,
    _onWrapperLayoutChange,
    _onContentLayoutChange,
    _onMomentumScrollEnd,
    scrollTo
  }
}

const translateYHeader = (type: RefreshStyle, value: number, height: number) => {
  'worklet'
  const styles: { [P in RefreshStyle]: number | undefined } = {
    topping: interpolate(value, [-height - 1, -height, 0, 1], [-1, 0, height, height]),
    stickyScrollView: interpolate(value, [-height - 1, -height, 0, 1], [-1, 0, 0, 0]),
    stickyContent: undefined
  }
  return styles[type]
}

const translateYFooter = (
  type: LoadingStyle,
  value: number,
  height: number,
  maxOffset: number
) => {
  'worklet'
  const styles: { [P in LoadingStyle]: number | undefined } = {
    bottoming: interpolate(
      value,
      [maxOffset - 1, maxOffset, maxOffset + height, maxOffset + height + 1],
      [-height, -height, 0, 1]
    ),
    stickyScrollView: interpolate(
      value,
      [maxOffset - 1, maxOffset, maxOffset + height, maxOffset + height + 1],
      [0, 0, 0, 1]
    ),
    stickyContent: undefined
  }
  return styles[type]
}

const RefreshHeader: FC<Props & { offset: Animated.SharedValue<number> }> = (props) => {
  const { onRefresh, refreshHeader: Refresh, offset } = props
  const rHeight = Refresh.height
  const style = Refresh.style
  let transform: any[] = []
  const translateY = translateYHeader(style, offset.value, rHeight)
  if (translateY !== undefined) {
    transform = [
      {
        translateY
      }
    ]
  } else {
    console.warn(
      "unsupported value: '",
      style,
      "' in SpringScrollView, " +
        "select one in 'topping','stickyScrollView','stickyContent' please"
    )
  }
  if (props.inverted) transform.push({ scaleY: -1 })

  const headerStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: -rHeight,
      right: 0,
      height: rHeight,
      left: 0,
      transform
    }
  })
  return (
    <Animated.View style={headerStyle}>
      {/* <Refresh
        ref={(ref) => (this._refreshHeader = ref)}
        offset={offsetY}
        maxHeight={Refresh.height}
      /> */}
    </Animated.View>
  )
}

const RefreshFooter: FC<
  Props & { offset: Animated.SharedValue<number>; maxOffset: number }
> = (props) => {
  const { loadingFooter: Footer, maxOffset } = props

  const fHeight = Footer.height
  const style = Footer.style
  let transform: any[] = []
  const translateY = translateYFooter(style, 0, fHeight, maxOffset)
  if (translateY !== undefined) {
    transform = [
      {
        translateY
      }
    ]
  } else {
    console.warn(
      "unsupported value: '",
      style,
      "' in SpringScrollView, " +
        "select one in 'topping','stickyScrollView','stickyContent' please"
    )
  }
  if (props.inverted) transform.push({ scaleY: -1 })

  const footerStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      right: 0,
      top: this._height > _contentHeight.value ? this._height : this._contentHeight,
      height: fHeight,
      left: 0,
      transform
    }
  })
  return (
    <Animated.View style={footerStyle}>
      {/* <Footer
      ref={(ref) => (this._loadingFooter = ref)}
      offset={this._offsetY}
      maxHeight={Footer.height}
      bottomOffset={this._contentHeight - this._height}
    /> */}
    </Animated.View>
  )
}

const Indicator = ({
  workletStyle = (offset: number) => {
    'worklet'
    return {}
  },
  offset
}) => {
  const style = useAnimatedStyle(() => {
    return workletStyle(offset?.value)
  })
  return <Animated.View style={style} />
}

const SpringScrollView: FC<Props> = (props) => {
  const {
    style,
    inverted,
    children,
    onRefresh,
    onLoading,
    refreshHeader: Refresh,
    loadingFooter: Loading
  } = props
  const params = useSpringScrollView(props)

  props.innerRef && (props.innerRef.current = params)

  const {
    _offsetX,
    _offsetY,
    _scrollView,
    _width,
    _height,
    _contentHeight,
    _contentWidth,
    _indicatorOpacity,
    _onWrapperLayoutChange,
    _onContentLayoutChange,
    _onMomentumScrollEnd,
    _onTouchBegin,
    scrollHandler
  } = params
  const wStyle = StyleSheet.flatten([
    styles.wrapperStyle,
    style,
    { transform: inverted ? [{ scaleY: -1 }] : [] }
  ])

  const _renderRefreshHeader = () => {
    const { onRefresh } = props
    const measured = _height.value !== undefined && _contentHeight.value !== undefined
    if (!measured) return null
    return onRefresh && <RefreshHeader {...props} offset={_offsetY} />
  }

  const _renderLoadingFooter = () => {
    const { onLoading } = props
    const measured = _height.value !== undefined && _contentHeight.value !== undefined
    if (!measured) return null
    return onLoading && <RefreshFooter {...props} offset={_offsetY} />
  }

  const _renderVerticalIndicator = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'web') return null
    const { showsVerticalScrollIndicator } = props
    const measured = _height.value !== undefined && _contentHeight.value !== undefined
    if (!measured) return null
    const indicatorHeight = (_height.value! / _contentHeight.value!) * _height.value!

    return (
      showsVerticalScrollIndicator &&
      _contentHeight.value! > _height.value! && (
        <Indicator
          offset={_offsetY}
          workletStyle={(offset: number) => {
            'worklet'
            return {
              position: 'absolute',
              top: 0,
              right: 2,
              height: indicatorHeight,
              width: 3,
              borderRadius: 3,
              opacity: _indicatorOpacity.value,
              backgroundColor: '#A8A8A8',
              transform: [
                {
                  translateY: (offset * _height.value!) / _contentHeight.value!
                }
              ]
            }
          }}
        />
      )
    )
  }

  const _renderHorizontalIndicator = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'web') return null
    const { showsHorizontalScrollIndicator } = props
    const measured = _height.value !== undefined && _contentHeight.value !== undefined
    if (!measured) return null

    const indicatorWidth = (_width.value! / _contentWidth.value!) * _width.value!

    return (
      showsHorizontalScrollIndicator &&
      _contentWidth.value! > _width.value! && (
        <Indicator
          workletStyle={() => {
            'worklet'
            return {
              position: 'absolute',
              bottom: 2,
              left: 0,
              height: 3,
              width: indicatorWidth,
              borderRadius: 3,
              opacity: _indicatorOpacity.value,
              backgroundColor: '#A8A8A8',
              transform: [
                {
                  translateX: _offsetX.value * (_width.value! / _contentWidth.value!)
                }
              ]
            }
          }}
        />
      )
    )
  }

  const elements = (
    <AnimatedSpringScrollView
      durationBounces={200}
      {...props}
      ref={_scrollView}
      style={Platform.OS === 'android' ? wStyle : { flex: 1 }}
      onScroll={scrollHandler}
      refreshHeaderHeight={onRefresh ? Refresh!.height : 0}
      loadingFooterHeight={onLoading ? Loading!.height : 0}
      onLayout={_onWrapperLayoutChange}
      onTouchBegin={Platform.OS === 'android' && _onTouchBegin}
      onTouchStart={Platform.OS === 'ios' && _onTouchBegin}
      onMomentumScrollEnd={_onMomentumScrollEnd}
      scrollEventThrottle={1}
    >
      <SpringScrollContentViewNative
        style={props.contentStyle}
        collapsable={false}
        onLayout={_onContentLayoutChange}
      >
        {/* {this._renderRefreshHeader()}
        {this._renderLoadingFooter()} */}
        {children}
      </SpringScrollContentViewNative>
      {_renderHorizontalIndicator()}
      {_renderVerticalIndicator()}
    </AnimatedSpringScrollView>
  )
  if (Platform.OS === 'android' || Platform.OS === 'web') return elements
  return (
    <ScrollView
      style={wStyle}
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
      keyboardDismissMode={props.keyboardDismissMode}
      scrollEnabled={false}
    >
      {elements}
    </ScrollView>
  )
}

export const styles = StyleSheet.create({
  wrapperStyle: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'scroll'
  }
})

SpringScrollView.defaultProps = {
  bounces: true,
  scrollEnabled: true,
  refreshHeader: NormalHeader,
  loadingFooter: NormalFooter,
  textInputRefs: [],
  inputToolBarHeight: 44,
  tapToHideKeyboard: true,
  initOffset: { x: 0, y: 0 },
  keyboardShouldPersistTaps: 'always',
  showsVerticalScrollIndicator: true,
  showsHorizontalScrollIndicator: true,
  initialContentOffset: { x: 0, y: 0 },
  alwaysBounceVertical: true,
  isFocus: true,
  disableUpdateOnKeyboad: true
}
export default SpringScrollView
