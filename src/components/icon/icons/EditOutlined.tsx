import React, { FC } from 'react'
import Svg, { SvgProps } from '../Svg'

interface Props extends Omit<SvgProps, 'd'> {}

const EditOutlined: FC<Props> = (props) => {
  return (
    <Svg
      height={24}
      width={24}
      color={'white'}
      {...props}
      viewBox={'0 0 25 24'}
      d="M4 16.6667V20H7.33333L17.1644 10.1689L13.8311 6.83556L4 16.6667ZM6.59556 18.2222H5.77778V17.4044L13.8311 9.35111L14.6489 10.1689L6.59556 18.2222ZM19.7422 6.33778L17.6622 4.25778C17.4844 4.08 17.2622 4 17.0311 4C16.8 4 16.5778 4.08889 16.4089 4.25778L14.7822 5.88444L18.1156 9.21778L19.7422 7.59111C20.0889 7.24444 20.0889 6.68444 19.7422 6.33778Z"
    />
  )
}

export default EditOutlined
