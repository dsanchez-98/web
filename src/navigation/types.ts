import React from 'react'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { StackNavigationOptions } from '@react-navigation/stack'

export interface Page {
  name: string
  component: React.ComponentType<any>
}

export interface PageDrawer extends Page {
  options?: BottomTabBarButtonProps
}

export interface PageStack extends Page {
  options?: StackNavigationOptions
}
