import IconAccount from 'components/userOptions/icons/Account'
import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import colors from 'styles/colors'
import { shadow } from 'styles/shadow'
import fonts from 'styles/fonts'
import {
  useResponsiveStyles,
  StyleSheet as RStyleSheet
} from 'components/responsiveLayout'
import Toolbar from 'components/toolbar'
import Theme from 'components/theme'

export interface NavigationPanelProps {
  renderToolbar?: () => JSX.Element
  name?: string
  optionIndex: number
  options: {
    text: string
    routeName?: string
    params?: any
    select?: boolean
  }[]
  onPressOption?: (index: number) => void
}

const Option = ({
  text = '',
  routeName = '',
  params,
  select,
  onPress
}: NavigationPanelProps['options'][0] & {
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        routeName && navigation.navigate(routeName, params)
        onPress?.()
      }}
      style={{
        flexDirection: 'row',
        borderRadius: 4,
        backgroundColor: select ? colors.primaryYellow : undefined,
        padding: 5,
        marginVertical: 5
      }}
    >
      <IconAccount color={select ? colors.white : colors.black} />
      <Typography
        content={text}
        disableThemeColor={select}
        color={colors.white}
        style={{ marginHorizontal: 5 }}
        fontFamily={fonts.baloo2Medium500}
      />
    </TouchableOpacity>
  )
}
const NavigationPanel: FC<NavigationPanelProps> = (props) => {
  const { renderToolbar = () => <Toolbar /> } = props
  const { styles } = useResponsiveStyles(rStyles)

  const titleContent = (
    <View style={[nStyles.titleContent, styles.titleContent]}>
      <Typography
        content={props.options?.[props?.optionIndex]?.text}
        style={{ alignSelf: 'center', marginLeft: 15 }}
        fontFamily={fonts.baloo2Medium500}
      />
      <View></View>
    </View>
  )

  return (
    <Theme.View style={{ flex: 1 }} scheme="background">
      {renderToolbar()}
      <Theme.View scheme="primary" style={[nStyles.container, shadow, styles.container]}>
        <View style={[styles.containerLeft, shadow]}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: colors.grayBorder,
              height: 50
            }}
          >
            {/* <Icon name="arrowRight" /> */}
            <Typography
              content={props.name}
              fontFamily={fonts.baloo2Medium500}
              style={{ alignSelf: 'center', marginLeft: 15 }}
            />
          </View>
          <View style={{ margin: 10 }}>
            {props.options?.map((option, index) => {
              return (
                <Option
                  key={index.toString()}
                  {...option}
                  select={index === props.optionIndex}
                  onPress={() => {
                    props.onPressOption?.(index)
                  }}
                />
              )
            })}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {titleContent}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            nativeID="navigationPanel"
          >
            {props.children}
          </ScrollView>
        </View>
      </Theme.View>
    </Theme.View>
  )
}

const nStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden'
  },
  titleContent: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: colors.grayBorder,
    flexDirection: 'row'
  }
})

const rStyles = RStyleSheet.create({
  containerLeft: {
    borderRightWidth: 1,
    borderColor: colors.grayBorder,
    width: 'auto lg:270'
  },
  container: {
    flexDirection: 'column lg:row'
  },
  titleContent: {
    display: 'none lg:flex'
  }
})
export default NavigationPanel
