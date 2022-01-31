import React, { FC, ReactNode, useState, useRef } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import Icon, { IconNames } from 'components/icon'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import { LogoTumiSoft } from 'components/icon/icons'
import Theme from 'components/theme'
import { DrawerParams } from 'components/drawer/Drawer'
import { shadow } from 'styles/shadow'
import InputDropdown from 'components/textInput/components/InputDropdown'
import useTranslation from 'hooks/useTranslation'
import Acordeon, { Arrow } from 'components/acordeon'
import useService from 'hooks/useService'
import { useTerminalService } from 'services/bm'
import useSesion from 'hooks/useSesion'
import { actionSetSesion } from 'redux-core/actions/sesion.action'
import { useAppDispatch } from 'redux-core/hooks'

type Module = {
  type: 'item' | 'group'
  name?: string
  title?: string
  icon?: IconNames
  modules?: Module[]
}

type ItemModuleType = {
  type: 'item' | 'group'
  node: number
  onPress: () => void
  selected: boolean
  title?: string
  icon?: IconNames
  hasParent: boolean
  children?: React.ReactNode
}

const ItemModule = ({
  icon,
  node,
  selected,
  onPress,
  type,
  title,
  hasParent,
  children
}: ItemModuleType) => {
  const [visible, setVisible] = useState(selected)

  const bgColor = {
    group: '#BFDDFF',
    item: '#4DA0FF'
  }[type]

  return (
    <Acordeon
      active={visible}
      height={React.Children.count(children) * 45}
      unmount={false}
      renderWrapper={({ children, progress }) => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                if (type === 'group') {
                  setVisible(!visible)
                }
                onPress()
              }}
              style={[
                styles.containerItem,
                {
                  backgroundColor: selected ? bgColor : ''
                }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 8, marginLeft: 8 * node }}>
                  {!!icon && (
                    <Icon
                      name={hasParent ? icon : selected ? 'circleOutline' : 'circle'}
                      color={selected ? colors.white : colors.gray}
                    />
                  )}
                </View>
                <Typography
                  content={title}
                  style={{ textAlignVertical: 'center' }}
                  color={selected ? colors.white : colors.black}
                  size={fontSize.md}
                  fontFamily={fonts.baloo2Medium500}
                  disableThemeColor={selected}
                />
              </View>
              {type === 'group' && (
                <View style={{ marginRight: 8 }}>
                  <Arrow progress={progress} color={selected ? 'white' : undefined} />
                </View>
              )}
            </TouchableOpacity>
            {children}
          </>
        )
      }}
    >
      {children}
    </Acordeon>
  )
}

const Footer = () => {
  const { t } = useTranslation()

  return (
    <View style={styles.bottomSection}>
      <View style={styles.footPageContainer}>
        <Typography
          content={'v2.0'}
          color={colors.white}
          size={fontSize.sm}
          fontFamily={fonts.baloo2Medium500}
          disableThemeColor
        />
        <Typography
          content={`${t('madeWith')} `}
          style={{ marginLeft: 8 }}
          color={colors.white}
          size={fontSize.sm}
          fontFamily={fonts.baloo2Medium500}
          disableThemeColor
        />
        <View style={{ marginLeft: 4 }}>
          <Icon name="hearth" />
        </View>
        <Typography
          content={`${t('by')} `}
          style={{ marginLeft: 4 }}
          color={colors.white}
          size={fontSize.sm}
          fontFamily={fonts.baloo2Medium500}
          disableThemeColor
        />
        <View style={{ marginLeft: 4 }}>
          <LogoTumiSoft typeStyle="white" width="94" height="16" />
        </View>
      </View>
    </View>
  )
}

const Header = (props: { getSesion: () => any }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [terminals] = useService(useTerminalService, 'terminalsList')()
  const dataSesion = props.getSesion()

  const arrTerminal = terminals?.data.items.map((x) => {
    return {
      label: x.name,
      value: x.id
    }
  })
  const numVouchersUsed = 10
  const maxNumVouchers = 50
  return (
    <View>
      <View style={styles.iconContainer}>
        <View style={styles.menuSlideIcon}>
          <Icon name="menuSlide" />
        </View>
        <View>
          <Icon name="logoTumiSoft" height={34} width={160} />
        </View>
      </View>
      <View style={styles.textNumberVouchers}>
        <Typography
          content={`${t('haveVoucher')} `}
          size={fontSize.sm}
          fontFamily={fonts.baloo2Regular400}
        />
        <Typography
          content={`${numVouchersUsed} ${t('freeVoucher')} `}
          color={colors.purple}
          size={fontSize.sm}
          fontFamily={fonts.baloo2Medium500}
          disableThemeColor
        />
        <Typography
          content={`${t('of')} ${maxNumVouchers} ${t('vouchers')}.`}
          size={fontSize.sm}
          fontFamily={fonts.baloo2Regular400}
        />
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarExternal}>
          <View
            style={[
              styles.progressBarInternal,
              { width: `${(numVouchersUsed / maxNumVouchers) * 100}%` }
            ]}
          />
        </View>
      </View>
      {arrTerminal && dataSesion && (
        <InputDropdown
          items={[{ label: t('allStores'), value: null }, ...arrTerminal]}
          onChange={(val) =>
            dispatch(actionSetSesion({ ...dataSesion, currentTerminalId: val }))
          }
          placeholder={t('accessTo')}
          value={dataSesion.currentTerminalId}
          borderColor={colors.purple}
          placeholderTextColor={colors.purple}
          textColor={colors.purple}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  )
}

const selectedChild = (node: ReactNode, name: string) => {
  let selected = false

  const get = (children: ReactNode) => {
    React.Children.forEach(children, (child: any) => {
      if (child.props.name === name) {
        selected = true
      } else {
        get(child.props.children)
      }
    })
  }
  get(node)
  return selected
}

const MenuBase: FC<DrawerParams & { routes: any }> = (props) => {
  const refScroll = useRef<ScrollView>(null)

  const getModules = (mod: Module[], node = 0) => {
    return React.Children.map<any, any>(mod, ({ props: item }, key) => {
      if (item.type === 'form' || !item.type) {
        return null
      }
      return (
        <ItemModule
          key={key}
          onPress={() => {
            if (item.type === 'item') {
              props.navigate(item.name!)
            }
          }}
          node={node}
          selected={
            props.focusedRouteName === item.name ||
            selectedChild(item.children, props.focusedRouteName)
          }
          type={item.type}
          title={item.options?.title}
          icon={item.options?.icon}
          hasParent={!node}
        >
          {item.children && getModules(item.children, node + 1)}
        </ItemModule>
      )
    })
  }
  const { getSesion } = useSesion()

  return (
    <Theme.View style={[styles.mainContainer, shadow]} scheme="primary">
      <ScrollView
        ref={refScroll}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {/* <Typography
          onPress={() => (locale === 'en' ? setLocale('es') : setLocale('en'))}
          content="language"
        /> */}
        <Header getSesion={getSesion} />
        <View style={{ marginTop: 20 }}>{getModules(props.routes.props.children)}</View>
      </ScrollView>
      <Footer />
    </Theme.View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  bottomSection: {},
  footPageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
    backgroundColor: colors.blueLight
  },
  iconContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  noIconContainer: {
    paddingHorizontal: 20
  },
  menuSlideIcon: {
    marginTop: 5,
    marginRight: 40
  },
  textNumberVouchers: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 16
  },
  progressBarExternal: {
    width: '100%',
    height: 16,
    backgroundColor: colors.grayLight,
    borderRadius: 200,
    padding: 4
  },
  progressBarInternal: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.purple,
    borderRadius: 200
  },
  mainTabsContainer: {
    marginTop: 22
  },
  allStoresTab: {
    width: '100%',
    height: 40,
    paddingLeft: 12,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 6
  },
  containerItem: {
    height: 40,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    paddingHorizontal: 5
  }
})

export default MenuBase
