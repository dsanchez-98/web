import React, { FC } from 'react'
import Svg, { Path, SvgProps, Rect } from 'react-native-svg'

interface Props extends SvgProps {}

const GridView: FC<Props> = (props) => {
  const color = props.color || '#2A2D45'
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5.54545 11H10.4545C10.7556 11 11 10.7556 11 10.4545V5.54545C11 5.24436 10.7556 5 10.4545 5H5.54545C5.24436 5 5 5.24436 5 5.54545V10.4545C5 10.7556 5.24436 11 5.54545 11Z"
        fill={color}
      />
      <Path
        d="M18.4545 5H13.5455C13.2444 5 13 5.24436 13 5.54545V10.4545C13 10.7556 13.2444 11 13.5455 11H18.4545C18.7556 11 19 10.7556 19 10.4545V5.54545C19 5.24436 18.7556 5 18.4545 5Z"
        fill={color}
      />
      <Path
        d="M5.54546 19H10.4546C10.7556 19 11 18.7556 11 18.4545V13.5455C11 13.2444 10.7556 13 10.4546 13H5.54546C5.24436 13 5 13.2444 5 13.5455V18.4545C5 18.7556 5.24436 19 5.54546 19Z"
        fill={color}
      />
      <Path
        d="M18.4545 13H13.5455C13.2444 13 13 13.2444 13 13.5455V18.4545C13 18.7556 13.2444 19 13.5455 19H18.4545C18.7556 19 19 18.7556 19 18.4545V13.5455C19 13.2444 18.7556 13 18.4545 13Z"
        fill={color}
      />
      <Rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke={color} />
    </Svg>
  )
}

export default GridView
