import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const ArrowDown: FC<Props> = (props) => {
  return (
    <Svg
      height={24}
      width={24}
      color={'white'}
      {...props}
      viewBox={'0 0 24 24'}
      d="M4.99976 10.0346C5.00391 10.0951 5.00341 10.1105 5.01371 10.1704C5.03696 10.3051 5.08801 10.4347 5.16301 10.549C5.20091 10.6068 5.24502 10.6572 5.29207 10.7076L11.2923 16.7079C11.3367 16.7493 11.3468 16.7608 11.3952 16.7976C11.4496 16.8388 11.5083 16.8745 11.57 16.9038C11.8395 17.0321 12.1594 17.0321 12.429 16.9038C12.4907 16.8745 12.5493 16.8388 12.6037 16.7976C12.6521 16.7608 12.6623 16.7493 12.7066 16.7079L18.7068 10.7076C18.7482 10.6633 18.7598 10.6531 18.7965 10.6047C18.893 10.4776 18.9581 10.3276 18.9853 10.1704C19.0046 10.0582 19.0046 9.9428 18.9853 9.83054C18.9698 9.74079 18.942 9.65323 18.9029 9.57098C18.7543 9.25857 18.4461 9.04106 18.102 9.00566C17.966 8.99171 17.8275 9.00596 17.6972 9.04731C17.5886 9.08176 17.4862 9.13481 17.3955 9.20362C17.347 9.24037 17.3369 9.25192 17.2926 9.29332L11.9995 14.5864L6.70633 9.29332L6.65643 9.24672C6.60942 9.20847 6.59847 9.19757 6.54767 9.16426C6.45247 9.10181 6.34661 9.05581 6.23601 9.02886C6.1475 9.00731 6.0561 8.99791 5.9651 9.00101C5.61933 9.01281 5.29707 9.20882 5.12751 9.51033C5.07171 9.60958 5.03306 9.71834 5.01371 9.83054C5.00341 9.89045 5.00391 9.90585 4.99976 9.96635C4.99976 9.9891 4.99976 10.0119 4.99976 10.0346Z"
    />
  )
}

export default ArrowDown