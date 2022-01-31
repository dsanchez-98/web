import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const Calendar: FC<Props> = (props) => {
  return (
    <Svg
      height={20}
      width={18}
      color={'#EBC744'}
      {...props}
      viewBox="0 0 18 20"
      d="M14 11.6C14 11.2686 13.7314 11 13.4 11H9.6C9.26863 11 9 11.2686 9 11.6V15.4C9 15.7314 9.26863 16 9.6 16H13.4C13.7314 16 14 15.7314 14 15.4V11.6ZM13.3 0C13.1343 0 13 0.134315 13 0.3V2H5V0.3C5 0.134315 4.86569 0 4.7 0H3.3C3.13431 0 3 0.134315 3 0.3V2H2C0.89 2 0.01 2.9 0.01 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0.3C15 0.134315 14.8657 0 14.7 0H13.3ZM16 18H2V7H16V18Z"
    />
  )
}

export default Calendar
