import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const ArrowRight: FC<Props> = (props) => {
  const color = props.color || '#4DA0FF'
  return (
    <Svg
      height={24}
      width={24}
      color={color}
      viewBox={'0 0 24 24'}
      d="M10.0346 19C10.0951 18.9959 10.1105 18.9964 10.1704 18.9861C10.3051 18.9628 10.4347 18.9117 10.549 18.8367C10.6068 18.7988 10.6572 18.7547 10.7076 18.7077L16.7079 12.7074C16.7493 12.6631 16.7608 12.653 16.7976 12.6045C16.8388 12.5501 16.8745 12.4915 16.9038 12.4298C17.0321 12.1602 17.0321 11.8403 16.9038 11.5708C16.8745 11.5091 16.8388 11.4504 16.7976 11.396C16.7608 11.3476 16.7493 11.3375 16.7079 11.2932L10.7076 5.29291C10.6633 5.25151 10.6531 5.23991 10.6047 5.20321C10.4776 5.10676 10.3276 5.04165 10.1704 5.0145C10.0582 4.9952 9.9428 4.9952 9.83054 5.0145C9.74079 5.03 9.65323 5.0578 9.57098 5.0969C9.25857 5.24546 9.04106 5.55362 9.00566 5.89774C8.99171 6.03375 9.00596 6.17225 9.04731 6.30256C9.08176 6.41111 9.13481 6.51357 9.20362 6.60427C9.24037 6.65272 9.25192 6.66282 9.29332 6.70717L14.5864 12.0003L9.29332 17.2934L9.24672 17.3433C9.20847 17.3903 9.19757 17.4013 9.16427 17.4521C9.10181 17.5473 9.05581 17.6531 9.02886 17.7637C9.00731 17.8523 8.99791 17.9437 9.00101 18.0347C9.01281 18.3804 9.20882 18.7027 9.51033 18.8722C9.60958 18.928 9.71834 18.9667 9.83054 18.9861C9.89045 18.9964 9.90585 18.9959 9.96635 19C9.9891 19 10.0119 19 10.0346 19Z"
    />
  )
}

export default ArrowRight