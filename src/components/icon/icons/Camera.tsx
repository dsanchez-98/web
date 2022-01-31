import React, { FC } from 'react'
import { Rect } from 'react-native-svg'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Camera: FC<Props> = (props) => {
  return (
    <Svg
      height={40}
      width={40}
      color={'white'}
      {...props}
      viewBox={'0 0 40 40'}
      d="M17 10L15.17 12H12C10.9 12 10 12.9 10 14V26C10 27.1 10.9 28 12 28H28C29.1 28 30 27.1 30 26V14C30 12.9 29.1 12 28 12H24.83L23 10H17ZM20 25C17.24 25 15 22.76 15 20C15 17.24 17.24 15 20 15C22.76 15 25 17.24 25 20C25 22.76 22.76 25 20 25ZM20 23.2C21.7673 23.2 23.2 21.7673 23.2 20C23.2 18.2327 21.7673 16.8 20 16.8C18.2327 16.8 16.8 18.2327 16.8 20C16.8 21.7673 18.2327 23.2 20 23.2Z"
    >
      <Rect width="40" height="40" rx="20" fill="#EBC744" />
    </Svg>
  )
}

export default Camera
