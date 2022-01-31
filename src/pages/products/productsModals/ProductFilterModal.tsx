import React, { FunctionComponent as FC, useState } from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'

import Typography from 'components/typography'
import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import Dropdown from 'components/dropdown/Dropdown2'
import Icon from 'components/icon'
import DatePicker from 'components/textInput/components/InputDatePicker'
import TextInput from 'components/textInput'
import useTranslation from 'hooks/useTranslation'

type DropdownSingleProps = {
  style?: ViewStyle
  value: any
  items: { value: any; label: string }[]
  onChange: (val: any) => void
}

type RadioBtnProps = {
  items: { label: string; value: string }[]
  value: string
  onChange: (val: string) => void
}

const Arrow = ({ progress }: { progress: Animated.SharedValue<number> }) => {
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }]
    }
  })

  return (
    <Animated.View style={[{ width: 24, height: 24 }, style]}>
      <Icon name="arrowDown" color={colors.black} />
    </Animated.View>
  )
}

const DropdownSingle: FC<DropdownSingleProps> = (props) => {
  return (
    <Dropdown
      style={[
        {
          width: '60%'
        },
        props.style
      ]}
      multiple={false}
      items={props.items}
      value={props.value}
      showSearch={false}
      onChange={(val) => {
        props.onChange(val.value)
      }}
    >
      {({ progress, value: valueSelect }) => {
        return (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              height: 40,
              borderWidth: 1,
              borderColor: '#CCCCCC',
              borderRadius: 6
            }}
          >
            <Typography
              content={valueSelect ? valueSelect.label : 'select'}
              style={{ marginLeft: 12 }}
              size={fontSize.md}
              fontFamily={fonts.baloo2Regular400}
            />
            <Arrow progress={progress} />
          </View>
        )
      }}
    </Dropdown>
  )
}

const RadioBtnVoucher: FC<RadioBtnProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)

  return (
    <View style={styles.radiodBtnContainer}>
      {props.items.map((x, k) => (
        <TouchableOpacity
          key={k}
          onPress={() => props.onChange(x.value)}
          style={[
            styles.radioBtnElement,
            props.value === x.value
              ? { backgroundColor: colors.primary, borderColor: colors.primary }
              : { backgroundColor: colors.white, borderColor: colors.grayBorder }
          ]}
        >
          <Typography
            content={x.label}
            fontFamily={fonts.baloo2SemiBold600}
            size={fontSize.md}
            color={props.value === x.value ? colors.white : colors.grayBorder}
            disableThemeColor
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const RadioBtnState: FC<RadioBtnProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)

  return (
    <View style={styles.radiodBtnContainer}>
      {props.items.map((x, k) => (
        <TouchableOpacity
          key={k}
          onPress={() => props.onChange(x.value)}
          style={[
            styles.radioBtnBadgeElement,
            props.value === x.value
              ? { backgroundColor: colors.greenBadge, borderColor: colors.greenBadge }
              : { backgroundColor: colors.white, borderColor: colors.grayBorder }
          ]}
        >
          <Typography
            content={x.label}
            fontFamily={fonts.baloo2Regular400}
            size={fontSize.sm}
            color={props.value === x.value ? colors.white : colors.grayBorder}
            disableThemeColor
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const arrStores = [
  {
    label: 'Tienda 01',
    value: '1'
  }
]

const arrTimeOpt = [
  {
    label: 'Rango',
    value: 'r'
  },
  {
    label: 'Unica',
    value: 'u'
  }
]

const arrVouchers = [
  {
    label: 'N',
    value: 'n'
  },
  {
    label: 'B',
    value: 'b'
  },
  {
    label: 'F',
    value: 'f'
  },
  {
    label: 'NC',
    value: 'nc'
  }
]

const arrStates = [
  {
    label: 'Activo',
    value: 'ac'
  },
  {
    label: 'Anulado',
    value: 'an'
  },
  {
    label: 'No enviado',
    value: 'no'
  }
]

export const ProductFilterModal = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const [store, setStore] = useState('')
  const [flagMultipleDate, setFlagMultipleDate] = useState(false)
  const [flagMultipleAmount, setFlagMultipleAmount] = useState(false)
  const [date, setDate] = useState('')
  const [voucher, setVoucher] = useState('')
  const [stateClient, setStateClient] = useState('')
  const [amountStart, setAmountStart] = useState('')
  const [amountEnd, setAmountEnd] = useState('')

  const resetFilters = () => {
    setStore('')
    setFlagMultipleDate(false)
    setFlagMultipleAmount(false)
    setDate('')
    setVoucher('')
    setStateClient('')
    setAmountStart('')
    setAmountEnd('')
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeaderContainer}>
        <Typography
          fontFamily={fonts.baloo2Medium500}
          color={colors.gray}
          size={fontSize.md}
          content={t('prodFilterBy')}
        />
      </View>
      <View style={styles.modalBodyContainer}>
        <View style={[styles.modalField, { marginBottom: 0 }]}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('prodFilterStore')}
          />
          <DropdownSingle
            onChange={(val) => {
              setStore(val)
            }}
            value={store}
            items={arrStores}
          />
        </View>
        <View style={styles.modalField}>
          <Typography
            style={{
              marginTop: 16
            }}
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('prodFilterTime')}
          />
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <DropdownSingle
              style={{
                width: '40%',
                marginTop: 16
              }}
              onChange={(val) => {
                val === 'r' ? setFlagMultipleDate(true) : setFlagMultipleDate(false)
              }}
              value={flagMultipleDate ? 'r' : 'u'}
              items={arrTimeOpt}
            />
            <View
              style={{
                width: '50%'
              }}
            >
              <DatePicker
                value={date}
                multiple={flagMultipleDate}
                onChange={(val) => setDate(val)}
              />
            </View>
          </View>
        </View>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('prodFilterVocher')}
          />
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <RadioBtnVoucher
              items={arrVouchers}
              onChange={(val) => setVoucher(val)}
              value={voucher}
            />
          </View>
        </View>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('prodFilterState')}
          />
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <RadioBtnState
              items={arrStates}
              onChange={(val) => setStateClient(val)}
              value={stateClient}
            />
          </View>
        </View>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('prodFilterAmount')}
          />
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <DropdownSingle
              style={{
                width: '30%',
                marginTop: 16,
                marginRight: 8
              }}
              onChange={(val) => {
                val === 'r' ? setFlagMultipleAmount(true) : setFlagMultipleAmount(false)
              }}
              value={flagMultipleAmount ? 'r' : 'u'}
              items={arrTimeOpt}
            />
            {flagMultipleAmount ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Typography
                  style={{
                    marginTop: 16
                  }}
                  fontFamily={fonts.baloo2Medium500}
                  color={colors.gray}
                  size={fontSize.md}
                  content={'S/'}
                />
                <TextInput
                  style={{
                    width: '20%'
                  }}
                  value={amountStart}
                  onChange={(val) => {
                    const realExpReg = /^[0-9]+([.]([0-9]+)?)?$/
                    if (realExpReg.test(val) || val === '') {
                      setAmountStart(val)
                    }
                  }}
                />
                <Typography
                  style={{
                    marginTop: 16
                  }}
                  fontFamily={fonts.baloo2Medium500}
                  color={colors.gray}
                  size={fontSize.md}
                  content={'-'}
                />
                <Typography
                  style={{
                    marginTop: 16
                  }}
                  fontFamily={fonts.baloo2Medium500}
                  color={colors.gray}
                  size={fontSize.md}
                  content={'S/'}
                />
                <TextInput
                  style={{
                    width: '20%'
                  }}
                  value={amountEnd}
                  onChange={(val) => {
                    const realExpReg = /^[0-9]+([.]([0-9]+)?)?$/
                    if (realExpReg.test(val) || val === '') {
                      setAmountEnd(val)
                    }
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    style={{
                      marginTop: 16
                    }}
                    fontFamily={fonts.baloo2Medium500}
                    color={colors.gray}
                    size={fontSize.md}
                    content={'S/'}
                  />
                  <TextInput
                    value={amountStart}
                    onChange={(val) => {
                      const realExpReg = /^[0-9]+([.]([0-9]+)?)?$/
                      if (realExpReg.test(val) || val === '') {
                        setAmountStart(val)
                      }
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.modalFooterContainer}>
        <TouchableOpacity style={styles.btnClean} onPress={() => resetFilters()}>
          <Typography
            fontFamily={fonts.baloo2SemiBold600}
            color={colors.primary}
            size={fontSize.md}
            content={t('prodFilterClear')}
            disableThemeColor
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSearch}>
          <Typography
            fontFamily={fonts.baloo2SemiBold600}
            color={colors.white}
            size={fontSize.md}
            content={t('prodFilterSearch')}
            disableThemeColor
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const rStyles = StyleSheet.create({
  modalContainer: {
    width: '515',
    backgroundColor: colors.white,
    borderRadius: 10
  },
  modalHeaderContainer: {
    paddingLeft: 24,
    justifyContent: 'center',
    height: 48,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.grayLight
  },
  modalBodyContainer: {
    padding: 24
  },
  divider: {
    marginTop: 24,
    marginRight: 24,
    height: 1,
    width: '100%',
    backgroundColor: colors.grayBorder
  },
  modalField: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24
  },
  btnClean: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    height: 40,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 6,
    marginRight: 8
  },
  btnSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginLeft: 8
  },
  radiodBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  radioBtnElement: {
    width: 32,
    height: 32,
    borderRadius: 200,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  radioBtnBadgeElement: {
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  }
})
