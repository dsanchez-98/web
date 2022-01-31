import React, { FC } from 'react'
import useTheme from 'hooks/useTheme'
import { getStyle } from 'components/reanimated'
import Svg, { Path } from 'react-native-svg'

type PropsIcon = {
  fill: string
  width?: number
  height?: number
}

const arrow = ({ fill, width = 24, height = 24, ...props }: PropsIcon) => {
  return (
    <Svg
      viewBox={'0 0 24 24'}
      style={getStyle({
        width: undefined,
        height: undefined
      } as any)}
      width={width}
      height={height}
      {...props}
    >
      <Path
        d="M4.99976 10.0346C5.00391 10.0951 5.00341 10.1105 5.01371 10.1704C5.03696 10.3051 5.08801 10.4347 5.16301 10.549C5.20091 10.6068 5.24502 10.6572 5.29207 10.7076L11.2923 16.7079C11.3367 16.7493 11.3468 16.7608 11.3952 16.7976C11.4496 16.8388 11.5083 16.8745 11.57 16.9038C11.8395 17.0321 12.1594 17.0321 12.429 16.9038C12.4907 16.8745 12.5493 16.8388 12.6037 16.7976C12.6521 16.7608 12.6623 16.7493 12.7066 16.7079L18.7068 10.7076C18.7482 10.6633 18.7598 10.6531 18.7965 10.6047C18.893 10.4776 18.9581 10.3276 18.9853 10.1704C19.0046 10.0582 19.0046 9.9428 18.9853 9.83054C18.9698 9.74079 18.942 9.65323 18.9029 9.57098C18.7543 9.25857 18.4461 9.04106 18.102 9.00566C17.966 8.99171 17.8275 9.00596 17.6972 9.04731C17.5886 9.08176 17.4862 9.13481 17.3955 9.20362C17.347 9.24037 17.3369 9.25192 17.2926 9.29332L11.9995 14.5864L6.70633 9.29332L6.65643 9.24672C6.60942 9.20847 6.59847 9.19757 6.54767 9.16426C6.45247 9.10181 6.34661 9.05581 6.23601 9.02886C6.1475 9.00731 6.0561 8.99791 5.9651 9.00101C5.61933 9.01281 5.29707 9.20882 5.12751 9.51033C5.07171 9.60958 5.03306 9.71834 5.01371 9.83054C5.00341 9.89045 5.00391 9.90585 4.99976 9.96635C4.99976 9.9891 4.99976 10.0119 4.99976 10.0346Z"
        {...{
          style: getStyle({
            fill: undefined
          } as any)
        }}
        fill={fill}
        {...props}
      />
    </Svg>
  )
}
const barcode = ({ fill, width = 20, height = 17, ...props }: PropsIcon) => {
  return (
    <Svg
      viewBox="0 0 20 17"
      style={getStyle({
        width: undefined,
        height: undefined
      } as any)}
      width={width}
      height={height}
      {...props}
    >
      <Path
        d="M3.33333 3.33333H5V13.3333H3.33333V3.33333ZM5.83333 3.33333H6.66667V13.3333H5.83333V3.33333ZM7.5 3.33333H10V13.3333H7.5V3.33333ZM10.8333 3.33333H11.6667V13.3333H10.8333V3.33333ZM13.3333 3.33333H15V13.3333H13.3333V3.33333ZM15.8333 3.33333H16.6667V13.3333H15.8333V3.33333ZM1.66667 1.66667V5H0V1.66667C0 1.22464 0.175595 0.800716 0.488155 0.488155C0.800716 0.175595 1.22464 0 1.66667 0H5V1.66667H1.66667ZM18.3333 0C18.7754 0 19.1993 0.175595 19.5118 0.488155C19.8244 0.800716 20 1.22464 20 1.66667V5H18.3333V1.66667H15V0H18.3333ZM1.66667 11.6667V15H5V16.6667H1.66667C1.22464 16.6667 0.800716 16.4911 0.488155 16.1785C0.175595 15.8659 0 15.442 0 15V11.6667H1.66667ZM18.3333 15V11.6667H20V15C20 15.442 19.8244 15.8659 19.5118 16.1785C19.1993 16.4911 18.7754 16.6667 18.3333 16.6667H15V15H18.3333Z"
        {...{
          style: getStyle({
            fill: undefined
          } as any)
        }}
        fill={fill}
        {...props}
      />
    </Svg>
  )
}

const eye = ({ fill, width = 22, height = 15, ...props }: PropsIcon) => {
  return (
    <Svg
      viewBox="0 0 22 15"
      style={getStyle({
        width: undefined,
        height: undefined
      } as any)}
      width={width}
      height={height}
      {...props}
    >
      <Path
        d="M11 4.5C11.7956 4.5 12.5587 4.81607 13.1213 5.37868C13.6839 5.94129 14 6.70435 14 7.5C14 8.29565 13.6839 9.05871 13.1213 9.62132C12.5587 10.1839 11.7956 10.5 11 10.5C10.2044 10.5 9.44129 10.1839 8.87868 9.62132C8.31607 9.05871 8 8.29565 8 7.5C8 6.70435 8.31607 5.94129 8.87868 5.37868C9.44129 4.81607 10.2044 4.5 11 4.5ZM11 0C15.86 0 20.22 3 22 7.5C19.61 13.58 12.75 16.56 6.67 14.17C3.62 12.97 1.2 10.56 0 7.5C1.78 3 6.14 0 11 0ZM2.18 7.5C4.56 12.37 10.45 14.39 15.32 12C17.28 11.04 18.86 9.46 19.82 7.5C17.44 2.63 11.55 0.61 6.68 3C4.72 3.96 3.14 5.54 2.18 7.5Z"
        {...{
          style: getStyle({
            fill: undefined
          } as any)
        }}
        fill={fill}
        {...props}
      />
    </Svg>
  )
}
const eyeInvisible = ({ fill, width = 24, height = 19, ...props }: PropsIcon) => {
  return (
    <Svg
      viewBox="0 0 24 19"
      style={getStyle({
        width: undefined,
        height: undefined
      } as any)}
      width={width}
      height={height}
      {...props}
    >
      <Path
        d="M1.97159 1.78533L3.25523 0.511719L20.0227 17.2792L18.7491 18.5629L15.6604 15.4741C14.5071 15.8552 13.2836 16.0558 12 16.0558C6.9858 16.0558 2.70366 12.9369 0.96875 8.53445C1.66071 6.76945 2.76384 5.21504 4.16781 3.98155L1.97159 1.78533ZM12 5.52592C12.7979 5.52592 13.5631 5.84289 14.1273 6.4071C14.6916 6.97131 15.0085 7.73654 15.0085 8.53445C15.0085 8.88544 14.9484 9.22641 14.838 9.53729L10.9972 5.69641C11.308 5.58609 11.649 5.52592 12 5.52592ZM12 1.01314C17.0142 1.01314 21.2963 4.13197 23.0312 8.53445C22.2089 10.6204 20.815 12.4255 19.0199 13.7392L17.5959 12.3051C18.9597 11.3625 20.0829 10.0788 20.8451 8.53445C19.1904 5.1649 15.7707 3.01882 12 3.01882C10.9069 3.01882 9.83386 3.19933 8.83102 3.52024L7.28665 1.98589C8.73074 1.36413 10.3253 1.01314 12 1.01314ZM3.15494 8.53445C4.80963 11.904 8.22932 14.0501 12 14.0501C12.692 14.0501 13.3739 13.9799 14.0057 13.8395L11.7192 11.543C10.2851 11.3925 9.1419 10.2493 8.99148 8.81524L5.58182 5.39555C4.58901 6.24797 3.75665 7.31098 3.15494 8.53445Z"
        {...{
          style: getStyle({
            fill: undefined
          } as any)
        }}
        {...props}
        fill={fill}
      />
    </Svg>
  )
}
const icons = {
  arrow,
  barcode,
  eye,
  eyeInvisible
}

interface Props {
  name: keyof typeof icons
  width?: number
  height?: number
  color?: string
}

const Icon: FC<Props> = (props) => {
  const { schemes, scheme } = useTheme()

  const Component = icons[props.name] as any
  if (!Component) return null

  return <Component {...props} fill={props.color ?? schemes[scheme].text} tabIndex="-1" />
}

export default Icon