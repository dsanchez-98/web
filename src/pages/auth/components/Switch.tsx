import React, { FC, useCallback, useState, forwardRef, useImperativeHandle } from 'react'
import { View, TouchableOpacity, Platform } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import Button from 'components/button'
import LogoTumiSoft from 'components/icon/icons/LogoTumiSoft'
import Typography from 'components/typography'
import Animated, {
  interpolate,
  useAnimatedStyle,
  getStyle,
  runOnJS,
  Extrapolate,
  useDerivedValue,
  withTiming,
  useSharedValue
} from 'components/reanimated'
import fonts from 'styles/fonts'
import { useAuthContext } from '../AuthContext'
import { ViewType } from '../types'
import useForceUpdate from 'hooks/core/useForceUpdate'
import useScrollHandler from 'hooks/core/useScrollHandler'

const height = 560
const widthBanner = 380

const FixedLogo: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const { progress, setViewType } = useAuthContext()
  const forceUpdate = useForceUpdate()

  const styleWhite = useAnimatedStyle(() => {
    return getStyle({
      opacity: interpolate(progress.value, [0, 0.9, 1], [0, 0, 1])
    })
  })

  const styleDefault = useAnimatedStyle(() => {
    return getStyle({
      opacity: interpolate(progress.value, [0, 1], [1, 0])
    })
  })

  useDerivedValue(() => {
    if (Number.isInteger(progress.value)) {
      runOnJS(forceUpdate)()
    }
  })

  const tab = (text: string, viewType: number) => {
    const select = viewType === progress.value
    return (
      <TouchableOpacity
        onPress={() => {
          setViewType(viewType)
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          backgroundColor: select ? undefined : colors.grayLight
        }}
      >
        <Typography
          content={text}
          disableThemeColor
          color={select ? colors.primary : colors.borderGray}
        />
      </TouchableOpacity>
    )
  }

  if (isMobile) {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject, bottom: undefined }}>
        <View style={{ backgroundColor: colors.primary, paddingVertical: 10 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <LogoTumiSoft height={12} typeStyle={'white'} width={72} />
          </View>
        </View>
        {[ViewType.login, ViewType.createAccount].includes(progress.value) && (
          <View style={{ flexDirection: 'row' }}>
            {tab('Bienvenido de regreso', ViewType.login)}
            {tab('¿Eres nuev@?', ViewType.createAccount)}
          </View>
        )}
      </View>
    )
  }
  return (
    <>
      <Animated.View style={[{ position: 'absolute', top: 36, left: 26 }, styleWhite]}>
        <LogoTumiSoft typeStyle={'white'} />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', top: 36, left: 26 }, styleDefault]}>
        <LogoTumiSoft typeStyle={'default'} />
      </Animated.View>
    </>
  )
}

const BannerContent: FC<{}> = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { progress, setViewType } = useAuthContext()
  const forceUpdate = useForceUpdate()

  useDerivedValue(() => {
    if (Number.isInteger(progress.value)) {
      runOnJS(forceUpdate)()
    }
  })

  const data = {
    [ViewType.login]: {
      title: '¡Gusto en conocerte!',
      message: '¿Eres nuevo por aquí?\nCrea una cuenta gratis para empezar',
      textButton: 'Crear una cuenta'
    },
    [ViewType.createAccount]: {
      title: '¡Bienvenid@ de regreso!',
      message: 'Si ya tienes una cuenta,\nhaz clic en ingresar',
      textButton: 'Ingresar'
    }
  } as any

  const viewType = progress.value
  if (data[viewType]) {
    return (
      <Animated.View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
        <Typography
          color={colors.white}
          size={fontSize.extraLarge}
          content={data[viewType].title}
          disableThemeColor
          fontFamily={fonts.baloo2SemiBold600}
        />
        <Typography
          color={colors.white}
          size={fontSize.md}
          content={data[viewType].message}
          disableThemeColor
          style={{ textAlign: 'center' }}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={data[viewType].textButton}
            type={'secondary'}
            onPress={() => {
              const value = progress.value ? 0 : 1
              setViewType(value)
            }}
          />
        </View>
      </Animated.View>
    )
  }

  return null
}

const ScrollView = forwardRef<any, any>(({ children }, ref) => {
  let width = 0
  const scrollOffset = useSharedValue(0)
  React.Children.forEach(children, (node) => {
    width += node.props.style.width
  })

  const style = useAnimatedStyle(() => {
    return getStyle({
      transform: [{ translateX: withTiming(scrollOffset.value) }]
    })
  })
  useImperativeHandle(ref, () => ({
    scrollTo: ({ x }: { x: number }) => {
      scrollOffset.value = -x
    }
  }))
  return (
    <Animated.View style={[{ width, flexDirection: 'row' }, style]}>
      {children}
    </Animated.View>
  )
})

const Switch = () => {
  const { styles, breakPoint } = useResponsiveStyles(rStyles)
  const { progress, views } = useAuthContext()
  const isMobile = breakPoint === 'sm' || breakPoint === 'xs' || breakPoint === 'md'

  const { ref, scrollTo } = useScrollHandler()

  const banner = useAnimatedStyle(() => {
    const left = interpolate(
      progress.value,
      [0, 1],
      [styles.card.width, 0.1],
      Extrapolate.CLAMP
    )
    const right = interpolate(
      progress.value,
      [0, 1],
      [0.1, styles.card.width],
      Extrapolate.CLAMP
    )

    return getStyle({
      left: withTiming(left),
      right: withTiming(right)
    })
  })

  useDerivedValue(() => {
    const getX = (type: number) => {
      if (!type) return 0
      return isMobile
        ? styles.card.width * type
        : styles.card.width * type - styles.banner.width
    }
    if (progress.value > 1) {
      runOnJS(scrollTo)({
        x: getX(progress.value),
        animated: false
      })
    } else {
      runOnJS(scrollTo)({ x: getX(progress.value), animated: !isMobile })
    }
  })

  const Wrapper = useCallback(({ viewType, style }) => {
    const styleContent = useAnimatedStyle(() => {
      return getStyle({ opacity: withTiming(progress.value === viewType ? 1 : 0) })
    })
    const [show, setShow] = useState(viewType <= 2)
    useDerivedValue(() => {
      if (viewType >= 2) {
        if (progress.value === viewType) {
          runOnJS(setShow)(true)
        } else {
          runOnJS(setShow)(false)
        }
      }
    })

    return (
      <Animated.View style={[{ overflow: 'hidden' }, styleContent, style]}>
        {show && views[viewType].component}
      </Animated.View>
    )
  }, [])

  const Banner = (
    <Animated.View style={[styles.banner, banner]}>
      <BannerContent />
    </Animated.View>
  )

  const width = isMobile ? styles.card.width : styles.card.width + styles.banner.width

  const TabViews = (
    <ScrollView ref={ref}>
      {Object.keys(views).map((key) => {
        return <Wrapper key={key} viewType={parseInt(key)} style={styles.card} />
      })}
    </ScrollView>
  )

  return (
    <View style={[styles.main, { width }]}>
      {TabViews}
      {!isMobile && Banner}
      <FixedLogo isMobile={isMobile} />
    </View>
  )
}

export default Switch

const rStyles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderRadius: 20,
    height: height,
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: 0,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: '50 lg:0'
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    height: '100%',
    width: widthBanner,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'none lg:flex'
  },
  card: {
    width: '340 sm:480 md:580 xl:640',
    flex: 1,
    paddingHorizontal: '20 sm:60 md:80 lg:100'
  },
  buttonContainer: {
    marginTop: 52,
    width: 152
  }
})
