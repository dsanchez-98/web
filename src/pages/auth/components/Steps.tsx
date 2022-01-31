import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { View, StyleSheet } from 'react-native'
import colors from 'styles/colors'

interface Props {
  currentStep: 1 | 2 | 3
}

const line = (select: boolean) => (
  <View
    style={[{ height: 2, backgroundColor: select ? colors.purple : colors.grayBorder }]}
  />
)

const size = 30
const Point = ({ text, select }: any) => (
  <View
    style={[
      styles.point,
      {
        backgroundColor: select ? colors.purple : undefined,
        borderColor: select ? colors.purple : colors.grayBorder
      }
    ]}
  >
    <Typography
      content={text}
      disableThemeColor
      color={select ? 'white' : colors.grayBorder}
    />
  </View>
)
const Steps: FC<Props> = (props) => {
  const _1 = props.currentStep === 1
  const _2 = props.currentStep === 2
  const _3 = props.currentStep === 3
  return (
    <View style={styles.cotainer}>
      <View style={{ flex: 3, justifyContent: 'center' }}>{line(_1 || _2 || _3)}</View>
      <Point text="1" select={_1 || _2 || _3} />
      <View style={{ flex: 1, justifyContent: 'center' }}>{line(_2 || _3)}</View>
      <Point text="2" select={_2 || _3} />
      <View style={{ flex: 3, justifyContent: 'center' }}>{line(_3)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  cotainer: {
    flexDirection: 'row',
    marginVertical: 20,
    // TODO: verificar margenes padres
    marginHorizontal: -100
  },
  point: {
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2
  }
})
export default Steps
