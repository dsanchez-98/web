/* eslint-disable no-unused-vars */
import Animated from 'react-native-reanimated'

export enum ViewType {
  login,
  createAccount,
  messageValidateAccount,
  verifySmsCode,
  sendSmsCode,
  successRegister,
  requestResetPassword,
  changePassword,
  messageValidateAccountResetPassword,
  successRecoverPassword
}
export interface AuthContextType {
  progress: Animated.SharedValue<number>
  setViewType: (type: ViewType) => void
  views: {
    [key: string]: {
      title?: string
      component: any
    }
  }
  restartAll: () => void
  refForms: { current: { [key: string]: any } }
}
