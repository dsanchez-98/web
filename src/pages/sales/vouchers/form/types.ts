export type Product = {
  id: number
  name: string
  price: number | string
  discount: number | string
  quantity: number | string
  priceList?: number | string
  total?: number | string
  barcode: string
}

export type Customer = {
  name: string
  id: number
}
