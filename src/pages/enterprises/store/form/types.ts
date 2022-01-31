export type Values = {
  name: string
  address: string
  phone: string
  salePoint: {
    flagHadSeries: boolean
    printedTicketMessage: string
    series: {
      name: string
      standardTaxDocumentId: number
      series: string
      correlativeInitial: number
      active?: boolean
    }[]
  }
  status: boolean
  paymentMethods: number[]
}
