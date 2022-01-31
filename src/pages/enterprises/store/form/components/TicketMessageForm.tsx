import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import React, { FunctionComponent as FC } from 'react'
import TextInputArea from 'components/textInputArea'

type TicketMessageFormProps = {
  value?: string
  onChange: (val: string) => void
}

const TicketMessageForm: FC<TicketMessageFormProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { value, onChange } = props

  return (
    <View style={styles.containerSelectTaxes}>
      <TextInputArea value={value} onChange={(val) => onChange(val)} />
    </View>
  )
}

const rStyles = StyleSheet.create({
  containerSelectTaxes: {
    padding: 24
  }
})

export default TicketMessageForm
