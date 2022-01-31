import { Platform } from 'react-native'
import LoggerView from './LoggerView'
// import { Config } from 'react-native-config'
// export default __DEV__ || Config.ENV_NAME ? LoggerView : () => null
export default __DEV__ && Platform.OS !== 'web' ? LoggerView : () => null
