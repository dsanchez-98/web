import useBaseResponse from '../../baseResponse'
import config from '../config'
import { Response, ResponseList } from 'services/types'
import useSesion from 'hooks/useSesion'
import { Device } from './type'

export const useDeviceService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const devicesList = () => {
    const { currentEnterpriseId } = getSesion()
    const url = `enterprises/${currentEnterpriseId}/peripherals`
    return baseResponse<ResponseList<Device>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const showDevice = (id: string) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/peripherals/${id}`

    return baseResponse<Response<Device>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    devicesList,
    showDevice
  }
}
