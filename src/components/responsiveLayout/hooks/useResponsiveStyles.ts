/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { getStyles } from '../common'
import { Context } from '../ResponsiveLayout'
import { ReturnStyle, StylesBreakPoints } from '../types'

function useResponsiveStyle<K, T extends StylesBreakPoints<K>>(styles: T): ReturnStyle<T> {
  const { breakPoint, ...rest } = useContext(Context)
  return { ...rest, breakPoint, styles: getStyles(breakPoint, styles) }
}

export default useResponsiveStyle
