import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import CheckComponent from './CheckComponent/CheckComponent'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { SecurityFieldProps } from './types'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import useTranslation from 'hooks/useTranslation'

const SecurityField: FC<SecurityFieldProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()

  const validateParams = [
    {
      id: 1,
      text: t('compSecurityValOne'),
      validate: (value?: any) => value.length >= 8
    },
    {
      id: 2,
      text: t('compSecurityValTwo'),
      validate: (value?: any) => /[~`_!@#$%^&*()-+={}[\].:;"'<>,?|\\/]/g.test(value)
    },
    {
      id: 3,
      text: t('compSecurityValThree'),
      validate: (value?: any) => /[A-Z]/g.test(value)
    },
    {
      id: 4,
      text: t('compSecurityValFour'),
      validate: (value?: any) => /[a-z]/g.test(value)
    },
    {
      id: 5,
      text: t('compSecurityValFive'),
      validate: (value?: any) => /[0-9]/g.test(value)
    }
  ]

  const level = validateParams.reduce((acc: any, item: any) => {
    if (item.validate(props.value)) {
      acc += 1
    }
    return acc
  }, 0)

  const securityLevels = [
    '',
    t('compSecurityLow'),
    t('compSecurityLow'),
    t('compSecurityMed'),
    t('compSecurityMed'),
    t('compSecurityHigh')
  ]
  const securityLevel = securityLevels[level]

  return (
    <View>
      <View style={styles.checksContainer}>
        {validateParams.map((item: any) => (
          <View
            key={item.id}
            style={[styles.checkDualContainer, { marginTop: item.id === 1 ? 4 : 0 }]}
          >
            <CheckComponent text={item.text} flagVerified={item.validate(props.value)} />
          </View>
        ))}
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTextContainer}>
          <Typography
            size={fontSize.xs}
            content={`${t('compSecurityLevel')}: `}
            disableThemeColor
          />
          <Typography
            size={fontSize.xs}
            color={
              securityLevel === t('compSecurityLow')
                ? colors.red
                : securityLevel === t('compSecurityMed')
                ? colors.warning
                : colors.green
            }
            content={securityLevel}
            disableThemeColor
          />
        </View>
        <View style={styles.barsContainer}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor:
                  securityLevel === t('compSecurityLow')
                    ? colors.red
                    : securityLevel === t('compSecurityMed')
                    ? colors.warning
                    : securityLevel === t('compSecurityHigh')
                    ? colors.green
                    : colors.grayLight
              }
            ]}
          ></View>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor:
                  securityLevel === t('compSecurityMed')
                    ? colors.warning
                    : securityLevel === t('compSecurityHigh')
                    ? colors.green
                    : colors.grayLight,
                marginHorizontal: 4
              }
            ]}
          ></View>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor:
                  securityLevel === t('compSecurityHigh')
                    ? colors.green
                    : colors.grayLight
              }
            ]}
          ></View>
        </View>
      </View>
    </View>
  )
}

const rStyles = StyleSheet.create({
  checksContainer: {
    flexDirection: 'column lg:row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  checkDualContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: '0 sm:1',
    flexBasis: 'auto lg:50%',
    flexWrap: 'wrap'
  },
  progressBarContainer: {
    marginTop: '12 md:16'
  },
  progressBarTextContainer: {
    flexDirection: 'row'
  },
  barsContainer: {
    marginTop: 4,
    flexDirection: 'row'
  },
  progressBar: {
    flex: 1,
    height: 7
  }
})

export default SecurityField
