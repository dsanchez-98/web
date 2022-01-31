import React, { FunctionComponent as FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const CloseSesion: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.28 17.46L19.4 17.3H19.2H16.743H16.7052L16.6769 17.325C15.6521 18.2288 14.3883 18.8176 13.0371 19.021C11.6859 19.2243 10.3048 19.0334 9.05944 18.4712C7.81407 17.909 6.75737 16.9994 6.01614 15.8516C5.27492 14.7037 4.88065 13.3664 4.88065 12C4.88065 10.6336 5.27492 9.29627 6.01614 8.14841C6.75737 7.00056 7.81407 6.09097 9.05944 5.52879C10.3048 4.96661 11.6859 4.77573 13.0371 4.97904C14.3883 5.18235 15.6521 5.77123 16.6769 6.675L16.7052 6.7H16.743H19.2H19.4L19.28 6.54C18.134 5.01206 16.5364 3.88341 14.7133 3.31393C12.8903 2.74445 10.9342 2.76301 9.12233 3.36698C7.31041 3.97096 5.73445 5.12972 4.6177 6.67914C3.50094 8.22855 2.9 10.0901 2.9 12C2.9 13.9099 3.50094 15.7714 4.6177 17.3209C5.73445 18.8703 7.31041 20.029 9.12233 20.633C10.9342 21.237 12.8903 21.2556 14.7133 20.6861C16.5364 20.1166 18.134 18.9879 19.28 17.46Z"
        fill={color}
        stroke={color}
        stroke-width="0.2"
      />
      <Path d="M17.4 8.40002L21 12L17.4 15.6V12.9H10.2V11.1H17.4V8.40002Z" fill={color} />
    </Svg>
  )
}

export default CloseSesion