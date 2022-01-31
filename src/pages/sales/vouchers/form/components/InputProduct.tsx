import Animated, { useAnimatedStyle } from 'components/reanimated'
import Theme from 'components/theme'
import Typography from 'components/typography'
import useMeasure from 'hooks/core/useMeasure'
import React, { FunctionComponent as FC, useRef, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  TextInputProps,
  TouchableOpacity,
  TextInput,
  Pressable
} from 'react-native'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import { useContextForm } from '../ContextForm'
import useForceUpdate from 'hooks/core/useForceUpdate'
import Icon from 'components/icon'
import { useResponsiveStyles } from 'components/responsiveLayout'
import useAppContext from 'hooks/useAppContext'
import useTranslation from 'hooks/useTranslation'

interface Props extends TextInputProps {
  clone?: boolean
  label?: string
  onPress?: () => void
  hideModal?: () => void
}

export const HEIGHT = 60
const RemoveProducts = ({ isMobile }) => {
  const { t } = useTranslation()
  const { addedProducts } = useContextForm()
  const { showModal } = useAppContext()
  return (
    <Theme.TouchableOpacity
      scheme="primary"
      style={{
        borderWidth: 1,
        borderColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        marginLeft: 10,
        paddingHorizontal: 5,
        height: 37,
        alignSelf: 'flex-end'
      }}
      onPress={() => {
        if (!addedProducts.value.length) {
          return
        }
        showModal({
          title: t('vouFormAlert'),
          message: t('vouFormCleanCartQ'),
          onAccept: () => {
            addedProducts.removeAll()
          },
          onCancel: () => {}
        })
      }}
    >
      <Icon name="delete" color={colors.red} />
      {!isMobile && (
        <Typography
          content={t('vouFormCleanCart')}
          disableThemeColor
          color={colors.red}
        />
      )}
    </Theme.TouchableOpacity>
  )
}
const InputProduct: FC<Props> = (props) => {
  const { label, style, onPress, ...rest } = props
  const { t } = useTranslation()
  const { modalProducts, products } = useContextForm()
  const refView = useRef<Animated.View>(null)
  const { getMeasure } = useMeasure(refView)
  const forceUpdate = useForceUpdate()
  const { isMobile } = useResponsiveStyles({})
  const [searchBarcode, setSearchBarcode] = useState(false)

  const show = async () => {
    if (!props.clone) {
      const measure = await getMeasure()
      modalProducts.current.show(
        InputProduct,
        measure || { height: 0, width: 0, y: 0, x: 0 }
      )
    }
  }
  const Wrapper = (props.clone || searchBarcode ? View : Theme.TouchableOpacity) as any

  const styleContainer = useAnimatedStyle(() => {
    const progress = modalProducts.current?.progress?.value || 0
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
        <Typography
          content={t('vouFormProduct')}
          size={fontSize.xs}
          numberOfLines={1}
          // style={{ height: 15 }}
        />
        <Theme.View scheme={'primary'} style={styles.inputContainer}>
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
          <Wrapper onPress={show} style={{ flex: 1 }}>
            <Theme.TextInput
              placeholder={t('vouFormSearchProduct')}
              style={styles.textInput}
              {...rest}
              numberOfLines={1}
              autoCorrect={false}
              autoCompleteType="off"
              keyboardType="web-search"
              editable={!!props.clone || searchBarcode}
            />
          </Wrapper>
          {isMobile && (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10
              }}
              onPress={() => {
                setSearchBarcode((p) => !p)
              }}
            >
              {searchBarcode ? <Icon name="equis" /> : <Theme.Icon name="barcode" />}
            </TouchableOpacity>
          )}
        </Theme.View>
      </View>
      {!isMobile && <BarcodeInput hideModal={props.hideModal} />}
      <RemoveProducts isMobile={isMobile} />
    </Animated.View>
  )
}

const BarcodeInput = ({ hideModal }) => {
  const { products, addedProducts } = useContextForm()
  const { t } = useTranslation()
  const [value, setBarcode] = useState('')
  const ref = useRef<TextInput>()

  return (
    <View style={{ flex: 1, marginLeft: 10, alignSelf: 'flex-end' }}>
      <Typography content={t('vouFormProd')} size={fontSize.xs} numberOfLines={1} />
      <Theme.View style={styles.inputContainer} scheme="primary">
        <Theme.TextInput
          innerRef={ref}
          placeholder={t('vouFormShot')}
          style={styles.textInput}
          numberOfLines={1}
          autoCorrect={false}
          autoCompleteType="off"
          keyboardType="web-search"
          onChangeText={setBarcode}
          value={value}
          onFocus={() => {
            hideModal?.()
          }}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              const product = products.value.find(({ barcode }) => `${barcode}` === value)
              if (product) {
                addedProducts.add(product)
                setBarcode('')
              } else {
                // TODO: buscar por servicio
                alert(t('vouFormNotFound'))
              }
              setTimeout(() => {
                ref.current?.focus()
              }, 10)
            }
          }}
        />
      </Theme.View>
    </View>
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

export default InputProduct
