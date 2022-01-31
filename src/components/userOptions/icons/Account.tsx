import React, { FunctionComponent as FC } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {}

const Account: FC<Props> = (props) => {
  const color = props.color || '#B9B3C2'

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M19.4671 10.6311C19.7758 10.26 19.7753 9.72134 19.466 9.35077L17.7818 7.33333L18.0152 4.67953C18.0587 4.1853 17.7332 3.73393 17.2506 3.61908L14.8091 3.0381L13.5399 0.79386C13.2855 0.3441 12.7304 0.162182 12.2592 0.374164L10 1.39048L7.74083 0.374164C7.26961 0.162182 6.71449 0.3441 6.46013 0.79386L5.19091 3.0381L2.75211 3.61136C2.26821 3.72511 1.94133 4.17702 1.98476 4.67221L2.21818 7.33333L0.53498 9.34963C0.225204 9.72071 0.225203 10.2602 0.53498 10.6313L2.21818 12.6476L1.98455 15.3111C1.94121 15.8053 2.26666 16.2565 2.74923 16.3713L5.19091 16.9524L6.45943 19.2024C6.71393 19.6538 7.27109 19.836 7.74312 19.6222L10 18.6L12.2592 19.6163C12.7304 19.8283 13.2855 19.6464 13.5399 19.1966L14.8091 16.9524L17.2506 16.3714C17.7332 16.2565 18.0587 15.8052 18.0152 15.3109L17.7818 12.6571L19.4671 10.6311ZM16.4091 11.4L15.9 12.019L15.9727 12.8286L16.1364 14.6857L14.4091 15.0952L13.6455 15.2762L13.2455 15.981L12.3455 17.581L10.7273 16.8476L10 16.5238L9.28182 16.8476L7.66364 17.581L6.76364 15.9905L6.36364 15.2857L5.6 15.1048L3.87273 14.6952L4.03636 12.8286L4.10909 12.019L3.6 11.4L2.42727 10L3.6 8.59048L4.10909 7.97143L4.02727 7.15238L3.86364 5.30476L5.59091 4.89524L6.35455 4.71429L6.75455 4.00952L7.65455 2.40952L9.27273 3.14286L10 3.46667L10.7182 3.14286L12.3364 2.40952L13.2364 4.00952L13.6364 4.71429L14.4 4.89524L16.1273 5.30476L15.9636 7.16191L15.8909 7.97143L16.4 8.59048L17.5727 9.99048L16.4091 11.4Z"
        fill={color}
      />
      <Path
        d="M8.26314 11.6688L6.86238 10.195C6.47728 9.78985 5.83123 9.79025 5.44663 10.1959C5.08909 10.573 5.0897 11.1641 5.448 11.5404L7.53884 13.7366C7.93297 14.1506 8.59329 14.1506 8.9874 13.7366L14.2964 8.15966C14.6547 7.7832 14.6553 7.19197 14.2977 6.81479C13.9131 6.40917 13.2671 6.40864 12.8819 6.81362L8.26314 11.6688Z"
        fill={color}
      />
    </Svg>
  )
}

export default Account
