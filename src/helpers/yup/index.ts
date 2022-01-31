import * as Yup from 'yup'
import { isValidPhoneNumber } from 'helpers'

Yup.addMethod(Yup.string, 'phone', function (message, countryCode) {
  return this.test({
    name: 'phone',
    message,
    test: (value) => isValidPhoneNumber(value, countryCode)
  })
})
