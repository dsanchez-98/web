import Location from './Location'
import Model from './Model'

export interface AlternativeDirection extends Model {
  clientId: number
  locationId: number
  name: string
  address: string
  location: Location
}

interface Contribuitor extends Model {
  identityDocumentTypeId: number
  taxAdministrationSystemStatus: number
}

export default interface Client extends Model {
  locationId: number | null
  contributorId: string
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
  location: Location
  clientAlternativeDirections: AlternativeDirection[]
}

export interface Client2 extends Client {
  contributor: Contribuitor
}
