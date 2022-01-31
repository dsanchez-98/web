import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Print: FC<Props> = (props) => {
  const color = props.color || '#4DA0FF'

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 8H18V4C18 3.44772 17.5523 3 17 3H7C6.44771 3 6 3.44772 6 4V8H5C3.34 8 2 9.34 2 11V17H6V20C6 20.5523 6.44772 21 7 21H17C17.5523 21 18 20.5523 18 20V17H22V11C22 9.34 20.66 8 19 8ZM8 5H16V8H8V5ZM16 17V19H8V15H16V17ZM18 15V13H6V15H4V11C4 10.45 4.45 10 5 10H19C19.55 10 20 10.45 20 11V15H18Z"
        fill={color}
      />
    </Svg>
  )
}

export default Print
