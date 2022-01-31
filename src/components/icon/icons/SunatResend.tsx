import React, { FC } from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const SunatResend: FC<Props> = (props) => {
  return (
    <Svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.05813 6.53602L11.7479 9.75277L4.04789 8.75378L4.05813 6.53602ZM11.7377 15.2472L4.04789 18.464V16.2462L11.7377 15.2472ZM3.3707 4.07819C2.72627 3.80861 2.00913 4.26917 2.00812 4.95324L2 10.502L17.3592 12.5L2 14.498L2.00812 20.0468C2.00913 20.7308 2.72627 21.1914 3.3707 20.9218L21.4078 13.3764C22.1974 13.0461 22.1974 11.9539 21.4078 11.6236L3.3707 4.07819Z"
        fill="#2A2D45"
      />
    </Svg>
  )
}

export default SunatResend
