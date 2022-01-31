import { useResponsiveStyles } from 'components/responsiveLayout'
import Theme from 'components/theme'
import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { shadow } from 'styles/shadow'
interface Props {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  main?: boolean
}

const Card = (props: Props) => {
  const { breakPoint } = useResponsiveStyles(styles)

  return (
    <Theme.View
      style={
        props.main && (breakPoint === 'sm' || breakPoint === 'xs')
          ? {}
          : [shadow, styles.cardContainer, props.style || {}]
      }
      scheme="primary"
    >
      {props.children}
    </Theme.View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10
  }
})

export default Card
