import { RequestEditProfile } from 'services/iam/users/type'

export type SubmitValues = RequestEditProfile

export type Values = Partial<{
  dateBirthday: string
  documentObj: {
    documentType?: number
    document?: string
  }
  email: string
  name: string
  lastName: string
  password: string
  phone: string
  roles: string[]
  imgUser: string
  stores: string[]
}>
