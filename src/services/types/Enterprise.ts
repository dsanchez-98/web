import { ModuleNames } from 'ag-grid-community'
import { Location } from '.'
import Model from './Model'

interface Currency extends Omit<Model, 'id'> {
  entityName: string
  id: string
  minorUnity: number
  name: string
  numericalCode: string
}

interface License extends Omit<ModuleNames, 'id'> {
  flagAllAppstores: number
  flagCpeLimit: number
  flagFreemium: number
  flagPeripheralsIntegrations: number
  flagReports: number
  flagSalesLimit: number
  flagUnlimitedProducts: number
  flagUsersLimit: number
  flagWebVersion: number
  numberCpeMonthMax: number
  numberEnterprisesMax: number
  numberStoresMax: number
  tumisoftProductId: number
}

interface Sender extends Omit<Model, 'id'> {
  businessName: string
  id: string
  identityDocumentTypeId: number
  tradeName: string
}

interface TaxAdminSys extends Model {
  countryId: string
  name: string
}

interface Account extends Model {
  name: string
  description: string
  holdingName: string
  flagInitialConfig: number
}
export default interface Enterprise extends Model {
  senderId: number
  sender?: Sender
  parentId: number
  accountId: number
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
  flagElectronicBilling: number
  taxAdministrationSystem: TaxAdminSys
  taxAdministrationSystemId: number
  taxAdministrationSystemUser: string
  taxAdministrationSystemPassword: string
  taxAdministrationSystemStatus: number
  license: License
  licenseId: number
  location: Location
  logoMenu: string
  logoTicket: string
  logoA4: string
  isPhysicalAddress: number
  enterpriseChildrenType: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  parent: number
  account: Account
  currency: Currency
  terminals: any[]
}
