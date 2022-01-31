import { print as Print, createTicketVoucher } from 'printer'
const usePrinter = () => {
  const getPrinterConfig = () => {
    return {
      host: 'localhost',
      printer: {
        host: '192.168.100.100',
        port: 9100
      },
      cut: true,
      size: 80
    }
  }

  const getImage = () => {}
  const print = () => {
    const configs = getPrinterConfig()
    Print({
      host: configs.host,
      printer: configs.printer,
      text: createTicketVoucher(configs.size, {}),
      cut: configs.cut,
      // image: '',
      qr: 'ueueue|eeewew|wewewe|Wewew|Wewewe|'
    })
      .then(() => {
        alert('Impresion realizada correctamente')
      })
      .catch((error) => {
        alert(error.maessage)
      })
  }

  const getBluetoothPrinters = () => {}

  return { print, getBluetoothPrinters }
}
export default usePrinter
