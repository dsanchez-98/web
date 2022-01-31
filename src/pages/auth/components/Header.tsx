import React, { FC } from 'react'
import { FacebookButton, GoogleButton } from 'components/signIn'
import Typography from 'components/typography'
import colors from 'styles/colors'
import { View } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'

interface Props {
  title: string
  subTitle: string
  typeProcess: 'login' | 'register'
  hideButtons?: boolean
}

const Header: FC<Props> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  return (
    <View style={styles.titleContainer}>
      <Typography
        color={colors.primary}
        size={styles.title.fontSize}
        content={props.title}
        fontFamily={fonts.baloo2Bold700}
        disableThemeColor
      />

      {!props.hideButtons && (
        <>
          <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
            <FacebookButton style={{ marginHorizontal: 10 }} />
            <GoogleButton
              style={{ marginHorizontal: 10 }}
              typeProcess={props.typeProcess}
              onSuccessProcess={() => {}}
            />
          </View>
          <View style={styles.textContainer}>
            <Typography
              color={colors.black}
              fontFamily={fonts.baloo2Medium500}
              size={styles.text.fontSize}
              content={props.subTitle}
              disableThemeColor
            />
          </View>
        </>
      )}
    </View>
  )
}

export default Header

const rStyles = StyleSheet.create({
  text: {
    fontSize: `${fontSize.sm} md:${fontSize.md}`
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: `${fontSize.large} md:${fontSize.extraLarge}`
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
