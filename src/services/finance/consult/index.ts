import useBaseResponse from 'services/baseResponse'
import config from '../config'
import { ResponseConsultDni, ResponseConsultRuc } from './types'

export const useConsultService = () => {
  const baseResponse = useBaseResponse()

  const consultDni = (number: string) => {
    const url = `v1/consult/dni/${number}`
    return baseResponse<ResponseConsultDni>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const consultRuc = (number: string) => {
    const url = `v1/consult/ruc/${number}`
    return baseResponse<ResponseConsultRuc>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    consultDni,
    consultRuc
  }
}
