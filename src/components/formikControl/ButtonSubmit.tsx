import Button, { ButtonProps } from 'components/button'
import { useFormikContext } from 'formik'
import React, { FunctionComponent as FC } from 'react'

export * from 'components/button/types'

const ButtonSubmit: FC<ButtonProps> = (props) => {
  const { handleSubmit, dirty, isValid, isSubmitting } = useFormikContext()

  return (
    <Button
      {...props}
      disabled={isSubmitting || !dirty || !isValid}
      // disabled={isSubmitting}
      loading={isSubmitting}
      onPress={() => {
        handleSubmit()
      }}
    />
  )
}

export default ButtonSubmit
