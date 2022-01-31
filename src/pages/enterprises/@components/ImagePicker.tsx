import HighlightText from 'components/highlightText'
import Icon from 'components/icon'
import Image from 'components/image'
import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TouchableOpacity
} from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import useAppContext from 'hooks/useAppContext'
import ModalPhoto from 'components/inputFile/components/ModalPhoto'
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
  dimensions?: {
    height: number
    width: number
  }
}

const EmptyImage = ({ style }) => {
  return (
    <View style={[styles.image, styles.emptyImage, style || {}]}>
      <Icon name="iconTumiSoftPlaceholder" />
    </View>
  )
}

const ImagePicker: FC<Props> = (props) => {
  const { showModal } = useAppContext()
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.containerImage, props.styleContainerImage]}>
        <TouchableOpacity
          onPress={() => {
            showModal(
              ModalPhoto,
              {},
              {
                onChange: (img: any) => props.onChange(URL.createObjectURL(img)),
                title: props.title,
                ...props.dimensions
              }
            )
          }}
        >
          {props.value ? (
            <Image
              source={{
                uri: props.value
              }}
              style={[styles.image, props.styleImage || {}]}
            />
          ) : (
            <EmptyImage style={props.styleImage} />
          )}
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
    flexDirection: 'row',
    marginVertical: 5
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
  image: { resizeMode: 'contain', height: 90, width: 180 },
  containerIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10
  },
  emptyImage: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ImagePicker
