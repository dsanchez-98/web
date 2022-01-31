import Icon from 'components/icon'
import useAuthentication from 'hooks/useAuthentication'
import React, { FunctionComponent as FC } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { useGoogleSignIn } from './hooks'

interface Props {
  typeProcess: 'register' | 'login'
  style?: StyleProp<ViewStyle>
  onSuccessProcess: () => void
}

const GoogleButton: FC<Props> = (props) => {
  const { signIn, signOut } = useGoogleSignIn()
  const { signupSocialMedia, loginSocialMedia } = useAuthentication()

  const handlePress = async () => {
    try {
      const response = await signIn()
      if (props.typeProcess === 'register') {
        const responseAccount = await signupSocialMedia({
          provider: 'google',
          email: response.email,
          firstName: response.givenName,
          lastName: response.familyName,
          photo: response.imageUrl,
          providerId: response.googleId,
          providerResponse: response
        })
        props.onSuccessProcess()
        console.log('responseAccount', responseAccount)
      } else if (props.typeProcess === 'login') {
        const responseLogin = await loginSocialMedia({
          email: response.email,
          provider: 'google',
          providerId: response.googleId
        })
        props.onSuccessProcess()
        console.log('responseLogin', responseLogin)
      }
      signOut()
    } catch (error) {}
  }

  return <Icon name={'google'} onPress={handlePress} style={props.style} />
}

export default GoogleButton
