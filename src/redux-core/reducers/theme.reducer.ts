import { SET_THEME } from '../actions/theme.action'

const themeReducer = (state = 'light', action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload
    default:
      return state
  }
}

export default themeReducer
