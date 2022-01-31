import useBaseResponse from 'services/baseResponse'
import { ResponseList, Response, Page } from 'services/types'
import config from '../config'

export const usePageService = () => {
  const baseResponse = useBaseResponse()

  const pageList = () => {
    const url = 'v1/pages/list'
    return baseResponse<ResponseList<Page>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
      // params: request
    })
  }

  const showPage = (id: number | string) => {
    const url = `v1/pages/${id}`
    return baseResponse<Response<Page>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const showPageWithSlug = (slug: string) => {
    const url = `v1/page/${slug}`
    return baseResponse<Response<Page>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url,
      withCredentials: false,
      headers: {}
    })
  }

  return {
    pageList,
    showPage,
    showPageWithSlug
  }
}
