import Checkbox from 'components/checkbox'
import InputDropdown from 'components/textInput/components/InputDropdown'
import Theme from 'components/theme'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import fonts from 'styles/fonts'
import { shadow } from 'styles/shadow'
import Navigator from '../@components/Navigator'

interface Props {}

const Card: FC<{ style: any }> = ({ children, style }) => {
  return (
    <Theme.View
      scheme="primary"
      style={[shadow, { borderRadius: 10, padding: 15, margin: 15 }, style]}
    >
      {children}
    </Theme.View>
  )
}

const optionsData = [
  {
    select: false,
    text: 'Notificar por cada vez que se registra un usuario.'
  },
  { select: false, text: 'Notificar por cada vez que se elimina un comprobante.' },
  { select: false, text: 'Notificar por al inicio de sesión.' },
  { select: false, text: 'Notificar por  cada vez que se elimina un cliente.' },
  { select: false, text: 'Notificar por cada vez que se crea un usuario.' },
  { select: false, text: 'Notificar por cada vez que se crea una guía.' },
  { select: false, text: 'Notificar por cada vez que se crea un producto.' },
  { select: false, text: 'Notificar por e-mail.' },
  { select: false, text: 'Notificar por TUMISOFT.' }
]

const sesions = [
  {
    device: 'PC Windows',
    location: 'Lima, Perú',
    appType: 'Web',
    userName: 'Administrador',
    status: 'Activa ahora'
  },
  {
    device: 'Sony Xperia XA1 Ultra',
    location: 'Lima, Perú',
    appType: 'App Tumisoft',
    userName: 'Vendedor 01',
    status: 'hace 16 horas'
  },
  {
    device: 'Dispositivo desconocido',
    location: 'Lima, Perú',
    appType: 'Web',
    userName: 'Vendedor 02',
    status: '24 de Agosto a las 10:15'
  }
]

const Language = () => {
  const { locale, setLocale } = useTranslation()
  return (
    <InputDropdown
      value={locale}
      onChange={(value) => {
        setLocale(value)
      }}
      placeholder="Lenguaje"
      items={[
        {
          label: 'Español',
          value: 'es'
        },
        {
          label: 'Inglés',
          value: 'en'
        }
      ]}
    />
  )
}
const Settings: FC<Props> = (props) => {
  const { t } = useTranslation()
  const [options, setOptions] = useState(optionsData)
  return (
    <Navigator optionIndex={0}>
      <View>
        <View>
          <Typography
            content={t('settingsNotify')}
            fontFamily={fonts.baloo2Bold700}
            size={18}
            style={{ marginHorizontal: 15 }}
          />
          <Card style={{ marginTop: 5 }}>
            <Typography
              content={t('settingsActivity')}
              fontFamily={fonts.baloo2SemiBold600}
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {options.map((option, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{ flexDirection: 'row', width: 360, paddingVertical: 5 }}
                  >
                    <Checkbox
                      style={{ alignSelf: 'center' }}
                      value={option.select}
                      type="secondary"
                      onChange={(value) => {
                        const newOptions = [...options]
                        newOptions[index] = {
                          ...newOptions[index],
                          select: value
                        }
                        setOptions(newOptions)
                      }}
                    />
                    <Typography
                      content={option.text}
                      style={{ alignSelf: 'center', marginLeft: 15 }}
                    />
                  </View>
                )
              })}
            </View>
          </Card>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Card style={{ flex: 3 }}>
              <Typography
                content={t('settingsActSession')}
                fontFamily={fonts.baloo2SemiBold600}
              />
              {sesions.map((sesion, index) => {
                return (
                  <React.Fragment key={index.toString()}>
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <Typography
                          content={`${sesion.device} - ${sesion.location} - ${sesion.userName}`}
                        />
                        <Typography content={`${sesion.appType} - ${sesion.status}`} />
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: '#EDECEF'
                      }}
                    />
                  </React.Fragment>
                )
              })}
            </Card>
            <Card style={{ flex: 2.5 }}>
              <Typography
                content={t('settingsLocation')}
                fontFamily={fonts.baloo2SemiBold600}
              />
              <Language />
            </Card>
          </View>
        </View>
      </View>
    </Navigator>
  )
}

export default Settings
