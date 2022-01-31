import * as Yup from 'yup'
import React, { FunctionComponent as FC, useRef, useState } from 'react'
import { View } from 'react-native'
import ScrollView from 'components/scrollView'
import Toolbar from 'components/toolbar'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FormButtons from 'components/searchList/componets/FormButtons'
import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import Theme from 'components/theme'
import { shadow } from 'styles/shadow'
import FormikControl from 'components/formikControl'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import fonts from 'styles/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'components/icon'
import useTranslation from 'hooks/useTranslation'
// import { defaultbreakPoints } from 'components/responsiveLayout/common'
// import { print, createTicketVoucher } from 'printer'
import usePrinter from 'hooks/usePrinter'
import { DEVICES_LIST } from '../list'
import useAppContext from 'hooks/useAppContext'
import useService from 'hooks/useService'
import { usePaperSheetService } from 'services/bm/devices/printer/paperSheet'
import { useConnectionService } from 'services/bm/devices/printer/connection'
import BaseForm from 'components/baseForm'
import { useBindingService } from 'services/bm/devices/printer/bindings'
import { RequestCreateBinding } from 'services/bm/devices/printer/bindings/type'
import { usePrinterService } from 'services/bm/devices/printer'
import { useRoute } from '@react-navigation/native'

interface Props {}

interface DeviceProps {
  name: string
  printerConnectionTypeId: number | null
  printerPaperSheetTypeId: number | null
  flagPrintOption: boolean
  flagAutoPrintingTickets: boolean
  ip: string
  mac: string
  usb: string
}

const Devices: FC<Props> = (props) => {
  const formikRef = useRef<any>(null)
  const { t } = useTranslation()
  const { params } = useRoute<any>()
  const { bindingShow, bindingCreate, bindingUpdate } = useBindingService()
  const { printerListByTerminal } = usePrinterService()
  const [typesPaperSheet] = useService(usePaperSheetService, 'paperSheetList')()
  const [typesConnection] = useService(useConnectionService, 'connectionList')()
  const { isMobile } = useResponsiveStyles({})
  const { styles } = useResponsiveStyles(rStyles)
  const { print } = usePrinter()
  const { setLoading } = useAppContext()
  const [flagEdit, setFlagEdit] = useState(false)

  const arrTypesPaperSheet = typesPaperSheet?.data.items.map((x) => {
    return {
      label: x.name,
      value: x.id
    }
  })

  const arrTypesConnection = typesConnection?.data.items.map((x) => {
    return {
      label: x.name,
      value: x.id
    }
  })

  const deviceFormInitialValues: DeviceProps = {
    name: '',
    printerConnectionTypeId: arrTypesConnection?.[0].value || null,
    printerPaperSheetTypeId: null,
    flagPrintOption: false,
    flagAutoPrintingTickets: false,
    ip: '',
    mac: '',
    usb: ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(t('valReq')),
    printerConnectionTypeId: Yup.number().required(t('valReq')),
    printerPaperSheetTypeId: Yup.number().required(t('valReq')),
    flagPrintOption: Yup.boolean(),
    flagAutoPrintingTickets: Yup.boolean(),
    ip: Yup.string().when('printerConnectionTypeId', {
      is: 1,
      then: Yup.string()
        .required(t('valReq'))
        .matches(
          /^[0-9][0-9][0-9][.][0-9][0-9][0-9][.][0-9]+[0-9]*[.][0-9]+[0-9]*$/,
          t('valIP')
        ),
      otherwise: Yup.string()
    }),
    mac: Yup.string().when('printerConnectionTypeId', {
      is: 2,
      then: Yup.string()
        .required(t('valReq'))
        .matches(
          /^[a-zA-Z0-9][a-zA-Z0-9][:][a-zA-Z0-9][a-zA-Z0-9][:][a-zA-Z0-9][a-zA-Z0-9][:][a-zA-Z0-9][a-zA-Z0-9][:][a-zA-Z0-9][a-zA-Z0-9][:][a-zA-Z0-9][a-zA-Z0-9]$/,
          t('valMAC')
        ),
      otherwise: Yup.string()
    }),
    usb: Yup.string().when('printerConnectionTypeId', {
      is: 3,
      then: Yup.string().trim().required(t('valReq')).min(1),
      otherwise: Yup.string()
    })
  })

  const onSubmitDevice = async (val: DeviceProps, { setSubmitting }: any) => {
    setLoading(true)
    const newDevice: RequestCreateBinding = {
      ...val,
      flagAutoPrintingTickets: val.flagAutoPrintingTickets ? 1 : 0,
      flagPrintOption: val.flagPrintOption ? 1 : 0
    }
    try {
      if (flagEdit && params?.id) {
        await bindingUpdate({ data: newDevice, id: params.id })
      } else {
        await bindingCreate(newDevice)
      }
    } catch (error) {
      console.log(error)
    }
    setSubmitting(false)
    navigation.navigate(DEVICES_LIST)
    setLoading(false)
  }

  return (
    <BaseForm
      callService={async (id: string) => {
        try {
          const printers = await printerListByTerminal()
          const printerSelected = printers?.data.items.find((x) => x.id === parseInt(id))
          if (printerSelected?.printerConnectionTypeId) {
            setFlagEdit(true)
            const deviceData = await bindingShow(id)
            const newValues: DeviceProps = {
              name: deviceData.data.name,
              ip: deviceData.data.ip,
              usb: deviceData.data.usb,
              mac: deviceData.data.mac,
              printerConnectionTypeId: deviceData.data.printerConnectionTypeId,
              printerPaperSheetTypeId: deviceData.data.printerPaperSheetTypeId,
              flagAutoPrintingTickets: deviceData.data.flagAutoPrintingTickets === 1,
              flagPrintOption: deviceData.data.flagPrintOption === 1
            }
            return newValues
          } else {
            setFlagEdit(true)
            return {
              ...deviceFormInitialValues,
              name: printerSelected?.name || ''
            }
          }
        } catch (error) {
          return null
        }
      }}
      innerRef={formikRef}
      initialValues={deviceFormInitialValues}
      onSubmit={onSubmitDevice}
      validationSchema={validationSchema}
    >
      <ScrollView
        renderToolbar={() => <Toolbar />}
        renderHeader={() => (
          <HeaderBar
            navigationText={
              <NavigationText
                path={flagEdit ? t('printerEditPath') : t('printerNewPath')}
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
                    navigation.navigate(DEVICES_LIST)
                  }}
                  cancelText={t('cancel')}
                  confirmText={flagEdit ? t('printerEditSubBtn') : t('printerNewSubBtn')}
                />
                <FormikControl
                  style={{
                    height: 35,
                    width: 'auto',
                    paddingHorizontal: 8
                  }}
                  control="buttonSubmit"
                  type="primary"
                  title={flagEdit ? t('printerEditSubBtn') : t('printerNewSubBtn')}
                />
              </View>
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      >
        <Theme.View
          scheme={'primary'}
          style={[{ marginHorizontal: 15, flex: 1 }, shadow]}
        >
          <View style={styles.mainContainer}>
            <View>
              {/* <FormikControl name="host" control="textInput" placeholder={'Host'} /> */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                <View style={styles.midFormContainer}>
                  <FormikControl
                    name="name"
                    control="textInput"
                    placeholder={t('printerFieldName')}
                  />
                </View>
                <View style={styles.midFormContainer}>
                  <FormikControl
                    control="dropdown"
                    name="printerPaperSheetTypeId"
                    style={{ width: '100%' }}
                    placeholder={t('printerFieldTypePap')}
                    items={arrTypesPaperSheet}
                    onItemSelect={(item) => {}}
                  />
                </View>
                <View style={styles.midFormContainer}>
                  <FormikControl
                    control="dropdown"
                    name="printerConnectionTypeId"
                    style={{ width: '100%' }}
                    placeholder={t('printerFieldTypeCon')}
                    items={arrTypesConnection}
                    showSearch
                    onItemSelect={(item, setFieldValue) => {
                      setFieldValue?.('ip', '')
                      setFieldValue?.('mac', '')
                      setFieldValue?.('usb', '')
                    }}
                  />
                </View>
                <View style={styles.midFormContainer}>
                  <FormikControl
                    name="printerConnectionTypeId"
                    component={({ value }: { value: any }) => (
                      <>
                        {value === 1 ? (
                          <FormikControl
                            name="ip"
                            control="textInput"
                            placeholder={t('printerFieldIpNum')}
                          />
                        ) : value === 2 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                          >
                            <FormikControl
                              style={{ flex: 1 }}
                              name="mac"
                              control="textInput"
                              placeholder={t('printerFieldMACNum')}
                            />
                            <View>
                              <TouchableOpacity
                                style={{
                                  marginLeft: 8,
                                  marginTop: 16,
                                  borderRadius: 6,
                                  backgroundColor: '#FFE34D',
                                  width: 40,
                                  height: 40,
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <Icon name="search" color="#FFFFFF" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <FormikControl
                            name="usb"
                            control="textInput"
                            placeholder={t('printerFieldPortNum')}
                          />
                        )}
                      </>
                    )}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 32
                }}
              >
                <FormikControl control="switch" name="flagPrintOption" />
                <Typography
                  style={{ marginLeft: 8 }}
                  content={t('printerFieldShowOpt')}
                  size={fontSize.sm}
                  fontFamily={fonts.baloo2Regular400}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 24
                }}
              >
                <FormikControl control="switch" name="flagAutoPrintingTickets" />
                <Typography
                  style={{ marginLeft: 8 }}
                  content={t('printerFieldAutoPrint')}
                  size={fontSize.sm}
                  fontFamily={fonts.baloo2Regular400}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginRight: 8,
                    padding: 8,
                    borderColor: colors.red,
                    borderWidth: 1,
                    borderRadius: 6
                  }}
                  onPress={() => formikRef.current?.resetForm()}
                >
                  <Icon name="delete" color={colors.red} />
                  <Typography
                    style={{ marginLeft: 8 }}
                    content={t('printerBtnClear')}
                    size={fontSize.md}
                    fontFamily={fonts.baloo2SemiBold600}
                    color={colors.red}
                    disableThemeColor
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    print()
                    console.log('prit')
                  }}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    padding: 8,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderRadius: 6
                  }}
                >
                  <Icon name="print" color={colors.primary} />
                  <Typography
                    style={{ marginLeft: 8 }}
                    content={t('printerBtnTry')}
                    size={fontSize.md}
                    fontFamily={fonts.baloo2SemiBold600}
                    color={colors.primary}
                    disableThemeColor
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Theme.View>
      </ScrollView>
    </BaseForm>
  )
}

const rStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  midFormContainer: {
    width: '100% md:45% xl:48%',
    marginTop: 16
  }
})

export default Devices
