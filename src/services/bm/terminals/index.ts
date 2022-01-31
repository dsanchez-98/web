/* eslint-disable indent */
import useSesion from 'hooks/useSesion'
import useBaseResponse from 'services/baseResponse'
import { ResponseList, Terminal } from 'services/types'
import config from '../config'
import { ResponseShowTerminal } from './type'

type RequestEditTerminal = {
  name: string
  phone: string
  address: string
  salePoint: {
    flagHadSeries: number
    printedTicketMessage: string
  }
}

type RequestFirstUpdateTerminal = {
  name: string
  phone: string
  address: string
  salePoint: {
    flagHadSeries: number
    printedTicketMessage: string
  }
  paymentMethods: {
    paymentMethodId: number
  }[]
  series: {
    standardTaxDocumentId: number
    series: string
    correlativeInitial: number
  }[]
}

export const useTerminalService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const showTerminal = (id: number | string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${id}`
    return baseResponse<ResponseShowTerminal>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const terminalsList = () => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals`
    return baseResponse<ResponseList<Terminal>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const editTerminal = (id: string | number, request: RequestEditTerminal) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${id}`
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request
    })
  }

  const firstUpdateTerminal = (
    id: string | number,
    request: RequestFirstUpdateTerminal
  ) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${id}/first-update`
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request
    })
  }

  return {
    showTerminal,
    terminalsList,
    editTerminal,
    firstUpdateTerminal
  }
}
