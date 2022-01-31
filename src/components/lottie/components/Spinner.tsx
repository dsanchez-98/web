import Icon from 'components/icon'
import React, { FunctionComponent as FC } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import colors from 'styles/colors'

const content = {
  indicator: (props: any) => <ActivityIndicator color={colors.primary} size="large" />
}

interface Props {
  height?: number
  width?: number
  type: keyof typeof content
  showIcon?: boolean
}

const Spinner: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      {props.showIcon && (
        <View style={{ padding: 20 }}>
          <Icon name="logoTumiSoft" width={166} height={70} />
        </View>
      )}
      {content[props.type]?.(props)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Spinner
