import React, { FC } from 'react'
import { Svg as SvgComponent, Path } from 'react-native-svg'

const Peru: FC<{ width?: string; height?: string }> = (props) => {
  return (
    <SvgComponent
      width={props.width || 32}
      height={props.height || 24}
      viewBox="0 0 32 24"
      fill="none"
    >
      <Path
        d="M3.66667 0C1.64175 0 0 1.65323 0 3.69231V20.3077C0 22.3468 1.64175 24 3.66667 24H11V0H3.66667Z"
        fill="#D91023"
      />
      <Path d="M11 0H21V24H11V0Z" fill="#EEEEEE" />
      <Path
        d="M28.3333 0H21V24H28.3333C30.3583 24 32 22.3468 32 20.3077V3.69231C32 1.65323 30.3583 0 28.3333 0Z"
        fill="#D91023"
      />
    </SvgComponent>
  )
}

export default Peru
