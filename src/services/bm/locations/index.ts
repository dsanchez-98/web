import useBaseResponse from 'services/baseResponse'
import { ResponseList, Location } from 'services/types'
import config from '../config'

type RequestLocation = {
  parentId: number
  size: number
}

export const useLocationService = () => {
  const baseResponse = useBaseResponse()

  const getLocations = (request?: RequestLocation) => {
    const url = 'v1/locations'
    return baseResponse<ResponseList<Location>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url,
      params: request
    })
  }

  return {
    getLocations
  }
}
