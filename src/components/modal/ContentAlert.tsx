import Icon from 'components/icon'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'
import React, { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import { PropsContent } from './types'

const ContentAlert: FC<PropsContent> = (props) => {
  const { title, icon, message, cancelText, acceptText, onCancel, onAccept, hideModal } =
    props
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.headModalContainer}>
        <View style={styles.leftHeadModalContainer}>
          <Typography
            content={title}
            color={colors.black}
            size={styles.textHeadTitle.fontSize}
            fontFamily={fonts.baloo2SemiBold600}
            style={{ lineHeight: 18 }}
            disableThemeColor
          />
          <View style={styles.headIconContainer}>{icon}</View>
        </View>
        <TouchableOpacity style={styles.btnCloseModal} onPress={() => hideModal()}>
          <Icon name="close" color="#2A2D45" />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyTextContainer}>
        <Typography
          content={message}
          color={colors.black}
          size={styles.textBody.fontSize}
          fontFamily={fonts.baloo2Regular400}
          style={{ lineHeight: 18 }}
          disableThemeColor
        />
      </View>
      <View style={styles.btnModalContainer}>
        {onAccept && (
          <TouchableOpacity
            style={[
              styles.btnModal,
              { backgroundColor: '#4DA0FF', marginRight: onCancel ? 12 : 1 }
            ]}
            onPress={() => {
              hideModal(onAccept)
            }}
          >
            <Typography
              content={acceptText || t('compModalAccept')}
              color={colors.white}
              size={fontSize.md}
              fontFamily={fonts.baloo2SemiBold600}
              disableThemeColor
            />
          </TouchableOpacity>
        )}
        {onCancel && (
          <TouchableOpacity
            style={[
              styles.btnModal,
              {
                borderWidth: 1,
                borderColor: '#CCCCCC',
                backgroundColor: '#FFFFFF',
                marginLeft: onAccept ? 12 : 1
              }
            ]}
            onPress={() => {
              hideModal(onCancel)
            }}
          >
            <Typography
              content={cancelText || t('compModalCancel')}
              color={colors.primary}
              size={fontSize.md}
              fontFamily={fonts.baloo2SemiBold600}
              disableThemeColor
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const rStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '328 md:420',
    height: '234 md:216',
    borderRadius: 20,
    padding: 24
  },
  headModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftHeadModalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHeadTitle: {
    fontSize: '14 md:20'
  },
  headIconContainer: {
    marginLeft: 6
  },
  bodyTextContainer: {
    marginTop: 20
  },
  textBody: {
    fontSize: '12 md:16'
  },
  btnModalContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnModal: {
    width: 128,
    height: 40,
    borderRadius: '6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4DA0FF'
  },
  btnCloseModal: {
    width: 24,
    height: 24,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ContentAlert
