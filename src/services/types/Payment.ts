import Model from './Model'
export default interface Payment extends Model {
  name: string
  description: string
  image: string | null
}
