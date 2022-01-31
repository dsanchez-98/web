import useBaseResponse from '../../../baseResponse'
import config from '../../config'
import { ResponseList } from 'services/types'
import useSesion from 'hooks/useSesion'
import { PrinterEnterprise, PrinterTerminal } from './type'

export const usePrinterService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const printerListByEnterprise = () => {
    const { currentEnterpriseId } = getSesion()
    const url = `/v1/enterprises/${currentEnterpriseId}/printers`

    return baseResponse<ResponseList<PrinterEnterprise>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const printerListByTerminal = () => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `/v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/printers`

    return baseResponse<ResponseList<PrinterTerminal>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  return {
    printerListByEnterprise,
    printerListByTerminal
  }
}
