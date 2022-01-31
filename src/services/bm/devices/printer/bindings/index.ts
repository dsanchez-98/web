import useBaseResponse from '../../../../baseResponse'
import config from '../../../config'
import { Response, ResponseList } from 'services/types'
import { RequestCreateBinding } from './type'
import useSesion from 'hooks/useSesion'

export const useBindingService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const bindingCreate = (request: RequestCreateBinding) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `/v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/printer-links`

    return baseResponse<ResponseList<RequestCreateBinding>>({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      data: request
    })
  }

  const bindingShow = (id: string) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `/v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/printer-links/${id}`

    return baseResponse<Response<RequestCreateBinding>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const bindingUpdate = (request: { data: RequestCreateBinding; id: string }) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/printer-links/${request.id}`

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PUT',
      url,
      data: request.data
    })
  }

  const bindingDelete = (id: string) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/printer-links/${id}`

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'DELETE',
      url
    })
  }

  return {
    bindingCreate,
    bindingShow,
    bindingUpdate,
    bindingDelete
  }
}
