import React, { FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Reports: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM19.93 11H13V4.07C16.61 4.52 19.48 7.39 19.93 11ZM4 12C4 7.93 7.06 4.56 11 4.07V19.93C7.06 19.44 4 16.07 4 12ZM13 19.93V13H19.93C19.48 16.61 16.61 19.48 13 19.93Z"
        fill={color}
      />
    </Svg>
  )
}

export default Reports
