import useBaseResponse from 'services/baseResponse'
import { Response, ResponseList } from 'services/types'
import Enterprise from 'services/types/Enterprise'
import config from '../config'
import useSesion from 'hooks/useSesion'

type RequestCreateEnterprise = {}
type RequestEditEnterprise = {}

export const useEnterpriseService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const showEnterprise = (id: string) => {
    const url = `v1/enterprises/${id}`
    return baseResponse<Response<Enterprise>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const editEnterprise = (id: string | number, request: RequestEditEnterprise) => {
    const url = `v1/enterprises/${id}`
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request
    })
  }

  const createEnterprise = (request: RequestCreateEnterprise) => {
    const url = 'v1/enterprises/'
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const enterprisesList = () => {
    const url = 'v1/enterprises'
    return baseResponse<ResponseList<Enterprise>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    createEnterprise,
    enterprisesList,
    showEnterprise,
    editEnterprise
  }
}
