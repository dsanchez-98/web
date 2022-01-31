import Model from './Model'
export default interface Employee extends Model {
  name: string
  lastName: string
  email: string
  identityDocumentType: number
  identityDocumentNumber: string
  phone: string
  dateBirthday: string
  imgUser: string
  roles: {
    id: number
    name: string
  }[]
  terminals: {
    id: number
    terminalName: string | null
    enterpriseName: string | null
  }[]
}
