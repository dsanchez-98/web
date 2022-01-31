/* eslint-disable no-extra-parens */
import { useRoute } from '@react-navigation/core'
import { Formik, FormikConfig } from 'formik'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Form from 'components/formikControl/Form'
import colors from 'styles/colors'
interface Props<T> extends FormikConfig<T> {
  id?: number | string | null
  callService: (id: string) => Promise<T | null>
}

const useParams = () => {
  let params: { [key: string]: any } = {}
  try {
    const route = useRoute<any>()
    params = route.params
  } catch (error) {}

  return params
}

function BaseForm<T>(props: Props<T>) {
  const { callService, children, ...rest } = props
  const params = useParams()
  const id = params.id || props.id
  const [values, setValues] = useState<T | null | undefined>(
    id ? undefined : props.initialValues
  )

  useEffect(() => {
    const init = async () => {
      if (id) {
        try {
          setValues(await callService(id))
        } catch (error) {
          setValues(null)
        }
      }
    }
    init()
  }, [])

  if (values === null) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Error!</Text>
      </View>
    )
  } else if (values === undefined) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    )
  }
  const Children =
    typeof children === 'function' ? (
      (values: any) => <Form>{children(values)}</Form>
    ) : (
      <Form>{children}</Form>
    )
  return (
    <Formik {...rest} initialValues={values}>
      {Children}
    </Formik>
  )
}

export default BaseForm
