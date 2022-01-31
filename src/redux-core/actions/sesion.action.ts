import { Oauth } from 'services/types'
export const SET_SESION = 'SET_SESION'
export const SET_CURRENT_ENTERPRISE = 'SET_CURRENT_ENTERPRISE'

export const REMOVE_SESION = 'REMOVE_SESION'

export const actionSetSesion = (payload: Partial<Oauth>) => {
  return {
    type: SET_SESION,
    payload
  }
}

export const actionSetcurrentEnterpriseId = (payload: number) => {
  return {
    type: SET_CURRENT_ENTERPRISE,
    payload
  }
}

export const actionRemoveSesion = () => {
  return {
    type: REMOVE_SESION
  }
}
