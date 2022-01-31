export interface PrinterEnterprise {
  id: number
  name: string
  peripheralCategoryId: number
  peripheralCategoryName: string
  status: number
  createdAt: string
}

export interface PrinterTerminal {
  id: number
  name: string
  peripheralCategoryId: number
  peripheralCategoryName: string
  printerConnectionTypeId: number
  printerConnectionTypeName: string
  printerPaperSheetTypeId: number
  printerPaperSheetTypeName: string
  terminalId: number
  terminalName: string
  flagPrintOption: number
  flagAutoPrintingTickets: number
  ip: string
  mac: string
  usb: string
  status: number
  printerLinkStatus: number
  printerLinkCreatedAt: string
}
