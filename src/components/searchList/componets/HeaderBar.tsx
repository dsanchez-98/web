import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Theme from 'components/theme'
import {
  useResponsiveStyles,
  StyleSheet as RStyleSheet
} from 'components/responsiveLayout'
import colors from 'styles/colors'
import { shadow } from 'styles/shadow'

export const HEIGHT = 70

export type HeaderBarProps = {
  navigationText?: JSX.Element
  height?: number
  leftContent?: JSX.Element
  rigthContent?: JSX.Element
}

const HeaderBar: FC<HeaderBarProps | undefined> = (props) => {
  const { navigationText = null, height, leftContent, rigthContent } = props
  const { isMobile } = useResponsiveStyles(rStyles)

  const left = (
    <View style={nStyles.containerLeft}>
      {navigationText}
      {leftContent}
    </View>
  )
  const rigth = <View style={nStyles.containerRight}>{rigthContent}</View>
  return (
    <Theme.View scheme="background" style={{ height, overflow: 'hidden' }}>
      <Theme.View
        style={[
          nStyles.container,
          {
            marginHorizontal: 15
          },
          shadow
        ]}
        scheme="primary"
        // scheme={isMobile ? 'background' : 'primary'}
      >
        {left}
        {rigth}
      </Theme.View>
    </Theme.View>
  )
}

HeaderBar.defaultProps = {
  height: HEIGHT
}

const border = 8
const nStyles = StyleSheet.create({
  buttonConfig: {
    borderColor: colors.primaryYellowLight,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: border,
    borderWidth: 1
  },
  buttonSearch: {
    backgroundColor: colors.primaryYellowLight,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: border
  },
  buttonFilter: {
    borderColor: colors.primaryYellowLight,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: border,
    borderWidth: 1
  },
  buttonViews: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2
  },
  buttonForm: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: border,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    height: 35,
    width: 150
  },
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    paddingHorizontal: 15
  },
  containerLeft: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    borderRightWidth: 1,
    paddingRight: 5,
    borderColor: colors.grayBorder
  },
  containerRight: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: colors.grayBorder,
    paddingLeft: 5
  }
})
const rStyles = RStyleSheet.create({
  search: {
    borderWidth: 0.5,
    borderColor: colors.borderGray,
    borderRadius: 5,
    display: 'none md:flex',
    height: 35,
    paddingLeft: 10,
    flex: 1,
    marginHorizontal: 5,
    width: 320
  },
  none: {
    display: 'none lg:flex'
  }
})

export default HeaderBar
