import { Platform, requireNativeComponent, ScrollView, View } from 'react-native'

const SpringScrollViewNative = ScrollView

const SpringScrollContentViewNative =
  Platform.OS === 'ios' ? requireNativeComponent('SpringScrollContentView') : View

export { SpringScrollViewNative, SpringScrollContentViewNative }
