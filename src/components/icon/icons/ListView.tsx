import React, { FC } from 'react'
import Svg, { Path, SvgProps, Rect } from 'react-native-svg'

interface Props extends SvgProps {}

const ListView: FC<Props> = (props) => {
  const color = props.color || '#2A2D45'
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 16.7143C4 16.872 4.29867 17 4.66667 17H19.3333C19.7013 17 20 16.872 20 16.7143V15.2857C20 15.128 19.7013 15 19.3333 15H4.66667C4.29867 15 4 15.128 4 15.2857V16.7143Z"
        fill={color}
      />
      <Path
        d="M19.3333 7H4.66667C4.29867 7 4 7.128 4 7.28571V8.71429C4 8.872 4.29867 9 4.66667 9H19.3333C19.7013 9 20 8.872 20 8.71429V7.28571C20 7.128 19.7013 7 19.3333 7Z"
        fill={color}
      />
      <Path
        d="M4.66667 13H19.3333C19.7013 13 20 12.872 20 12.7143V11.2857C20 11.128 19.7013 11 19.3333 11H4.66667C4.29867 11 4 11.128 4 11.2857V12.7143C4 12.872 4.29867 13 4.66667 13Z"
        fill={color}
      />
      <Rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke={color} />
    </Svg>
  )
}

export default ListView
