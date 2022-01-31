/* eslint-disable no-extra-semi */
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { GoogleResponse } from '../types'
GoogleSignin.configure({})

const useGoogleSignIn = () => {
  const signIn = () => {
    return new Promise<GoogleResponse>((resolve, reject) => {
      ;(async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const { user } = await GoogleSignin.signIn()
          resolve({
            googleId: user.id,
            email: user.email,
            familyName: user.familyName,
            givenName: user.givenName,
            imageUrl: user.photo,
            name: user.name
          })
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
          reject(error)
        }
      })()
    })
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    } catch (error) {}
  }

  return { signIn, signOut }
}

export default useGoogleSignIn
