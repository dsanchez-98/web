import useBaseResponse from '../../../baseResponse'
import config from '../../config'
import { Response, ResponseList } from 'services/types'
import { DeviceCategory } from '../type'

export const useCategoryService = () => {
  const baseResponse = useBaseResponse()

  const categoryList = () => {
    const url = 'v1/peripheral-categories'

    return baseResponse<ResponseList<DeviceCategory>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const categoryShow = (id: string) => {
    const url = `v1/peripheral-categories/${id}`

    return baseResponse<Response<DeviceCategory>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    categoryList,
    categoryShow
  }
}
