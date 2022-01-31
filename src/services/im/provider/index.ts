import useBaseResponse from '../../baseResponse'
import config from '../config'
import { Provider, Response, ResponseList } from 'services/types'
import { RequestCreateProvider } from './type'
import { Provider2 } from 'services/types/Provider'
import useSesion from 'hooks/useSesion'

export const useProviderService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const showProvider = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/providers/${id}`

    return baseResponse<Response<Provider2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const listProviders = () => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/providers`

    return baseResponse<ResponseList<Provider2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const createProvider = (request: RequestCreateProvider) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/providers`

    return baseResponse<Response<Provider>>({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const updateProvider = (request: { data: RequestCreateProvider; id: string }) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/providers/${request.id}`

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request.data
    })
  }

  const deleteProvider = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/providers/${id}`

    return baseResponse<Response<Provider2>>({
      baseUrl: config.baseURL,
      method: 'DELETE',
      url
    })
  }

  return {
    listProviders,
    createProvider,
    updateProvider,
    showProvider,
    deleteProvider
  }
}
