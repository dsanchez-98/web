/* eslint-disable no-unused-vars */
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type BreakPoints = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
  xxxl: number
  '*'?: number
}

type TextStyleM = {
  [K in keyof TextStyle]: string | number
}

type ViewStyleM = {
  [K in keyof ViewStyle]: string | number
}

type ImageStyleM = {
  [K in keyof ImageStyle]: string | number
}

type StylePropsM = TextStyleM | ViewStyleM | ImageStyleM

type BreakPointsStyle<T> = {
  [P in keyof BreakPoints]?: T
}

export type StylesBreakPoints<T> = {
  [P in keyof T]: BreakPointsStyle<T[P]>
}

export type Styles = {
  [key: string]: StylePropsM
}

type Normalize<T> = {
  [P in keyof T]: any
}

type Union<T> = {
  [P in keyof T as '*']-?: Normalize<T[P]>
}

export type ReturnLayout = {
  breakPoint: keyof BreakPoints
  width: number
  isMobile: boolean
  height: number
  isPortail: boolean
  isBreakPoint: (breakPoint: keyof BreakPoints) => boolean
}

export interface ReturnStyle<T> extends ReturnLayout {
  styles: { [P in keyof T]: Union<T[P]>['*'] }
}
