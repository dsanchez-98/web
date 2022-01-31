import useBaseResponse from '../../baseResponse'
import config from '../config'
import { Client, Response, ResponseList } from 'services/types'
import { RequestCreateClient } from './type'
import { Client2 } from 'services/types/Client'
import useSesion from 'hooks/useSesion'

export const useClientService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const showClient = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/clients/${id}`

    return baseResponse<Response<Client2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const listClients = () => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/clients`

    return baseResponse<ResponseList<Client2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const createClient = (request: RequestCreateClient) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/clients`

    return baseResponse<Response<Client>>({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const updateClient = (request: { data: RequestCreateClient; id: string }) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/clients/${request.id}`

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request.data
    })
  }

  const deleteClient = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/clients/${id}`

    return baseResponse<Response<Client2>>({
      baseUrl: config.baseURL,
      method: 'DELETE',
      url
    })
  }

  return {
    listClients,
    showClient,
    createClient,
    updateClient,
    deleteClient
  }
}
