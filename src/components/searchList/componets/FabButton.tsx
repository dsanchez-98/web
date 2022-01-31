import Icon from 'components/icon'
import Animated, { getStyle, useAnimatedStyle, withTiming } from 'components/reanimated'
import Typography from 'components/typography'
import React, { FC } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { shadow } from 'styles/shadow'
import { useResponsiveStyles } from 'components/responsiveLayout'

export interface PropsFabButton {
  scrollClamp: Animated.SharedValue<number>
  title?: string
  onPress?: () => void
}

const ATouchable = Animated.createAnimatedComponent(TouchableOpacity)
const FabButton: FC<PropsFabButton> = ({ scrollClamp, title, onPress }) => {
  const size = 45
  const { isMobile } = useResponsiveStyles({})
  const styleAdd = useAnimatedStyle(() => {
    return getStyle({
      width: withTiming(scrollClamp.value > 0 ? size : size + 140)
    })
  })
  if (!isMobile) {
    return null
  }
  return (
    <ATouchable
      onPress={onPress}
      style={[
        styles.container,
        shadow,
        styleAdd,
        {
          height: size,
          borderRadius: size / 2
        }
      ]}
    >
      <View
        style={{
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon name="add" color={colors.white} />
      </View>
      <Typography
        content={title}
        numberOfLines={1}
        disableThemeColor
        style={styles.text}
        color={colors.white}
        fontFamily={fonts.baloo2Medium500}
      />
    </ATouchable>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    bottom: 80,
    right: 20,
    position: 'absolute'
  },
  text: { alignSelf: 'center', textAlign: 'center', alignItems: 'center' }
})
export default FabButton
