export default interface Model {
  id: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  status: 1 | 0
}
