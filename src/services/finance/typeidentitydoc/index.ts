import useBaseResponse from 'services/baseResponse'
import { Response, ResponseList } from 'services/types'
import IdentityTypeDoc, { IdentityTypeDoc2 } from 'services/types/IdentityTypeDoc'
import config from '../config'

export const useTypeIdentityDocService = () => {
  const baseResponse = useBaseResponse()

  const listTypeIdentityDoc = () => {
    const url = '/v1/identity-document-types'
    return baseResponse<ResponseList<IdentityTypeDoc>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const showTypeIdentityDocService = (id: string) => {
    const url = `v1/identity-document-types/${id}`
    return baseResponse<Response<IdentityTypeDoc2>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    listTypeIdentityDoc,
    showTypeIdentityDocService
  }
}
