import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ColorPicker from './ColorPicker'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import Theme from 'components/theme'
import useAppContext from 'hooks/useAppContext'

const COLORS = [
  '#FF0000',
  '#FF4000',
  '#FF8000',
  '#FFBF00',
  '#FFFF00',
  '#BFFF00',
  '#80FF00',
  '#40FF00',
  '#00FF00',
  '#00FF40',
  '#00FF80',
  '#00FFBF',
  '#00FFFF',
  '#00BFFF',
  '#0080FF',
  '#0040FF',
  '#0000FF',
  '#4000FF',
  '#8000FF',
  '#BF00FF',
  '#FF00FF',
  '#FF00BF',
  '#FF0080',
  '#FF0040'
]

const COLORSB = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B'
]

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)'

const PICKER_HEIGHT = 200 * 0.9

type Layout = {
  height: number
  width: number
  y: number
  x: number
}

export default function App(props) {
  return (
    <View style={{}}>
      <Typography
        content="Elige un color"
        disableThemeColor
        color={colors.primary}
        fontFamily={fonts.baloo2Bold700}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'gray', marginRight: 10 }}></View>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
          maxWidth={PICKER_HEIGHT}
          onColorChanged={props.onColorChanged}
        />
      </View>
      <View
        style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 2 }}
      >
        <View style={{ flex: 1 }}>
          <Theme.TextInput placeholder="0000" />
        </View>
        <TouchableOpacity style={styles.button}>
          <Typography content="Elegir" disableThemeColor color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryYellow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10
  },
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: { height: PICKER_HEIGHT, width: 30 }
})
