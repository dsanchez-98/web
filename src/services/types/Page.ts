import Model from './Model'
export default interface Page extends Model {
  categoryId: number
  title: string
  body: string
  slug: string
  codeLang: string
}
