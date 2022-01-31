import { actionRemoveSesion, actionSetSesion } from 'redux-core/actions/sesion.action'
import { useAppDispatch } from 'redux-core/hooks'
import {
  RequestCreateToken,
  RequestLoginSocialMedia,
  RequestSingupSocialMedia,
  useOauthService
} from 'services/iam'
import {
  RequestChangePassword,
  RequestResetPasword,
  RequestSendMessagePhone,
  RequestSingup,
  RequestVerifyEmail,
  RequestVerifyPhone
} from 'services/iam/oauth/types'

const useAuthentication = () => {
  const service = useOauthService()
  const dispatch = useAppDispatch()

  const login = async (params: RequestCreateToken) => {
    const response = await service.login(params)

    const data = response.data
    /// si tienene una sola empresa
    // if (data.enterprises.length === 1) {
    const enterprise = data.enterprises.reverse()[0]
    // data.currentEnterpriseId = enterprise.id
    data.currentEnterpriseId = 37
    data.currentTerminalId = enterprise.terminals.reverse()[0].id
    dispatch(actionSetSesion(data))
    return response
  }

  const logout = () => {
    dispatch(actionRemoveSesion())
  }

  const signupSocialMedia = async (params: RequestSingupSocialMedia) => {
    await service.signupSocialMedia(params)
    // dispatch(setToken(response.success.data.accessToken))
    // dispatch(setVerifiedPhone(response.success.data.phoneVerified))
  }

  const loginSocialMedia = async (params: RequestLoginSocialMedia) => {
    await service.loginSocialMedia(params)
    // dispatch(setToken(response.success.data.accessToken))
    // dispatch(setVerifiedPhone(response.success.data.phoneVerified))
  }

  const singup = async (params: RequestSingup) => {
    await service.singup(params)
  }

  const verifyEmail = async (params: RequestVerifyEmail) => {
    const response = await service.verifyEmail(params)
    dispatch(actionSetSesion(response.data))
  }

  const sendMessagePhone = async (params: RequestSendMessagePhone) => {
    await service.sendMessagePhone(params)
  }

  const verifyPhone = async (params: RequestVerifyPhone) => {
    const response = await service.verifyPhone(params)
    dispatch(
      actionSetSesion({
        currentEnterpriseId: response.data.enterpriseId,
        accountId: response.data.accountId,
        currentTerminalId: response.data.terminalId
      })
    )
  }

  const requestResetPasword = async (params: RequestResetPasword) => {
    await service.requestResetPasword(params)
  }

  const changePassword = async (params: RequestChangePassword) => {
    await service.changePassword(params)
  }

  return {
    login,
    signupSocialMedia,
    loginSocialMedia,
    singup,
    verifyEmail,
    sendMessagePhone,
    verifyPhone,
    requestResetPasword,
    changePassword,
    logout
  }
}
export default useAuthentication
