import React, { useState } from 'react'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { TouchableOpacity, View } from 'react-native'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import Icon from 'components/icon'
import TextInput from 'components/textInput'
import Checkbox from 'components/checkbox'
import fontSize from 'styles/fontSize'
import useAppContext from 'hooks/useAppContext'
import ModalRols from 'pages/account/personalInformation/modal/modalRols'
import useTranslation from 'hooks/useTranslation'
import InputDropdown from 'components/textInput/components/InputDropdown'

interface InviteModalProps {
  hideModal: () => void
}

interface RolesProps {
  roles: { label: string; value: string }[]
  value: string[]
  onChange: (val: string[]) => void
}

const RolesComponent = (props: RolesProps) => {
  const { showModal } = useAppContext()

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
                  props.value.some((y: string) => y === x.value)
                    ? props.value.filter((y: string) => y !== x.value)
                    : [...new Set([...props.value, x.value])]
                )
              }}
              type="primary"
              value={props.value.some((y) => y === x.value)}
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

const ModalInviteUsers = ({ hideModal }: InviteModalProps) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const [correo, setCorreo] = useState('')
  const [flagRegistro, setFlagRegistro] = useState(false)
  // const [arrRoles, setArrRoles] = useState([
  //   {
  //     label: 'Gestión',
  //     value: '1'
  //   },
  //   {
  //     label: 'Ventas',
  //     value: '2'
  //   },
  //   {
  //     label: 'Compras',
  //     value: '3'
  //   },
  //   {
  //     label: 'Logística',
  //     value: '4'
  //   },
  //   {
  //     label: 'Contabilidad',
  //     value: '5'
  //   }
  // ])
  const arrRoles = [
    {
      label: 'Gestión',
      value: '1'
    },
    {
      label: 'Ventas',
      value: '2'
    },
    {
      label: 'Compras',
      value: '3'
    },
    {
      label: 'Logística',
      value: '4'
    },
    {
      label: 'Contabilidad',
      value: '5'
    }
  ]
  const [roles, setRoles] = useState<any>([])
  const [stores, setStores] = useState<any>([])
  // const [arrStores, setArrStores] = useState([
  //   {
  //     label: 'Tienda 01',
  //     value: '1'
  //   },
  //   {
  //     label: 'Tienda 02',
  //     value: '2'
  //   },
  //   {
  //     label: 'Tienda 03',
  //     value: '3'
  //   }
  // ])
  const arrStores = [
    {
      label: 'Tienda 01',
      value: '1'
    },
    {
      label: 'Tienda 02',
      value: '2'
    },
    {
      label: 'Tienda 03',
      value: '3'
    }
  ]

  return (
    <View style={styles.modalInviteUsersContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography
          content={t('storeUserModalTitle')}
          color={colors.black}
          size={styles.textTitleModalInviteUsers.fontSize}
          fontFamily={fonts.baloo2SemiBold600}
        />
        <TouchableOpacity style={styles.btnCloseModal} onPress={() => hideModal()}>
          <Icon name="close" color="#2A2D45" />
        </TouchableOpacity>
      </View>
      <Typography
        content={t('storeUserModalText')}
        style={styles.textBodyModalinviteUsers}
        color={colors.black}
        size={styles.textBodyModalinviteUsers.fontSize}
        fontFamily={fonts.baloo2Medium500}
      />
      <View style={{ marginTop: 2 }}>
        <TextInput
          value={correo}
          onChange={(val) => setCorreo(val)}
          placeholder={t('storeUserModalMail')}
        />
      </View>
      <View style={{ flexDirection: 'column', width: '60%', marginTop: 12 }}>
        <Typography
          style={{
            marginBottom: 8
          }}
          content={t('storeUserModalRoles')}
          fontFamily={fonts.baloo2Medium500}
          size={fontSize.xs}
        />
        <RolesComponent
          roles={arrRoles}
          onChange={(val) => setRoles(val)}
          value={roles}
        />
        <Typography
          content={t('storeUserModalStoreCash')}
          fontFamily={fonts.baloo2Medium500}
          size={fontSize.xs}
        />
        <InputDropdown
          multiple={true}
          items={arrStores}
          value={stores}
          onChange={(val) => {
            setStores(val)
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <Checkbox
          style={{ marginLeft: 2 }}
          value={flagRegistro}
          onChange={(val) => setFlagRegistro((prev) => !prev)}
          type="primary"
        />
        <Typography
          content={t('storeUserModalTextTwo')}
          style={{ marginLeft: 6, lineHeight: 16 }}
          color={colors.black}
          size={styles.textCheckModalInviteUsers.fontSize}
          fontFamily={fonts.baloo2Regular400}
          disableThemeColor
        />
      </View>
      <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            width: 128,
            height: 40,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 6,
            borderColor: '#CCCCCC',
            backgroundColor: '#FFFFFF'
          }}
          onPress={() => hideModal()}
        >
          <Typography
            content={t('cancel')}
            color={colors.primary}
            size={fontSize.md}
            fontFamily={fonts.baloo2SemiBold600}
            disableThemeColor
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 128,
            height: 40,
            marginLeft: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            backgroundColor: '#4DA0FF'
          }}
        >
          <Typography
            content={t('send')}
            color={colors.white}
            size={fontSize.md}
            fontFamily={fonts.baloo2SemiBold600}
            disableThemeColor
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const rStyles = StyleSheet.create({
  btnCloseModal: {
    width: 24,
    height: 24,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalInviteUsersContainer: {
    backgroundColor: '#FFFFFF',
    // height: '368 md:366',
    width: '328 md:420',
    borderRadius: 20,
    padding: 24
  },
  textTitleModalInviteUsers: {
    fontSize: '14 md:20'
  },
  textBodyModalinviteUsers: {
    marginTop: '16 md:20',
    lineHeight: 18,
    fontSize: '12 md:16'
  },
  textCheckModalInviteUsers: {
    fontSize: '12 md:14'
  }
})

export default ModalInviteUsers
