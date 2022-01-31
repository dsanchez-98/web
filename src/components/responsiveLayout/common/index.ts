import { Dimensions } from 'react-native'
import { BreakPoints, ReturnLayout, ReturnStyle, StylesBreakPoints } from '../types'

export const defaultbreakPoints: BreakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  xxxl: 1600
}

const minWidth = 300

const getStyle = (point: any, styles: { [key: string]: any }) => {
  const newStyles = {} as any
  for (const k in styles) {
    newStyles[k] = styles[k][point]
  }
  return newStyles
}

export function getStyles<K, T extends StylesBreakPoints<K> | {}>(
  point: any,
  styles?: T
): ReturnStyle<T>['styles'] {
  const currStyle = {} as any
  if (!styles) return currStyle
  for (const key in styles) {
    currStyle[key] = getStyle(point, styles![key] as any)
  }
  return currStyle
}

const defDimensions = Dimensions.get('window')
export function getResponsiveLayout(
  dimensions = defDimensions,
  breakPoints = defaultbreakPoints
): ReturnLayout {
  const { width, height } = dimensions
  let breakPoint = '' as keyof BreakPoints
  let isMobile = false
  let isPortail = false

  if (width < breakPoints.sm) {
    breakPoint = 'xs'
    isMobile = true
  } else if (width >= breakPoints.sm && width < breakPoints.md) {
    breakPoint = 'sm'
    isMobile = true
  } else if (width >= breakPoints.md && width < breakPoints.lg) {
    breakPoint = 'md'
    isMobile = false
  } else if (width >= breakPoints.lg && width < breakPoints.xl) {
    breakPoint = 'lg'
    isMobile = false
  } else if (width >= breakPoints.xl && width < breakPoints.xxl) {
    breakPoint = 'xl'
    isMobile = false
  } else if (width >= breakPoints.xxl && width < breakPoints.xxxl) {
    breakPoint = 'xxl'
    isMobile = false
  } else {
    breakPoint = 'xxxl'
    isMobile = false
  }

  if (height >= width) {
    isPortail = true
  }

  const isBreakPoint = (breakPoint: keyof BreakPoints) => {
    return false
  }

  return {
    breakPoint,
    width: width <= minWidth ? minWidth : width,
    isMobile,
    height,
    isPortail,
    isBreakPoint
  }
}
