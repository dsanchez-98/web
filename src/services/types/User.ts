interface store {
  enterpriseName: string
  storeName: string
  id: number
}

interface generalType {
  id: number
  name: string
}

interface profile {
  name: string
  lastName: string
  phone: string
  dateBirthday: string
  email: string
  imgUser: string
  roles: generalType[]
  identityDocumentType: number
  identityDocumentNumber: string
  storeId: number
}

export default interface User {
  roles: any[]
  stores: store[]
  identityDocumentTypes: generalType[]
  profile: profile
}
