import React, { FC } from 'react'
import { Path, Svg, SvgProps } from 'react-native-svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Rotate: FC<Props> = (props) => {
  const color = props.color || '#4DA0FF'

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.11031 8.53L5.70031 7.11C4.80031 8.27 4.24031 9.61 4.07031 11H6.09031C6.23031 10.13 6.58031 9.28 7.11031 8.53ZM6.09031 13H4.07031C4.24031 14.39 4.79031 15.73 5.69031 16.89L7.10031 15.47C6.58031 14.72 6.23031 13.88 6.09031 13ZM7.10031 18.32C8.26031 19.22 9.61031 19.76 11.0003 19.93V17.9C10.1303 17.75 9.29031 17.41 8.54031 16.87L7.10031 18.32ZM13.0003 4.07V1L8.45031 5.55L13.0003 10V6.09C15.8403 6.57 18.0003 9.03 18.0003 12C18.0003 14.97 15.8403 17.43 13.0003 17.91V19.93C16.9503 19.44 20.0003 16.08 20.0003 12C20.0003 7.92 16.9503 4.56 13.0003 4.07Z"
        fill={color}
      />
    </Svg>
  )
}

export default Rotate
