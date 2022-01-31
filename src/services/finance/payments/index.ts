import useBaseResponse from 'services/baseResponse'
import config from '../config'
import { ResponsePaymentMethodsList } from './types'

export const usePaymentsService = () => {
  const baseResponse = useBaseResponse()

  const paymentMethodsList = () => {
    const url = '/v1/payment-methods'
    return baseResponse<ResponsePaymentMethodsList>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    paymentMethodsList
  }
}
