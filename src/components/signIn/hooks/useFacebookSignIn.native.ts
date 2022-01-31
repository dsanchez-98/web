/* eslint-disable no-extra-semi */
import axios from 'axios'
import { Platform } from 'react-native'
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
  Profile,
  Settings
} from 'react-native-fbsdk-next'

Settings.initializeSDK()

const useFacebookSignIn = () => {
  const getUser = () => {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          let token = null
          if (Platform.OS === 'ios') {
            token = (await AuthenticationToken.getAuthenticationTokenIOS())?.authenticationToken
          } else {
            token = (await AccessToken.getCurrentAccessToken())?.accessToken.toString()
          }
          const fb = (
            await axios.get('https://graph.facebook.com/v2.5/me?fields=email&access_token=' + token)
          ).data
          const data = {} as any
          const profile = (await Profile.getCurrentProfile()) || ({} as any)
          Object.assign(data, profile)
          data.email = fb.email
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })()
    })
  }

  const signIn = () => {
    return new Promise<any>((resolve, reject) => {
      ;(async () => {
        try {
          await LoginManager.logInWithPermissions(['public_profile', 'email'])
          const result = await getUser()
          console.log('result', result)
          signOut()
          resolve(result)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })()
    })
  }

  const signOut = () => {
    LoginManager.logOut()
  }

  return { signIn, signOut }
}

export default useFacebookSignIn
