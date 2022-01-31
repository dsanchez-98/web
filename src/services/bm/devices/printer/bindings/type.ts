export interface RequestCreateBinding {
  name: string
  printerConnectionTypeId: number | null
  printerPaperSheetTypeId: number | null
  flagPrintOption: number
  flagAutoPrintingTickets: number
  ip: string
  mac: string
  usb: string
}
