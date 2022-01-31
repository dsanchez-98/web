import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'
import React, { FunctionComponent as FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { TimerProps } from './types'

const useTimer = (max: number) => {
  const [timer, setCounter] = useState(max)

  useEffect(() => {
    if (timer > 0) {
      var time = setTimeout(() => {
        setCounter(timer - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(time)
    }
  }, [timer])

  const restart = () => {
    setCounter(max)
  }

  return { timer, restart }
}

const Timer: FC<TimerProps> = (props) => {
  const { timer, restart } = useTimer(props.value)
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()

  return (
    <View>
      {timer ? (
        <View style={styles.timerContainer}>
          {props.text && (
            <Typography
              color={colors.black}
              size={styles.textTimer.fontSize}
              content={props.text}
              fontFamily={fonts.baloo2Medium500}
              disableThemeColor
            />
          )}
          <Typography
            color={colors.purple}
            size={styles.textTimer.fontSize}
            content={timer + ' ' + props.unit}
            fontFamily={fonts.baloo2Medium500}
            disableThemeColor
          />
        </View>
      ) : (
        <Typography
          onPress={() => {
            props.onRestart?.()
            restart()
          }}
          color={colors.purple}
          size={styles.textTimer.fontSize}
          content={t('hazClickCodigo')}
          fontFamily={fonts.baloo2Medium500}
          disableThemeColor
        />
      )}
    </View>
  )
}

const rStyles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textTimer: {
    fontSize: '14 md:16'
  }
})

export default Timer
