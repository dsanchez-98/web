import { Platform } from 'react-native'

export const shadow = Platform.select({
  web: {
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.1)'
  },
  native: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
})
