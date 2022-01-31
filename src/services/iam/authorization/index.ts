import useBaseResponse from '../../baseResponse'
import config from '../config'
import { ResponseList } from 'services/types'
import Rol from 'services/types/Rol'

export const useAuthorizationService = () => {
  const baseResponse = useBaseResponse()

  const listRols = () => {
    const url = 'v1/roles'

    return baseResponse<ResponseList<Rol>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    listRols
  }
}
