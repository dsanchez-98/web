import Model from './Model'

export default interface IdentityTypeDoc extends Model {
  code: string
  countryId: string
  name: string
  abbreviation: string
  order: number
  lengthMin: number
  lengthMax: number
  validationPattern: string
}

export interface IdentityTypeDoc2 extends IdentityTypeDoc {
  kind: string
}
