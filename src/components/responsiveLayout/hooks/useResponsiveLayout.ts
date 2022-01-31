/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'
import { defaultbreakPoints, getResponsiveLayout } from '../common'

function useResponsiveLayout(breakPoints = defaultbreakPoints) {
  const initialValue = useRef(getResponsiveLayout(Dimensions.get('window'), breakPoints))
  const breakPoint = useRef(initialValue.current.breakPoint)
  const [responsive, setResponsive] = useState(initialValue.current)

  useEffect(() => {
    const changeDimension = ({ window }: { window: ScaledSize; screen: ScaledSize }) => {
      const respLayout = getResponsiveLayout(window, breakPoints)
      if (respLayout.breakPoint !== breakPoint.current) {
        breakPoint.current = respLayout.breakPoint
        setResponsive(respLayout)
      }
    }
    Dimensions.addEventListener('change', changeDimension)
    return () => Dimensions.removeEventListener('change', changeDimension)
  }, [])

  return responsive
}

export default useResponsiveLayout
