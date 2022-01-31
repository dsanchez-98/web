import Icon from 'components/icon'
import ContentDatePicker from 'components/modal/ContentDatePicker'
import useAppContext from 'hooks/useAppContext'
import React, { FunctionComponent as FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInputProps } from '../types'
import TextInputBase from './TextInputBase'

interface IInputDatePicker extends Omit<TextInputProps, 'error'> {
  onChange: (val: any) => void
  multiple?: boolean
}

const formatDate = (fecha: Date) => {
  const d = fecha
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('/')
}

function formatText(text: string, format = 'DD/MM/YYYY') {
  const str = text.replaceAll('/', '')
  let newText = format
  let count = 0
  const splitFormat = format.split('/')
  splitFormat.forEach((i) => {
    newText = newText.replace(i, str.slice(count, (count += i.length)))
  })

  let txt = ''
  const splitNetText = newText.split('/')
  for (let i = 0; i < splitFormat.length; i++) {
    txt += splitNetText[i]
    if (splitNetText[i + 1]?.length) {
      txt += '/'
    }
  }

  return txt
}

const InputDatePicker: FC<IInputDatePicker> = (props) => {
  const { onChange, ...rest } = props
  const { showModal } = useAppContext()

  // TODO: Formato varia por region
  const format = 'DD/MM/YYYY'
  return (
    <TextInputBase
      {...rest}
      onChange={(val) => {
        const text = formatText(val)
        onChange(text)
      }}
      editable={!props.multiple}
      placeholderStatic={format}
      rightContent={() => {
        return (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5
            }}
            onPress={() => {
              showModal(
                ContentDatePicker,
                {
                  onAccept: (value: any) => {
                    props.multiple
                      ? props.onChange(
                          `${formatDate(value.startDate._d)} - ${formatDate(
                            value.endDate._d
                          )}`
                        )
                      : props.onChange(formatDate(value.startDate._d))
                  },
                  onCancel: () => {},
                  onRequestClose: () => {}
                },
                {
                  multiple: props.multiple
                }
              )
            }}
          >
            <Icon name="calendar" />
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default InputDatePicker
