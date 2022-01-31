import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Remove: FC<Props> = (props) => {
  return (
    <Svg
      height={24}
      width={24}
      color={'white'}
      {...props}
      viewBox={'0 0 24 24'}
      d="M19 13H5V11H19V13Z"
    />
  )
}

export default Remove
