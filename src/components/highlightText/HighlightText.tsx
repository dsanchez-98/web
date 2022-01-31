import React, { FunctionComponent as FC } from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { findAll, FindAllArgs } from 'highlight-words-core'
import Typography from 'components/typography'
import { TypographyProps } from 'components/typography/types'

interface Props extends FindAllArgs, TypographyProps {
  size?: number
  style?: StyleProp<TextStyle>
  highlightStyle?: StyleProp<TextStyle>
  onPressHighlight?: (index: number) => void
}

const HighlightText: FC<Props> = (props) => {
  const { textToHighlight, highlightStyle, onPressHighlight } = props
  const chunks = findAll(props)

  return (
    <Typography
      content={chunks.map((chunk, index) => {
        const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start)
        if (!chunk.highlight) return text
        return (
          <Text
            onPress={
              onPressHighlight
                ? () => {
                    onPressHighlight(props.searchWords.indexOf(text))
                  }
                : undefined
            }
            key={index}
            style={chunk.highlight && highlightStyle}
          >
            {text}
          </Text>
        )
      })}
      size={props.size}
      style={props.style}
      {...props}
    />
  )
}

export default HighlightText
