import Oauth from 'services/types/Oauth'
import { SET_SESION, SET_CURRENT_ENTERPRISE } from '../actions/sesion.action'

const initialValues: Oauth = {
  accessToken: '',
  accountId: 0,
  enterprises: [],
  expiresAt: '',
  initialConfig: false,
  kind: '',
  phoneVerified: false,
  terminalId: 0,
  tokenType: '',
  currentEnterpriseId: 0,
  currentTerminalId: 0
}

const sesionReducer = (state = initialValues, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_SESION:
      return Object.assign({}, state, action.payload)
    case SET_CURRENT_ENTERPRISE:
      return Object.assign({}, state, { currentEnterpriseId: action.payload })
    default:
      return state
  }
}

export default sesionReducer
