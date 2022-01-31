import useBaseResponse from '../../baseResponse'
import config from '../config'
import { Response, Oauth } from 'services/types'
import {
  RequestChangePassword,
  RequestCreateToken,
  RequestLoginSocialMedia,
  RequestResetPasword,
  RequestSendMessagePhone,
  RequestSingup,
  RequestSingupSocialMedia,
  RequestVerifyEmail,
  RequestVerifyPhone
} from './types'

export const useOauthService = () => {
  const baseResponse = useBaseResponse()

  const login = (request: RequestCreateToken) => {
    const url = 'v1/oauth/login'

    return baseResponse<Response<Oauth>>({
      baseUrl: config.baseURL,
      data: request,
      method: 'POST',
      url,
      withCredentials: false
    })
  }

  const signupSocialMedia = (request: RequestSingupSocialMedia) => {
    const url = 'v1/oauth/signup-social-media'

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request,
      withCredentials: false
    })
  }

  const loginSocialMedia = (request: RequestLoginSocialMedia) => {
    const url = 'v1/oauth/login-social-media'

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request,
      withCredentials: false
    })
  }

  const singup = (request: RequestSingup) => {
    const url = 'v1/oauth/signup'

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const verifyEmail = async (request: RequestVerifyEmail) => {
    const url = 'v1/oauth/signup/verify/email'

    return baseResponse<
      Response<Omit<Oauth, 'initialConfig' | 'accountId' | 'enterpriseId' | 'terminalId'>>
    >({
      baseUrl: config.baseURL,
      withCredentials: false,
      method: 'GET',
      url,
      params: request
    })
  }

  const sendMessagePhone = (request: RequestSendMessagePhone) => {
    const url = 'v1/oauth/signup/verify/phone/send-message'

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const verifyPhone = (request: RequestVerifyPhone) => {
    const url = 'v1/oauth/signup/verify/phone'

    return baseResponse<
      Response<{
        accountId: number
        enterpriseId: number
        terminalId: number
        salePointId: number
      }>
    >({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const requestResetPasword = (request: RequestResetPasword) => {
    const url = 'v1/oauth/request-reset-password'

    return baseResponse({
      baseUrl: config.baseURL,
      withCredentials: false,
      method: 'POST',
      url,
      data: request
    })
  }

  const changePassword = (request: RequestChangePassword) => {
    const url = 'v1/oauth/change-password'

    return baseResponse({
      baseUrl: config.baseURL,
      withCredentials: false,
      method: 'POST',
      url,
      data: request
    })
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
    changePassword
  }
}
