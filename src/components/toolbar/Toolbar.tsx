import Theme from 'components/theme'
import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useDrawerContext } from 'components/drawer/Drawer'
import { shadow } from 'styles/shadow'
import useTheme from 'hooks/useTheme'
import Icon from 'components/icon'
import UserOptions from 'components/userOptions'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'
import useAppContext from 'hooks/useAppContext'
import fonts from 'styles/fonts'
import colors from 'styles/colors'
interface Props {
  height?: number
}

export const HEIGHT = 85

const useFullScreen = () => {
  // const elem = document.documentElement

  /* View in fullscreen */
  function openFullscreen() {
    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen()
    // } else if (elem.webkitRequestFullscreen) {
    //   /* Safari */
    //   elem.webkitRequestFullscreen()
    // } else if (elem.msRequestFullscreen) {
    //   /* IE11 */
    //   elem.msRequestFullscreen()
    // }
  }

  /* Close fullscreen */
  function closeFullscreen() {
    // if (document.exitFullscreen) {
    //   document.exitFullscreen()
    // } else if (document.webkitExitFullscreen) {
    //   /* Safari */
    //   document.webkitExitFullscreen()
    // } else if (document.msExitFullscreen) {
    //   /* IE11 */
    //   document.msExitFullscreen()
    // }
  }

  return { openFullscreen, closeFullscreen }
}

const ButtonUserOptions = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
      <Icon
        name="iconTumiSoft"
        width={40}
        height={40}
        style={{ marginHorizontal: 10, alignSelf: 'center' }}
      />
      <View>
        <Typography content="Pablo Gutierrez" fontFamily={fonts.baloo2Medium500} />
        <Typography content="Administrador" size={12} />
      </View>
      <Icon
        name="arrowDown"
        height={15}
        width={15}
        style={{ alignSelf: 'flex-start', margin: 5, marginLeft: 10 }}
        color={colors.black}
      />
    </TouchableOpacity>
  )
}

const Toolbar: FC<Props> = (props) => {
  const { setLocale, locale } = useTranslation()
  const drawer = useDrawerContext()
  const { toggleTheme } = useTheme()
  const [showOptions, setShowOptions] = useState(false)
  const { addEventListener } = useAppContext()

  useEffect(
    () =>
      addEventListener('backdrop', () => {
        setShowOptions(false)
      }),
    []
  )
  return (
    <>
      <Theme.View
        scheme="background"
        style={{ height: props.height, justifyContent: 'center' }}
      >
        <Theme.View
          scheme={'primary'}
          style={[styles.container, styles.shadow, { height: (props.height || 0) - 30 }]}
        >
          <BorderlessButton
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={() => {
              drawer.toggleDrawer()
            }}
          >
            <Icon name="menu" />
          </BorderlessButton>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* <Typography onPress={toggleTheme} content="theme" />
              <Typography onPress={openFullscreen} content="fullScreen" />
              <Typography
                onPress={() => (locale === 'en' ? setLocale('es') : setLocale('en'))}
                content="language"
              /> */}
          </View>
          <ButtonUserOptions
            onPress={() => {
              setShowOptions((prev) => !prev)
            }}
          />
        </Theme.View>
      </Theme.View>
      {showOptions && (
        <View
          style={{
            position: 'absolute',
            right: 15,
            top: (props.height || 0) - 10,
            zIndex: 20
          }}
        >
          <UserOptions
            onPressOption={() => {
              setShowOptions(false)
            }}
          />
        </View>
      )}
    </>
  )
}

Toolbar.defaultProps = {
  height: HEIGHT
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  shadow: shadow as any
})

export default Toolbar
