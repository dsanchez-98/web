/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { FC, useMemo, useCallback } from 'react'
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  StyleSheet as NStyleSheet,
  Platform
} from 'react-native'
import Typography from 'components/typography'
import colors from 'styles/colors'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import SwipeableItem from 'components/swipeableItem'
import useForceUpdate from 'hooks/core/useForceUpdate'
import Icon from 'components/icon'
import { useContextForm } from '../ContextForm'
import InputDiscount from './InputDiscount'
import { roundDecimals } from '../helpers'
import { Product as ProductModel } from '../types'
import Theme from 'components/theme'
import { shadow } from 'styles/shadow'

interface Product extends ProductModel {
  affectationType: string
  unit: string
  percentage: string
  isPercentage: boolean
}

type Columns = {
  [P in keyof Product | 'delete']?: PropsColum
}

type ComponentProps<T = any> = {
  item: Product
  value: T
  style: StyleProp<ViewStyle | TextStyle>
  updateValue: (value: T) => void
  updateAttribute: <K extends keyof Product>(key: K) => (value: Product[K]) => void
}

type PropsColum = {
  headerName: string
  headerStyle?: StyleProp<ViewStyle | TextStyle>
  style?: StyleProp<ViewStyle | TextStyle>
  component?: keyof typeof components
  hide?: boolean
}

const defColumns: Columns = {
  name: {
    headerName: 'Productos',
    headerStyle: { flex: 1, paddingVertical: 10, textAlign: 'center' },
    style: { flex: 1, paddingVertical: 10, textAlign: 'left' },
    component: 'productName'
  },
  affectationType: {
    headerName: 'Afectación',
    style: { paddingVertical: 10, width: 70, textAlign: 'center' }
  },
  unit: {
    headerName: 'U.M.',
    style: { paddingVertical: 10, width: 70, textAlign: 'center' }
  },
  priceList: {
    headerName: 'P.LISTA',
    style: { paddingVertical: 10, width: 70, textAlign: 'center' }
  },
  discount: {
    headerName: 'DSCTO',
    style: {
      paddingVertical: 10,
      width: 90,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center'
    },
    component: 'inputDiscount'
  },
  price: {
    headerName: 'P.UNIT.',
    style: { paddingVertical: 10, width: 70, textAlign: 'center' },
    component: 'input'
  },
  quantity: {
    headerName: 'CANT.',
    style: { paddingVertical: 10, width: 70, textAlign: 'center' },
    component: 'input'
  },
  total: {
    headerName: 'IMPORTE',
    style: { paddingVertical: 10, width: 70, textAlign: 'center' },
    component: 'input'
  },
  delete: {
    headerName: '',
    style: {
      paddingVertical: 10,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    component: 'delete'
  }
}

const isValidNumber = (text: string, decimals = 2) => {
  const regex = {
    2: /^\d+(?:\.|.\d{1,2})?$/,
    3: /^\d+(?:\.|.\d{1,3})?$/,
    4: /^\d+(?:\.|.\d{1,4})?$/
  }[decimals]
  if (!regex?.test(text) && text !== '') {
    return false
  }
  return true
}

const components = {
  productName: (props: ComponentProps) => (
    <Typography
      content={`${props.item.name} (${props.item.barcode})`}
      {...props}
      // color={colorText}
    />
  ),
  delete: ({ style, updateValue }: ComponentProps) => (
    <TouchableOpacity
      style={[style, { alignItems: 'center', justifyContent: 'center' }]}
      onPress={() => updateValue(null)}
    >
      <Icon name="delete" color={colors.borderGray} />
    </TouchableOpacity>
  ),
  inputDiscount: (props: ComponentProps) => (
    <InputDiscount
      style={props.style}
      onChange={
        props.item.isPercentage ? props.updateAttribute('percentage') : props.updateValue
      }
      value={props.item.isPercentage ? props.item.percentage : props.value}
      percentage={!!props.item.isPercentage}
      onChangePercentage={() =>
        props.updateAttribute('isPercentage')(!props.item.isPercentage)
      }
    />
  ),
  input: ({ style, value, updateValue, item }: ComponentProps) => (
    <View style={style}>
      <Theme.TextInput
        placeholder="0.00"
        value={`${value || ''}`}
        onChangeText={updateValue}
        keyboardType="number-pad"
        selectTextOnFocus
        // placeholderTextColor={item.discount ? colors.white : colors.gray}
        style={{
          borderWidth: 1,
          margin: 2,
          textAlign: 'center',
          borderRadius: 4,
          borderColor: colors.borderGray,
          height: 25
          // color: item.discount ? colors.white : colors.black
        }}
      />
    </View>
  )
}

const Header = ({ columns }: { columns: Columns }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: colors.borderGray,
        height: 50
      }}
    >
      {Object.entries(columns).map(
        ([key, params]) =>
          !params.hide && (
            <Typography
              key={key}
              content={params.headerName}
              style={params?.headerStyle || params.style}
              numberOfLines={1}
            />
          )
      )}
    </View>
  )
}
interface Props {
  index: number
  item: any
  onDelete: () => void
  heightItem: number
}
const ItemProduct: FC<Props> = ({ index, item, onDelete, heightItem }) => {
  const { styles } = useResponsiveStyles(rStyles)
  const forceUpdate = useForceUpdate()
  const { addedProducts } = useContextForm()
  const decimals = 3

  const columns = useMemo(() => {
    Object.entries<PropsColum>(defColumns).forEach(([key, i]) => {
      if (
        ['affectationType', 'priceList', 'delete', 'discount'].includes(key) &&
        styles.item.display === 'none'
      ) {
        i.hide = true
      } else {
        i.hide = false
      }
    })
    return defColumns
  }, [styles.item.display])

  const updateAttribute = (key: keyof Columns) => (value: any) => {
    console.log('key', key, value)
    if (key === 'delete') {
      onDelete?.()
      return
    }
    if (key === 'isPercentage') {
      item[key] = value
      forceUpdate()
      return
    }
    if (!isValidNumber(value, decimals)) {
      return
    }
    if (key === 'percentage') {
      const percentage = parseFloat(value) || 0
      const price = parseFloat(item.price) || 0
      const quantity = parseFloat(item.quantity) || 1
      const discount = roundDecimals((price * percentage) / 100, decimals)
      if (percentage > 100) return
      if (discount > price) return
      item.discount = discount
      item.total = roundDecimals((price - discount) * quantity, decimals)
    }
    if (key === 'price') {
      item.percentage = 0
      item.discount = 0
      const quantity = parseFloat(item.quantity) || 1
      const discount = parseFloat(item.discount) || 0
      const price = parseFloat(value) || 0
      item.total = roundDecimals((price - discount) * quantity, decimals)
    }
    if (key === 'quantity') {
      const quantity = parseFloat(value) || 1
      const discount = parseFloat(item.discount) || 0
      const price = parseFloat(item.price) || 0
      item.total = roundDecimals((price - discount) * quantity, decimals)
    }
    if (key === 'discount') {
      const quantity = parseFloat(item.quantity) || 1
      const discount = parseFloat(value) || 0
      const price = parseFloat(item.price) || 0
      if (discount > price) return
      item.percentage = roundDecimals((discount * 100) / price, decimals)
      item.total = roundDecimals((price - discount) * quantity, decimals)
    }
    if (key === 'total') {
      // TODO:logica para el cambio del total
      return
    }
    item[key] = value
    forceUpdate()
    addedProducts.emit()
  }

  // const colorBg = item.discount ? colors.green : undefined
  // const colorText = item.discount ? colors.white : 'black'
  const isMobile = styles.item.display === 'none'
  return (
    <React.Fragment>
      {!index && <Header columns={columns} />}
      <SwipeableItem
        style={{ marginVertical: 2 }}
        leftContent={
          isMobile ? (
            <>
              {components.inputDiscount({
                item,
                style: [columns.discount!.style, { backgroundColor: colors.green }],
                value: item.discount,
                updateValue: updateAttribute('discount'),
                updateAttribute
              })}
            </>
          ) : undefined
        }
        rightContent={
          isMobile ? (
            <>
              {components.delete({
                item,
                style: [columns.delete!.style, { backgroundColor: colors.red }],
                value: item.delete,
                updateValue: updateAttribute('delete'),
                updateAttribute
              })}
            </>
          ) : undefined
        }
        enabled={isMobile}
      >
        <Theme.View
          scheme={isMobile ? 'primary' : 'card'}
          style={[nStyles.container, { height: heightItem }]}
        >
          {isMobile && line('left')}
          {Object.entries(columns).map(
            ([key, params]) =>
              !params.hide && (
                <React.Fragment key={key}>
                  {params.component ? (
                    components[params.component]({
                      item,
                      value: item[key],
                      updateValue: updateAttribute(key as keyof Columns),
                      style: params.style,
                      updateAttribute
                    })
                  ) : (
                    <Typography
                      content={item[key] || ''}
                      {...params}
                      // color={colorText}
                    />
                  )}
                </React.Fragment>
              )
          )}
          {isMobile && line('rigth')}
        </Theme.View>
      </SwipeableItem>
    </React.Fragment>
  )
}
const line = (type: 'left' | 'rigth') => {
  const style = {
    rigth: nStyles.lineRigth,
    left: nStyles.lineLeft
  }[type]

  return <View style={[nStyles.line, style]} />
}

const rStyles = StyleSheet.create({
  item: {
    display: 'none lg:flex'
  }
})
const nStyles = NStyleSheet.create({
  lineLeft: {
    backgroundColor: colors.green,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 10
  },
  lineRigth: {
    backgroundColor: colors.red,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginLeft: 10
  },
  line: { height: '100%', width: 5 },
  container: {
    flexDirection: 'row',
    flex: 1,
    ...Platform.select({
      native: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1
      },
      web: {
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)'
      }
    }),
    overflow: 'hidden'
  }
})
export default ItemProduct
