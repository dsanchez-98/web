import Model from './Model'
export default interface SalePoint extends Model {
  flagHadSeries: 1 | 0
  printedTicketMessage: string
}
