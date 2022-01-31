import useBaseResponse from 'services/baseResponse'
import { ResponseList, StandardTaxDocumentTumisoft } from 'services/types'
import config from '../config'

export const useStandardTaxDocumentService = () => {
  const baseResponse = useBaseResponse()

  const standardTaxDocumentsList = () => {
    const url = '/v1/standard-tax-document-tumisoft'
    return baseResponse<ResponseList<StandardTaxDocumentTumisoft>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    standardTaxDocumentsList
  }
}
