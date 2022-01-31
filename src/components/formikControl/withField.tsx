/* eslint-disable indent */
/* eslint-disable no-extra-semi */
import { useFormikContext } from 'formik'
import React, { FC, useCallback } from 'react'

type OmitProps<T> = Omit<T, 'value' | 'onChange' | 'isSuccess' | 'onBlur' | 'error'>

function withField<P>(Component: FC<P>): FC<OmitProps<P>> {
  return (props: any) => {
    const { dependencies = [], name, style } = props
    const path = name?._PATH_ ?? name
    const {
      getFieldMeta,
      handleBlur,
      setFieldValue,
      isSubmitting,
      handleSubmit,
      submitCount
    } = useFormikContext()
    const { touched, error: currentError, value } = getFieldMeta(path) || {}
    const error = submitCount ? currentError : touched && currentError

    const onFocus = (e: any) => {
      props.onFocus?.(e)
    }

    const onBlur = (e: any) => {
      ;(handleBlur(path) as any)(e)
    }

    const onChange = (v: any) => {
      setFieldValue(path, v)
    }

    const onKeyPress = (e: any) => {
      if (e.keyCode === 13) handleSubmit()
      // if (e.keyCode === 9) e.preventDefault()
    }

    const isSuccess = !!(value && !currentError)
    const disabled = props.disabled === undefined ? isSubmitting : props.disabled
    const component = useCallback<any>(
      <Component
        {...props}
        name={path}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        error={error}
        isSuccess={isSuccess}
        onBlur={onBlur}
        disabled={disabled}
        onKeyPress={onKeyPress}
        setFieldValue={setFieldValue}
      />,
      [value, error, disabled, props.placeholder, isSuccess, style, ...dependencies]
    )
    return component
  }
}

export default withField
