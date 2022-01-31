export type SubmitValues = {
  locationId: number
  currencyId: string
  name: string
  contactPhone: string
  address: string
  decimalNumberAmount: number
  decimalNumberPrice: number
  decimalNumberRate: number
  decimalNumberQuantity: number
  decimalNumberPercent: number
  decimalNumberUnit: number
  economicActivity: string
  // TODO: implementar los atributos
  // flagElectronicBilling: number
  // licenseId: number
  // taxAdministrationSystemId: number
  // taxAdministrationSystemUser: string
  // taxAdministrationSystemPassword: string
  // taxAdministrationSystemStatus: number
  // isPhysicalAddress: number
  // enterpriseChildrenType: null
  sender: {
    id: number
    identityDocumentTypeId: number
    tradeName: string
    businessName: string
  }
}

export type Values = Partial<
  {
    document: {
      document?: string
      documentType?: number
    }
    businessName: string
    tradeName: string
    country: number
    department: number
    province: number
    district: number
  } & Omit<SubmitValues, 'sender'>
>
