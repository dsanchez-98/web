import React, { FunctionComponent as FC } from 'react'
import { Platform } from 'react-native'

interface Props {
  onSubmit?: () => void
}

const Form: FC<Props> = (props) => {
  if (Platform.OS === 'web') {
    return (
      <form onSubmit={props.onSubmit} style={{ display: 'flex', flex: 1, height: '100%' }}>
        {props.children}
      </form>
    )
  }
  return <>{props.children}</>
}

export default Form
