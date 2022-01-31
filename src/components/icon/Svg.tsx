import React, { FunctionComponent as FC } from 'react'
import { Svg as SvgComponent, Path, SvgProps as SvgPropsNative } from 'react-native-svg'

export interface SvgProps extends SvgPropsNative {
  d: string
}

const Svg: FC<SvgProps> = ({ width, height, ...props }) => {
  return (
    <SvgComponent fill="none" {...props} width={width} height={height}>
      {props.children}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d={props.d}
        fill={props.color}
        {...{ tabIndex: '-1' }}
      />
    </SvgComponent>
  )
}

export default Svg
