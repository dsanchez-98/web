import useMutableState from 'hooks/core/useMutableState'
import { useCategoryProductService } from 'services/im/product/category'
const items: { label: string; value: number }[] = []
const initialValue = {
  segment: items,
  family: items,
  class: items,
  product: items,
  current: {
    segmentId: 0,
    familyId: 0,
    classId: 0,
    productId: 0
  }
}

const useSunatProduct = (initial = initialValue) => {
  const state = useMutableState(Object.assign({}, initialValue, initial))
  const { getCategory } = useCategoryProductService()

  const onChange = (key: keyof typeof initialValue, value: typeof items) => {
    state.value = {
      ...state.value,
      [key]: value
    }
  }

  const setCurrent = (key: keyof typeof initialValue, value: number) => {
    state.value = {
      ...state.value,
      current: { ...state.value.current, [`${key}Id`]: value }
    }
  }

  const getSegment = async () => {
    try {
      // TODO: Actualizar con los segmentos
      const response = await getCategory()
      onChange(
        'segment',
        response.data.items.map((i) => ({ label: i.description, value: i.id }))
      )
    } catch (error) {}
  }

  const getFamily = async (parentId: number) => {
    try {
      const response = await getCategory(parentId)
      onChange(
        'family',
        response.data.items.map((i) => ({ label: i.description, value: i.id }))
      )
    } catch (error) {}
  }

  const getClass = async (parentId: number) => {
    try {
      const response = await getCategory(parentId)
      onChange(
        'class',
        response.data.items.map((i) => ({ label: i.description, value: i.id }))
      )
    } catch (error) {}
  }

  const getProduct = async (parentId: number) => {
    try {
      const response = await getCategory(parentId)
      onChange(
        'product',
        response.data.items.map((i) => ({ label: i.description, value: i.id }))
      )
    } catch (error) {}
  }

  return {
    getSegment,
    getFamily,
    getClass,
    getProduct,
    state: state.value,
    setCurrent
  }
}

export default useSunatProduct
