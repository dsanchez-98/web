import React, { FunctionComponent as FC, useCallback, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import colors from 'styles/colors'
import TextInputBase from './TextInputBase'
import { TextInputProps } from '../types'
import Dropdown from 'components/dropdown/Dropdown2'
import Animated, { interpolate, useAnimatedStyle, getStyle } from 'components/reanimated'
import Typography from 'components/typography'
import { useConsultService } from 'services/finance'
import Theme from 'components/theme'

const Loading = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color={colors.primary} />
  </View>
)

const Arrow = ({ progress }: { progress: Animated.SharedValue<number> }) => {
  const style = useAnimatedStyle(() => {
    return getStyle({
      transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }]
    })
  })
  return (
    <Animated.View style={[{ width: 24, height: 24 }, style]}>
      <Theme.Icon name="arrow" />
    </Animated.View>
  )
}

type Value = {
  document: string
  documentType: number
}

type ResponseValues = {
  value: Value
  data: any
}

type Document = {
  label: string
  value: number | string
  maxLength: number
  validationAction?: 'consultRuc' | 'consultDni'
}
interface IInputDocument
  extends Omit<TextInputProps, 'value' | 'onChange' | 'error' | 'onSelectionChange'> {
  value: Value
  onChange: (value: Value) => void
  error?: Value
  setFieldValue?: (name: string, value: any) => void
  onSelectionChange?: (setFieldValue: IInputDocument['setFieldValue']) => void
  onResponse?: (
    response: ResponseValues | null,
    setFieldValue: IInputDocument['setFieldValue']
  ) => void
  typeDocuments: Document[]
}

const defaultPromise = (value: string) => new Promise((resolve) => resolve(true))

const useValidationDocument = () => {
  const service = useConsultService()
  return (validationAction: 'consultRuc' | 'consultDni') =>
    service[validationAction] || defaultPromise
}

const InputDocument: FC<IInputDocument> = (props) => {
  const {
    value: currValue,
    onChange,
    error: errors,
    onResponse,
    setFieldValue,
    onSelectionChange,
    style,
    typeDocuments = [],
    ...rest
  } = props
  const [loading, setLoading] = useState(false)
  const validation = useValidationDocument()
  const ref = useRef<any>()
  const refItem = useRef<Document>()

  const value =
    typeof currValue === 'object' ? currValue : { documentType: 2, document: '' }

  const onChangeText = async (text: string) => {
    const reg = /^\d+$/
    if ((!text || reg.test(text)) && text.length <= refItem.current?.maxLength!) {
      onChange?.({ ...value, document: text || '' })
      if (text.length === refItem.current?.maxLength) {
        try {
          setLoading(true)
          const response = await validation(refItem.current?.validationAction!)(text)
          setLoading(false)
          onResponse?.({ value: value, data: response.data }, setFieldValue)
        } catch (error) {
          setLoading(false)
        }
      } else {
        onResponse?.(null, setFieldValue)
        setLoading(false)
      }
    }
  }

  const onChangeDocument = (val: number, isSelected?: boolean) => {
    !isSelected && onChange?.({ document: '', documentType: val })
    setTimeout(() => {
      ref.current.focus()
    }, 400)
  }

  const leftContent = useCallback(() => {
    return (
      <Dropdown
        multiple={false}
        items={typeDocuments as any}
        value={value.documentType}
        onChange={(i) => {
          onChangeDocument(i.value)
          onSelectionChange?.(setFieldValue)
        }}
        style={{ height: '100%', justifyContent: 'center' }}
      >
        {({ progress, value }) => {
          refItem.current = value as any
          return (
            <View style={styles.containerLeft}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography content={value?.label || ''} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Arrow progress={progress} />
              </View>
            </View>
          )
        }}
      </Dropdown>
    )
  }, [typeDocuments, value.documentType])

  return (
    <TextInputBase
      {...rest}
      style={style}
      innerRef={ref}
      widthLeftComponent={70}
      leftContent={leftContent}
      onChange={onChangeText}
      value={value.document}
      keyboardType="number-pad"
      error={errors?.document}
      disabled={loading ? true : rest.disabled}
      rightContent={loading ? Loading : undefined}
      isSuccess={!!(value.document && !errors?.document)}
    />
  )
}

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: '#CCCCCC',
    height: 34
  }
})

export default InputDocument
