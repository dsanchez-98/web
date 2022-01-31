export default interface Response<T> {
  apiVersion: string
  context: string
  data: T
}
