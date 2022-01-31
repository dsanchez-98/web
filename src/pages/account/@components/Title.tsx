import React from 'react'
import Typography from 'components/typography'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import fontSize from 'styles/fontSize'
import fonts from 'styles/fonts'
import colors from 'styles/colors'

const Title = (props: any) => {
  const { styles } = useResponsiveStyles(rStyles)
  return (
    <Typography
      {...props}
      color={colors.primary}
      disableThemeColor
      fontFamily={fonts.baloo2Bold700}
      size={styles.title.fontSize}
    />
  )
}
const rStyles = StyleSheet.create({
  title: {
    fontSize: `${fontSize.sm} md:${fontSize.md}`
  }
})

export default Title
