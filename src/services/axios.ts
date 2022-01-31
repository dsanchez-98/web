import axios from 'axios'
import { environment } from 'constants/core'

axios.defaults.baseURL = environment.baseUrlIAM

const api = axios.create({
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.eject = (e) => {
  console.log('interceptors', e)
  return e
}

export { api }
