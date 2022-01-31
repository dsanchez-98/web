import Model from './Model'

export default interface Unit extends Model {
  name: string
  categoryCode: string
  symbol: number
  conversionFactor: number
  comment: string
  visible: number
}
