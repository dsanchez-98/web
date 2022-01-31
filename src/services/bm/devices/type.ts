import Model from 'services/types/Model'

export interface DeviceElement extends Model {
  name: string
}

export interface DeviceCategory extends Omit<Model, 'id'> {
  tumisoftProductId: number
  description: string
}

interface Enterprise {
  id: number
  name: string
  senderId: number
  contactPhone: string
  address: string
  status: number
}

export interface Device {
  peripheralCategoryId: number
  enterpriseId: number
  name: string
  description: string
  barcode: string
  status: number
  category: DeviceCategory
  enterprise: Enterprise
}
