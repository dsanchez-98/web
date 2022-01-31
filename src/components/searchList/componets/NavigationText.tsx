import Icon from 'components/icon'
import { useResponsiveStyles } from 'components/responsiveLayout'
import Theme from 'components/theme'
import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { View, ViewStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

interface Props {
  path: string
  style?: StyleProp<ViewStyle>
}

const arrow = () => (
  <View style={styles.arrow}>
    <Theme.Icon name="arrow" width={15} height={15} />
  </View>
)

const PushPin = () => {
  return (
    <TouchableOpacity style={styles.pinPush}>
      <Icon name="pushPin" color={colors.black} width="16" height="16" />
    </TouchableOpacity>
  )
}

const NavigationText: FC<Props> = (props) => {
  const { path = '', style } = props
  const texts = path.split('/')
  const { isMobile } = useResponsiveStyles({})
  if (isMobile) {
    return (
      <View style={[styles.container, style]}>
        <Typography
          content={texts[texts.length - 1]}
          fontFamily={fonts.baloo2Medium500}
        />
      </View>
    )
  }
  return (
    <View style={[styles.container, style]}>
      {texts.map((text, index) => {
        const isLast = index === texts.length - 1
        return (
          <React.Fragment key={index.toString()}>
            {!!index && arrow()}
            <Typography
              content={text}
              disableThemeColor={isLast}
              color={colors.primary}
              fontFamily={isLast ? fonts.baloo2Bold700 : undefined}
            />
            {isLast && <PushPin />}
          </React.Fragment>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: 10
  },
  arrow: {
    transform: [{ rotate: '-90deg' }],
    width: 15,
    height: 15,
    alignSelf: 'center'
  },
  pinPush: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2
  }
})

export default NavigationText
