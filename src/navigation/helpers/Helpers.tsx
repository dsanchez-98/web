import { createNavigationContainerRef } from '@react-navigation/core'
import Spinner from 'components/lottie/components/Spinner'
import React, { Suspense, useEffect, forwardRef, ComponentType } from 'react'
import { useRoute } from '@react-navigation/native'
import { Platform } from 'react-native'

export const WrapperSuspense =
  Platform.OS === 'web' ? Suspense : ({ children }: any) => <>{children}</>

export function withLazy<T extends ComponentType<any>>(
  Component: T,
  { showIcon = false } = {}
): T {
  return forwardRef((props: any, ref) => (
    <WrapperSuspense fallback={<Spinner type="indicator" showIcon={showIcon} />}>
      <Component ref={ref} {...props} />
    </WrapperSuspense>
  )) as any
}

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never)
  }
}
export function useFocused(callback: () => void) {
  const { name: routeName } = useRoute()
  useEffect(() => {
    const event = () => {
      const state = navigationRef.current?.getState()
      const indexRoute = state?.routes.findIndex(({ name }) => name === routeName)
      if (state?.stale && state.index === undefined) {
        callback()
      } else if (indexRoute === state?.index) {
        callback()
      }
    }
    navigationRef.current?.addListener('state', event)

    return () => navigationRef.current?.removeListener('state', event)
  }, [])
}

global.navigation = {
  navigate,
  useFocused
}
