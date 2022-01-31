import Model from 'services/types/Model'

export interface Terminal {
  terminalId: number
  priceCost: number
  priceSale: number
  priceCostTributeTypeId: number | null
  priceSaleTributeTypeId: number | null
}

export interface Category {
  id: number
  description: string
  descriptionEn: string
}

export interface TypeProduct extends Model {
  name: string
}

export interface RequestCreateProduct {
  productTypeId: number | null
  productCategoryId: number
  commercialMeasureUnitId: string
  name: string
  description: string
  code: string
  barcode: string
  weight: number | null
  isPurchase: boolean
  isSale: boolean
  isStorable: boolean
  status: boolean
  productTerminals: Terminal[]
}
