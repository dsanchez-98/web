import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Menu: FC<Props> = (props) => {
  const color = props.color || '#2A2D45'

  return (
    <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9C0 9.55229 0.447715 10 1 10H13C13.5523 10 14 9.55229 14 9C14 8.44771 13.5523 8 13 8H1C0.447716 8 0 8.44771 0 9ZM0 5C0 5.55228 0.447715 6 1 6H13C13.5523 6 14 5.55228 14 5C14 4.44772 13.5523 4 13 4H1C0.447716 4 0 4.44772 0 5ZM1 0C0.447716 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H13C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0H1Z"
        fill={color}
      />
    </Svg>
  )
}

export default Menu
