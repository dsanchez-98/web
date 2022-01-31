import Icon, { IconProps } from 'components/icon'
import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet as NStyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { useResponsiveStyles } from 'components/responsiveLayout'
interface Props {
  text?: string
  onPress?: () => void
  isGrid?: boolean
  setGrid?: (value: boolean) => void
}

interface ButtonProps {
  onPress?: () => void
  text?: string
  minimal?: boolean
}
const ButtonsForm: FC<Props> = (props) => {
  const { isMobile } = useResponsiveStyles({})
  return (
    <View style={{ flexDirection: 'row' }}>
      {!isMobile && <ButtonSave onPress={props.onPress} text={props.text} />}
      {/* <Button
        style={nStyles.buttonViews}
        propsIcon={{
          name: 'listView',
          color: !props.isGrid ? colors.black : colors.grayLight
        }}
        onPress={() => {
          props.setGrid?.(false)
        }}
      /> */}
      {/* <Button
        style={nStyles.buttonViews}
        propsIcon={{
          name: 'gridView',
          color: props.isGrid ? colors.black : colors.grayLight
        }}
        onPress={() => {
          props?.setGrid?.(true)
        }}
      /> */}
    </View>
  )
}
export const ButtonSave = ({ onPress, text, minimal }: ButtonProps) => {
  const style = {
    height: SIZE,
    width: minimal ? SIZE : 150,
    borderRadius: minimal ? SIZE / 2 : 5
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[nStyles.shadow, nStyles.buttonSave, style]}
    >
      {!minimal ? (
        <Typography
          content={text}
          disableThemeColor
          color={colors.white}
          fontFamily={fonts.baloo2SemiBold600}
        />
      ) : (
        <Icon name="check" color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

const Button = (props: {
  style: StyleProp<ViewStyle>
  onPress: () => void
  propsIcon: IconProps
}) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon {...props.propsIcon} />
    </TouchableOpacity>
  )
}

const SIZE = 35

const nStyles = NStyleSheet.create({
  buttonSave: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: colors.primary
  },
  buttonCancel: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  buttonViews: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2
  }
})

export default ButtonsForm
