import Switch from 'components/switch'
import { Field } from 'formik'
import React from 'react'
import { View } from 'react-native'
import withField from './withField'

const SwitchComponent = withField(Switch)

const FormikSwitch = (props: any) => {
  const { label, name, ...rest } = props

  return (
    <View>
      <Field name={name} component={SwitchComponent} {...rest} />
    </View>
  )
}

export default FormikSwitch
