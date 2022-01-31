/* eslint-disable no-unused-vars */
import * as AgGrid from 'ag-grid-react'
import { ScrollViewProps } from 'react-native'

type Column<T> = {
  [P in keyof T]?: AgGrid.AgGridColumnGroupProps | AgGrid.AgGridColumnProps
}

export type Columns<T, O extends keyof any = any> = any extends O
  ? Column<T>
  : { [P in O]?: AgGrid.AgGridColumnGroupProps | AgGrid.AgGridColumnProps } & Column<T>

export interface TableListProps<T> extends ScrollViewProps {
  renderToolbar?: () => JSX.Element
  renderHeader?: () => JSX.Element
  data: T[]
  headerHeight?: number
  scrollHandler?: any
  scrollClamp?: any
  innerRef?: any
  onLayout?: (event: any) => void
  columns?: Columns<T>
  frameworkComponents?: {
    [key: string]: (props: { item: T; index: number }) => JSX.Element
  }
  onReady?: (params: any) => void
}
