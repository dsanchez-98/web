/* eslint-disable no-extra-semi */
import { ViewType, AuthContextType } from './types'
import React, { createContext, FC, useContext, useEffect, useRef, useState } from 'react'
import { useSharedValue } from 'components/reanimated'
import Login from './login'
import {
  RequestResetPassword,
  ChangePassword,
  MessageValidateAccountResetPassword,
  SuccessRecoverPassword
} from './recoverPassword'
import {
  CreateAccount,
  MessageValidateAccount,
  VerifySmsCode,
  SendSmsCode,
  SuccessRegister
} from './register'
import { useNavigation, useRoute } from '@react-navigation/native'
import Spinner from 'components/lottie/components/Spinner'
import useAuthentication from 'hooks/useAuthentication'
import { useAppSelector } from 'redux-core/hooks'

const isEqual = (left: string, rigtht: string) => left === rigtht
const views = {
  [ViewType.login]: {
    component: <Login />
  },
  /** register **/
  [ViewType.createAccount]: {
    component: <CreateAccount />
  },
  [ViewType.messageValidateAccount]: {
    component: <MessageValidateAccount />
  },
  [ViewType.sendSmsCode]: {
    component: <SendSmsCode />
  },
  [ViewType.verifySmsCode]: {
    component: <VerifySmsCode />
  },
  [ViewType.successRegister]: {
    component: <SuccessRegister />
  },

  /** register **/

  /** recovery password **/
  [ViewType.requestResetPassword]: {
    component: <RequestResetPassword />
  },
  [ViewType.changePassword]: {
    component: <ChangePassword />
  },
  [ViewType.messageValidateAccountResetPassword]: {
    component: <MessageValidateAccountResetPassword />
  },
  [ViewType.successRecoverPassword]: {
    component: <SuccessRecoverPassword />
  }
  /** recovery password **/
}

const initialValues: AuthContextType = {
  progress: { value: 0 },
  setViewType: () => {},
  views,
  restartAll: () => {},
  refForms: { current: {} }
}

export const Context = createContext<AuthContextType>(initialValues)

export const useAuthContext = () => {
  const context = useContext(Context)
  return context
}

const useNavigationParams = () => {
  const { params = {} } = useRoute<any>()
  const { setParams } = useNavigation<any>()
  const getState = () => {
    const state = {
      progress: ViewType.login,
      loading: false
    }
    if (params.token && params.email) {
      state.loading = true
      state.progress = ViewType.changePassword
    } else if (params.expires && params.hash && params.id && params.signature) {
      state.loading = true
      state.progress = ViewType.sendSmsCode
    }
    return state
  }

  return { state: useState(getState())[0], setParams, params }
}

export const AuthContext: FC<{}> = (props) => {
  const { state, setParams, params } = useNavigationParams()
  const [loading, setLoading] = useState(state.loading)
  const { verifyEmail } = useAuthentication()

  const progress = useSharedValue(state.progress)
  const refForms = useRef<any>({})

  const restartAll = () => {
    refForms.current = {}
    progress.value = 0
    setParams({
      expires: undefined,
      hash: undefined,
      id: undefined,
      signature: undefined,
      email: undefined,
      token: undefined
    })
  }

  const setViewType: AuthContextType['setViewType'] = (type) => {
    progress.value = type
  }

  useEffect(() => {
    const verify = async () => {
      try {
        if (state.progress === ViewType.sendSmsCode) {
          await verifyEmail({
            expires: params.expires,
            hash: params.hash,
            id: params.id,
            signature: params.signature
          })
        }
        if (state.progress === ViewType.changePassword) {
          refForms.current[ViewType.changePassword] = {
            token: params.token,
            email: params.email
          }
        }
      } catch (error) {
        restartAll()
      }
      setLoading(false)
    }
    verify()
  }, [])

  const token = useAppSelector((s) => s?.app.sesion.accessToken, isEqual)
  const phoneVerified = useAppSelector((s) => s?.app.sesion.phoneVerified, isEqual)
  useEffect(() => {
    if (token && !phoneVerified) {
      setViewType(ViewType.sendSmsCode)
    } else if (
      state.progress !== ViewType.sendSmsCode &&
      state.progress !== ViewType.changePassword
    ) {
      setViewType(ViewType.login)
    }
  }, [token, phoneVerified, state])

  return (
    <Context.Provider
      value={{
        progress,
        setViewType,
        views,
        restartAll,
        refForms
      }}
    >
      {loading ? <Spinner type="indicator" showIcon /> : props.children}
    </Context.Provider>
  )
}

export default AuthContext
