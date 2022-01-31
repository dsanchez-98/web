/* eslint-disable no-extend-native */
/* eslint-disable no-useless-constructor */
import { MakeMutableValue } from 'hooks/core/useMutableState'
import React, { createContext, FC, useContext, useRef } from 'react'
import { calulateTotalItem } from './helpers'
import { Customer, Product } from './types'

Array.prototype.removeIndexs = function (indexs: number[]) {
  const remove = []
  for (let i = indexs.length - 1; i >= 0; i--) {
    remove.push(...this.splice(indexs[i], 1))
  }
  return remove
}
export class MakeMutableProducts extends MakeMutableValue<Product[]> {
  productsById: { [id: string]: Product } = {}

  constructor(initialValue: Product[], forceUpdate?: () => void) {
    super(initialValue, forceUpdate)
    this._addProductsById(initialValue)
  }

  private _addProductsById(value: Product[]) {
    value.forEach((product) => {
      this.productsById[product.id] = product
    })
  }

  sumQuantity(ids: number[]) {
    const indexs: number[] = []
    this.value
      .filter((item, index) => {
        if (ids.includes(item.id)) {
          indexs.push(index)
          return true
        }
        return false
      })
      .forEach((i) => {
        i.quantity = parseFloat(`${i.quantity}`) + 1
        const price = parseFloat(`${i.price}`) || 0
        const discount = parseFloat(`${i.discount}`) || 0
        i.total = (price - discount) * i.quantity
      })
    this.value.unshift(...this.value.removeIndexs(indexs))
  }

  add(...product: Product[]) {
    const newProducts: Product[] = []
    const ids: number[] = []
    calulateTotalItem(product).forEach((item) => {
      if (!this.productsById[item.id]) {
        newProducts.push(item)
      } else {
        ids.push(item.id)
      }
    })
    this.sumQuantity(ids)
    this.value.unshift(...newProducts)
    this._addProductsById(newProducts)
    this.emitSet()
  }

  remove(item: Product) {
    const index = this.value.findIndex((i) => `${i.id}` === `${item.id}`)
    this.value.splice(index, 1)
    delete this.productsById[item.id]
    this.emitSet()
  }

  removeAll() {
    this.value = []
    this.productsById = {}
    this.emitSet()
  }
}

type ContextType = {
  products: MakeMutableProducts
  selectedProducts: MakeMutableProducts
  addedProducts: MakeMutableProducts
  customer: MakeMutableValue<Customer | undefined>
  documentType: MakeMutableValue<number | undefined>
  globalDiscount: MakeMutableValue<number>
  handleSubmit: () => void
  modalProducts: any
  modalCustomers: any
}

export const Context = createContext<ContextType>({
  products: new MakeMutableProducts([]),
  selectedProducts: new MakeMutableProducts([]),
  addedProducts: new MakeMutableProducts([]),
  customer: new MakeMutableValue({ name: '', id: 0 }),
  documentType: new MakeMutableValue(undefined),
  globalDiscount: new MakeMutableValue(0),
  handleSubmit: () => {},
  modalProducts: { current: undefined },
  modalCustomers: { current: undefined }
})

export const useContextForm = () => useContext(Context)

const ContextForm: FC<{}> = (props) => {
  const products = useRef(new MakeMutableProducts([])).current
  const selectedProducts = useRef(new MakeMutableProducts([])).current
  const addedProducts = useRef(new MakeMutableProducts([])).current
  const customer = useRef(new MakeMutableValue(undefined)).current
  const documentType = useRef(new MakeMutableValue(undefined)).current
  const globalDiscount = useRef(new MakeMutableValue(0)).current
  const modalProducts = useRef()
  const modalCustomers = useRef()

  const handleSubmit = () => {}

  return (
    <Context.Provider
      value={{
        products,
        selectedProducts,
        addedProducts,
        customer,
        documentType,
        globalDiscount,
        handleSubmit,
        modalProducts,
        modalCustomers
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default ContextForm
