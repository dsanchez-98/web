import React, { FunctionComponent as FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Payment: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 0H2C0.89 0 0.01 0.89 0.01 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM18 14H2V8H18V14ZM18 4H2V2H18V4Z"
        fill={color}
      />
    </Svg>
  )
}

export default Payment
