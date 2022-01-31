import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const CircleOutline: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10C5 7.23768 7.23768 5 10 5C12.7623 5 15 7.23768 15 10C15 12.7623 12.7623 15 10 15C7.23768 15 5 12.7623 5 10ZM5.83333 10C5.83333 7.69792 7.69792 5.83333 10 5.83333C12.3021 5.83333 14.1667 7.69792 14.1667 10C14.1667 12.3021 12.3021 14.1667 10 14.1667C7.69792 14.1667 5.83333 12.3021 5.83333 10Z"
        fill={color}
      />
      <Path
        d="M13.125 10C13.125 8.27604 11.724 6.875 10 6.875C8.27604 6.875 6.875 8.27604 6.875 10C6.875 11.724 8.27604 13.125 10 13.125C11.724 13.125 13.125 11.724 13.125 10Z"
        fill={color}
      />
    </Svg>
  )
}

export default CircleOutline
