/* eslint-disable no-extra-semi */
/* eslint-disable prefer-promise-reject-errors */
import { FormikProps, getIn, setIn } from 'formik'
import { RefObject, useRef } from 'react'

type UseOnBlurValidation = {
  <T>(refFormik: RefObject<FormikProps<T>>): {
    validate: (values: T, validationShema: any, callApi: any) => Promise<void>
  }
}

const useOnBlurValidation: UseOnBlurValidation = (refFormik) => {
  const refValues = useRef<any>({})

  const validate = async (
    values: any,
    validationShema: any,
    callApi = (key: string) => {}
  ) =>
    new Promise<void>(() => {
      ;(async () => {
        const formik = refFormik.current
        formik?.setSubmitting(false)
        try {
          const key = formik?.status?.focusField
          const currentValue = getIn(refValues.current, key)
          const value = getIn(values, key)
          if (key && currentValue !== value && value) {
            const schema = getIn(validationShema.fields, key)
            schema && (await validationShema.validateAt(key, values, { strict: false }))
            await callApi(key)
            refValues.current = setIn(refValues.current, key, value)
            formik?.setFormikState((prev) => {
              prev.status = setIn(prev.status, key, true)
              return prev
            })
          }
        } catch (error) {
          setIn(refValues.current, error.path, undefined)
          formik?.setFieldError(error.path, error.message)
          //   TODO: error del servicio permanezca hasta cambiar el texto
          //   formik?.setFormikState((prev) => {
          //     prev.status = setIn(prev.status, key, error.message)
          //     return prev
          //   })
        }
      })()
    })
  return { validate }
}

export default useOnBlurValidation
