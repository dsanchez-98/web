import React, { FunctionComponent as FC } from 'react'
import NavigationPanel, { NavigationPanelProps } from 'components/navigationPanel'
import { useNavigation } from '@react-navigation/native'
import { HEIGHT } from 'components/toolbar'
import Theme from 'components/theme'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { shadow } from 'styles/shadow'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { ENTERPRISE_FORM } from '../enterprise'
import { STORE_FORM } from '../store'
import { USER_FORM } from '../user'
import { useResponsiveStyles } from 'components/responsiveLayout'
import { useAppDispatch } from 'redux-core/hooks'
import { actionSetSesion } from 'redux-core/actions/sesion.action'
import useTranslation from 'hooks/useTranslation'
interface Props extends NavigationPanelProps {
  onPressNext: () => Promise<boolean>
}

const line = (select: boolean) => (
  <View
    style={[styles.line, { backgroundColor: select ? colors.purple : colors.grayBorder }]}
  />
)

const ButtonNext = ({ onPress }: { onPress: () => void }) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonNext}>
      <Typography content={t('siguiente')} disableThemeColor color={colors.white} />
    </TouchableOpacity>
  )
}

const Toolbar = ({ onPressNext }: { onPressNext: () => Promise<boolean> }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { isMobile } = useResponsiveStyles({})
  const nav = useNavigation()
  const { routes, index } = nav.getState()
  const currentRoute = routes[index]
  const currentRouteName = currentRoute.name
  const steps = [
    { text: 'Usuario', routeName: USER_FORM },
    { text: 'Empresa', routeName: ENTERPRISE_FORM },
    { text: 'Tienda', routeName: STORE_FORM }
  ]

  const indexSelect = steps.findIndex((i) => i.routeName === currentRouteName)
  return (
    <Theme.View scheme="background" style={{ height: HEIGHT, justifyContent: 'center' }}>
      <Theme.View
        scheme="primary"
        style={[styles.container, styles.shadow, { height: HEIGHT - 30 }]}
      >
        {!isMobile && (
          <View style={styles.containerLeft}>
            <Typography
              content={t('firstStepsComplete')}
              fontFamily={fonts.baloo2SemiBold600}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            flex: 1,
            marginHorizontal: 15
          }}
        >
          {steps.map((item, index) => {
            const selected = indexSelect >= index
            return (
              <React.Fragment key={item.routeName}>
                <Typography
                  content={item.text}
                  fontFamily={fonts.baloo2SemiBold600}
                  color={colors.purple}
                  disableThemeColor={selected}
                />
                {index !== steps.length - 1 && line(selected)}
              </React.Fragment>
            )
          })}
        </View>
        <ButtonNext
          onPress={async () => {
            // if (await onPressNext()) {
            if (indexSelect < 2) {
              navigation.navigate(steps[indexSelect + 1].routeName)
            } else {
              dispatch(actionSetSesion({ initialConfig: true }))
            }
            // }
          }}
        />
      </Theme.View>
    </Theme.View>
  )
}

const Navigator: FC<Props> = (props) => {
  const { t } = useTranslation()
  return (
    <NavigationPanel
      renderToolbar={() => <Toolbar onPressNext={props.onPressNext} />}
      name={t('firstStepsConfigInit')}
      {...props}
    >
      {props.children}
    </NavigationPanel>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  shadow: shadow as any,
  containerLeft: {
    borderRightWidth: 1,
    borderColor: colors.grayBorder,
    width: 260,
    justifyContent: 'center'
  },
  line: {
    height: 2,
    width: 13,
    alignSelf: 'center',
    marginHorizontal: 4
  },
  buttonNext: {
    alignSelf: 'center',
    padding: 6,
    paddingHorizontal: 20,
    backgroundColor: colors.purple,
    borderRadius: 5,
    marginHorizontal: 5
  }
})

export default Navigator
