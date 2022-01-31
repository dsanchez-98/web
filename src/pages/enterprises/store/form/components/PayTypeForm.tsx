import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import React, { FunctionComponent as FC } from 'react'
import { usePaymentsService } from 'services/finance'
import useService from 'hooks/useService'
import FormikControl from 'components/formikControl'

type PayTypeFormProps = {
  name: string
}

const PayTypeForm: FC<PayTypeFormProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const [paymentsTypes] = useService(usePaymentsService, 'paymentMethodsList')()

  return (
    <View style={styles.containerSelectTaxes}>
      <FormikControl
        name={props.name}
        control="dropdown"
        multiple
        placeholder="Seleccionar"
        dependencies={[paymentsTypes]}
        items={paymentsTypes?.data.items?.map((item) => ({
          label: item.name,
          value: item.id
        }))}
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

export default PayTypeForm
