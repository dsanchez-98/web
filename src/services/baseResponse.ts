import queryString from 'query-string'
import { api } from './axios'
import { actionRemoveSesion } from 'redux-core/actions/sesion.action'
import useAppContext from 'hooks/useAppContext'
import { useAppDispatch, useAppStore } from 'redux-core/hooks'
import I18n from 'i18n-js'

type Params = {
  url: string
  method: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT'
  params?: { [key: string]: any }
  data?: any
  withCredentials?: boolean
  headers?: any
  baseUrl?: string
}

interface BaseResponse extends Params {
  token?: string
}

const messageError = 'Ocurrió un error, intente nuevamente'
const messageUnauthorized = 'Su sesión a caducado'

const baseResponse = ({ withCredentials = true, ...params }: BaseResponse) => {
  const url = `${params.url}${
    params.params ? `?${queryString.stringify(params.params)}` : ''
  }`
  const headers = { ...params.headers, 'X-localization': I18n.locale }
  withCredentials && (headers.Authorization = `Bearer ${params.token}`)
  return api({
    baseURL: params.baseUrl,
    url,
    method: params.method,
    headers,
    data: params.data,
    validateStatus: () => true
  })
}

const validateStatusSuccess = (status: number) => status >= 200 && status < 300

const useBaseResponse = () => {
  const store = useAppStore()
  const { showModal } = useAppContext()
  const dispatch = useAppDispatch()
  const response = <T>(params: Params): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const newParams = { ...params, token: store.getState()?.app.sesion.accessToken }
      const { withCredentials = true } = newParams
      baseResponse(newParams)
        .then((response) => {
          const dataService = response.data
          if (validateStatusSuccess(response.status)) {
            resolve(dataService)
          } else if (response.status === 401 && withCredentials) {
            dispatch(actionRemoveSesion())
            showModal({
              message: dataService?.error?.message || messageUnauthorized
            })
            reject(dataService.error)
          } else {
            showModal({
              message: dataService?.error?.message || messageError
            })
            reject(dataService.error)
          }
        })
        .catch((error) => {
          showModal({
            message: error?.message || messageError
          })
          reject(error)
        })
    })
  }
  return response
}
export default useBaseResponse
