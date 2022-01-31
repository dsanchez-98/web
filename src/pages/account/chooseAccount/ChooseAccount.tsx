import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import useTranslation from 'hooks/useTranslation'
import useAppContext from 'hooks/useAppContext'
import useSesion from 'hooks/useSesion'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import Typography from 'components/typography'
import ScrollView from 'components/scrollView'
import Toolbar from 'components/toolbar'
import Theme from 'components/theme'
import Card from 'components/card'
import Icon from 'components/icon'
import Switch from 'components/switch'
import { useEnterpriseService } from 'services/bm'
import { useUsersService } from 'services/iam'
import { useTypeIdentityDocService } from 'services/finance'
import { useAppDispatch } from 'redux-core/hooks'
import { actionSetcurrentEnterpriseId } from 'redux-core/actions/sesion.action'
import { VOUCHERS_LIST } from 'pages/sales/vouchers/list'
import useService from 'hooks/useService'

const Content = (props: any) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const [flagFacebook, setFlagFacebook] = useState(false)
  const [flagGoogle, setFlagGoogle] = useState(false)

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.panelHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Typography
            style={{
              marginRight: 20
            }}
            content={t('choosePanelTitle')}
            fontFamily={fonts.baloo2ExtraBold800}
            size={fontSize.lg}
          />
          <TouchableOpacity
            onPress={() => props.hideModal()}
            style={{
              width: 28,
              height: 28,
              backgroundColor: colors.grayBorder,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 200
            }}
          >
            <Icon name="close" width={16} height={16} />
          </TouchableOpacity>
        </View>
        <Typography
          style={{ marginTop: 24, maxWidth: 265 }}
          content={t('choosePanelText')}
          fontFamily={fonts.baloo2Regular400}
          size={fontSize.sm}
        />
      </View>
      <View style={styles.panelBody}>
        <View style={styles.divider} />
        <View style={styles.socialNetworkItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <Icon name="facebook" />
            </View>
            <Typography
              style={{
                marginRight: 20
              }}
              content={t('choosePanelFacebook')}
              fontFamily={fonts.baloo2SemiBold600}
              size={fontSize.md}
            />
          </View>
          <Switch
            value={flagFacebook}
            onChange={() => setFlagFacebook((prev) => !prev)}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.socialNetworkItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <Icon name="google" />
            </View>
            <Typography
              style={{
                marginRight: 20
              }}
              content={t('choosePanelGoogle')}
              fontFamily={fonts.baloo2SemiBold600}
              size={fontSize.md}
            />
          </View>
          <Switch value={flagGoogle} onChange={() => setFlagGoogle((prev) => !prev)} />
        </View>
        <View style={styles.divider} />
      </View>
    </View>
  )
}

const ChooseAccount = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const { getSesion } = useSesion()
  const [profile] = useService(useUsersService, 'showProfile')()
  const [arrTypeIdentityDoc] = useService(
    useTypeIdentityDocService,
    'listTypeIdentityDoc'
  )()
  const [arrEnterprise] = useService(useEnterpriseService, 'enterprisesList')()
  const infoUser = {
    nameUser: profile?.data.profile.name,
    emailUser: profile?.data.profile.email,
    passRecentChange: '',
    recentChange: ''
  }
  const enterprises = arrEnterprise?.data.items.map((x) => {
    return {
      id: x.id,
      accountName: x.account.name,
      enterpriseName: x.sender ? x.sender.businessName : '',
      document: {
        typeDocument: x.sender ? x.sender.identityDocumentTypeId : null,
        numDocument: x.sender ? x.sender.id : ''
      },
      roles: ['']
    }
  })
  const typeIdentityDocs = arrTypeIdentityDoc?.data.items.map((x) => {
    return {
      label: x.name,
      value: x.id
    }
  })

  const { showModal } = useAppContext()
  const dispatch = useAppDispatch()
  const enterpriseId = getSesion().currentEnterpriseId

  return (
    <ScrollView
      renderToolbar={() => <Toolbar />}
      renderHeader={() => <></>}
      showsVerticalScrollIndicator={false}
    >
      <Theme.View
        scheme={'primary'}
        style={[styles.container, { marginHorizontal: 15, flex: 1 }, shadow]}
      >
        <View style={styles.header}>
          <View
            style={{
              transform: [
                {
                  rotate: '180deg'
                }
              ]
            }}
          >
            <Icon name="arrowRight" width={24} height={24} color={colors.black} />
          </View>
          <Typography
            style={{ marginLeft: 16 }}
            content={`${t('chooseAccMyAcc')} / ${t('chooseAccChoose')}`}
            size={fontSize.md}
            fontFamily={fonts.baloo2Bold700}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.cardLeft}>
            <Card>
              <View style={styles.cardLeftHeader}>
                <Typography
                  content={`${t('chooseAccMyAcc')}`}
                  color={colors.primary}
                  fontFamily={fonts.baloo2SemiBold600}
                  size={fontSize.lg}
                  disableThemeColor
                />
                <Typography
                  content={t('chooseAccEnter')}
                  color={colors.black}
                  fontFamily={fonts.baloo2Regular400}
                  size={fontSize.md}
                  disableThemeColor
                />
              </View>
              <View style={styles.cardLeftBody}>
                {enterprises?.map((x, k: number) => (
                  <View key={k}>
                    <View style={styles.divider} />
                    <View style={styles.itemAccContainer}>
                      <View style={styles.itemAccLeft}>
                        <View style={styles.circle} />
                        <View style={styles.infoContainer}>
                          <Typography
                            content={x.accountName}
                            size={fontSize.md}
                            fontFamily={fonts.baloo2Medium500}
                          />
                          <Typography
                            content={x.roles.join(',')}
                            size={fontSize.sm}
                            fontFamily={fonts.baloo2Medium500}
                            color={'#959595'}
                            disableThemeColor
                          />
                        </View>
                      </View>
                      <View style={styles.itemAccRight}>
                        <View style={[styles.infoContainer, { alignItems: 'flex-end' }]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              style={{
                                marginRight: 8,
                                textAlign: 'right'
                              }}
                              content={x.enterpriseName}
                              size={fontSize.md}
                              fontFamily={fonts.baloo2Medium500}
                            />
                            <Icon name="peru" width={24} height={16} />
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Typography
                              content={`${
                                typeIdentityDocs?.find(
                                  (y) => y.value === x.document.typeDocument
                                )?.label || ''
                              } `}
                              size={fontSize.sm}
                              fontFamily={fonts.baloo2Medium500}
                              color={'#959595'}
                              disableThemeColor
                            />
                            <Typography
                              content={x.document.numDocument || '--'}
                              size={fontSize.sm}
                              fontFamily={fonts.baloo2Medium500}
                              color={'#959595'}
                              disableThemeColor
                            />
                          </View>
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.btnAccount,
                            enterpriseId === x.id ? { backgroundColor: colors.gray } : {}
                          ]}
                          disabled={enterpriseId === x.id}
                          onPress={() => {
                            dispatch(actionSetcurrentEnterpriseId(x.id))
                            navigation.navigate(VOUCHERS_LIST)
                          }}
                        >
                          <Typography
                            content={t('chooseAccGo')}
                            fontFamily={fonts.baloo2SemiBold600}
                            size={fontSize.md}
                            color={colors.white}
                            disableThemeColor
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {k === enterprises?.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </View>
              <View style={styles.cardLeftFooter}>
                <TouchableOpacity
                  style={styles.btnFooter}
                  onPress={() => navigation.navigate('ENTERPRISE_FORM_SETUP')}
                >
                  <Typography
                    content={t('chooseAccBtnBussi')}
                    fontFamily={fonts.baloo2SemiBold600}
                    size={fontSize.md}
                    color={colors.primary}
                    disableThemeColor
                  />
                </TouchableOpacity>
              </View>
            </Card>
          </View>
          <View style={styles.cardRight}>
            <Card>
              <View style={styles.cardRightHeader}>
                <View style={[styles.circle, { width: 88, height: 88 }]} />
                <View style={styles.infoContainer}>
                  <Typography
                    content={infoUser.nameUser}
                    numberOfLines={1}
                    style={{ width: 360 }}
                    fontFamily={fonts.baloo2Medium500}
                    size={fontSize.xl}
                    color={colors.primary}
                    disableThemeColor
                  />
                  <Typography
                    content={infoUser.recentChange}
                    fontFamily={fonts.baloo2Medium500}
                    size={fontSize.sm}
                  />
                </View>
              </View>
              <View style={styles.cardRightBody}>
                <View style={styles.mailInfoContainer}>
                  <View style={styles.leftMailInfo}>
                    <Typography
                      content={t('chooseAccMail')}
                      fontFamily={fonts.baloo2Regular400}
                      size={fontSize.md}
                    />
                    <Typography
                      content={infoUser.emailUser}
                      fontFamily={fonts.baloo2SemiBold600}
                      size={fontSize.lg}
                      color={colors.primary}
                      disableThemeColor
                    />
                  </View>
                  <TouchableOpacity style={styles.btnFooter}>
                    <Typography
                      content={t('chooseAccChange')}
                      fontFamily={fonts.baloo2SemiBold600}
                      size={fontSize.md}
                      color={colors.primary}
                      disableThemeColor
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
                <View style={styles.passInfoContainer}>
                  <View style={styles.leftMailInfo}>
                    <Typography
                      content={t('chooseAccPass')}
                      fontFamily={fonts.baloo2Regular400}
                      size={fontSize.md}
                    />
                    <Typography
                      content={`${t('chooseAccLastTime')} ${infoUser.passRecentChange}`}
                      fontFamily={fonts.baloo2SemiBold600}
                      size={fontSize.lg}
                      color={colors.primary}
                      disableThemeColor
                    />
                  </View>
                  <TouchableOpacity style={styles.btnFooter}>
                    <Typography
                      content={t('chooseAccChange')}
                      fontFamily={fonts.baloo2SemiBold600}
                      size={fontSize.md}
                      color={colors.primary}
                      disableThemeColor
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
                <View style={styles.cardLeftFooter}>
                  <TouchableOpacity
                    style={styles.btnFooterRight}
                    onPress={() =>
                      showModal(Content, {
                        type: 'panel'
                      })
                    }
                  >
                    <Typography
                      content={t('chooseAccConn')}
                      fontFamily={fonts.baloo2SemiBold600}
                      size={fontSize.md}
                      color={colors.white}
                      disableThemeColor
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </Theme.View>
    </ScrollView>
  )
}

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3
}

const rStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: colors.grayBackground,
    borderRadius: 10,
    flexDirection: 'column'
  },
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 22,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: colors.grayLight,
    paddingHorizontal: '30 md:60 xl:90',
    paddingBottom: 40
  },
  cardLeft: { paddingTop: 48, width: '100% xl:45%' },
  cardRight: { paddingTop: 48, width: '100% xl:45%', minWidth: '1 xl:485' },
  cardLeftHeader: {
    backgroundColor: colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 8
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray
  },
  cardLeftBody: {
    // paddingHorizontal: 24
  },
  itemAccContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  itemAccLeft: {
    padding: 24,
    flexDirection: 'row',
    width: '100% lg:45%',
    minWidth: '1 md:175',
    justifyContent: 'space-between'
  },
  itemAccRight: {
    padding: 24,
    flexDirection: 'row',
    width: '100% lg:45%',
    minWidth: '1 md:175',
    justifyContent: 'space-between'
  },
  circle: {
    height: 48,
    width: 48,
    backgroundColor: colors.black,
    borderRadius: 200
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1
  },
  btnAccount: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 6
  },
  cardLeftFooter: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnFooter: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 8
  },
  cardRightHeader: {
    paddingVertical: 25,
    paddingHorizontal: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight
  },
  cardRightBody: {
    paddingVertical: 24,
    paddingHorizontal: 24
  },
  mailInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24
  },
  leftMailInfo: {},
  passInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingTop: 24
  },
  btnFooterRight: {
    borderRadius: 6,
    padding: 8,
    backgroundColor: colors.primary
  },
  panelHeader: {
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32
  },
  panelBody: {
    paddingHorizontal: 24
  },
  socialNetworkItem: {
    width: 300,
    paddingLeft: 16,
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default ChooseAccount
