type ProviderAlternativeDirection = {
  name: string
  locationId: any
  address: string
}

export type RequestCreateProvider = {
  senderId: string
  identityDocumentTypeId: number
  locationId: number | null
  code: string
  name: string
  lastname: string
  phone: string
  email: string
  businessReason: string
  businessName: string
  contactName: string
  address: string
  note: string
  birthday: string
  providerAlternativeDirections: ProviderAlternativeDirection[]
}
