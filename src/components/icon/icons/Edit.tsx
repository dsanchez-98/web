import React, { FC } from 'react'
import { Rect } from 'react-native-svg'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Edit: FC<Props> = (props) => {
  return (
    <Svg
      height={40}
      width={40}
      color={'white'}
      {...props}
      viewBox={'0 0 40 40'}
      d="M11 25.2486V28.9986H14.75L25.81 17.9386L22.06 14.1886L11 25.2486ZM28.71 15.0386C29.1 14.6486 29.1 14.0186 28.71 13.6286L26.37 11.2886C25.98 10.8986 25.35 10.8986 24.96 11.2886L23.13 13.1186L26.88 16.8686L28.71 15.0386Z"
    >
      <Rect width="40" height="40" rx="20" fill="#EBC744" />
    </Svg>
  )
}

export default Edit
