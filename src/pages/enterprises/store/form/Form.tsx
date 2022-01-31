import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Typography from 'components/typography'
import React, {
  ForwardRefRenderFunction as FRC,
  FunctionComponent as FC,
  forwardRef,
  useImperativeHandle
} from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Card from 'components/card/Card'
import FormikControl from 'components/formikControl'
import Icon from 'components/icon'
import UsersForm from './components/UsersForm'
import SeriesCorrelativesForm from './components/SeriesCorrelativesForm'
import PayTypeForm from './components/PayTypeForm'
// import StoreTaxesForm from './components/StoreTaxesForm'
import TicketMessageForm from './components/TicketMessageForm'
import * as Yup from 'yup'
import PopoverView from 'components/popoverView'
import Theme from 'components/theme'
import Title from '../../@components/Title'
import useTranslation from 'hooks/useTranslation'
import { useTerminalService } from 'services/bm'
import BaseForm from 'components/baseForm'
import { Values } from './types'
import { FormikHelpers } from 'formik'
import useFormikSubmit from 'hooks/useFormikSubmit'
import useAppContext from 'hooks/useAppContext'
import { useStandardTaxDocumentService } from 'services/finance'

interface Props {
  id?: number | string
  formikRef?: any
  firstUpdate?: boolean
}

const formInitialValues = {
  name: '',
  address: '',
  phone: '',
  mensaje: '',
  habilitada: true,
  already: false
}

type ContenType = {
  title?: string
  popoverView?: {
    heightPopover: number
    widthPopover: number
    content: JSX.Element
  }
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const Content: FC<ContenType> = ({
  children,
  title,
  popoverView,
  style,
  containerStyle
}) => {
  return (
    <View style={[style]}>
      <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
        <Title content={title} />
        {popoverView && (
          <View style={{ marginLeft: 10 }}>
            <PopoverView {...popoverView}>
              <Icon name="helpcenter" color="#2A2D45" />
            </PopoverView>
          </View>
        )}
      </View>
      <Card style={[{ padding: 20 }, containerStyle]}>{children}</Card>
    </View>
  )
}

const usePopoverViews = () => {
  const { t } = useTranslation()

  return {
    seriesAndCorrelatives: {
      heightPopover: 143,
      widthPopover: 310,
      content: (
        <View style={{ padding: 12 }}>
          <View>
            <Typography
              content={t('storeSeriesCorrelatives')}
              color={colors.black}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Medium500}
              disableThemeColor
            />
          </View>
          <View>
            <Typography
              style={{ lineHeight: 14 }}
              content={t('storePopOverOne')}
              color={colors.black}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Regular400}
              disableThemeColor
            />
          </View>
          <View>
            <Typography
              style={{ lineHeight: 14 }}
              content={t('storePopOverTwo')}
              color={colors.red}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Regular400}
              disableThemeColor
            />
          </View>
        </View>
      )
    },
    users: {
      heightPopover: 78,
      widthPopover: 310,
      content: (
        <View style={{ padding: 12 }}>
          <View>
            <Typography
              content={t('storeUsers')}
              color={colors.black}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Medium500}
              disableThemeColor
            />
          </View>
          <View>
            <Typography
              content={t('storePopOverUsers')}
              color={colors.black}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Regular400}
              disableThemeColor
            />
          </View>
        </View>
      )
    },
    messageTicket: {
      heightPopover: 259,
      widthPopover: 310,
      content: (
        <View style={{ padding: 12 }}>
          <View>
            <Typography
              content={t('storeMessageTicket')}
              color={colors.black}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Medium500}
              disableThemeColor
            />
          </View>
          <View>
            <Typography
              content={t('storeMessagePopOver')}
              color={colors.black}
              size={fontSize.xs}
              fontFamily={fonts.baloo2Regular400}
              disableThemeColor
            />
          </View>
          <View
            style={{
              marginTop: 24,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 63,
                height: 163,
                marginRight: 40,
                backgroundColor: '#FBFAFB',
                borderColor: '#AEAEAE',
                borderWidth: 1,
                borderRadius: 6,
                paddingBottom: 8,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: 47,
                  height: 11,
                  backgroundColor: '#AEAEAE',
                  borderRadius: 12
                }}
              />
            </View>
            <View
              style={{
                width: 127,
                height: 163,
                backgroundColor: '#FBFAFB',
                borderColor: '#AEAEAE',
                borderWidth: 1,
                borderRadius: 6,
                paddingBottom: 8,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: 111,
                  height: 11,
                  backgroundColor: '#AEAEAE',
                  borderRadius: 12
                }}
              />
            </View>
          </View>
        </View>
      )
    }
  }
}

const Form: FRC<{}, Props> = (props, ref) => {
  const { ref: formikRef, resolve, reject, handleSubmit } = useFormikSubmit()
  const { styles } = useResponsiveStyles(rStyles)
  const { showTerminal, editTerminal, firstUpdateTerminal } = useTerminalService()
  const { standardTaxDocumentsList } = useStandardTaxDocumentService()
  const { t } = useTranslation()
  const popoverViews = usePopoverViews()
  const { setLoading } = useAppContext()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('valReq')).min(5),
    address: Yup.string().required(t('valReq')).min(5),
    phone: Yup.string()
      .min(9)
      .trim()
      .matches(/^([0-9])*$/, t('valNum'))
      .required(t('valReq')),
    paymentMethods: Yup.array().required(t('valReq')).min(1, t('valReq'))
    // storeTaxes: Yup.array().required('Requerido').min(1),
    // payTypes: Yup.array().required('Requerido').min(1)
  })

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    if (!formikRef.current.dirty) {
      resolve.current()
      return
    }
    setLoading(true)
    try {
      if (props.firstUpdate) {
        await firstUpdateTerminal(props.id!, {
          address: values.address,
          name: values.name,
          phone: values.phone,
          salePoint: {
            flagHadSeries: values.salePoint.flagHadSeries ? 1 : 0,
            printedTicketMessage: values.salePoint.printedTicketMessage
          },
          series: values.salePoint.series.map((item) => {
            return {
              correlativeInitial: item.correlativeInitial,
              series: item.series,
              standardTaxDocumentId: item.standardTaxDocumentId
            }
          }),
          paymentMethods: values.paymentMethods.map((id) => ({
            paymentMethodId: id
          }))
        })
      } else {
        // TODO:Actualizar
        // await editTerminal(props.id!, {
        //   address: values.address,
        //   name: values.name,
        //   phone: values.phone
        // })
      }

      resolve.current()
    } catch (error) {
      reject.current(error)
    }
    helpers.setSubmitting(false)
    setLoading(false)
  }

  const callService = async (id: string) => {
    try {
      const [response, series] = await Promise.all([
        showTerminal(id),
        standardTaxDocumentsList()
      ])
      const values: Values = {
        name: response.data.name || '',
        address: response.data.address || '',
        phone: response.data.phone || '',
        salePoint: {
          flagHadSeries: !!response.data.salePoint?.flagHadSeries,
          printedTicketMessage: response.data.salePoint?.printedTicketMessage || '',
          series: series.data.items.map((item) => {
            return {
              name: item.name,
              correlativeInitial: parseInt(item.defaultCorrelative),
              series: item.defaultSeries,
              standardTaxDocumentId: item.standardTaxDocumentId
            }
          })
        },
        status: !!response.data.status,
        paymentMethods: []
      }
      return values
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
      callService={callService}
      innerRef={innerRef}
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Theme.View style={styles.mainContainer} scheme="background">
        <View style={styles.leftContainer}>
          <Content title={t('storeData')}>
            <FormikControl control="textInput" name="name" placeholder={t('storeName')} />
            <FormikControl
              control="textInput"
              name="address"
              placeholder={t('storeAddress')}
            />
            <FormikControl
              control="textInput"
              name="phone"
              placeholder={t('storePhone')}
            />
          </Content>
          <Content
            title={t('storeSeriesCorrelatives')}
            popoverView={popoverViews.seriesAndCorrelatives}
          >
            <FormikControl name="salePoint" component={SeriesCorrelativesForm} />
          </Content>
        </View>
        <View style={styles.rightContainer}>
          <Content
            title={t('storeUsers')}
            containerStyle={{ padding: 0 }}
            popoverView={popoverViews.users}
          >
            <FormikControl name="usuarios" component={UsersForm} terminalId={props.id} />
          </Content>
          {/* <Content title={t('storeTaxesTitle')} containerStyle={{ padding: 0 }}>
            <StoreTaxesForm name="storeTaxes" />
          </Content> */}
          <Content title={t('storePayTitle')} containerStyle={{ padding: 0 }}>
            <PayTypeForm name="paymentMethods" />
          </Content>
          <Content
            title={t('storeMessageTicket')}
            containerStyle={{ padding: 0 }}
            popoverView={popoverViews.messageTicket}
          >
            <FormikControl
              name="salePoint.printedTicketMessage"
              component={TicketMessageForm}
            />
          </Content>
          <Content title={t('storeControlsTitle')} containerStyle={{ padding: 0 }}>
            <View style={styles.containerControl}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FormikControl control="switch" name="status" />
                <Typography
                  style={{ marginLeft: 8 }}
                  content={t('storeControlEnabled')}
                  color={colors.black}
                  size={fontSize.sm}
                  fontFamily={fonts.baloo2Regular400}
                  disableThemeColor
                />
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="delete" color="#2A2D45" />
                <Typography
                  style={{ marginLeft: 8 }}
                  content={t('storeControlDeleted')}
                  color={colors.black}
                  size={fontSize.sm}
                  fontFamily={fonts.baloo2Regular400}
                  disableThemeColor
                />
              </TouchableOpacity>
            </View>
          </Content>
        </View>
      </Theme.View>
    </BaseForm>
  )
}

const rStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column md:row',
    flex: 1,
    padding: 20
  },
  leftContainer: {
    flex: '0 md:1',
    paddingRight: '0 md:20'
  },
  rightContainer: {
    flex: '0 md:1',
    paddingLeft: '0 md:20'
  },
  containerControl: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default forwardRef(Form)
