export type RequestCreateToken = {
  email: string
  password: string
}

export type Provider = 'google' | 'facebook'

export type RequestSingupSocialMedia = {
  provider: Provider
  providerId: string
  email: string
  firstName: string | null
  lastName: string | null
  photo: string | null
  providerResponse: any
}

export type RequestLoginSocialMedia = {
  provider: Provider
  providerId: string
  email: string
}

export type RequestSingup = {
  email: string
  password: string
  passwordConfirmation: string
}

export type RequestVerifyEmail = {
  expires: string
  hash: string
  id: string
  signature: string
}

export type RequestSendMessagePhone = {
  phone: string
}

export type RequestVerifyPhone = {
  code: string
}

export type RequestResetPasword = {
  email: string
}

export type RequestChangePassword = {
  email: string
  password: string
  passwordConfirmation: string
  token: string
}
