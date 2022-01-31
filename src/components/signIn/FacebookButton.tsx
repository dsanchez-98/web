import Icon from 'components/icon'
import { environment } from 'constants/core'
import React, { FunctionComponent as FC } from 'react'
import { ViewStyle, StyleProp, Platform } from 'react-native'
import { useFacebookSignIn } from './hooks'

const WrapperFacebook =
  Platform.OS === 'web'
    ? require('react-facebook-login/dist/facebook-login-render-props').default
    : ({ render }: any) => <>{render()}</>

interface Props {
  style?: StyleProp<ViewStyle>
}
const FacebookButton: FC<Props> = (props) => {
  const { signIn } = useFacebookSignIn()
  return (
    <WrapperFacebook
      appId={environment.facebookAppId}
      callback={(response: any) => {
        console.log('response', response)
      }}
      render={(renderProps: any) => (
        <Icon
          name={'facebook'}
          onPress={() => {
            Platform.OS === 'web' ? renderProps.onClick() : signIn()
          }}
          style={props.style}
        />
      )}
    />
  )
}

export default FacebookButton
