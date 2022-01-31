import Model from './Model'

export default interface Cash extends Omit<Model, 'deletedAt'> {
  salePointId: number
  openingEmployeeId: number
  closedEmployeeId: number
  currencyId: string
  firstSaleId: null | number
  lastSaleId: null | number
  amount: number
  description: string
  flagMoneyDelivery: 1 | 0
  closedAt: null | string
}
