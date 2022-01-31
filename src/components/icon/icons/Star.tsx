import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Star: FC<Props> = (props) => {
  return (
    <Svg
      height={24}
      width={24}
      color={'white'}
      {...props}
      viewBox={'0 0 24 24'}
      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
    />
  )
}

export default Star
