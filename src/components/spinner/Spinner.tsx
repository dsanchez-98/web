import BaseModal from 'components/modal/BaseModal'
import Typography from 'components/typography'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FC,
  useImperativeHandle,
  useState
} from 'react'
import { ActivityIndicator } from 'react-native'
import colors from 'styles/colors'
import { SpinnerProps, SpinnerRef } from './types'

const Spinner: FC<SpinnerRef, SpinnerProps> = (props, ref) => {
  const [state, setState] = useState<any>({ visible: false, text: '' })

  useImperativeHandle(ref, () => ({
    setLoading: (visible, params) => {
      setState({
        visible,
        ...params
      })
    }
  }))

  if (!state.visible) {
    return null
  }
  return (
    <BaseModal
      transparent
      visible
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
      }}
    >
      <ActivityIndicator color={colors.primary} size={'large'} />
      {!!state.text && (
        <Typography
          content={state.text}
          disableThemeColor
          color={colors.white}
          size={18}
          style={{ margin: 20 }}
        />
      )}
    </BaseModal>
  )
}

export default forwardRef(Spinner)
