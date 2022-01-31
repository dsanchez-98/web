import FormikControl from 'components/formikControl'
import { Formik, FormikHelpers } from 'formik'
import pathProxy from 'helpers/pathProxy'
import useService from 'hooks/useService'
import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import { useTerminalService } from 'services/bm'

interface Props {
  header?: React.ReactNode
  footer?: React.ReactNode
}

type Withdrawals = {
  storeId: number
  employeeId: number
  description: string
  amount: string
}
type Values = Partial<Withdrawals>

const _ = pathProxy<Withdrawals>()

const Form: FC<Props> = (props) => {
  const [terminals] = useService(useTerminalService, 'terminalsList')()
  // const [employees] = useService(useEmployeeService, 'employeesList')({terminalId})

  const initalValues: Values = {}

  const onSubmit = (values: Values, helpers: FormikHelpers<Values>) => {}

  return (
    <Formik initialValues={initalValues} onSubmit={onSubmit}>
      <View>
        {props.header}
        <FormikControl
          name={_.storeId}
          control="dropdown"
          dependencies={[terminals]}
          items={terminals?.data.items.map((item) => ({
            label: item.name || '',
            value: item.id
          }))}
          placeholder="Tienda"
        />
        <FormikControl
          name={_.employeeId}
          control="dropdown"
          dependencies={[terminals]}
          items={terminals?.data.items.map((item) => ({
            label: item.name || '',
            value: item.id
          }))}
          placeholder="Empleado"
        />
        <FormikControl
          name={_.description}
          control="textInput"
          placeholder="¿Por qué deseas realizar el retiro?"
        />
        <FormikControl
          name={_.amount}
          control="textInput"
          placeholder="Monto"
          keyboardType="number-pad"
        />
        {props.footer}
      </View>
    </Formik>
  )
}

export default Form
