import { environment } from 'constants/core'
import { useRef } from 'react'
import { GoogleLoginResponse, useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { GoogleResponse } from '../types'

type Response = GoogleResponse
type onSuccess = (response: Response) => void

const clientId = environment.googleClientId

const useGoogleSignIn = () => {
  const refOnSuccess = useRef<onSuccess>()
  const refOnFailure = useRef<(error: any) => void>()

  const googleLogin = useGoogleLogin({
    clientId,
    onSuccess: (res) => {
      const { profileObj } = res as GoogleLoginResponse
      refOnSuccess.current?.(profileObj)
    },
    onFailure: (error) => {
      refOnFailure.current?.(error)
    },
    cookiePolicy: 'single_host_origin'
  })

  const googleLogout = useGoogleLogout({
    clientId,
    onLogoutSuccess: () => {
      // console.log('onLogoutSuccess')
    },
    onFailure: () => {
      // console.log('onFailure')
    },
    cookiePolicy: 'single_host_origin'
  })

  const signIn = () => {
    return new Promise<Response>((resolve, reject) => {
      refOnSuccess.current = resolve
      refOnFailure.current = reject
      googleLogin.signIn()
    })
  }

  const signOut = () => {
    googleLogout.signOut()
  }

  return { signIn, signOut }
}

export default useGoogleSignIn
