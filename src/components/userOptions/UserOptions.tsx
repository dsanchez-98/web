import Typography from 'components/typography'
import React, { FC, useState } from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import colors from 'styles/colors'
import icons, { IconNames } from './icons'
import Theme from 'components/theme'
import { shadow } from 'styles/shadow'
import { PERSONAL_INFORMATION } from 'pages/account/personalInformation'
import { useAppDispatch } from 'redux-core/hooks'
import { actionRemoveSesion } from 'redux-core/actions/sesion.action'
import { SETTINGS } from 'pages/settings/settings'
import Icon from 'components/icon'
import fonts from 'styles/fonts'
import { COMPANY_SETUP } from 'pages/enterprises/companySetup'
import { CHOOSEACC } from 'pages/account/chooseAccount'
import useAppContext from 'hooks/useAppContext'
import ContentPage from 'components/modal/ContentPage'
import useTranslation from 'hooks/useTranslation'
interface Props {
  onPressOption?: () => void
}

type OptionType = {
  iconName: keyof typeof icons
  title: string
  onPress: () => void
  onHovered?: (hover: boolean) => void
  isHovered?: boolean
}

const Option = ({ iconName, onPress, title, onHovered, isHovered }: OptionType) => {
  const Icon = icons[iconName]
  return (
    <TouchableOpacity
      {...{
        onMouseEnter: () => {
          onHovered?.(true)
        },
        onMouseLeave: () => {
          onHovered?.(false)
        }
      }}
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 5,
          backgroundColor: isHovered ? '#EBF3FF' : undefined
        }
      ]}
    >
      <View style={{ padding: 2, paddingHorizontal: 15 }}>
        <Icon color={isHovered ? colors.primary : undefined} />
      </View>
      <Typography
        content={title}
        style={{ textAlign: 'center', alignSelf: 'center' }}
        color={colors.primary}
        disableThemeColor={isHovered}
      />
    </TouchableOpacity>
  )
}

const line = () => (
  <View
    style={{
      height: 1,
      width: '90%',
      backgroundColor: colors.grayBorder,
      marginHorizontal: 15,
      marginVertical: 4
    }}
  />
)

type Options = {
  iconName: IconNames
  title: string
  routeName?: string
  onPress?: () => void
}[][]
const useOptions = () => {
  const { showModal } = useAppContext()
  const { t } = useTranslation()

  const onPressPage = (type: number) => {
    showModal(
      ContentPage,
      {
        onAccept: () => {}
      },
      {
        // TODO: Tipos temporales
        pageType: type
      }
    )
  }

  const options: Options = [
    [
      {
        iconName: 'enterprise',
        title: t('userOptAdminProf'),
        routeName: CHOOSEACC
      },
      {
        iconName: 'account',
        title: t('userOptMyAcc'),
        routeName: PERSONAL_INFORMATION
      },
      {
        iconName: 'enterprise',
        title: t('userOptEnterprise'),
        routeName: COMPANY_SETUP
      },
      // { iconName: 'payment', title: 'Pagos' },
      { iconName: 'config', title: t('userOptConfig'), routeName: SETTINGS }
    ],
    [
      {
        iconName: 'tutorial',
        title: t('userOptVideo')
      },
      {
        iconName: 'politics',
        title: t('userOptTerms'),
        onPress: () => onPressPage(1)
      },
      {
        iconName: 'politics',
        title: t('userOptPolite'),
        onPress: () => onPressPage(2)
      },
      {
        iconName: 'closeSesion',
        title: t('userOptLogout')
      }
    ]
  ]
  return options
}

const UserOptions: FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const [indexHover, setHover] = useState<string | undefined>()
  return (
    <ScrollView style={[shadow, styles.container]}>
      <Theme.View scheme="primary">
        <View style={{ height: 100, justifyContent: 'center', flexDirection: 'row' }}>
          <Icon
            name="iconTumiSoft"
            width={48}
            height={48}
            style={{ alignSelf: 'center', marginHorizontal: 15 }}
          />
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <Typography content="Bienvenido, Pablo" fontFamily={fonts.baloo2Medium500} />
            <Typography content="Tumisoft" fontFamily={fonts.baloo2Medium500} />
            <Typography content="RUC 20601446686" fontFamily={fonts.baloo2Medium500} />
          </View>
        </View>
        {useOptions().map((item, i) => {
          return (
            <React.Fragment key={i.toString()}>
              {line()}
              {item.map((option, j) => {
                const key = `${i}-${j}`
                return (
                  <Option
                    key={key}
                    iconName={option.iconName}
                    title={option.title}
                    onPress={() => {
                      props.onPressOption?.()
                      option.routeName && navigation.navigate(option.routeName)
                      option.iconName === 'closeSesion' && dispatch(actionRemoveSesion())
                      option.onPress?.()
                    }}
                    onHovered={(isHovered) => {
                      if (isHovered) {
                        setHover(key)
                      } else {
                        setHover(undefined)
                      }
                    }}
                    isHovered={indexHover === key}
                  />
                )
              })}
            </React.Fragment>
          )
        })}
      </Theme.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 256,
    borderRadius: 5,
    borderColor: colors.grayBorder,
    borderWidth: 1,
    overflow: 'hidden'
  }
})

export default UserOptions
