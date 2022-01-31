import React, { FC, useEffect, useRef, useState } from 'react'
import * as AgGrid from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import fonts from 'styles/fonts'
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet as NStyleSheet,
  Platform
} from 'react-native'
import Dropdown from 'components/dropdown/Dropdown2'
import Icon from 'components/icon'
import Typography from 'components/typography'
import Checkbox from 'components/checkbox'
import colors from 'styles/colors'
import Animated, { useAnimatedScrollHandler } from 'components/reanimated'
import { shadow } from 'styles/shadow'
import useTheme from 'hooks/useTheme'
import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import { TableListProps } from '../types'
import Theme from 'components/theme'

const AScrollView = Animated.createAnimatedComponent(ScrollView)

const defColumns: {
  [key: string]: AgGrid.AgGridColumnGroupProps | AgGrid.AgGridColumnProps
} = {
  serie: {
    headerName: 'Serie Correlativos',
    initialWidth: 150
  },
  customer: {
    headerName: 'Clientes',
    initialWidth: 200
  },
  typePayment: {
    headerName: 'T. pago',
    initialWidth: 80
  },
  amount: {
    headerName: 'Monto',
    initialWidth: 100
  },
  date: {
    headerName: 'Fecha/ Hora',
    initialWidth: 200
  },
  status: {
    headerName: 'Estado',
    initialWidth: 100
  },
  actions: {
    headerName: 'acciones',
    initialWidth: 100
  }
}

const usePagination = () => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const dataTemp = useRef<any>({})

  const callApi = (pag: number) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        // resolve(getData(pag))
      }, 1000)
    })

  const paginateTo = async (pg: number) => {
    if (!pg) return
    setLoading(true)
    setPage(pg)
    if (dataTemp.current[pg]) {
      setData(dataTemp.current[pg])
    }
    const response = await callApi(pg)
    dataTemp.current[pg] = response
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    paginateTo(1)
  }, [])

  return {
    data,
    paginateTo,
    page,
    loading
  }
}
const Columns = ({ columns, defColumns, setColums, style = {} }) => {
  return (
    <View
      style={[
        style,
        {
          position: 'absolute',
          right: 0,
          top: 0,
          width: 50,
          height: 50
        }
      ]}
    >
      <Dropdown
        widthOnLayout={() => 200}
        multiple
        offset={{ left: -160 }}
        items={Object.entries(defColumns).map(([key, value]) => ({
          label: value.headerName || '',
          value: key
        }))}
        renderItem={({ item, isHover }) => {
          const hide = (columns[item.value] as any)?.hide
          const press = () => {
            const newCol = { ...columns } as any
            if (!newCol[item.value].hide) {
              newCol[item.value].hide = true
              setColums(newCol)
            } else {
              newCol[item.value].hide = false
              setColums(newCol)
            }
          }
          return (
            <TouchableOpacity
              style={{
                backgroundColor: isHover ? colors.grayLight : undefined,
                padding: 5,
                flexDirection: 'row'
              }}
              onPress={press}
            >
              <Checkbox
                value={!hide}
                type="primary"
                onPress={press}
                style={{ marginRight: 5 }}
              />
              <Typography content={item.label} />
            </TouchableOpacity>
          )
        }}
      >
        {() => {
          return (
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon name="config" />
            </View>
          )
        }}
      </Dropdown>
    </View>
  )
}

export const HeaderRootComp = ({ innerRef }) => {
  const { scheme } = useTheme()

  return (
    <Theme.View
      scheme="primary"
      style={{ marginLeft: 16, marginRight: 16, overflow: 'hidden' }}
    >
      <div
        className={scheme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
        style={{ margin: -1 }}
      >
        <div className="ag-root-wrapper ag-layout-auto-height ag-ltr">
          <div className="ag-root-wrapper-body ag-layout-auto-height ag-focus-managed">
            <div ref={innerRef} className="ag-root ag-unselectable ag-layout-auto-height">
              <div />
            </div>
          </div>
        </div>
      </div>
    </Theme.View>
  )
}

const TableList: FC<TableListProps<any>> = (props) => {
  const { headerHeight, scrollHandler, columns = defColumns } = props
  const [col, setColums] = useState(columns)
  const { scheme } = useTheme()
  const refScrollView = useRef<any>(null)
  const agGridRef = useRef<any>(null)

  useEffect(() => {
    setColums(columns)
  }, [columns])

  const onScroll = useAnimatedScrollHandler((e, ctx) => {
    scrollHandler?.()?.onScroll?.(e, ctx)
  })
  const { styles } = useResponsiveStyles(rStyles)

  useEffect(() => {
    // refScrollView.current?.scrollTo({ y: props.scrollClamp.value, animated: false })
    // props.onReady?.({
    //   headerRootComp: agGridRef.current?.api.headerRootComp.eGui
    // })
  }, [])

  return (
    <View
      // ref={(ref: any) => {
      //   refScrollView.current = ref
      //   props.innerRef && (props.innerRef.current = ref)
      // }}
      onLayout={props.onLayout}
      // style={{}}
      // onScroll={onScroll}
      style={[
        {
          marginTop: headerHeight,
          marginHorizontal: 15
          // marginHorizontal: isMobile ? 0 : 15
        },
        shadow,
        nStyles.contentContainer
      ]}
      // scrollEventThrottle={1}
      // showsVerticalScrollIndicator={false}
    >
      <div
        className={scheme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
        style={styles.containerGrid}
      >
        <AgGrid.AgGridReact
          ref={agGridRef}
          animateRows
          rowData={props.data}
          // domLayout="autoHeight"
          frameworkComponents={props.frameworkComponents}
          loadingCellRenderer={'loading'}
          getRowHeight={(e: any) => {
            return e.node.childIndex === props.data.length - 1 ? 100 : 45
          }}
        >
          {Object.entries(col).map(([key, params]) => {
            return (
              <AgGrid.AgGridColumn
                key={key}
                field={key}
                resizable
                lockVisible
                sortable
                filter="agTextColumnFilter"
                {...params}
              />
            )
          })}
        </AgGrid.AgGridReact>
        <Columns columns={col} defColumns={columns} setColums={setColums} />
      </div>
    </View>
  )
}

const rStyles = StyleSheet.create({
  containerGrid: {
    fontFamily: fonts.baloo2Regular400,
    marginRight: -1,
    marginLeft: -1,
    marginTop: -1,
    flexGrow: 1,
    backgroundColor: 'green'
  }
})
const nStyles = NStyleSheet.create({
  contentContainer: {
    // marginHorizontal: 15,
    overflow: 'hidden',
    flexGrow: 1
  }
})
export default TableList
