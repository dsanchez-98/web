import React, { useState, FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Button from './Button'
import Dates from 'components/datePicker'
import * as moment from 'moment'
import { PropsContent } from './types'
import colors from 'styles/colors'

export const ContentDatePicker: FC<PropsContent> = (props) => {
  const {
    hideModal,
    onAccept,
    onCancel,
    params: { startDate, endDate, multiple } = {}
  } = props
  const [state, setState] = useState({
    date: null,
    focus: 'startDate',
    startDate,
    endDate
  })

  const isDateBlocked = (date: any) => date.isAfter(moment.default(), 'day')

  const onDatesChange = (params: any) =>
    setState({
      ...state,
      focus: params.focusedInput,
      startDate: params.startDate,
      endDate: params.endDate
    })

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            padding: 10,
            borderTopLeftRadius: RADIUS,
            borderTopRightRadius: RADIUS
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Seleccione el rango de fechas</Text>
          {multiple ? (
            <Text style={{}}>
              Desde: {state.startDate && state.startDate.format('DD-MM-YYYY')} - Hasta:{' '}
              {state.endDate && state.endDate.format('DD-MM-YYYY')}
            </Text>
          ) : (
            <Text style={{}}>
              Fecha: {state.startDate && state.startDate.format('DD-MM-YYYY')}
            </Text>
          )}
        </View>
        <View style={{ height: 300 }}>
          <Dates
            multiple={multiple}
            textColor={'black'}
            backgroundDaySelected={colors.primary}
            backgroundDay={undefined}
            colorDay={'black'}
            colorDayDisabledText={colors.textDisabled}
            backgroundDayBlocked={undefined}
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={state.startDate}
            endDate={state.endDate}
            focusedInput={state.focus === 'startDate' ? 'startDate' : 'endDate'}
            focusedMonth={moment.default('2019-02-12', 'YYYY-MM-DD')}
            range
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 10
          }}
        >
          {onAccept && (
            <Button
              title="Aceptar"
              borderColor={'black'}
              backgroundColor={'white'}
              textColor={'black'}
              onPress={() => {
                hideModal(() => onAccept(state))
              }}
            />
          )}
          {onCancel && (
            <Button
              title="Cancelar"
              borderColor={'black'}
              backgroundColor={'white'}
              textColor={'black'}
              onPress={() => {
                hideModal(onCancel)
              }}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  )
}
const RADIUS = 6

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    borderRadius: RADIUS,
    backgroundColor: 'white'
  }
})

export default ContentDatePicker
