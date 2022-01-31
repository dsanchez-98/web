import React, {
  ForwardRefRenderFunction as FC,
  forwardRef,
  useImperativeHandle
} from 'react'
import { TouchableOpacity, View } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import FormikControl from 'components/formikControl'
import Card from 'components/card/Card'
import Icon from 'components/icon'
import Image from 'components/image'
import Title from '../../@components/Title'
import * as Yup from 'yup'
import { useUsersService } from 'services/iam/users'
import InputFile from 'components/inputFile'
import { FormikHelpers } from 'formik'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Checkbox from 'components/checkbox'
import colors from 'styles/colors'
import useAppContext from 'hooks/useAppContext'
import ModalRols from '../modal/modalRols'
import useTranslation from 'hooks/useTranslation'
import BaseForm from 'components/baseForm'
import useMutableState from 'hooks/core/useMutableState'
import useFormikSubmit from 'hooks/useFormikSubmit'
import { SubmitValues, Values } from './types'
import { identityDocumentType } from 'constants/core'
import { useEmployeeService } from 'services/bm'

interface RolesProps {
  roles: { label: string; value: string }[]
  value?: string[]
  onChange: (val: string[]) => void
}

interface Props {
  /**
   * @param id -
   * - null: obtiene la el usuario en sesion
   * - undefined: crea el usuario
   * - id: obtiene el usuario para editar
   **/
  id?: number | null
  formikRef?: any
  onSubmit?: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
}

interface Ref {
  handleSubmit: () => Promise<void>
}

interface PhotoProps {
  onChange: (img: any) => void
  value: string
}

const Photo = (props: PhotoProps) => {
  const styleImage = { width: 120, height: 120 }
  return (
    <View style={{ alignItems: 'center' }}>
      <Card style={{ marginTop: 10 }}>
        <View
          style={{
            margin: 15,
            borderWidth: 1,
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: colors.borderGray
          }}
        >
          {props.value ? (
            <Image source={{ uri: props.value }} style={styleImage} />
          ) : (
            <Icon name={'preview'} height={styleImage.height} width={styleImage.width} />
          )}
        </View>
        <InputFile
          title="Cargar foto del usuario"
          onChange={(img) => {
            console.log('img', img)
            props.onChange(URL.createObjectURL(img))
          }}
        />
      </Card>
    </View>
  )
}

const RolesComponent = (props: RolesProps) => {
  const { showModal } = useAppContext()

  console.log('props', props)
  return (
    <View>
      {props.roles.map((x, k) => (
        <View
          key={k}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Checkbox
              style={{
                marginRight: 20
              }}
              onChange={() => {
                props.onChange(
                  props.value?.some((y: string) => y === x.value)
                    ? props.value?.filter((y: string) => y !== x.value)
                    : [...new Set([...(props.value || []), x.value])]
                )
              }}
              type="primary"
              value={props.value?.some((y) => y === x.value) || false}
            />
            <Typography
              content={x.label}
              size={fontSize.md}
              fontFamily={fonts.baloo2Medium500}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              showModal(
                ModalRols,
                {
                  onCancel: () => {}
                },
                {
                  title: x.label
                  // arrRow: arrRow,
                  // rolsHandleChange: (rols: any) => setArrRow(rols)
                }
              )
            }}
          >
            <Icon name="editOutlined" color={colors.primary} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const Form: FC<Ref, Props> = (props, ref) => {
  const { ref: formikRef, resolve, reject, handleSubmit } = useFormikSubmit()
  const { styles } = useResponsiveStyles(rStyles)
  const { showProfile, editProfile, updateProfilePhoto } = useUsersService()
  const { showEmployee, editEmployee, createEmployee } = useEmployeeService()
  const { t } = useTranslation()
  const stores = useMutableState<any[]>([])
  const roles = useMutableState<any[]>([])
  const { setLoading } = useAppContext()
  const isCreation = props.id === undefined

  const initialValues: Values = {
    documentObj: {
      document: '',
      documentType: identityDocumentType.dni
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .when('_', (_, schema) =>
        isCreation ? schema.required(t('valReq')).email('Email') : schema
      ),
    password: Yup.string()
      .required()
      .when('_', (_, schema) => (isCreation ? schema.required(t('valReq')) : schema)),
    // passwordConfirmation: Yup.string()
    //   .required()
    //   .when('_', (_, schema) => (isCreation ? schema.required(t('valReq')) : schema)),
    documentObj: Yup.object().shape({
      document: Yup.string()
        .required(t('valReq'))
        .when('documentType', (value, scheme) => {
          if (value === identityDocumentType.dni) {
            return scheme.min(8, 'Numero invalid0')
          }
          if (value === identityDocumentType.ruc) {
            return scheme.min(11, 'Numero invalid0')
          }
          return scheme
        }),
      documentType: Yup.number().required(t('valReq'))
    }),
    name: Yup.string().trim().required(t('valReq')),
    lastName: Yup.string().trim().required(t('valReq')),
    phone: Yup.string()
      .required()
      .when('_', (_, schema) =>
        isCreation ? schema.required(t('valReq')).phone('numero invalido') : schema
      ),
    dateBirthday: Yup.string().required(t('valReq'))
  })

  const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
    if (!formikRef.current.dirty) {
      resolve.current()
      return
    }
    setLoading(true)
    try {
      const arrDate = values.dateBirthday!.split('/').reverse().join('-')
      let file
      if (values.imgUser !== '' && values.imgUser?.includes('blob')) {
        const base64Response = await fetch(values.imgUser)
        file = await base64Response.blob()
      }
      if (props.id) {
        await editEmployee(props.id, {
          dateBirthday: arrDate,
          identityDocumentNumber: values.documentObj!.document!,
          identityDocumentType: values.documentObj!.documentType!.toString(),
          lastName: values.lastName!,
          name: values.name!,
          file,
          role: '1'
        })
      } else if (props.id === undefined) {
        await createEmployee({
          dateBirthday: arrDate,
          email: values.email!,
          password: values.password!,
          identityDocumentNumber: values.documentObj!.document!,
          identityDocumentType: values.documentObj!.documentType!.toString(),
          lastName: values.lastName!,
          name: values.name!,
          phone: values.phone!,
          file,
          // TODO: Variables
          requestChangePassword: '1',
          role: '1'
        })
      } else if (props.id === null) {
        await editProfile({
          dateBirthday: arrDate,
          identityDocumentNumber: values.documentObj!.document!,
          identityDocumentType: values.documentObj!.documentType!,
          lastName: values.lastName!,
          name: values.name!
        })
        if (file) {
          const data = new FormData()
          data.append('file', file)
          await updateProfilePhoto(data)
        }
      }

      resolve.current()
    } catch (error) {
      reject.current(error)
    }
    actions.setSubmitting(false)
    setLoading(false)
  }

  const callService = async () => {
    try {
      if (props.id) {
        const { data } = await showEmployee(props.id)
        const values: Values = {
          dateBirthday: data?.dateBirthday,
          documentObj: {
            documentType: data?.identityDocumentType,
            document: data?.identityDocumentNumber || ''
          },
          email: data?.email,
          name: data?.name || '',
          lastName: data?.lastName || '',
          password: '*********',
          phone: data?.phone,
          imgUser: data?.imgUser || '',
          roles: [],
          stores: []
        }
        return values
      } else {
        const { data } = await showProfile()
        const values: Values = {
          dateBirthday: data?.profile.dateBirthday.split('-').reverse().join('/') || '',
          documentObj: {
            documentType: data?.profile.identityDocumentType || identityDocumentType.dni,
            document: data?.profile.identityDocumentNumber || ''
          },
          email: data?.profile.email,
          name: data?.profile.name || '',
          lastName: data?.profile.lastName || '',
          password: '*********',
          phone: data?.profile.phone,
          imgUser: data?.profile.imgUser || '',
          roles: [],
          stores: []
        }
        stores.value = data.stores?.map((i) => ({ label: i.storeName, value: i.id }))
        roles.value = data.roles?.map((i) => ({ label: i.name, value: i.id }))

        return values
      }
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
      callService={callService}
      id={props.id === null ? '0' : props.id}
      innerRef={innerRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.container}>
        <View style={styles.containerPhoto}>
          <Title content={t('userPhoto')} />
          <FormikControl component={Photo} name="imgUser" />
        </View>
        <View style={styles.containerSesion}>
          <Title content={t('userLogin')} />
          <Card style={{ padding: 20, marginTop: 10 }}>
            <FormikControl
              control="textInput"
              disabled={!isCreation}
              name="email"
              placeholder={t('userEmail')}
              type="email"
            />
            <FormikControl
              name={'password'}
              control="textInput"
              disabled={!isCreation}
              placeholder={t('userPassword')}
              type="password"
            />
            {/* {isCreation && (
              <FormikControl
                name={'password'}
                control="textInput"
                placeholder={t('userPassword')}
                type="password"
              />
            )} */}
          </Card>
        </View>
        <View style={styles.containerPersonalData}>
          <Title content={t('userPersonalData')} />
          <Card style={{ marginTop: 10, padding: 20 }}>
            <FormikControl
              control="document"
              name="documentObj"
              typeDocuments={[
                {
                  label: 'DNI',
                  maxLength: 8,
                  validationAction: 'consultDni',
                  value: identityDocumentType.dni
                }
              ]}
              placeholder={t('userDocumentNum')}
              onResponse={(response, setFieldValue) => {
                if (response?.value.documentType === identityDocumentType.dni) {
                  setFieldValue?.('name', response?.data?.name)
                  setFieldValue?.(
                    'lastName',
                    `${response?.data?.paternalSurname} ${response?.data?.maternalSurname}`
                  )
                } else {
                  setFieldValue?.('name', '')
                  setFieldValue?.('lastName', '')
                }
              }}
            />
            <FormikControl
              name={'name'}
              control="textInput"
              placeholder={t('userNames')}
            />
            <FormikControl
              name={'lastName'}
              control="textInput"
              placeholder={t('userLastNames')}
            />
            <FormikControl
              name={'phone'}
              control="textInput"
              placeholder={t('userPhone')}
              disabled={!isCreation}
            />
            <FormikControl
              multiple={false}
              name="dateBirthday"
              control="datePicker"
              placeholder={t('userBirthDay')}
            />
            {/* <Typography
                style={{
                  marginLeft: 10,
                  marginTop: 5
                }}
                content={t('userRols')}
                fontFamily={fonts.baloo2Medium500}
                size={fontSize.xxs}
              /> */}
            {/* <FormikControl
                dependencies={[roles.value]}
                roles={roles.value}
                name="roles"
                component={RolesComponent}
              /> */}
            {/* <FormikControl
              dependencies={[stores.value]}
              name={'stores'}
              multiple={true}
              control="dropdown"
              items={stores.value}
              disabled
              placeholder={t('userSoterCash')}
            /> */}
          </Card>
        </View>
      </View>
    </BaseForm>
  )
}

const rStyles = StyleSheet.create({
  container: { flexWrap: 'wrap', flexDirection: 'row', flex: 1 },
  containerPhoto: { width: '90% lg:200', margin: 15 },
  containerSesion: { width: '90% lg:300', margin: 15 },
  containerPersonalData: { width: '90% lg:300', margin: 15 },
  itemPersonalData: { paddingHorizontal: 15, paddingBottom: 15, width: '100% lg:300' }
})

export default forwardRef(Form)
