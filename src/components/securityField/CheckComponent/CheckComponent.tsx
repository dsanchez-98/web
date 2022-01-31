import Icon from 'components/icon'
import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
// import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
// import SwitchComponent from 'react-switch'

const CheckComponent: FC<{ text: string; flagVerified: boolean }> = (props) => {
  return (
    <View style={styles.Container}>
      <View style={[styles.Icon, { backgroundColor: props.flagVerified ? colors.green : colors.disabled }]}>
        <Icon
          name="check"
          color={props.flagVerified ? colors.white : '#828282'}
          width="10"
          height="10"
        />
      </View>
      <Typography
        content={props.text}
        size={fontSize.xs}
        color={props.flagVerified ? colors.green : colors.black}
        disableThemeColor
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4
  },
  Icon: {
    width: 24,
    height: 24,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  AlertMessage: {
    fontSize: 12
  }
})

export default CheckComponent
