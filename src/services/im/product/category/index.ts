import useBaseResponse from '../../../baseResponse'
import config from '../../config'
import { ResponseList } from 'services/types'
import { Category } from '../type'

export const useCategoryProductService = () => {
  const baseResponse = useBaseResponse()

  const getCategory = (parentId?: number) => {
    const url = `v1/product-categories-by-parent/${parentId || ''}`

    return baseResponse<ResponseList<Category>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    getCategory
  }
}
