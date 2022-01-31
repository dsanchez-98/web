import Animated, { useAnimatedStyle } from 'components/reanimated'
import Theme from 'components/theme'
import Typography from 'components/typography'
import useMeasure from 'hooks/core/useMeasure'
import React, { FunctionComponent as FC, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  TextInputProps,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import { useContextForm } from '../ContextForm'
import ButtonGenericCustomer from './ButtonGenericCustomer'
import useForceUpdate from 'hooks/core/useForceUpdate'
import { getResponsiveLayout } from 'components/responsiveLayout/common'
import DocumentType from './DocumentType'
import useTranslation from 'hooks/useTranslation'
interface Props extends TextInputProps {
  clone?: boolean
  label?: string
  onPress?: () => void
  hideModal?: () => void
}
export const HEIGHT = 60

const InputCustomer: FC<Props> = (props) => {
  const { label, style, onPress, ...rest } = props
  const { t } = useTranslation()
  const { customer, modalCustomers } = useContextForm()
  const refView = useRef<Animated.View>(null)
  const { getMeasure } = useMeasure(refView)
  const forceUpdate = useForceUpdate()
  customer.hookSetListener()

  const show = async () => {
    if (!props.clone) {
      const measure = await getMeasure()
      modalCustomers.current.show(
        InputCustomer,
        measure || { height: 0, width: 0, y: 0, x: 0 }
      )
    }
  }
  const Wrapper = props.clone ? Theme.View : Theme.TouchableOpacity

  const styleContainer = useAnimatedStyle(() => {
    const progress = modalCustomers.current?.progress?.value || 0
    return {
      opacity: progress ? 0 : 1
    }
  })

  useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <Animated.View
      ref={refView}
      style={[styles.container, !props.clone ? styleContainer : {}]}
      onLayout={() => {}}
    >
      <View style={{ flex: 1, alignSelf: 'flex-end' }}>
        <Typography content={t('vouFormClient')} size={fontSize.xs} numberOfLines={1} />
        <Wrapper scheme={'primary'} style={styles.inputContainer} onPress={show}>
          <TouchableOpacity
            style={{
              padding: 5,
              opacity: props.clone ? 1 : 0,
              transform: [{ rotate: '90deg' }]
            }}
            onPress={() => props.hideModal?.()}
          >
            <Theme.Icon name="arrow" />
          </TouchableOpacity>
          <Theme.TextInput
            value={customer.value?.name || ''}
            placeholder={t('vouFormSearchClient')}
            style={styles.textInput}
            {...rest}
            numberOfLines={1}
            autoCorrect={false}
            autoCompleteType="off"
            keyboardType="web-search"
            editable={!!props.clone}
          />
        </Wrapper>
      </View>
      <ButtonGenericCustomer
        style={{ marginLeft: 10, alignSelf: 'flex-end' }}
        select={customer.value?.id === -1}
        onPress={() => {
          const newValue =
            customer.value?.id === -1
              ? undefined
              : { name: t('vouFormGenericClient'), id: -1 }

          customer.value = newValue
        }}
      />
      <DocumentType style={{ alignSelf: 'flex-end' }} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: HEIGHT
  },
  textInput: {
    height: 35,
    flex: 1,
    paddingHorizontal: 5,
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  },
  inputContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.borderGray,
    flexDirection: 'row'
  }
})

export default InputCustomer
