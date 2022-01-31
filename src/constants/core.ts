import {
  URL_BM,
  URL_SALES,
  URL_IM,
  URL_FINANCE,
  URL_IAM,
  REACT_APP_REDUX_PERSIST_SECRET_KEY,
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_FACEBOOK_APP_ID
} from '@env'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const statusBarHeight = getStatusBarHeight()

const environment = {
  persistSecretKey: REACT_APP_REDUX_PERSIST_SECRET_KEY || 'defaultSecretKey',
  baseUrlIAM: URL_IAM,
  baseUrlFinance: URL_FINANCE,
  baseUrlBM: URL_BM,
  baseUrlSales: URL_SALES,
  baseUrlIm: URL_IM,
  storageKey: 'App',
  googleClientId: REACT_APP_GOOGLE_CLIENT_ID,
  facebookAppId: REACT_APP_FACEBOOK_APP_ID
}

const identityDocumentType = {
  dni: 2,
  ruc: 4,
  ce: 3
}

export { environment, statusBarHeight, identityDocumentType }
