import useBaseResponse from '../../baseResponse'
import useSesion from 'hooks/useSesion'
import config from '../config'
import { RequestCreateProduct } from './type'
import { Response, ResponseList } from 'services/types'
import { Product2 } from 'services/types/Product'

export const useProductService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const showProduct = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/products/${id}`

    return baseResponse<Response<Product2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const createProduct = (request: RequestCreateProduct) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/products`

    return baseResponse<Response<Product2>>({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const updateProduct = (request: { data: RequestCreateProduct; id: string }) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/products/${request.id}`

    return baseResponse<Response<Product2>>({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request.data
    })
  }

  const listProducts = () => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/products`

    return baseResponse<ResponseList<Product2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const deleteProducts = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/products/${id}`

    return baseResponse<Response<Product2>>({
      baseUrl: config.baseURL,
      method: 'DELETE',
      url
    })
  }

  return {
    showProduct,
    createProduct,
    updateProduct,
    listProducts,
    deleteProducts
  }
}
