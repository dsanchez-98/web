import useBaseResponse from 'services/baseResponse'
import config from '../config'
import { ResponseAffectationTypesList } from './types'

export const useIgvAffectationService = () => {
  const baseResponse = useBaseResponse()

  const affectationTypesList = () => {
    const url = '/v1/igv-affectation-types'
    return baseResponse<ResponseAffectationTypesList>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    affectationTypesList
  }
}
