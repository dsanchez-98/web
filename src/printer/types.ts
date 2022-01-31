export type PrintOptions = {
  host: string
  printer: { port: number; host: string }
  text: string
  image?: string
  qr?: string
  cut?: boolean
}
