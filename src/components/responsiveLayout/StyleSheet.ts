import { defaultbreakPoints } from './common'
import { Styles, StylesBreakPoints } from './types'
import { StyleSheet as StyleSheetNative } from 'react-native'
type Map<T = any> = { [key: string]: T }

const getValue = (v: string) => {
  let value = v
  if (value?.includes('%')) {
    return value
  } else if (value === '0') {
    value = '-'
  }
  return isNaN(parseFloat(`${value}`)) ? value : parseFloat(`${value}`)
}

const getMediaQ = (strMediaQ: string) => {
  const mediaQ = {} as Map
  const mq = `xs:${strMediaQ}`
  mq.split(' ').forEach((p) => {
    const [k, v] = p.split(':')
    if (!v) return
    mediaQ[k] = getValue(v)
  })
  return mediaQ
}

const getStyles = (styles = {} as Map<Map<string>>) => {
  const newStyles = {} as Map
  const bk = { ...defaultbreakPoints }
  Object.entries(styles).forEach(([keyStyle, style]) => {
    newStyles[keyStyle] = {}
    Object.entries(style).forEach(([keyProperty, strMediaQ]) => {
      const newStyle = {} as Map
      const mediaQ = getMediaQ(strMediaQ)
      Object.keys(bk).forEach((k, i, array) => {
        if (!mediaQ[k]) {
          newStyle[k] = newStyle[array[i - 1]]
        } else {
          newStyle[k] = mediaQ[k] === '-' ? undefined : mediaQ[k]
        }
      })
      newStyles[keyStyle][keyProperty] = newStyle
    })
  })
  return newStyles
}

function create<T extends Styles>(styles: T): StylesBreakPoints<T> {
  return getStyles(styles as any) as any
}

export const StyleSheet = {
  ...StyleSheetNative,
  create
}
