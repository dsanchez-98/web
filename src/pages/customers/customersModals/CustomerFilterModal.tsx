import React, { useEffect, useState, FunctionComponent as FC } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'

import Typography from 'components/typography'
import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import Dropdown from 'components/dropdown/Dropdown2'
import Icon from 'components/icon'

import useUbigeo from 'hooks/useUbigeo'
import useTranslation from 'hooks/useTranslation'

type DropdownSingleProps = {
  value: any
  items: { value: any; label: string }[]
  onChange: (val: any) => void
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
      style={{
        width: '60%'
      }}
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

const arrTypeClient = [
  {
    label: 'Cliente/Proveedor',
    value: 'cli'
  }
]

export const FilterModal = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const [typeClient, setTypeClient] = useState('')
  const [department, setDepartment] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')

  const { state, getDepartment, getProvince, getDistrict } = useUbigeo()
  useEffect(() => {
    getDepartment(2533)
  }, [])

  const resetFilters = () => {
    setTypeClient('')
    setDepartment('')
    setProvince('')
    setDistrict('')
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeaderContainer}>
        <Typography
          fontFamily={fonts.baloo2Medium500}
          color={colors.gray}
          size={fontSize.md}
          content={t('clientModalFilterBy')}
        />
      </View>
      <View style={styles.modalBodyContainer}>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('clientModalTypeClient')}
          />
          <DropdownSingle
            onChange={(val) => {
              setTypeClient(val)
            }}
            value={typeClient}
            items={arrTypeClient}
          />
        </View>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('clientModalDept')}
          />
          <DropdownSingle
            onChange={(val) => {
              setDepartment(val)
              getProvince(val)
            }}
            value={department}
            items={state.department}
          />
        </View>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('clientModalProv')}
          />
          <DropdownSingle
            onChange={(val) => {
              setProvince(val)
              getDistrict(val)
            }}
            value={province}
            items={state.province}
          />
        </View>
        <View style={styles.modalField}>
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={colors.gray}
            size={fontSize.md}
            content={t('clientModalDist')}
          />
          <DropdownSingle
            onChange={(val) => {
              setDistrict(val)
            }}
            value={district}
            items={state.district}
          />
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.modalFooterContainer}>
        <TouchableOpacity style={styles.btnClean} onPress={() => resetFilters()}>
          <Typography
            fontFamily={fonts.baloo2SemiBold600}
            color={colors.primary}
            size={fontSize.md}
            content={t('clientModalClear')}
            disableThemeColor
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSearch}>
          <Typography
            fontFamily={fonts.baloo2SemiBold600}
            color={colors.white}
            size={fontSize.md}
            content={t('clientModalSearch')}
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
    marginTop: 55,
    marginRight: 24,
    height: 1,
    width: '100%',
    backgroundColor: colors.grayBorder
  },
  modalField: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
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
  }
})
