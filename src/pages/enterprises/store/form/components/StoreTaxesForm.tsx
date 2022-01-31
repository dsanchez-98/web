import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import React, { FunctionComponent as FC } from 'react'

import FormikControl from 'components/formikControl'

type StoreTaxesFormProps = {
  name: string
}

const StoreTaxesForm: FC<StoreTaxesFormProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const taxesTypes = [
    {
      label: 'Efectivo',
      value: 'efe'
    },
    {
      label: 'YAPE',
      value: 'yape'
    },
    {
      label: 'BBVA Transf.',
      value: 'bbvatrans'
    },
    {
      label: 'BCP Transf.',
      value: 'bcptrans'
    },
    {
      label: 'BCP VISA',
      value: 'bcpvisa'
    },
    {
      label: 'BBVA VISA',
      value: 'bbvavisa'
    },
    {
      label: 'TUNKI',
      value: 'tunki'
    }
  ]

  return (
    <View style={styles.containerSelectTaxes}>
      <FormikControl
        name={props.name}
        control="dropdown"
        items={taxesTypes}
        multiple
        placeholder="Seleccionar"
        closeOnSelect={false}
      />
    </View>
  )
}

const rStyles = StyleSheet.create({
  containerSelectTaxes: {
    padding: 24
  }
})

export default StoreTaxesForm
