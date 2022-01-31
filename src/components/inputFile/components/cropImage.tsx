import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Icon from 'components/icon'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {
  StyleSheet as RStyleSheet,
  useResponsiveStyles
} from 'components/responsiveLayout'
import useTranslation from 'hooks/useTranslation'

const useCropImage = () => {
  const ref = useRef<null | any>(null)
  const [scaleValue, setScaleValue] = useState(1)
  const [rotate, setRotate] = useState(0)

  const onCrop = async () => {
    const url = ref.current.getImageScaledToCanvas().toDataURL()
    const base64Response = await fetch(url)
    const blob = await base64Response.blob()
    return blob
  }

  const onScaleChange = (scaleChangeEvent: any) => {
    const newScaleValue = parseFloat(scaleChangeEvent.target.value)
    setScaleValue(newScaleValue)
  }

  const rotateLeft = () => {
    setRotate((rotate - 90) % 360)
  }

  const rotateRight = () => {
    setRotate((rotate + 90) % 360)
  }

  return {
    onScaleChange,
    onCrop,
    scaleValue,
    ref,
    rotateLeft,
    rotateRight,
    rotate
  }
}

type RotateButtonType = {
  text: string
  onPress: () => void
}

const RotateButton = ({ text, onPress }: RotateButtonType) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        paddingVertical: 10
      }}
      onPress={onPress}
    >
      <Icon name="rotate" />
      <Typography
        style={{ marginLeft: 10 }}
        content={text}
        size={fontSize.md}
        fontFamily={fonts.baloo2SemiBold600}
        color={colors.primary}
        disableThemeColor
      />
    </TouchableOpacity>
  )
}

type CropImageType = {
  imageSrc: string
  onCrop?: (value: Blob) => void
  width?: number
  height?: number
}

const CropImage = ({ imageSrc, onCrop, width, height }: CropImageType) => {
  const {
    scaleValue,
    onScaleChange,
    onCrop: _onCrop,
    ref,
    rotateRight,
    rotateLeft,
    rotate
  } = useCropImage()

  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={nStyles.contentAvatar}>
        <AvatarEditor
          ref={ref}
          image={imageSrc}
          border={10}
          scale={scaleValue}
          rotate={rotate}
          width={width}
          height={height}
          style={{ scale: 0.5 }}
        />
        <input
          style={{ width: '100%' }}
          type="range"
          value={scaleValue}
          min="0.5"
          max="2"
          step="0.01"
          onChange={onScaleChange}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <RotateButton text={t('compCropRotLeft')} onPress={rotateLeft} />
          <RotateButton text={t('compCropRotRight')} onPress={rotateRight} />
        </View>
        <TouchableOpacity
          onPress={async () => {
            onCrop?.(await _onCrop())
          }}
          style={nStyles.button}
        >
          <Typography
            content={t('compCropReady')}
            size={fontSize.md}
            fontFamily={fonts.baloo2SemiBold600}
            color={colors.white}
            disableThemeColor
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const nStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginTop: 20
  },
  contentAvatar: {
    marginHorizontal: 60,
    marginVertical: 10
  }
})

const rStyles = RStyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column md:row'
  }
})
export default CropImage
