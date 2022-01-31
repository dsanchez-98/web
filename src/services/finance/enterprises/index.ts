import useBaseResponse from 'services/baseResponse'
import { CustomerDni, Response } from 'services/types'
import config from '../config'

type RequestLinkSunat = {
  storeId: number
  ruc: string
  usuarioSol: string
  claveSol: string
  confirmarClaveSol: string
}

export const useEnterprisesService = () => {
  const baseResponse = useBaseResponse()

  const linkSunat = (request: RequestLinkSunat) => {
    const url = `v1/enterprises/link-sunat/${request.storeId}`
    return baseResponse<Response<CustomerDni>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url,
      data: request
    })
  }

  return {
    linkSunat
  }
}
