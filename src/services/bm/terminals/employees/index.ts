import useSesion from 'hooks/useSesion'
import useBaseResponse from 'services/baseResponse'
import { ResponseList, Employee, Response } from 'services/types'
import config from '../../config'

type RequestEmployeesList = {
  terminalId: number | string
}

type RequestCreateEmployee = {
  file?: Blob
  email: string
  password: string
  requestChangePassword: string
  name: string
  lastName: string
  phone: string
  dateBirthday: string
  identityDocumentType: string
  identityDocumentNumber: string
  role: string
}

type RequestEditEmployee = {
  file?: Blob
  name: string
  lastName: string
  dateBirthday: string
  identityDocumentType: string
  identityDocumentNumber: string
  role: string
}

type RequestStatusEmployee = {
  active: boolean
}

export const useEmployeeService = () => {
  const baseResponse = useBaseResponse()
  const { getSesion } = useSesion()

  const createEmployee = (request: RequestCreateEmployee) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/employees`

    const formData = new FormData()
    Object.entries(request).forEach(
      ([key, value]) => value && formData.append(key, value)
    )

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  }

  const editEmployee = (id: number | string, request: RequestEditEmployee) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/employees/${id}`
    const formData = new FormData()
    Object.entries(request).forEach(
      ([key, value]) => value && formData.append(key, value)
    )
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  }

  const updateStatusEmployee = (id: number | string, request: RequestStatusEmployee) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/employees/status/${id}`

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request
    })
  }

  const deleteEmployee = (id: number | string) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/employees/${id}`

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'DELETE',
      url
    })
  }

  const showEmployee = (id: number | string) => {
    const { currentEnterpriseId, currentTerminalId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${currentTerminalId}/employees/${id}`

    return baseResponse<Response<Employee>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const employeesList = (request: RequestEmployeesList) => {
    const { currentEnterpriseId } = getSesion()
    const url = `v1/enterprises/${currentEnterpriseId}/terminals/${request.terminalId}/employees`
    return baseResponse<
      ResponseList<{
        lastname: string
        name: string
        roleId: number
        roleName: string
        status: number
        userId: number
      }>
    >({
      baseUrl: config.baseURL,
      method: 'GET',
      url,
      data: request
    })
  }

  return {
    employeesList,
    createEmployee,
    editEmployee,
    updateStatusEmployee,
    deleteEmployee,
    showEmployee
  }
}
