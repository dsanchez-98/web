import { Product } from './types'

export const round = (num: number, defValue = 0) => {
  if (isNaN(parseFloat(`${num}`))) {
    return defValue
  }
  return Math.round((parseFloat(`${num}`) + Number.EPSILON) * 100) / 100
}

export const calculateAffectation = (products: Product[], globalDiscount: number) => {}

export const calulateTotalItem = (items: Product[]) => {
  return items.map((item) => {
    const newItem = { ...item }
    const price = parseFloat(`${item.price || 0}`)
    const discount = parseFloat(`${item.discount || 0}`)
    const quantity = parseFloat(`${item.quantity || 0}`)
    newItem.total = (price - discount) * quantity
    newItem.priceList = price
    return newItem
  })
}

export const roundDecimals = (number: number, decimales = 2) => {
  let num = number as any
  const signo = num >= 0 ? 1 : -1
  num = num * signo
  if (decimales === 0) {
    // con 0 decimales
    return signo * Math.round(num)
  }
  // round(x * 10 ^ decimales)
  num = num.toString().split('e')
  num = Math.round(+(num[0] + 'e' + (num[1] ? +num[1] + decimales : decimales)))
  // x * 10 ^ (-decimales)
  num = num.toString().split('e')
  return signo * (num[0] + 'e' + (num[1] ? +num[1] - decimales : -decimales))
}
