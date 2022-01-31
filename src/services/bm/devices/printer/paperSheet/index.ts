import useBaseResponse from '../../../../baseResponse'
import config from '../../../config'
import { Response, ResponseList } from 'services/types'
import { DeviceElement } from '../../type'

export const usePaperSheetService = () => {
  const baseResponse = useBaseResponse()

  const paperSheetList = () => {
    const url = 'v1/printer-paper-sheet-types'

    return baseResponse<ResponseList<DeviceElement>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const paperSheetShow = (id: string) => {
    const url = `v1/printer-paper-sheet-types${id}`

    return baseResponse<Response<DeviceElement>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    paperSheetList,
    paperSheetShow
  }
}
