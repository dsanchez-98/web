import React, { FC } from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Filter: FC<Props> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
        fill={props.color || '#FFE34D'}
      />
    </Svg>
  )
}

export default Filter
