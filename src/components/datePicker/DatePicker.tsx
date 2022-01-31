import React, { useState, FC, ReactNode, useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import m, { Moment } from 'moment'
import { extendMoment } from 'moment-range'
import { DatesType, MonthType, WeekType } from './types'
import { ScrollView } from 'react-native-gesture-handler'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import colors from 'styles/colors'
import Icon from 'components/icon'

const moment = extendMoment(m as any)

const dates = (
  startDate: Moment | undefined,
  endDate: Moment | null | undefined,
  focusedInput: 'startDate' | 'endDate'
) => {
  if (focusedInput === 'startDate') {
    if (startDate && endDate) {
      return { startDate, endDate: null, focusedInput: 'endDate' }
    }
    return { startDate, endDate, focusedInput: 'endDate' }
  }

  if (focusedInput === 'endDate') {
    if (endDate && startDate && endDate.isBefore(startDate)) {
      return { startDate: endDate, endDate: null, focusedInput: 'endDate' }
    }
    return { startDate, endDate, focusedInput: 'startDate' }
  }

  return { startDate, endDate, focusedInput }
}

export const Week = (props: WeekType) => {
  const {
    multiple = true,
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    startOfWeek,
    onDatesChange,
    isDateBlocked,
    onDisableClicked,
    backgroundDaySelected = undefined,
    backgroundDay = undefined,
    backgroundDayBlocked = 'rgb(255, 255, 255)',
    colorDayDisabledText = 'gray',
    colorDaySelectedText = 'rgb(252, 252, 252)',
    colorDay = 'rgb(0, 0, 0)'
  } = props

  const days: ReactNode[] = []
  const endOfWeek = startOfWeek.clone().endOf('isoWeek')

  Array.from(moment.range(startOfWeek, endOfWeek).by('days')).forEach((day) => {
    const onPress = () => {
      if (isDateBlocked(day)) {
        onDisableClicked && onDisableClicked(day)
      } else if (!multiple) {
        onDatesChange({ startDate: day, endDate: day })
      } else if (range) {
        let isPeriodBlocked = false
        const start = focusedInput === 'startDate' ? day : startDate
        const end = focusedInput === 'endDate' ? day : endDate
        if (start && end) {
          Array.from(moment.range(start, end).by('days')).forEach((dayPeriod) => {
            if (isDateBlocked(dayPeriod)) isPeriodBlocked = true
          })
        }
        onDatesChange(
          isPeriodBlocked
            ? dates(end, null, 'startDate')
            : dates(start, end, focusedInput)
        )
      } else {
        onDatesChange({ date: day })
      }
    }

    const isDateSelected = () => {
      if (range) {
        if (startDate && endDate) {
          return day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate)
        }
        return (startDate && day.isSame(startDate)) || (endDate && day.isSame(endDate))
      }
      return date && day.isSame(date)
    }

    const isBlocked = isDateBlocked(day)
    const isSelected = isDateSelected()

    const style = [
      styles.day,
      { backgroundColor: backgroundDay },
      isBlocked && { backgroundColor: backgroundDayBlocked },
      isSelected && { backgroundColor: backgroundDaySelected },
      day.isSame(startDate) && {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
      },
      day.isSame(endDate) && {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
      }
    ]

    const styleText = [
      styles.dayText,
      { color: colorDay },
      isBlocked && { ...styles.dayDisabledText, color: colorDayDisabledText },
      isSelected && { color: colorDaySelectedText }
    ]

    days.push(
      <TouchableOpacity
        key={day.date()}
        style={style}
        onPress={onPress}
        disabled={isBlocked && !onDisableClicked}
      >
        <Text style={styleText}>{day.date()}</Text>
      </TouchableOpacity>
    )
  })

  return <View style={styles.week}>{days}</View>
}

export const Month = (props: MonthType) => {
  const { currentDate, focusedMonth, textColor } = props

  const dayNames: ReactNode[] = []
  const weeks: ReactNode[] = []
  const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoWeek')
  const endOfMonth = focusedMonth.clone().endOf('month')
  const weekRange = moment.range(
    currentDate.clone().startOf('isoWeek'),
    currentDate.clone().endOf('isoWeek')
  )

  Array.from(weekRange.by('days')).forEach((day) => {
    dayNames.push(
      <Text
        key={day.date()}
        style={[styles.dayName, { color: textColor, fontWeight: 'bold' }]}
      >
        {day.format('ddd')}
      </Text>
    )
  })

  Array.from(moment.range(startOfMonth, endOfMonth).by('weeks')).forEach(
    (week, index) => {
      weeks.push(<Week {...props} key={index.toString()} startOfWeek={week} />)
    }
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.week, { flex: 1 }]}>{dayNames}</View>
      {weeks}
    </View>
  )
}

const Years = ({ value, onChange }) => {
  const [data] = useState(
    new Array(200).fill(0).map((_, index) => ({ year: index + 1900 }))
  )
  const ref = useRef<FlatList>(null)
  useEffect(() => {
    const scrollIndex = data.findIndex(({ year }) => year === value)
    ref.current?.scrollToIndex({
      animated: false,
      index: Math.floor(scrollIndex / 3)
    })
  }, [])
  return (
    <FlatList
      ref={ref}
      getItemLayout={(data, index) => ({ length: 30, offset: 30 * index, index })}
      numColumns={3}
      data={data}
      style={{ flex: 1 }}
      initialNumToRender={data.length}
      keyExtractor={(item) => item.year}
      // initialScrollIndex={Math.floor(scrollIndex / 3)}
      renderItem={({ item: { year }, index }) => {
        const isSelect = year === value
        return (
          <TouchableOpacity
            onPress={() => onChange(year)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              width: 95,
              backgroundColor: isSelect ? colors.primary : undefined
            }}
          >
            <Typography content={year} color={'white'} disableThemeColor={isSelect} />
          </TouchableOpacity>
        )
      }}
    />
  )
}
const DatePicker: FC<DatesType> = (props) => {
  const [state, setState] = useState({
    currentDate: moment(),
    focusedMonth: moment().startOf('month'),
    selectYear: false
  })

  const previousMonth = () => {
    setState((prev) => ({ ...prev, focusedMonth: prev.focusedMonth.add(-1, 'M') }))
  }

  const nextMonth = () => {
    setState((prev) => ({ ...prev, focusedMonth: prev.focusedMonth.add(1, 'M') }))
  }

  const setYear = (year: number) => {
    setState((prev) => ({
      ...prev,
      focusedMonth: prev.focusedMonth.set('year', year),
      selectYear: false
    }))
  }

  const toggleYear = () => {
    setState((prev) => ({ ...prev, selectYear: !prev.selectYear }))
  }

  const { textColor } = props

  const header = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <TouchableOpacity
        onPress={toggleYear}
        style={{ marginLeft: 5, flexDirection: 'row' }}
      >
        <Typography
          content={`${state.focusedMonth.format('MMMM')} ${state.focusedMonth.format(
            'YYYY'
          )}`}
          size={15}
          fontFamily={fonts.baloo2SemiBold600}
        />
        <Icon
          name={state.selectYear ? 'arrowUp' : 'arrowDown'}
          color={'black'}
          width={20}
          height={20}
        />
      </TouchableOpacity>
      {!state.selectYear && (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={previousMonth}
            style={{ padding: 5, marginRight: 5 }}
          >
            <Text style={{ color: textColor }}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextMonth} style={{ padding: 5, marginLeft: 5 }}>
            <Text style={{ color: textColor }}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  const selectedYear = parseInt(state.focusedMonth.format('YYYY'))
  return (
    <View style={{ width: 300, flex: 1 }}>
      {header}
      {state.selectYear ? (
        <Years value={selectedYear} onChange={setYear} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          <Month
            {...props}
            currentDate={state.currentDate}
            focusedMonth={state.focusedMonth}
          />
        </ScrollView>
      )}
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  heading: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  week: {
    flexDirection: 'row'
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    textAlign: 'center'
  },
  day: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    marginVertical: 1,
    padding: 8
  },

  dayText: {
    color: 'rgb(0, 0, 0)',
    fontWeight: '600'
  },
  dayDisabledText: {
    color: 'gray',
    opacity: 0.5,
    fontWeight: '400'
  }
})
