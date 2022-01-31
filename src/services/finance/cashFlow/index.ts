import useSesion from 'hooks/useSesion'
import useBaseResponse from 'services/baseResponse'
import config from '../config'
import { ResponseOpeningList } from './types'

export const useCashFlowService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const createOpening = () => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/cashes`
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url
    })
  }

  const openingList = () => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/cashes`
    return baseResponse<ResponseOpeningList>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    createOpening,
    openingList
  }
}
