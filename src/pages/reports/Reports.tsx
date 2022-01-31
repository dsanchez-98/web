import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { actionRemoveSesion } from 'redux-core/actions/sesion.action'

interface Props {}

const Reports: FC<Props> = (props) => {
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1 }}>
      <Typography content={'Reportes'} />
      <Typography
        content={'cerrar sesion'}
        onPress={() => {
          dispatch(actionRemoveSesion())
        }}
      />
    </View>
  )
}

export default Reports
