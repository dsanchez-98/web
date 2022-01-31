import React, { useState, FunctionComponent as FC, useRef } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import {
  StyleSheet as RStyleSheet,
  useResponsiveStyles
} from 'components/responsiveLayout'
import ModalInviteUsers from './ModalInviteUsers'
import Typography from 'components/typography'
import Icon from 'components/icon'
import Switch from 'components/switch'
import Search from './Search'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import fonts from 'styles/fonts'
import useAppContext from 'hooks/useAppContext'
import useService from 'hooks/useService'
import useTranslation from 'hooks/useTranslation'
import { useEmployeeService } from 'services/bm'
import Acordeon from 'components/acordeon'
import Animated, {
  getStyle,
  interpolateColor,
  useAnimatedStyle
} from 'components/reanimated'
import { interpolate } from 'react-native-reanimated'
import Theme from 'components/theme'
import EmployeeForm from 'pages/account/personalInformation/form'
import Button from 'components/modal/components/Button'
import { PropsContent } from 'components/modal'

type Employee = {
  lastname: string
  name: string
  roleId: number
  roleName: string
  status: number
  userId: number
}

type UserItemProps = {
  item: Employee
  onEditUser: () => void
  onRemoveUser: () => void
  onChangeStatus: (val: boolean) => void
}

type UserFormProps = {
  value?: Employee[]
  onChange: (val: Employee[]) => void
  textSearch?: string
  terminalId: number | string
}

const UserItem: FC<UserItemProps> = (props) => {
  const { breakPoint } = useResponsiveStyles(rStyles)
  const [flagOptionsSlide, setFlagOptionsSlide] = useState(false)

  const isMobile = ['xs', 'sm', 'md', 'lg'].some((x) => x === breakPoint)

  const options = (
    <>
      <TouchableOpacity style={nStyles.btnRemove} onPress={props.onRemoveUser}>
        <Icon name="remove" />
      </TouchableOpacity>
      <TouchableOpacity style={nStyles.btnEdit} onPress={props.onEditUser}>
        <Icon name="editOutlined" color="#4DA0FF" />
      </TouchableOpacity>
      <Switch
        value={!!props.item?.status}
        onChange={(val) => props.onChangeStatus(val)}
      />
    </>
  )

  const renderWrapper = ({ children, progress }: any) => {
    const containerStyle = useAnimatedStyle(() => {
      return getStyle({
        borderColor: interpolateColor(progress.value, [0, 1], ['transparent', '#EDECEF'])
      })
    })

    const arrowStyle = useAnimatedStyle(() => {
      return getStyle({
        transform: [
          {
            rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`
          }
        ]
      })
    })

    return (
      <Animated.View
        style={[
          {
            borderWidth: 1,
            marginVertical: 2,
            borderRadius: 5,
            borderColor: '#EDECEF',
            overflow: 'hidden'
          },
          containerStyle
        ]}
      >
        <TouchableOpacity
          activeOpacity={isMobile ? 0 : 1}
          style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}
          onPress={isMobile ? () => setFlagOptionsSlide(!flagOptionsSlide) : undefined}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* TODO: Agregar imagen */}
            <View style={nStyles.containerUserPicture} />
            <View>
              <Typography
                content={`${props.item?.name || ''}`}
                style={{
                  alignSelf: 'center'
                }}
                fontFamily={fonts.baloo2Regular400}
              />
              <Typography content={`${props.item?.roleName || ''}`} size={10} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {!isMobile ? (
              options
            ) : (
              <Animated.View style={arrowStyle}>
                <Theme.Icon name="arrow" />
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>
        {children}
      </Animated.View>
    )
  }

  return (
    <Acordeon
      height={40}
      active={flagOptionsSlide && isMobile}
      renderWrapper={renderWrapper}
    >
      <View style={nStyles.containerUserItemOptions}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          {options}
        </View>
      </View>
    </Acordeon>
  )
}

const Header = ({ searchText, setSearchText, onPressAdd }) => {
  const { t } = useTranslation()
  const [flagSearchActive, setFlagSearchActive] = useState(false)

  return (
    <>
      <View style={nStyles.topUserForm}>
        {flagSearchActive ? (
          <View style={{ marginRight: 12, flex: 1 }}>
            <Search
              value={searchText}
              onChange={(val) => {
                setSearchText(val)
              }}
              close={() => setFlagSearchActive(false)}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setFlagSearchActive(true)}
            style={nStyles.btnSearch}
          >
            <Icon name="search" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={nStyles.btnAdd} onPress={onPressAdd}>
          <Icon name="add" />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => showModal(ModalInviteUsers, { title: t('storeInviteUsers') })}
          style={nStyles.btnInvite}
        >
          <Typography
            content={t('invite')}
            color={colors.white}
            size={fontSize.md}
            fontFamily={fonts.baloo2SemiBold600}
            disableThemeColor
          />
        </TouchableOpacity>
      </View>
      <View style={nStyles.divider} />
    </>
  )
}

const UserModal: FC<PropsContent> = (props) => {
  const ref = useRef<any>()
  return (
    <Theme.View
      scheme="background"
      style={{ margin: 30, borderRadius: 8, minHeight: 300, minWidth: 350 }}
    >
      <View style={{ padding: 10 }}>{props.header}</View>
      <EmployeeForm ref={ref} id={props.params?.id} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 15
        }}
      >
        <Button
          title="Guardar"
          type="accept"
          onPress={async () => {
            await ref.current?.handleSubmit()
            props.hideModal(props.onAccept)
          }}
        />
      </View>
    </Theme.View>
  )
}

const UsersForm: FC<UserFormProps> = (props) => {
  const { terminalId } = props
  const { t } = useTranslation()
  const { showModal } = useAppContext()
  const [searchText, setSearchText] = useState('')
  const { updateStatusEmployee, deleteEmployee } = useEmployeeService()
  const [employees, getEmployees] = useService(
    useEmployeeService,
    'employeesList'
  )({ terminalId })

  const re = new RegExp('^' + searchText, 'i')
  const arrUsers = employees?.data.items.filter((x) => re.test(`${x.name} ${x.lastname}`))

  const onRemoveUser = (x: Employee) => {
    showModal({
      title: t('storeUserDelTitle'),
      message: t('storeUserDelMess'),
      acceptText: t('storeUserDelQuit'),
      onAccept: async () => {
        await deleteEmployee(x.userId)
        getEmployees()
      },
      onCancel: () => {},
      icon: <Icon name="hand" />
    })
  }

  const onEditUser = (id: number) => {
    showModal(
      UserModal,
      {
        title: 'Editar usuario',
        cancelable: false,
        onAccept: () => {
          getEmployees()
        },
        onCancel: () => {}
      },
      {
        id
      }
    )
  }

  const addUser = () => {
    showModal(
      UserModal,
      {
        title: 'Crear usuario',
        cancelable: false,
        onAccept: () => {
          getEmployees()
        },
        onCancel: () => {}
      },
      {
        id: undefined
      }
    )
  }

  const onChangeStatus = async (x: Employee, val: boolean) => {
    if (!x.status) {
      await updateStatusEmployee(x.userId, { active: !x.status })
      getEmployees()
    } else {
      showModal({
        title: t('storeUserStatusTitleTwo'),
        message: t('storeUserStatusMessTwo') + x.name + t('storeUserStatusMessThree'),
        acceptText: t('storeUserStatusDeact'),
        onAccept: async () => {
          await updateStatusEmployee(x.userId, { active: !x.status })
          getEmployees()
        },
        onCancel: () => {},
        icon: <Icon name="alert" />
      })
    }

    // const flagUnique = arrUsers?.filter((y: Employee) => y.status === true).length === 1
    // if (!val && flagUnique) {
    //   showModal({
    //     title: t('storeUserStatusTitle'),
    //     message: t('storeUserStatusMess'),
    //     onAccept: () => {},
    //     icon: <Icon name="rocket" />
    //   })
    // } else if (!val) {
    //   showModal({
    //     title: t('storeUserStatusTitleTwo'),
    //     message: t('storeUserStatusMessTwo') + x.label + t('storeUserStatusMessThree'),
    //     acceptText: t('storeUserStatusDeact'),
    //     onAccept: () => handleUserChange({ ...x, status: false }),
    //     onCancel: () => {},
    //     icon: <Icon name="alert" />
    //   })
    // } else {
    //   handleUserChange({ ...x, status: true })
    // }
  }

  return (
    <>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        onPressAdd={addUser}
      />
      <View style={nStyles.bottomUserForm}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 8 }}>
          {arrUsers?.map((user) => (
            <UserItem
              key={user.userId.toString()}
              onChangeStatus={(val) => onChangeStatus(user, val)}
              onEditUser={() => onEditUser(user.userId)}
              onRemoveUser={() => onRemoveUser(user)}
              item={user}
            />
          ))}
        </ScrollView>
      </View>
    </>
  )
}

const rStyles = RStyleSheet.create({})

const nStyles = StyleSheet.create({
  bottomUserForm: {
    maxHeight: 300,
    minHeight: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFFFFF'
  },
  btnRemove: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C84040',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4
  },
  btnEdit: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4
  },
  containerUserItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerUserItemOptions: {
    backgroundColor: '#EDECEF',
    height: 40,
    justifyContent: 'center'
  },
  containerUserPicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: '#D1D4DD',
    borderWidth: 1.3,
    backgroundColor: '#2A2D45',
    marginRight: 8,
    alignSelf: 'center'
  },
  containerRightUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  containerLeftUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  topUserForm: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24
  },
  btnSearch: {
    width: 36,
    height: 36,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#FFE34D',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAdd: {
    width: 36,
    height: 36,
    backgroundColor: '#4DA0FF',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  btnInvite: {
    width: 72,
    height: 36,
    backgroundColor: '#4DA0FF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    backgroundColor: '#CCCCCC',
    width: '100%',
    height: 1
  }
})

export default UsersForm
