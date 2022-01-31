/* eslint-disable prefer-promise-reject-errors */
import { RefObject } from 'react'
import { View } from 'react-native'

type Layout = {
  height: number
  width: number
  y: number
  x: number
}

function useMeasure<T extends any>(ref: RefObject<T>) {
  const getMeasure = () =>
    new Promise<Layout | undefined>((resolve, reject) => {
      const refView = ref as RefObject<View>
      refView.current?.measure((x = 0, y = 0, width = 0, height = 0, pX = 0, pY = 0) => {
        resolve({
          width,
          height,
          x: pX,
          y: pY
        })
      })
    })

  const getMeasureInWindow = () =>
    new Promise<Layout | undefined>((resolve, reject) => {
      const refView = ref as RefObject<View>
      refView.current?.measureInWindow((x, y, width, height) => {
        if (!height || !height || !x || !y) {
          return resolve(undefined)
        }
        resolve({
          width,
          height,
          x: x,
          y: y
        })
      })
    })

  return { getMeasure, getMeasureInWindow }
}
export default useMeasure
