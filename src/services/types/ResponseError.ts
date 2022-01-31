export default interface ResponseError<
  T = {
    [key: string]: string[]
  }
> {
  apiVersion: string
  error: {
    code: number
    message: string
    errors: T
  }
}
