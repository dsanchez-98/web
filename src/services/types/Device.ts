import Model from './Model'

interface Connection {
  id: number
  name: string
  status: number
}

interface Category {
  tumisoftProductId: number
  description: string
  status: number
}

interface Terminal {
  id: number
  name: string
  phone: string
  address: string
  status: number
}

interface PaperSheet {
  id: number
  name: string
  status: number
}
export default interface Device extends Model {
  peripheralConnectionTypeId: number
  peripheralCategoryId: number
  terminalId: number
  peripheralPaperSheetTypeId: number
  name: string
  description: string
  barcode: string
  ip: string
  flagPrintOption: boolean
  flagAutoPrintingTickets: boolean
  connection: Connection
  category: Category
  terminal: Terminal
  paperSheet: PaperSheet
}
