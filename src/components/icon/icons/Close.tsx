import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Close: FC<Props> = (props) => {
  return (
    <Svg
      height={16}
      width={16}
      color={'white'}
      {...props}
      viewBox={'0 0 16 16'}
      d="M7.99891 8.94369L4.47016 12.4724C4.43656 12.5038 4.40292 12.5332 4.36439 12.5585C4.28818 12.6085 4.20181 12.6425 4.11201 12.658C4.07211 12.6649 4.06184 12.6646 4.0215 12.6673C4.0063 12.6673 3.99114 12.6673 3.97597 12.6673C3.93563 12.6646 3.92537 12.6649 3.88546 12.658C3.81063 12.6451 3.73816 12.6193 3.67199 12.5821C3.61905 12.5524 3.57025 12.5154 3.52732 12.4724C3.39764 12.3428 3.32617 12.1615 3.33241 11.9783C3.33451 11.9176 3.34491 11.8572 3.36328 11.7993C3.38624 11.727 3.42164 11.6587 3.46751 11.5982C3.49198 11.5659 3.49971 11.5591 3.52732 11.5296L7.05603 8.00085L3.52732 4.4721C3.49971 4.44253 3.49198 4.4358 3.46751 4.4035C3.42164 4.34303 3.38624 4.27472 3.36328 4.20235C3.33571 4.11548 3.32621 4.02315 3.33554 3.93248C3.35911 3.70307 3.50411 3.49762 3.71239 3.39859C3.76723 3.37252 3.8256 3.35399 3.88546 3.34365C3.96027 3.33078 4.0372 3.33078 4.11201 3.34365C4.21681 3.36175 4.31682 3.40515 4.40155 3.46946C4.43385 3.49392 4.44059 3.50166 4.47016 3.52926L7.99891 7.05798L11.5277 3.52926C11.5572 3.50166 11.564 3.49392 11.5962 3.46946C11.6567 3.42359 11.725 3.38819 11.7974 3.36522C11.8842 3.33765 11.9766 3.32815 12.0672 3.33748C12.1428 3.34522 12.2169 3.36599 12.2854 3.39859C12.3402 3.42465 12.3915 3.45826 12.4372 3.49816C12.611 3.64973 12.6952 3.88667 12.6561 4.11395C12.638 4.21876 12.5946 4.31876 12.5303 4.4035C12.5058 4.4358 12.4981 4.44253 12.4705 4.4721L8.94175 8.00085L12.4705 11.5296C12.4981 11.5591 12.5058 11.5659 12.5303 11.5982C12.5762 11.6587 12.6116 11.727 12.6345 11.7993C12.6529 11.8572 12.6633 11.9176 12.6654 11.9783C12.6716 12.1615 12.6001 12.3428 12.4705 12.4724C12.4276 12.5154 12.3788 12.5524 12.3258 12.5821C12.2597 12.6193 12.1872 12.6451 12.1124 12.658C12.0724 12.6649 12.0622 12.6646 12.0218 12.6673C12.0066 12.6673 11.9915 12.6673 11.9763 12.6673C11.936 12.6646 11.9257 12.6649 11.8858 12.658C11.796 12.6425 11.7096 12.6085 11.6334 12.5585C11.5949 12.5332 11.5612 12.5038 11.5277 12.4724L7.99891 8.94369Z"
    />
  )
}

export default Close
