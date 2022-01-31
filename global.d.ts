/* eslint-disable no-unused-vars */
import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'

declare global {
  interface Navigator {
    key: string
    screen: React.ReactNode
    getDetail?: (dipatch: any, id: number) => Promise<any>
    navigationOptions:
      | ((props: {
          route: {
            key: string
            name: string
            params?: any
          }
          navigation: any
        }) => StackNavigationOptions)
      | StackNavigationOptions
    children?: Navigator[]
  }
  interface BaseProps<T extends ParamListBase = {}> {
    navigation: StackNavigationProp<T>
    route: {
      key: string
      name: string
      params?: { [key: string]: any }
    }
  }
  interface Array<T> {
    removeIndexs(indexs: number[]): Array<T>
  }
  const navigation: StackNavigationProp<T> & {
    useFocused: (callback: () => void) => void
  }

  type MergeObject<B, T> = B & { [P in keyof T]: T[P] | null }
}

export {}
