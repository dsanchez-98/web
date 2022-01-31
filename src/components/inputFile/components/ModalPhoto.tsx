import { PropsContent } from 'components/modal'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'
import React, { DragEventHandler, FC, useRef, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import CropImage from './cropImage'

const usePickerImage = () => {
  const [image, setImage] = useState('')
  const input = useRef<any>()
  const [dragEnter, setDragEnter] = useState(false)

  const handleChange = (files: FileList | null) => {
    if (files) {
      setImage(URL.createObjectURL(files[0]))
    }
  }

  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setDragEnter(true)
  }

  const onDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setDragEnter(false)
  }

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    handleChange(e.dataTransfer.files)
  }

  const onPress = () => {
    input.current?.click()
  }

  return {
    input,
    image,
    events: {
      onDragOver,
      onDragEnter,
      onDrop,
      onDragLeave
    },
    onPress,
    handleChange,
    dragEnter
  }
}

const ModalPhoto: FC<PropsContent> = (props) => {
  const { image, events, onPress, handleChange, input, dragEnter } = usePickerImage()
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Typography
        content={props.params?.title}
        fontFamily={fonts.baloo2SemiBold600}
        size={fontSize.md}
        disableThemeColor
      />
      {image !== '' ? (
        <div style={{ flexDirection: 'row' }}>
          <CropImage
            height={props.params?.height}
            width={props.params?.width}
            imageSrc={image}
            onCrop={(img) => {
              props.params?.onChange(img)
              props.hideModal()
            }}
          />
        </div>
      ) : (
        <div {...events}>
          <View
            style={[
              styles.dropContainer,
              { borderColor: dragEnter ? colors.primary : colors.black }
            ]}
          >
            <Typography
              content={t('compModalPhotoDrag')}
              fontFamily={fonts.baloo2SemiBold600}
              size={fontSize.md}
              color={colors.black}
              disableThemeColor
            />
            <TouchableOpacity
              onPress={onPress}
              style={{
                flex: 1
              }}
            >
              <Typography
                content={t('compModalPhotoClick')}
                fontFamily={fonts.baloo2SemiBold600}
                size={fontSize.md}
                color={colors.purple}
                disableThemeColor
              />
            </TouchableOpacity>
            <input
              ref={input}
              type="file"
              onChange={(e) => handleChange(e.target.files)}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </View>
        </div>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingTop: 16,
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 40
  },
  dropContainer: {
    marginTop: 16,
    border: '1px dashed black',
    flexDirection: 'row',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 66,
    paddingBottom: 56
  }
})

export default ModalPhoto
