import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Barcode: FC<Props> = (props) => {
  const color = props.color || '#2A2D45'
  return (
    <Svg width="20" height="17" viewBox="0 0 20 17" fill="none" {...props}>
      <Path
        d="M3.33333 3.33333H5V13.3333H3.33333V3.33333ZM5.83333 3.33333H6.66667V13.3333H5.83333V3.33333ZM7.5 3.33333H10V13.3333H7.5V3.33333ZM10.8333 3.33333H11.6667V13.3333H10.8333V3.33333ZM13.3333 3.33333H15V13.3333H13.3333V3.33333ZM15.8333 3.33333H16.6667V13.3333H15.8333V3.33333ZM1.66667 1.66667V5H0V1.66667C0 1.22464 0.175595 0.800716 0.488155 0.488155C0.800716 0.175595 1.22464 0 1.66667 0H5V1.66667H1.66667ZM18.3333 0C18.7754 0 19.1993 0.175595 19.5118 0.488155C19.8244 0.800716 20 1.22464 20 1.66667V5H18.3333V1.66667H15V0H18.3333ZM1.66667 11.6667V15H5V16.6667H1.66667C1.22464 16.6667 0.800716 16.4911 0.488155 16.1785C0.175595 15.8659 0 15.442 0 15V11.6667H1.66667ZM18.3333 15V11.6667H20V15C20 15.442 19.8244 15.8659 19.5118 16.1785C19.1993 16.4911 18.7754 16.6667 18.3333 16.6667H15V15H18.3333Z"
        fill={color}
      />
    </Svg>
  )
}

export default Barcode
