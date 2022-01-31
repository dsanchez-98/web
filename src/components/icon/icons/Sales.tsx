import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Sales: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 2H6C4.9 2 4 3 4 4.22222V19.7778C4 21 4.9 22 6 22H18C19.1 22 20 21 20 19.7778V4.22222C20 3 19.1 2 18 2ZM18 19.7778H6V4.22222H18V19.7778ZM8 9.77778H16V12H8V9.77778ZM8 13.1111H12V15.3333H8V13.1111ZM8 6.44444H16V8.66667H8V6.44444Z"
        fill={color}
      />
    </Svg>
  )
}

export default Sales
