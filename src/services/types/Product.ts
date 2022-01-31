import Model from './Model'

export default interface Product {
  id: number
  internalCode: string
  barcode: string
  cost: number
  name: string
  price: number | string
  wight: number
}

interface ProductType {
  id: number
  name: string
}

interface ProductCategory {
  id: number
  description: string
  descriptionEn: string
}

interface ProductTerminal {
  productId: number
  terminalId: number
  priceCostTributeTypeId: number | null
  priceSaleTributeTypeId: number | null
  stockAvailable: number
  stockReal: number
  stockReserved: number
  priceCost: number
  priceSale: number
  status: 1 | 0
}

export interface Product2 extends Model {
  productTypeId: number
  productCategoryId: string
  commercialMeasureUnitId: string
  name: string
  description: string
  code: string
  barcode: string
  price: number
  weight: number
  isPurchase: 1 | 0
  isSale: 1 | 0
  isStorable: 1 | 0
  productType: ProductType
  productCategory: ProductCategory
  productTerminals: ProductTerminal[]
}
