import Model from './Model'
export default interface Terminal extends Model {
  terminalTypeId: number
  enterpriseId: number
  parentId: number | null
  name: string | null
  phone: string | null
  address: string | null
}
