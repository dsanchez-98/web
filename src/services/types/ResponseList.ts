export default interface ResponseList<T> {
  apiVersion: string
  context: string
  data: {
    kind: string
    totalItems: number
    startIndex: number
    itemsPerPage: string
    previousLink: string
    nextLink: string
    items: T[]
  }
}
