import Model from './Model'
export default interface Location extends Model {
  name: string
  parentId: number | null
  code: string
  displayName: string
  searchName: string
  capitalId: number | null
  latitude: number | null
  longitude: number | null
  children: number
  parent?: Location | null
}
