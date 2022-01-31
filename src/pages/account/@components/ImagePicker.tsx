import HighlightText from 'components/highlightText'
import Icon from 'components/icon'
// import Image from 'components/image'
import Typography from 'components/typography'
import React, { FunctionComponent as FC, useState } from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity
} from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import {
  StyleSheet as RStyleSheet,
  useResponsiveStyles
} from 'components/responsiveLayout'
import useImagePicker from 'hooks/useImagePicker'
interface Props {
  title: string
  description: string
  value: any
  onChange: (value: any) => void
  highlightWords: string[]
  style?: StyleProp<ViewStyle>
  styleContainerImage?: StyleProp<ViewStyle>
  styleContainerDescription?: StyleProp<ViewStyle>
  styleImage?: StyleProp<ImageStyle>
}

const ImagePicker: FC<Props> = (props) => {
  const [uri, setUri] = useState()
  const rs = useResponsiveStyles(rStyles)

  const { pickImage } = useImagePicker()
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.containerImage, props.styleContainerImage]}>
        <TouchableOpacity
          onPress={() => {
            pickImage()
          }}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
            }}
            style={[styles.image, props.styleImage || {}]}
          />
          <View style={styles.containerIcon}>
            <Icon name="camera" width={30} height={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.containerDescription, props.styleContainerDescription]}>
        <Typography
          content={props.title}
          color={colors.primary}
          fontFamily={fonts.baloo2SemiBold600}
          disableThemeColor
        />
        <HighlightText
          highlightStyle={{ color: colors.purple, fontWeight: 'bold' }}
          searchWords={props.highlightWords}
          textToHighlight={props.description}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  containerImage: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerDescription: {
    flex: 1,
    justifyContent: 'center',
    margin: 5
  },
  image: { resizeMode: 'contain', height: 90, width: 180, backgroundColor: 'red' },
  containerIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10
  }
})

const rStyles = RStyleSheet.create({
  styleContainerImage: {}
})

export default ImagePicker
