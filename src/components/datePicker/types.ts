import { Moment } from 'moment'

export type DatesType = {
  multiple: boolean
  range: boolean
  date?: Moment
  startDate?: Moment
  endDate?: Moment
  focusedInput: 'startDate' | 'endDate'
  onDatesChange: (date: {
    date?: Moment
    startDate?: Moment
    endDate?: Moment | null
  }) => void
  isDateBlocked: (date: Moment) => boolean
  onDisableClicked: (date: Moment) => void
  backgroundDaySelected?: string
  backgroundDay?: string
  backgroundDayBlocked?: string
  colorDayDisabledText?: string
  colorDaySelectedText?: string
  colorDay?: string
  textColor?: string
  title?: string
}

export interface MonthType extends DatesType {
  currentDate: Moment
  focusedMonth: Moment
}

export interface WeekType extends MonthType {
  startOfWeek: Moment
}
