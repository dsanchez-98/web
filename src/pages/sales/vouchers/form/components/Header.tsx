import React, { useState } from 'react'
import { View } from 'react-native'
import InputDropdown from 'components/textInput/components/InputDropdown'
import NavigationText from 'components/searchList/componets/NavigationText'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import FormButtons from 'components/searchList/componets/FormButtons'
import { useResponsiveStyles } from 'components/responsiveLayout'
import { VOUCHERS_LIST } from '../../list'
import useTranslation from 'hooks/useTranslation'

export const HEIGHT = 70

const Header = () => {
  const [value, onChange] = useState('')
  const { t } = useTranslation()
  const { isMobile } = useResponsiveStyles({})
  return (
    <HeaderBar
      navigationText={
        !isMobile ? <NavigationText path={t('voucherNewPath')} /> : undefined
      }
      leftContent={
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <InputDropdown
            placeholder={t('voucherDropGenerate')}
            isSuccess={false}
            onChange={onChange}
            multiple={false}
            value={value}
            items={[
              { label: 'Tumisoft Gamarra', value: '1' },
              { label: 'Tumisoft2 Gamarra', value: '2' }
            ]}
            inputHeight={32}
            style={{ width: 150 }}
          />
        </View>
      }
      rigthContent={
        <FormButtons
          confirmText={t('voucherNewSubBtn')}
          onPressConfirm={() => {}}
          cancelText={t('cancel')}
          onPressCancel={() => {
            navigation.navigate(VOUCHERS_LIST)
          }}
          minimal={isMobile}
        />
      }
    />
  )
}

export default Header
