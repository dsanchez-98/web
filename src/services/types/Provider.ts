import Location from './Location'
import Model from './Model'

export interface ProviderAlternativeDirection extends Model {
  providerId: number
  locationId: number
  name: string
  address: string
  location: Location
}

export interface Sender extends Model {
  identityDocumentTypeId: number
}

export default interface Provider extends Model {
  locationId: number | null
  senderId: string
  code: string
  phone: string
  name: string
  lastname: string
  email: string
  businessName: string
  businessReason: string
  contactName: string
  address: string
  note: string
  birthday: string
  location: Location
  providerAlternativeDirections: ProviderAlternativeDirection[]
}

export interface Provider2 extends Provider {
  sender: Sender
}
