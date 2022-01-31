import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Purchases: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.4179 2.19224C12.1527 2.07022 11.8473 2.07022 11.5821 2.19224L2.58209 6.33224C2.22732 6.49543 2 6.85022 2 7.24073V17.0415C2 17.4411 2.23788 17.8023 2.60497 17.9601L11.605 21.8301C11.8572 21.9386 12.1428 21.9386 12.395 21.8301L21.395 17.9601C21.7621 17.8023 22 17.4411 22 17.0415V7.24073C22 6.85022 21.7727 6.49543 21.4179 6.33224L12.4179 2.19224ZM18.59 7.23L16.54 8L9.86 5.12L12 4.2L18.59 7.23ZM11 19.38L4 16.38V8.82L11 11.71V19.38ZM12 10L5.41 7.23L7.71 6.23L14.27 9.07L12 10ZM20 16.42L13 19.42V11.71L20 8.82V16.42Z"
        fill={color}
      />
    </Svg>
  )
}

export default Purchases
