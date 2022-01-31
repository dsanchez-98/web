import React, { useEffect, FunctionComponent as FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import Icon from 'components/icon'
import Typography from 'components/typography'
import PopoverView from 'components/popoverView'
import FormikControl from 'components/formikControl'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'

import fonts from 'styles/fonts'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'

import { ClientAlternativeProps } from '../form/Form'
import useTranslation from 'hooks/useTranslation'
import useUbigeo from 'hooks/useUbigeo'

interface SucursalSectionProps {
  name: string
  value?: any
  onChange: (value: any[]) => void
}

const getLocation = (location: any = {}) => {
  console.log('location', location)
  if (!location) {
    return undefined
  }
  const { parent: parentDistrict = {}, ...district } = location
  const { parent: parentProvince = {}, ...province } = parentDistrict
  const { parent: parentCountry = {}, ...department } = parentProvince
  const { ...country } = parentCountry
  return {
    department: [{ label: department.name, value: department.id }],
    province: [{ label: province.name, value: province.id }],
    district: [{ label: district.name, value: district.id }],
    country: [{ label: country.name, value: country.id }],
    current: {
      countryId: country.id,
      departmentId: department.id,
      provinceId: province.id,
      districtId: district.id
    }
  }
}

const Localization = ({ location, name }: { location: any; name: string }) => {
  const initialLocation = getLocation(location)
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const { state, setCurrent, getDepartment, getProvince, getDistrict } =
    useUbigeo(initialLocation)
  useEffect(() => {
    getDepartment(2533)
  }, [])

  return (
    <>
      <View style={styles.formContainer}>
        <FormikControl
          control="dropdown"
          name={`${name}.department`}
          placeholder={t('clientFieldDept')}
          dependencies={[state]}
          items={state.department}
          showSearch
          onPress={() =>
            state.current.countryId && getDepartment(state.current.countryId)
          }
          onItemSelect={(item, setFieldValue) => {
            if (item.value !== state.current.departmentId) {
              setCurrent('department', item.value)
              setCurrent('province', 0)
              setCurrent('district', 0)
              getProvince(item.value)
              setFieldValue?.(`${name}.province`, '')
              setFieldValue?.(`${name}.locationId`, '')
            }
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <FormikControl
          control="dropdown"
          name={`${name}.province`}
          placeholder={t('clientFieldProv')}
          dependencies={[state]}
          items={state.province}
          showSearch
          onPress={() => {
            state.current.departmentId && getProvince(state.current.departmentId)
          }}
          onItemSelect={(item, setFieldValue) => {
            if (item.value !== state.current.provinceId) {
              setCurrent('province', item.value)
              setCurrent('district', 0)
              getDistrict(item.value)
              setFieldValue?.(`${name}.locationId`, '')
            }
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <FormikControl
          control="dropdown"
          name={`${name}.locationId`}
          style={{ width: '100%' }}
          placeholder={t('clientFieldDist')}
          showSearch
          dependencies={[state]}
          items={state.district}
          onPress={() => {
            state.current.provinceId && getDistrict(state.current.provinceId)
          }}
          onItemSelect={(item) => {
            if (item.value !== state.current.districtId) {
              setCurrent('district', item.value)
            }
          }}
        />
      </View>
    </>
  )
}

const SucursalSection: FC<SucursalSectionProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()

  const remove = (index: number) => {
    props.onChange(props.value.filter((x: any, i: number) => i !== index))
  }

  const add = () => {
    props.onChange([
      ...props.value,
      {
        name: '',
        locationId: null,
        address: ''
      }
    ])
  }

  return (
    <View>
      <View style={{ marginTop: 24, flexDirection: 'row', alignItems: 'center' }}>
        <Typography
          content={t('clientFieldAltDir')}
          style={{ marginRight: 8 }}
          size={styles.textDirFis.fontSize}
          fontFamily={fonts.baloo2Medium500}
        />
        <TouchableOpacity
          onPress={() => {
            add()
          }}
          style={{
            width: 24,
            height: 24,
            marginRight: 10,
            borderRadius: 200,
            backgroundColor: '#4DA0FF',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon name="add" width="16" height="16" color="#FFFFFF" />
        </TouchableOpacity>
        <PopoverView
          heightPopover={98}
          widthPopover={310}
          content={
            <View style={{ padding: 12 }}>
              <View>
                <Typography
                  content={t('clientAlterDirTitle')}
                  size={fontSize.xs}
                  fontFamily={fonts.baloo2Medium500}
                />
              </View>
              <View>
                <Typography
                  style={{ lineHeight: 14 }}
                  content={t('clientAlterDirBody')}
                  size={fontSize.xs}
                  fontFamily={fonts.baloo2Regular400}
                />
              </View>
            </View>
          }
        >
          <Icon name="helpcenter" color="#573199" width="20" height="20" />
        </PopoverView>
      </View>
      {props.value.map((x: ClientAlternativeProps, index: number) => (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              flexWrap: 'wrap'
            }}
          >
            <View style={styles.fieldSucursal}>
              <FormikControl
                name={`clientAlternativeDirections[${index}].name`}
                control="textInput"
                placeholder={t('clientFieldBraName')}
              />
            </View>
            <TouchableOpacity onPress={() => remove(index)} style={styles.iconDelete}>
              <Icon name="delete" color="#2A2D45" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <Localization location={x.location} name={`${props.name}[${index}]`} />
            <View style={styles.formContainer}>
              <FormikControl
                name={`clientAlternativeDirections[${index}].address`}
                control="textInput"
                placeholder={t('clientFieldAdd')}
              />
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      ))}
    </View>
  )
}

const rStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    flexDirection: 'column'
  },
  typeOperationContainer: {
    width: '100% md:30%',
    marginTop: 16
  },
  thirdFormContainer: {
    width: '100% md:30%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fourthFormContainer: {
    width: '100% md:20%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fieldName: {
    fontSize: 12
  },
  compraVentaChecksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60% md:100% lg:70% xl:60%',
    justifyContent: 'space-between',
    height: 40
  },
  checkLabel: {
    fontSize: 16
  },
  midFormContainer: {
    width: '100% md:48%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textDirFis: {
    fontSize: fontSize.md
  },
  formContainer: {
    width: '100% md:20%'
  },
  divider: {
    marginTop: 24,
    height: 1,
    width: '100%',
    backgroundColor: colors.grayBorder
  },
  fieldSucursal: {
    width: '90% lg:95%'
  },
  iconDelete: {
    width: '10% lg:5%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default SucursalSection
