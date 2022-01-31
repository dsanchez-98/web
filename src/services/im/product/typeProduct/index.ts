import useBaseResponse from '../../../baseResponse'
import config from '../../config'
import { Response, ResponseList } from 'services/types'
import { TypeProduct } from '../type'

export const useTypeProductService = () => {
  const baseResponse = useBaseResponse()

  const productTypeShow = (id?: number) => {
    const url = `v1/product-types/${id}`

    return baseResponse<Response<TypeProduct>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const productTypeList = () => {
    const url = 'v1/product-types'

    return baseResponse<ResponseList<TypeProduct>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    productTypeShow,
    productTypeList
  }
}
