import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Check: FC<Props> = (props) => {
  return (
    <Svg
      height={props.height || 16}
      width={props.width || 16}
      color={props.color || '#3CA455'}
      {...props}
      viewBox={'0 0 16 16'}
      d="M6.0001 10.7799L3.2201 7.9999L2.27344 8.9399L6.0001 12.6666L14.0001 4.66656L13.0601 3.72656L6.0001 10.7799Z"
    />
  )
}

export default Check
