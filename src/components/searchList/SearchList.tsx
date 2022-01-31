import React, { FC, useRef } from 'react'
import { Platform } from 'react-native'
import GridList from './componets/GridList'
import TableList, { HeaderRootComp } from './componets/TableList'
import Headerbar from './componets/HeaderBar'
import Footer from './componets/Footer'
import Toolbar from 'components/toolbar'
import Animated from 'components/reanimated'
import { useCollapseScrollV2 } from 'hooks/useCollapseScroll'
import Theme from 'components/theme'
import FabButton, { PropsFabButton } from './componets/FabButton'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { TableListProps } from './types'
import { useResponsiveStyles } from 'components/responsiveLayout'
interface Props extends TableListProps<any> {
  grid?: boolean
  propsFabButton?: Omit<PropsFabButton, 'scrollClamp'>
  renderFooter?: () => JSX.Element | null
}

const Scrollbar = (props) => {
  const { gestureScrollbar, scrollbarStyle, ...rest } = props
  return (
    <PanGestureHandler {...rest} onGestureEvent={gestureScrollbar}>
      <Animated.View
        style={[
          {
            height: 50,
            width: 10,
            backgroundColor: 'gray',
            position: 'absolute',
            right: 15,
            borderRadius: 10
          },
          scrollbarStyle
        ]}
      />
    </PanGestureHandler>
  )
}

const getProps = (component: JSX.Element | null) => {
  if (!component) return 0
  const children = React.Children.only(component) as any
  return children?.props || {}
}

const header = () => <Headerbar />
const toolbar = () => <Toolbar />
const footer = () => <Footer />

const SearchList: FC<Props> = (props) => {
  const refScroll = useRef(null)
  const {
    grid,
    data,
    renderHeader = header,
    renderToolbar = toolbar,
    renderFooter = footer,
    ...rest
  } = props
  const { height: heightToolbar = 0 } = getProps(renderToolbar())
  const { height: heightHeader = 0 } = getProps(renderHeader())
  const {
    RStyle,
    scrollHandler,
    scrollClamp,
    scrollbarStyle,
    gestureScrollbar,
    onLayout
  } = useCollapseScrollV2({
    height: heightToolbar - 5,
    ref: refScroll
  })
  const headerHeight = heightToolbar + heightHeader
  const headerRef = useRef()
  const { isMobile } = useResponsiveStyles({})
  return (
    <Theme.View style={{ flex: 1 }} scheme="background">
      {grid ? (
        <GridList
          key="grid"
          data={data}
          scrollHandler={scrollHandler}
          headerHeight={headerHeight}
          scrollClamp={scrollClamp}
          renderItem={({ item }) => null}
        />
      ) : (
        <TableList
          key="table"
          innerRef={refScroll}
          data={data}
          scrollHandler={scrollHandler}
          headerHeight={headerHeight}
          scrollClamp={scrollClamp}
          onLayout={onLayout}
          onReady={({ headerRootComp }) => {
            const node = headerRef.current as any
            node.replaceChild(headerRootComp, node.children[0])
          }}
          {...rest}
        />
      )}
      {renderFooter()}
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
        {Platform.OS === 'web' && <HeaderRootComp innerRef={headerRef} />}
      </Animated.View>
      <FabButton scrollClamp={scrollClamp} {...props.propsFabButton} />
      {/* <Scrollbar
        {...props}
        scrollbarStyle={scrollbarStyle}
        gestureScrollbar={gestureScrollbar}
      /> */}
    </Theme.View>
  )
}

export default SearchList
