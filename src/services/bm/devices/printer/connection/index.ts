import useBaseResponse from '../../../../baseResponse'
import config from '../../../config'
import { Response, ResponseList } from 'services/types'
import { DeviceElement } from '../../type'

export const useConnectionService = () => {
  const baseResponse = useBaseResponse()

  const connectionList = () => {
    const url = 'v1/printer-connection-types'

    return baseResponse<ResponseList<DeviceElement>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const connectionShow = (id: string) => {
    const url = `v1/printer-connection-types${id}`

    return baseResponse<Response<DeviceElement>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    connectionList,
    connectionShow
  }
}
