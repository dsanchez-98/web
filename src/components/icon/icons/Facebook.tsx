import React, { FC, useRef } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Path, Rect } from 'react-native-svg'
import { useHover } from 'react-native-web-hooks'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Facebook: FC<Props> = ({ onPress, ...props }) => {
  const ref = useRef<any>()
  const isHovered = useHover(ref)
  return (
    <TouchableOpacity ref={ref} style={[styles.container]} onPress={onPress}>
      <Svg
        width="35"
        height="35"
        {...props}
        viewBox="0 0 40 40"
        d="M9 16H11V14H9V16ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 4C8.93913 4 7.92172 4.42143 7.17157 5.17157C6.42143 5.92172 6 6.93913 6 8H8C8 7.46957 8.21071 6.96086 8.58579 6.58579C8.96086 6.21071 9.46957 6 10 6C10.5304 6 11.0391 6.21071 11.4142 6.58579C11.7893 6.96086 12 7.46957 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4Z"
      >
        <Rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="white" />
        <Path
          d="M21.5674 29V20.79H24.3221L24.7354 17.5894H21.5674V15.5463C21.5674 14.62 21.8236 13.9887 23.1535 13.9887L24.8469 13.988V11.1253C24.554 11.0873 23.5488 11 22.3788 11C19.9356 11 18.263 12.4913 18.263 15.2293V17.5894H15.5V20.79H18.263V29H21.5674Z"
          fill="#2D4486"
        />
        <Rect
          x="0.5"
          y="0.5"
          width="39"
          height="39"
          rx="19.5"
          stroke={isHovered ? '#bab8b8' : '#E0E0E0'}
        />
      </Svg>
    </TouchableOpacity>
  )
}

const styles: { [key: string]: any } = {
  container: Platform.select({
    web: { cursor: 'pointer' },
    default: {}
  })
}
export default Facebook
