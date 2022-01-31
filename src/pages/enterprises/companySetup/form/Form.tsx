import FormikControl from 'components/formikControl'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Theme from 'components/theme'
import { FormikHelpers } from 'formik'
import React, {
  Fragment,
  ForwardRefRenderFunction as FC,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import { View } from 'react-native'
import ImagePicker from '../../@components/ImagePicker'
import useUbigeo from 'hooks/useUbigeo'
import Card from 'components/card/Card'
import Title from '../../@components/Title'
import * as bm from 'services/bm'
import BaseForm from 'components/baseForm'
import useAppContext from 'hooks/useAppContext'
import useFormikSubmit from 'hooks/useFormikSubmit'
import { Values, SubmitValues } from './types'
import { identityDocumentType } from 'constants/core'
import * as Yup from 'yup'
import useTranslation from 'hooks/useTranslation'
interface Ref {
  handleSubmit: () => Promise<void>
}

interface Props {
  id?: number | string
  formikRef?: any
}

const images = [
  {
    key: 'logoMenu',
    title: 'Para el menú',
    highlightWords: ['a todo color.'],
    description:
      'Sube tu logo a todo color. Debe tener la siguiente medida: 222px x 55px.',
    dimensions: {
      width: 222,
      height: 55
    }
  },
  {
    key: 'logoTicket',
    title: 'Para impresión de tickets:',
    highlightWords: ['en blanco y negro.'],
    description:
      'Sube tu logo en blanco y negro. Debe tener la siguiente medida: 512px x 256px.',
    dimensions: {
      width: 512,
      height: 256
    }
  },
  {
    key: 'logoA4',
    title: 'Para impresión A4',
    highlightWords: ['en blanco y negro.'],
    description:
      'Sube tu logo en blanco y negro. Debe tener la siguiente medida: 512px x 256px.',
    dimensions: {
      height: 256,
      width: 512
    }
  }
]

const Logos = () => {
  const { styles } = useResponsiveStyles(rStyles)

  return (
    <>
      <Title content="Logotipo" />
      <Card style={styles.card}>
        {images.map((item, index) => {
          return (
            <Fragment key={index.toString()}>
              <FormikControl
                name={item.key}
                component={ImagePicker}
                styleImage={styles.IPImage}
                styleContainerImage={styles.containerIPImage}
                styleContainerDescription={styles.containerIPDescription}
                dependencies={[styles]}
                style={styles.containerImagePicker}
                {...item}
              />
              {index !== images.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#CCCCCC',
                    margin: 5
                  }}
                />
              )}
            </Fragment>
          )
        })}
      </Card>
    </>
  )
}

// const validationSchemaCotribuyente = Yup.object().shape({
//   usuarioSol: Yup.string().required('requerido'),
//   claveSol: Yup.string().required('requerido'),
//   confirmarClaveSol: Yup.string()
//     .oneOf([Yup.ref('claveSol'), null], 'Las claves no coinciden. Intenta otra vez.')
//     .required('requerido')
// })

// const Cotribuyente = () => {
//   const { styles } = useResponsiveStyles(rStyles)
//   const { linkSunat } = finace.useEnterprisesService()

//   return (
//     <Formik
//       initialValues={{}}
//       onSubmit={async (values, helpers: FormikHelpers<any>) => {
//         try {
//           await linkSunat({ ...values, storeId: 1 })
//         } catch (error) {}
//         helpers.setSubmitting(false)
//       }}
//       validationSchema={validationSchemaCotribuyente}
//     >
//       <>
//         <Title content="Datos del contribuyente" />
//         <Card style={styles.card}>
//           <FormikControl
//             control="textInput"
//             name="usuarioSol"
//             placeholder={'Usuario SOL'}
//             leftContent="user"
//             widthLeftComponent={45}
//           />
//           <FormikControl
//             control="textInput"
//             name="claveSol"
//             placeholder={'Clave SOL'}
//             type="password"
//           />
//           <FormikControl
//             control="textInput"
//             name="confirmarClaveSol"
//             placeholder={'Confirmar clave SOL'}
//             type="password"
//           />
//           <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//             <FormikControl
//               control="buttonSubmit"
//               title="Vincular"
//               type="primary"
//               style={{ width: 200, margin: 20 }}
//             />
//           </View>
//         </Card>
//       </>
//     </Formik>
//   )
// }
const Empresa = ({ intialLocation }) => {
  const { t } = useTranslation()
  const { styles } = useResponsiveStyles(stylesEmpresa)
  const { state, setCurrent, getCountry, getDepartment, getProvince, getDistrict } =
    useUbigeo(intialLocation)
  return (
    <>
      <Title content="C" />
      <Card style={styles.card}>
        <Title content={t('enterpriseFormData')} />
        <View style={styles.container}>
          <FormikControl
            control="document"
            name="document"
            typeDocuments={[
              {
                label: 'RUC',
                maxLength: 11,
                value: identityDocumentType.ruc,
                validationAction: 'consultRuc'
              }
            ]}
            placeholder={t('enterpriseFormNumDoc')}
            onResponse={(response, setFieldValue) => {
              if (response?.value.documentType === identityDocumentType.ruc) {
                setFieldValue?.('businessName', response?.data.razonSocial)
                setFieldValue?.('tradeName', '')
                setFieldValue?.('name', '')
                setFieldValue?.('address', response?.data.direccion)
              } else {
                setFieldValue?.('businessName', '')
                setFieldValue?.('tradeName', '')
                setFieldValue?.('name', '')
                setFieldValue?.('address', '')
              }
            }}
            style={styles.item}
          />
          <FormikControl
            control="textInput"
            name="businessName"
            type="default"
            placeholder={t('enterpriseFormBusiRea')}
            style={styles.item}
          />
          <FormikControl
            control="textInput"
            name="name"
            placeholder={t('enterpriseFormBusiName')}
            style={styles.item}
          />
          <FormikControl
            control="textInput"
            name="address"
            placeholder={t('enterpriseFormAddress')}
            style={styles.item}
          />
          <FormikControl
            control="dropdown"
            name="country"
            placeholder={t('enterpriseFormCountry')}
            items={state.country}
            dependencies={[state]}
            onItemSelect={(item, setFieldValue) => {
              if (item.value !== state.current.countryId) {
                setCurrent('country', item.value)
                setCurrent('department', 0)
                setCurrent('province', 0)
                setCurrent('district', 0)
                getDepartment(item.value)
                setFieldValue?.('department', '')
                setFieldValue?.('province', '')
                setFieldValue?.('district', '')
              }
            }}
            onPress={() => {
              getCountry()
            }}
            style={styles.item}
          />
          <FormikControl
            control="dropdown"
            name="department"
            placeholder={t('enterpriseFormDepto')}
            dependencies={[state]}
            items={state.department}
            showSearch
            onPress={() => {
              state.current.countryId && getDepartment(state.current.countryId)
            }}
            onItemSelect={(item, setFieldValue) => {
              if (item.value !== state.current.departmentId) {
                setCurrent('department', item.value)
                setCurrent('province', 0)
                setCurrent('district', 0)
                getProvince(item.value)
                setFieldValue?.('province', '')
                setFieldValue?.('district', '')
              }
            }}
            style={styles.item}
          />

          <FormikControl
            control="dropdown"
            name="province"
            placeholder={t('enterpriseFormProv')}
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
                setFieldValue?.('district', '')
              }
            }}
            style={styles.item}
          />
          <FormikControl
            control="dropdown"
            name="district"
            placeholder={t('enterpriseFormDist')}
            showSearch
            dependencies={[state]}
            items={state.district}
            style={styles.item}
            onPress={() => {
              state.current.provinceId && getDistrict(state.current.provinceId)
            }}
            onItemSelect={(item) => {
              if (item.value !== state.current.districtId) {
                setCurrent('district', item.value)
              }
            }}
          />
          <FormikControl
            control="textInput"
            name="economicActivity"
            placeholder={t('enterpriseFormEco')}
            style={styles.item}
          />
          <FormikControl
            control="textInput"
            name="contactPhone"
            placeholder={t('enterpriseFormContPhone')}
            style={styles.item}
          />
          <FormikControl
            control="dropdown"
            name="currencyId"
            placeholder={t('enterpriseFormCurrency')}
            items={[{ label: 'PEN', value: 'PEN' }]}
            style={styles.item}
          />
          <FormikControl
            control="dropdown"
            name="decimalNumberQuantity"
            placeholder={t('enterpriseFormDecGen')}
            items={new Array(3)
              .fill(0)
              .map((_, val) => ({ label: `${val + 2}`, value: val + 2 }))}
            style={styles.item}
          />
        </View>
        {/*
        <Title
          style={{
            borderTopWidth: 1,
            marginTop: 20,
            paddingTop: 10,
            borderColor: colors.borderGray
          }}
          content="Datos del representante legal"
        />
        <View style={styles.ctnGeneral}>
          <View style={{ flexDirection: 'row', flex: 2 }}>
            <View style={{ flex: 1 }}>
              <FormikControl
                control="textInput"
                name="names"
                placeholder={'Número de documento'}
              />
              <FormikControl
                control="textInput"
                name="phone"
                placeholder={'(Número de contacto)'}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <FormikControl
                control="textInput"
                name="lastNames"
                placeholder={'Nombres'}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FormikControl control="textInput" name="phone" placeholder={'Apellidos'} />
          </View>
        </View>
         <Title
          style={{
            borderTopWidth: 1,
            marginTop: 20,
            paddingTop: 10,
            borderColor: colors.borderGray
          }}
          content="Color del negocio y comprobante"
        />
        <Typography
          fontFamily={fonts.baloo2Regular400}
          disableThemeColor
          content="Selecciona el color que usará tu empresa. (Se verá en tu tarjeta de contacto y en tus comprobantes) Elige un comprobante para ver la previzualización."
        />
        <FormikControl name="color" component={VoucherViewer} /> */}
      </Card>
    </>
  )
}

const stylesEmpresa = StyleSheet.create({
  card: { padding: 20 },
  container: {
    flexDirection: 'column md:row',
    flexWrap: 'nowrap md:wrap',
    justifyContent: 'space-around',
    flex: 1
  },
  item: { width: 'auto md:270 xxl:350 xxxl:450' }
})

const getLocation = (location: any = {}) => {
  if (!location) {
    return undefined
  }
  const { parent: parentDistrict = {}, ...district } = location
  const { parent: parentProvince = {}, ...province } = parentDistrict
  const { parent: parentCountry = {}, ...department } = parentProvince
  const { ...country } = parentCountry
  return {
    department: { label: department.name, value: department.id },
    province: { label: province.name, value: province.id },
    district: { label: district.name, value: district.id },
    country: { label: country.name, value: country.id }
  }
}

const Form: FC<Ref, Props> = (props, ref) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { showEnterprise, editEnterprise } = bm.useEnterpriseService()
  const { setLoading } = useAppContext()
  const [location, setLocation] = useState<any>()
  const { ref: formikRef, resolve, reject, handleSubmit } = useFormikSubmit()
  const { t } = useTranslation()

  const initialValues: Values = {
    document: {
      documentType: 4,
      document: ''
    },
    decimalNumberQuantity: 2,
    currencyId: 'PEN'
  }

  const validationSchema = Yup.object().shape({
    document: Yup.object().shape({
      document: Yup.string().required(t('valReq')),
      documentType: Yup.number().required(t('valReq'))
    }),
    businessName: Yup.string().required(t('valReq')),
    name: Yup.string().required(t('valReq')),
    address: Yup.string().required(t('valReq')),
    country: Yup.number().required(t('valReq')),
    department: Yup.number().required(t('valReq')),
    province: Yup.number().required(t('valReq')),
    district: Yup.number().required(t('valReq')),
    economicActivity: Yup.string().required(t('valReq')),
    contactPhone: Yup.string().phone(t('valPhone')).required(t('valReq')),
    decimalNumberQuantity: Yup.number().required(t('valReq'))
  })

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    if (!formikRef.current.dirty) {
      resolve.current()
      return
    }
    try {
      const newValues: SubmitValues = {
        address: values.address!,
        contactPhone: values.contactPhone!,
        currencyId: values.currencyId!,
        // TODO: valor de decimal temporal
        decimalNumberQuantity: values.decimalNumberQuantity!,
        decimalNumberAmount: values.decimalNumberQuantity!,
        decimalNumberPercent: values.decimalNumberQuantity!,
        decimalNumberPrice: values.decimalNumberQuantity!,
        decimalNumberRate: values.decimalNumberQuantity!,
        decimalNumberUnit: values.decimalNumberQuantity!,
        //
        economicActivity: values.economicActivity!,
        locationId: values.district!,
        name: values.name!,
        sender: {
          id: parseInt(values.document?.document!),
          identityDocumentTypeId: values.document?.documentType!,
          businessName: values.businessName!,
          tradeName: values.tradeName!
        }
      }
      setLoading(true)
      await editEnterprise(props.id!, newValues)
      resolve.current()
    } catch (error) {
      reject.current(error)
    }
    setLoading(false)
    helpers.setSubmitting(false)
  }

  const callService = async (id: string) => {
    try {
      const response = await showEnterprise(id)
      const location = getLocation(response.data.location)
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
      const data: Values = {
        address: response.data.address || '',
        contactPhone: response.data.contactPhone || '',
        economicActivity: response.data.economicActivity || '',
        department: location?.department.value,
        province: location?.province.value,
        district: location?.district.value,
        country: location?.country.value,
        document: {
          document: response.data.sender?.id,
          documentType:
            response.data.sender?.identityDocumentTypeId || identityDocumentType.ruc
        },
        tradeName: response.data.sender?.tradeName,
        businessName: response.data.sender?.businessName,
        decimalNumberQuantity: response.data.decimalNumberQuantity || 2,
        currencyId: response.data.currencyId,
        name: response.data.name || ''
      }

      return data
    } catch (error) {
      return null
    }
  }

  const innerRef = (ref: any) => {
    props.formikRef && (props.formikRef.current = ref)
    formikRef.current = ref
  }

  useImperativeHandle(ref, () => ({ handleSubmit }))

  return (
    <BaseForm
      id={props.id}
      innerRef={innerRef}
      callService={callService}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Theme.View scheme={'background'} style={styles.container}>
        <View style={styles.containerLogos}>
          <View style={styles.itemLogo}>
            <Logos />
          </View>
          {/* <View style={styles.itemLogo}>
            <Cotribuyente />
          </View> */}
        </View>
        <View style={styles.containerBusiness}>
          <Empresa intialLocation={location} />
        </View>
      </Theme.View>
    </BaseForm>
  )
}

const rStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '1 xxl:50',
    paddingVertical: '1 xxl:20'
  },
  containerLogos: {
    flexDirection: 'column md:row',
    flex: '0 md:1'
  },
  containerBusiness: {
    padding: 10
  },
  itemLogo: {
    flex: '0 md:1',
    padding: 10
  },
  pdf: {
    width: '300 md:500 xl:700',
    height: '350 md:650 xl:850'
  },
  containerImagePicker: {
    flexDirection: 'row md:column xl:row'
  },
  containerIPImage: {
    // flex: '1 xl:0'
  },
  containerIPDescription: {
    marginHorizontal: '20, xl:1'
  },
  IPImage: {
    height: '84 sm:116 xl:90',
    width: '100 sm:232 xl:180'
  },
  card: { padding: 20 }
})

export default forwardRef(Form)
