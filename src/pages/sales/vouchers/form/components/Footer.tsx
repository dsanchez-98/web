import React, { FunctionComponent as FC, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Theme from 'components/theme'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'components/reanimated'
import Typography from 'components/typography'
import Icon from 'components/icon'
import colors from 'styles/colors'
import useAppContext from 'hooks/useAppContext'
import fonts from 'styles/fonts'
import Arrow from 'components/searchList/componets/Arrow'
import { useContextForm } from '../ContextForm'
import useForceUpdate from 'hooks/core/useForceUpdate'
import InputDiscount from './InputDiscount'
import { roundDecimals } from '../helpers'
import { shadow } from 'styles/shadow'
import useTranslation from 'hooks/useTranslation'

const width = 250
export const HEIGHT_FOOTER = 50

const affectation = {
  gravada: 0,
  inafecta: 0,
  exonerada: 0,
  igv: 0
}
const Affectation = () => {
  return (
    <View>
      <Typography content="Op. grabada" />
      <Typography content="Op. Inafecta" />
      <Typography content="Op. Exonerada" />
      <Typography content="IGV (18%)" />
    </View>
  )
}
const sumTotal = (products: any[]) =>
  products.reduce((a, item) => a + (parseFloat(item.total) || 0), 0)

const Total = () => {
  const { addedProducts, globalDiscount } = useContextForm()
  addedProducts.hookListener()
  globalDiscount.hookListener()
  const total = roundDecimals(sumTotal(addedProducts.value) - globalDiscount.value)

  return (
    <Typography
      content={`${total}`}
      style={{ alignSelf: 'center', marginHorizontal: 10 }}
      fontFamily={fonts.baloo2Medium500}
    />
  )
}

const Footer = () => {
  const progresss = useSharedValue(0)
  const { t } = useTranslation()
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(progresss.value, [0, 1], [200, 0]) }]
    }
  })
  const { addEventListener } = useAppContext()
  useEffect(
    () =>
      addEventListener('backdrop', () => {
        progresss.value && (progresss.value = withTiming(0))
      }),
    []
  )
  return (
    <>
      <View style={{ height: HEIGHT_FOOTER }} />
      <Theme.View scheme="background" style={[{ overflow: 'hidden' }, nStyle.container]}>
        <Theme.View scheme="primary" style={[nStyle.containerInputs, shadow]}>
          <TouchableOpacity onPress={() => {}} style={nStyle.buttonGreen}>
            <Typography
              content={t('vouFormCollect')}
              color={colors.white}
              disableThemeColor
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Typography content={t('vouFormDescGen')} style={{ alignSelf: 'center' }} />
            {/* <InputDiscount /> */}
          </View>
        </Theme.View>
      </Theme.View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 200,
            backgroundColor: '#BFDDFF',
            right: 15,
            bottom: 20,
            width: width,
            borderRadius: 15
          },
          style
        ]}
      >
        <Affectation />
      </Animated.View>
      <Theme.TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          progresss.value = withTiming(progresss.value ? 0 : 1)
        }}
        scheme="background"
        style={{
          position: 'absolute',
          height: HEIGHT_FOOTER,
          right: 15,
          bottom: -1,
          width: width,
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10
        }}
      >
        <Typography
          content="Total"
          fontFamily={fonts.baloo2SemiBold600}
          style={{
            flex: 1,
            alignSelf: 'center'
          }}
        />
        <Total />
        <Arrow progress={progresss} style={{ alignSelf: 'center' }} />
      </Theme.TouchableOpacity>
    </>
  )
}

export default Footer

const nStyle = StyleSheet.create({
  containerInputs: {
    // marginHorizontal: 15,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // marginBottom: 5,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    paddingHorizontal: 15
  },
  container: {
    height: HEIGHT_FOOTER,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center'
  },
  buttonGreen: {
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 100,
    borderRadius: 4
  }
})
