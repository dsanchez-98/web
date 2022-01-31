import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Circle: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 6.87492C11.724 6.87492 13.125 8.27596 13.125 9.99992C13.125 11.7239 11.724 13.1249 10 13.1249C8.27608 13.1249 6.87504 11.7239 6.87504 9.99992C6.87504 8.27596 8.27608 6.87492 10 6.87492ZM10 5.83325C7.69796 5.83325 5.83337 7.69784 5.83337 9.99992C5.83337 12.302 7.69796 14.1666 10 14.1666C12.3021 14.1666 14.1667 12.302 14.1667 9.99992C14.1667 7.69784 12.3021 5.83325 10 5.83325Z"
        fill={color}
      />
    </Svg>
  )
}

export default Circle
