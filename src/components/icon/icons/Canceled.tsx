import React, { FC } from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Canceled: FC<Props> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.1466 4H3.85317C2.35706 4 1.48198 5.72541 2.33448 6.99187L10.5546 19.1801C11.2942 20.2781 12.875 20.2723 13.6033 19.1685L21.6766 6.98025C22.5122 5.71379 21.6314 4 20.1466 4ZM17.002 11.8834L12.8242 18.1867C12.4459 18.756 11.6273 18.7618 11.2434 18.1925L6.99217 11.8893C6.55181 11.2386 7.00346 10.3439 7.77692 10.3439H16.2059C16.985 10.3439 17.4367 11.2328 17.002 11.8834Z"
        fill="#2A2D45"
      />
    </Svg>
  )
}

export default Canceled
