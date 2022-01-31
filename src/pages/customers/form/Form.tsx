import { View } from 'react-native'
import React, { FunctionComponent as FC, useEffect, useRef, useState } from 'react'

import * as Yup from 'yup'

import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import FormikControl from 'components/formikControl'
import Typography from 'components/typography'
import TextInputArea from 'components/textInputArea'
import Icon from 'components/icon'
import PopoverView from 'components/popoverView'
import ScrollView from 'components/scrollView'
import Toolbar from 'components/toolbar'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import Theme from 'components/theme'
import FormButtons from 'components/searchList/componets/FormButtons'

import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import { shadow } from 'styles/shadow'

import useTranslation from 'hooks/useTranslation'

import SucursalSection from '../customersComponents/SucursalSection'
import BaseForm from 'components/baseForm'
import { useClientService } from 'services/sales'
import { RequestCreateClient } from 'services/sales/client/type'
import { CUSTOMER_LIST, PROVIDER_LIST } from '../list'
import useUbigeo, { getLocation } from 'hooks/useUbigeo'
import { useRoute } from '@react-navigation/native'
import { CREATE_CUSTOMER, SHOW_CUSTOMER } from '.'
import { useProviderService } from 'services/im'
import { RequestCreateProvider } from 'services/im/provider/type'
import useAppContext from 'hooks/useAppContext'
import { identityDocumentType } from 'constants/core'
import { AlternativeDirection } from 'services/types/Client'

export interface ClientAlternativeProps extends AlternativeDirection {
  province: number | null
  department: number | null
}

type ClientProps = {
  documentObj: {
    documentType: number
    document: string
  }
  locationId: any
  department: any
  province: any
  code: string
  name: string
  lastname: string
  phone: string
  email: string
  businessReason: string
  businessName: string
  contactName: string
  address: string
  note: string
  birthday: string
  clientAlternativeDirections: ClientAlternativeProps[]
}

const formatDate = (fecha: Date) => {
  const d = fecha
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('/')
}

const Localization = ({ initialLocation }: { initialLocation: any }) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const { state, setCurrent, getDepartment, getProvince, getDistrict } =
    useUbigeo(initialLocation)
  useEffect(() => {
    getDepartment(2533)
  }, [])

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <View style={styles.formContainer}>
        <FormikControl
          control="dropdown"
          name="department"
          style={{ width: '100%' }}
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
              setFieldValue?.('province', '')
              setFieldValue?.('locationId', '')
            }
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <FormikControl
          control="dropdown"
          name="province"
          style={{ width: '100%' }}
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
              setFieldValue?.('locationId', '')
            }
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <FormikControl
          control="dropdown"
          name="locationId"
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
      <View style={styles.formContainer}>
        <FormikControl
          control="textInput"
          name="address"
          placeholder={t('clientFieldAdd')}
        />
      </View>
    </View>
  )
}

const Customers: FC<any> = () => {
  const formikRef = useRef(null)
  const { name, params } = useRoute<any>()
  const [flagNamesResponsive, setFlagNamesResponsive] = useState(false)
  const flagClientRoute = name === CREATE_CUSTOMER || name === SHOW_CUSTOMER
  const flagEditableDocument = params.id

  const { showClient, createClient, updateClient } = useClientService()
  const { showProvider, createProvider, updateProvider } = useProviderService()
  const { styles } = useResponsiveStyles(rStyles)
  const [location, setLocation] = useState<any>()
  const { isMobile } = useResponsiveStyles({})
  const { setLoading } = useAppContext()
  const { t } = useTranslation()

  const customerFormInitialValues: ClientProps = {
    documentObj: {
      documentType: identityDocumentType.dni,
      document: ''
    },
    locationId: '',
    department: '',
    province: '',
    code: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    businessReason: '',
    businessName: '',
    contactName: '',
    address: '',
    note: '',
    birthday: '',
    clientAlternativeDirections: []
  }

  const validationCustomerSchema = Yup.object().shape({
    documentObj: Yup.object().shape({
      document: Yup.string().required(t('valReq')),
      documentType: Yup.number().required(t('valReq'))
    }),
    code: Yup.string()
      .trim()
      .min(6, `${t('valMinLeng')} 6 ${t('characters')}`)
      .matches(/^([0-9])*$/, t('valNum'))
      .required(t('valReq')),
    name: Yup.string().when('documentObj.documentType', {
      is: identityDocumentType.dni,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    lastname: Yup.string().when('documentObj.documentType', {
      is: identityDocumentType.dni,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    phone: Yup.string()
      .min(9, `${t('valMinLeng')} 9 ${t('characters')}`)
      .matches(/^([0-9])*$/, t('valNum'))
      .required(t('valReq')),
    email: Yup.string().trim().email(t('valEmail')).required(t('valReq')),
    businessReason: Yup.string().when('documentObj.documentType', {
      is: identityDocumentType.ruc,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    businessName: Yup.string().when('documentObj.documentType', {
      is: identityDocumentType.ruc,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    birthday: Yup.string().when('documentObj.documentType', {
      is: identityDocumentType.dni,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    contactName: Yup.string().when('documentObj.documentType', {
      is: '1',
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    note: Yup.string().trim().required(t('valReq')),
    locationId: Yup.string().trim().required(t('valReq')),
    department: Yup.string().trim().required(t('valReq')),
    province: Yup.string().trim().required(t('valReq')),
    address: Yup.string().trim().required(t('valReq')),
    clientAlternativeDirections: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().trim().required(t('valReq')),
        address: Yup.string().trim().required(t('valReq')),
        department: Yup.string().trim().required(t('valReq')),
        province: Yup.string().trim().required(t('valReq')),
        locationId: Yup.number().required(t('valReq'))
      })
    )
  })

  const onSubmitClient = async (val: ClientProps, { setSubmitting }: any) => {
    setLoading(true)
    if (flagClientRoute) {
      const newClientData: RequestCreateClient = {
        address: val.address,
        birthday: val.birthday.split('/').reverse().join('-'),
        businessName: val.businessName,
        businessReason: val.businessReason,
        clientAlternativeDirections: val.clientAlternativeDirections.map((x) => {
          return {
            address: x.address,
            locationId: x.locationId,
            name: x.name
          }
        }),
        code: val.code,
        contactName: val.contactName,
        contributorId: val.documentObj.document,
        email: val.email,
        identityDocumentTypeId: val.documentObj.documentType,
        lastname: val.lastname,
        locationId: val.locationId,
        name: val.name,
        note: val.note,
        phone: val.phone
      }
      if (params.id) {
        try {
          await updateClient({ data: newClientData, id: params.id })
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await createClient(newClientData)
        } catch (error) {
          console.log(error)
        }
      }
      setSubmitting(false)
      navigation.navigate(CUSTOMER_LIST)
    } else {
      const newProviderData: RequestCreateProvider = {
        address: val.address,
        birthday: val.birthday.split('/').reverse().join('-'),
        businessName: val.businessName,
        businessReason: val.businessReason,
        providerAlternativeDirections: val.clientAlternativeDirections.map((x) => {
          return {
            address: x.address,
            locationId: x.locationId,
            name: x.name
          }
        }),
        code: val.code,
        contactName: val.contactName,
        senderId: val.documentObj.document,
        email: val.email,
        identityDocumentTypeId: val.documentObj.documentType,
        lastname: val.lastname,
        locationId: val.locationId,
        name: val.name,
        note: val.note,
        phone: val.phone
      }
      if (params.id) {
        try {
          await updateProvider({ data: newProviderData, id: params?.id })
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await createProvider(newProviderData)
        } catch (error) {
          console.log(error)
        }
      }
      setSubmitting(false)
      navigation.navigate(PROVIDER_LIST)
    }
    setLoading(false)
  }

  return (
    <BaseForm
      callService={async (id: string) => {
        try {
          if (flagClientRoute) {
            const clientData = await showClient(id)
            const location = getLocation(clientData.data.location)
            if (location) {
              setLocation({
                country: [location.country],
                department: [location.department],
                province: [location.province],
                district: [location.district],
                current: {
                  countryId: location.country.value,
                  departmentId: location.department.value,
                  provinceId: location.province.value,
                  districtId: location.district.value
                }
              })
            }
            const birthDay = new Date(clientData.data.birthday)
            const toEditClientData: ClientProps = {
              documentObj: {
                documentType: clientData.data.contributor.identityDocumentTypeId,
                document: clientData.data.contributor.id.toString()
              },
              locationId: clientData.data.locationId,
              province: clientData.data.location.parent?.id || null,
              department: clientData.data.location.parent?.parent?.id || null,
              code: clientData.data.code,
              name: clientData.data.name || '',
              lastname: clientData.data.lastname,
              phone: clientData.data.phone,
              email: clientData.data.email,
              businessReason: clientData.data.businessReason,
              businessName: clientData.data.businessName,
              birthday: formatDate(birthDay),
              contactName: clientData.data.contactName,
              note: clientData.data.note,
              address: clientData.data.address,
              clientAlternativeDirections: clientData.data.clientAlternativeDirections
                .length
                ? clientData.data.clientAlternativeDirections.map((x) => {
                    const location = getLocation(x.location)
                    return {
                      ...x,
                      department: location?.department.value,
                      province: location?.province.value,
                      locationId: location?.district.value
                    }
                  })
                : []
            }
            return toEditClientData
          } else {
            const clientData = await showProvider(id)
            const location = getLocation(clientData.data.location)
            if (location) {
              setLocation({
                country: [location.country],
                department: [location.department],
                province: [location.province],
                district: [location.district],
                current: {
                  countryId: location.country.value,
                  departmentId: location.department.value,
                  provinceId: location.province.value,
                  districtId: location.district.value
                }
              })
            }
            const birthDay = new Date(clientData.data.birthday)
            const toEditProviderData: ClientProps = {
              documentObj: {
                documentType: clientData.data.sender.identityDocumentTypeId,
                document: clientData.data.sender.id.toString()
              },
              locationId: clientData.data.locationId,
              province: clientData.data.location.parent?.id || null,
              department: clientData.data.location.parent?.parent?.id || null,
              code: clientData.data.code,
              name: clientData.data.name || '',
              lastname: clientData.data.lastname,
              phone: clientData.data.phone,
              email: clientData.data.email,
              businessReason: clientData.data.businessReason,
              businessName: clientData.data.businessName,
              birthday: formatDate(birthDay),
              contactName: clientData.data.contactName,
              note: clientData.data.note,
              address: clientData.data.address,
              clientAlternativeDirections: clientData.data.providerAlternativeDirections
                .length
                ? clientData.data.providerAlternativeDirections.map((x) => {
                    const location = getLocation(x.location)
                    return {
                      ...x,
                      clientId: x.providerId,
                      department: location?.department.value,
                      province: location?.province.value,
                      locationId: location?.district.value
                    }
                  })
                : []
            }
            return toEditProviderData
          }
        } catch (error) {
          console.log(error)
          return null
        }
      }}
      innerRef={formikRef}
      initialValues={customerFormInitialValues}
      onSubmit={onSubmitClient}
      validationSchema={validationCustomerSchema}
    >
      <ScrollView
        renderToolbar={() => <Toolbar />}
        renderHeader={() => (
          <HeaderBar
            navigationText={
              <NavigationText
                path={
                  flagClientRoute
                    ? params.id
                      ? t('clientEditPath')
                      : t('clientNewPath')
                    : params.id
                    ? t('providerEditPath')
                    : t('providerNewPath')
                }
              />
            }
            rigthContent={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <FormButtons
                  hideSave={true}
                  minimal={isMobile}
                  onPressCancel={() => {
                    if (flagClientRoute) {
                      navigation.navigate(CUSTOMER_LIST)
                    } else {
                      navigation.navigate(PROVIDER_LIST)
                    }
                  }}
                  cancelText={t('cancel')}
                  confirmText={
                    flagClientRoute
                      ? params.id
                        ? t('clientEditSubBtn')
                        : t('clientNewSubBtn')
                      : params.id
                      ? t('providerEditSubBtn')
                      : t('providerNewSubBtn')
                  }
                />
                <FormikControl
                  style={{
                    height: 35,
                    width: 'auto',
                    paddingHorizontal: 8
                  }}
                  control="buttonSubmit"
                  type="primary"
                  title={
                    flagClientRoute
                      ? params.id
                        ? t('clientEditSubBtn')
                        : t('clientNewSubBtn')
                      : params.id
                      ? t('providerEditSubBtn')
                      : t('providerNewSubBtn')
                  }
                />
              </View>
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      >
        <Theme.View
          scheme={isMobile ? 'background' : 'primary'}
          style={[{ marginHorizontal: isMobile ? 0 : 15, flex: 1 }, shadow]}
        >
          <View
            style={{
              borderRadius: 10
            }}
          >
            <View style={styles.mainContainer}>
              <View style={styles.wrapContainer}>
                <View style={styles.midFormContainer}>
                  <FormikControl
                    disabled={flagEditableDocument}
                    typeDocuments={[
                      {
                        label: 'RUC',
                        maxLength: 11,
                        validationAction: 'consultRuc',
                        value: identityDocumentType.ruc
                      },
                      {
                        label: 'DNI',
                        maxLength: 8,
                        validationAction: 'consultDni',
                        value: identityDocumentType.dni
                      }
                    ]}
                    control="document"
                    style={{ width: '100%' }}
                    name="documentObj"
                    placeholder={t('clientFieldNumDoc')}
                    onSelectionChange={(setFieldValue: any) => {
                      setFieldValue?.('name', '')
                      setFieldValue?.('lastname', '')
                      setFieldValue?.('businessReason', '')
                      setFieldValue?.('birthday', '')
                      setFlagNamesResponsive(false)
                    }}
                    onResponse={(response, setFieldValue) => {
                      if (response?.data) {
                        if (response?.value.documentType === identityDocumentType.dni) {
                          setFieldValue?.('name', response?.data?.name)
                          setFieldValue?.(
                            'lastname',
                            `${response?.data?.paternalSurname} ${response?.data?.maternalSurname}`
                          )
                          setFlagNamesResponsive(true)
                        } else if (
                          response?.value.documentType === identityDocumentType.ruc
                        ) {
                          setFieldValue?.('businessReason', response?.data?.razonSocial)
                          setFlagNamesResponsive(true)
                        }
                      } else {
                        setFieldValue?.('name', '')
                        setFieldValue?.('lastname', '')
                        setFieldValue?.('businessReason', '')
                        setFlagNamesResponsive(false)
                      }
                    }}
                  />
                </View>
                <View style={styles.midFormContainer}>
                  <FormikControl
                    style={{ width: '100%' }}
                    name="code"
                    control="textInput"
                    placeholder={
                      flagClientRoute
                        ? t('clientFieldClientCode')
                        : t('providerFieldProviderCode')
                    }
                  />
                </View>
              </View>
              <FormikControl
                name="documentObj.documentType"
                dependencies={[styles]}
                styles={styles}
                component={({ value, styles }: { value: number }) => {
                  const flagDNIdocument = value === identityDocumentType.dni
                  return (
                    <View style={styles.wrapContainer}>
                      <View style={styles.midFormContainer}>
                        <FormikControl
                          disabled={flagNamesResponsive || flagEditableDocument}
                          style={{ width: '100%' }}
                          name={!flagDNIdocument ? 'businessReason' : 'name'}
                          control="textInput"
                          placeholder={
                            !flagDNIdocument
                              ? t('clientFieldClientBusiName')
                              : flagClientRoute
                              ? t('clientFieldClientName')
                              : t('providerFieldProviderName')
                          }
                        />
                      </View>
                      <View
                        style={[
                          styles.midFormContainer,
                          !flagDNIdocument ? { display: 'none' } : {}
                        ]}
                      >
                        <FormikControl
                          style={{ width: '100%' }}
                          disabled={flagNamesResponsive || flagEditableDocument}
                          name={'lastname'}
                          control="textInput"
                          placeholder={
                            flagClientRoute
                              ? t('clientFieldClientLast')
                              : t('providerFieldProviderLast')
                          }
                        />
                      </View>
                      <View
                        style={[
                          styles.midFormContainer,
                          !flagDNIdocument ? {} : { display: 'none' }
                        ]}
                      >
                        <FormikControl
                          style={{ width: '100%' }}
                          name={'businessName'}
                          control="textInput"
                          placeholder={t('clientFieldClientTrade')}
                        />
                      </View>
                      <View
                        style={[
                          styles.thirdFormContainer,
                          !flagDNIdocument ? { display: 'flex' } : { display: 'none' }
                        ]}
                      >
                        <FormikControl
                          style={{ width: '100%' }}
                          name="contactName"
                          control="textInput"
                          placeholder={t('clientFieldContPer')}
                        />
                      </View>
                      <View
                        style={[
                          styles.thirdFormContainer,
                          !flagDNIdocument ? { display: 'none' } : {}
                        ]}
                      >
                        <FormikControl
                          name="birthday"
                          control="datePicker"
                          placeholder={t('clientFieldDate')}
                          multiple={false}
                        />
                      </View>
                      <View style={styles.thirdFormContainer}>
                        <FormikControl
                          style={{ width: '100%' }}
                          name="phone"
                          control="textInput"
                          placeholder={t('clientFieldClientNumCon')}
                        />
                      </View>
                      <View style={styles.thirdFormContainer}>
                        <FormikControl
                          style={{ width: '100%' }}
                          name="email"
                          control="textInput"
                          placeholder={t('clientFieldEmail')}
                        />
                      </View>
                    </View>
                  )
                }}
              />
              <Typography
                content={t('clientFieldNote')}
                style={{ marginTop: 24 }}
                size={styles.fieldName.fontSize}
                fontFamily={fonts.baloo2Medium500}
              />
              <FormikControl
                placeholder={t('prodFieldDesc')}
                name="note"
                component={TextInputArea}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                <Typography
                  content={t('clientFieldAdFis')}
                  style={{ marginRight: 10 }}
                  size={styles.textDirFis.fontSize}
                  fontFamily={fonts.baloo2Medium500}
                />
                <PopoverView
                  heightPopover={122}
                  widthPopover={310}
                  content={
                    <View style={{ padding: 12 }}>
                      <View>
                        <Typography
                          content={t('clientTaxAddTitle')}
                          size={fontSize.xs}
                          fontFamily={fonts.baloo2Medium500}
                        />
                      </View>
                      <View>
                        <Typography
                          style={{ lineHeight: 14 }}
                          content={t('clientTaxAddBody')}
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
              <Localization initialLocation={location} />
              <View style={styles.divider} />
              <FormikControl
                name="clientAlternativeDirections"
                component={SucursalSection}
              />
            </View>
          </View>
        </Theme.View>
      </ScrollView>
    </BaseForm>
  )
}

const rStyles = StyleSheet.create({
  wrapContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  externalContainer: { paddingHorizontal: 20, paddingTop: 16, borderRadius: 10 },
  externalCard: { padding: 16, paddingTop: 24 },
  topOptionsContainer: {
    marginLeft: 4,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textClientsProov: {
    display: 'none lg:flex'
  },
  textDots: {
    display: 'flex lg:none'
  },
  bigRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'none lg:flex'
  },
  mediumRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex lg:none'
  },
  bigLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'none md:flex'
  },
  mediumLeftContainer: {
    display: 'flex md:none'
  },
  mainContainer: {
    flex: 1,
    padding: 24,
    flexDirection: 'column'
  },
  verticalDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.grayBorder
  },
  dividerRightContainer: {
    display: 'none sm:flex'
  },
  thirdFormContainer: {
    width: '100% md:45% xl:30%',
    alignItems: 'flex-start'
  },
  fieldName: {
    fontSize: 12
  },
  compraVentaChecksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70% md:90% xl:70%',
    justifyContent: 'space-between',
    height: 40
  },
  marginChecks: {
    marginLeft: '6 md:3 lg:6'
  },
  checkLabel: {
    fontSize: 16
  },
  midFormContainer: {
    width: '100% md:45% xl:48%',
    alignItems: 'flex-start'
  },
  textDirFis: {
    fontSize: fontSize.md
  },
  formContainer: {
    width: '100% md:45% xl:20%'
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
    paddingTop: 16,
    width: '10% lg:5%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default Customers
