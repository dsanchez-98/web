/* eslint-disable no-extra-semi */
import Icon from 'components/icon'
import useAppContext from 'hooks/useAppContext'
import React, { FC } from 'react'
import ModalPhoto from './components/ModalPhoto'
import { InputFileProps } from './type'

const InputFile: FC<InputFileProps> = (props) => {
  const { showModal } = useAppContext()

  return (
    <div
      onClick={() =>
        showModal(
          ModalPhoto,
          {},
          {
            onChange: (img: any) => props.onChange(img),
            title: props.title
          }
        )
      }
      style={{
        position: 'absolute',
        right: 5,
        bottom: 5
      }}
    >
      <Icon name="camera" />
    </div>
  )
}

export default InputFile
