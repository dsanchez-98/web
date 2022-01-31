import { Response, Terminal, SalePoint } from 'services/types'

type AlternativeDirection = {
  name: string
  locationId: any
  address: string
}

export type RequestCreateClient = {
  contributorId: string
  identityDocumentTypeId: number
  locationId: any
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
  clientAlternativeDirections: AlternativeDirection[] | []
}

export type ResponseShowTerminal = Response<
  MergeObject<
    Terminal,
    {
      salePoint: SalePoint
    }
  >
>
