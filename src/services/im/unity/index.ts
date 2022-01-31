import useBaseResponse from '../../baseResponse'
import config from '../config'
import { ResponseList } from 'services/types'
import { Unit } from '../../types'

export const useUnitService = () => {
  const baseResponse = useBaseResponse()

  const listUnitOfMeasurement = () => {
    const url = 'v1/commercial-measure-units'

    return baseResponse<ResponseList<Unit>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    listUnitOfMeasurement
  }
}
