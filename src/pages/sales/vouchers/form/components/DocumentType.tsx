import Typography from 'components/typography'
import React, { FunctionComponent as FC, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { useHover } from 'react-native-web-hooks'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { useContextForm } from '../ContextForm'

interface Props {
  style?: StyleProp<ViewStyle>
}

const SIZE = 28

const documents = [
  {
    name: 'N',
    value: 1
  },
  {
    name: 'B',
    value: 2
  },
  {
    name: 'F',
    value: 3
  }
  // {
  //   name: 'NC',
  //   value: '4'
  // }
]

const Document = ({ item, isSelect, onPress }) => {
  const ref = useRef<TouchableOpacity>(null)
  const isHover = useHover(ref)
  return (
    <TouchableOpacity
      ref={ref}
      style={[
        styles.item,
        {
          backgroundColor:
            isHover && !isSelect ? '#F1F6FB' : isSelect ? colors.primary : undefined,
          borderColor: isSelect ? colors.primary : colors.borderGray
        }
      ]}
      onPress={onPress}
    >
      <Typography
        content={item.name}
        disableThemeColor
        fontFamily={fonts.baloo2SemiBold600}
        color={isSelect ? 'white' : colors.borderGray}
      />
    </TouchableOpacity>
  )
}

const DocumentType: FC<Props> = (props) => {
  const { documentType } = useContextForm()
  documentType.hookSetListener()
  return (
    <View style={[styles.container, props.style]}>
      {documents.map((item, index) => {
        const isSelect = documentType.value === item.value
        return (
          <Document
            item={item}
            key={index.toString()}
            isSelect={isSelect}
            onPress={() => {
              documentType.value = item.value
            }}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  item: {
    borderRadius: SIZE / 2,
    height: SIZE,
    width: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    margin: 4,
    borderColor: colors.borderGray
  }
})

export default DocumentType
