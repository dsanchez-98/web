import Ticket, { Size, Table } from './Ticket'

const productsData = [
  {
    description: 'POLO A VBS POLO A VBS POLO A VBS POLO A VBS POLO A VBS POLO A VBS',
    quatity: 2,
    price: 100,
    unit: 'UND',
    total: 200
  },
  {
    description: 'POLO A VBS',
    quatity: 2,
    price: 100,
    unit: 'UND',
    total: 200
  },
  {
    description: 'POLO A VBS',
    quatity: 2,
    price: 100,
    unit: 'UND',
    total: 200
  },
  {
    description: 'POLO A VBS',
    quatity: 2,
    price: 100,
    unit: 'UND',
    total: 200
  }
]
type ParamsPrint = {
  documentName: string
  emisorName: string
  emisorDocument: string
  emisorAddres: string
  createdAt: string
  ticket: string
  clientName: string
  clientDocument: string
  products: any[]
  affectation: any
  paymentName: string
  sellerName: string
}
const createTicketVoucher = (size: Size, params: ParamsPrint) => {
  const ticket = new Ticket({ size })

  const products = new Table(
    {
      description: {
        name: 'Descripcion',
        maxCaracteres: (size) => (size === Size['58MM'] ? 9 : 25)
      },
      quatity: {
        name: 'Cant',
        maxCaracteres: () => 5,
        alignment: 'center'
      },
      price: {
        name: 'P.Und',
        maxCaracteres: () => 5,
        alignment: 'center'
      },
      unit: {
        name: 'Und',
        maxCaracteres: () => 5,
        alignment: 'center'
      },
      total: {
        name: 'P.Total',
        maxCaracteres: () => 8,
        alignment: 'right'
      }
    },
    productsData
  )
  const aff = new Table({
    affectation: {
      name: '',
      maxCaracteres: (size) => (size === Size['58MM'] ? 19 : 35),
      alignment: 'left'
    },
    currency: {
      name: '',
      maxCaracteres: 2
    },
    amount: {
      name: '',
      maxCaracteres: 11,
      alignment: 'right'
    }
  })
  aff.setConfigs({ hideHeader: true })
  aff.addRowWithValues(null, 'Op. gravada', 'S/', '20')
  aff.addRowWithValues(null, 'Op. Exonerada', 'S/', '20')
  aff.addRowWithValues(null, 'Op. Inafecta', 'S/', '20')
  aff.addRowWithValues(null, 'Transf. Gratuitas', 'S/', '20')
  aff.addRowWithValues(null, 'Imp. ICBPER', 'S/', '20')
  aff.addRowWithValues(null, 'SubTotal', 'S/', '20')
  aff.addRowWithValues(null, 'IGV (18%)', 'S/', '20')
  aff.addRowWithValues('-', 'Total', 'S/', '20')
  aff.addRowWithValues(null, 'Pago', 'S/', '20')
  aff.addRowWithValues(null, 'Vuelto', 'S/', '20')

  const content = ticket
    .addDecorator('-')
    .addText('BOLETA DE VENTA ELECTRONICA', 'center')
    .addDecorator('-')
    .addText('USER_TUMIFACTURA', 'center')
    .addText('20601446686', 'center')
    .addText('SUB_ADDRES', 'center')
    .addDecorator('-')
    .addText('25-11-2021 - 02:25pm', 'center')
    .addText('B010-00000213', 'center')
    .addDecorator('-')
    .addText(
      'RVZ ISOS CORP. SAC LOS PRESVITEROS MAESTROS MAESTROS DE LA SANIDAD',
      'center'
    )
    .addText('888888888', 'center')
    .addTable(products)
    .addDecorator('-')
    .addTable(aff)
    .addDecorator('-')
    .addText('Pago CONTADO', 'right')
    .addDecorator('-')
    .addText('Atendido por:', 'center')
    .addText('LUIS DIEGO SANCHEZ HIDALGO', 'center')
    .addDecorator('-')
    .addText('Gracias por su compra', 'center')
    .addText('Representacion impresa de una', 'center')
    .addText('BOLETA DE VENTA', 'center')
    .addText('Consulte su comprobante en:', 'center')
    .addText('https://consulta-fe.tumi-soft.com', 'center')
    .getText()

  console.log('ticket', content)
  return content
}

export default createTicketVoucher
