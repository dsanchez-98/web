import Animated, { useAnimatedScrollHandler } from 'components/reanimated'
// import Theme from 'components/theme'
// import { HEIGHT } from 'components/toolbar/Toolbar'
import { useCollapseScrollV2 } from 'hooks/useCollapseScroll'
import React, { FC } from 'react'
import { ScrollView as ScrollViewNative, ScrollViewProps, View } from 'react-native'
import { useResponsiveStyles } from 'components/responsiveLayout/hooks'
const AScrollView = Animated.createAnimatedComponent(ScrollViewNative)

interface PropsScrollView extends ScrollViewProps {
  renderToolbar: () => JSX.Element
  renderHeader: () => JSX.Element
}

const getProps = (component: JSX.Element | null) => {
  if (!component) return 0
  const children = React.Children.only(component) as any
  return children?.props || {}
}

const ScrollView: FC<PropsScrollView> = (props) => {
  const { renderHeader = () => null, renderToolbar = () => null } = props
  const { height: heightToolbar = 0 } = getProps(renderToolbar())
  const { height: heightHeader = 0 } = getProps(renderHeader())
  const headerHeight = heightToolbar + heightHeader

  const { RStyle, scrollHandler } = useCollapseScrollV2({
    height: heightToolbar - 5
  })

  const onScroll = useAnimatedScrollHandler((e, ctx) => {
    scrollHandler?.()?.onScroll?.(e, ctx)
  })

  const { isMobile } = useResponsiveStyles({})
  return (
    <View style={{ flex: 1 }}>
      <AScrollView
        {...props}
        onScroll={onScroll}
        style={{}}
        scrollEventThrottle={1}
        contentContainerStyle={[{ paddingTop: headerHeight }, props.style]}
      />
      <Animated.View
        style={[
          {
            height: headerHeight,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%'
          },
          isMobile ? RStyle : { transform: [{ translateY: 0 }] }
        ]}
      >
        {renderToolbar()}
        {renderHeader()}
      </Animated.View>
    </View>
  )
}

export default ScrollView
