import ColorPicker from 'components/colorPicker'
import React, { FunctionComponent as FC, useCallback, useState } from 'react'
import { useSharedValue } from 'components/reanimated'
import VoucherSVG from './components/VoucherSvg'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import Dropdown from 'components/dropdown/Dropdown2'
interface Props {}

const VoucherViewer: FC<Props> = (props) => {
  const pickedColor = useSharedValue<string>('#FF0000')
  const [document, setDocument] = useState('1')
  const { styles } = useResponsiveStyles(rStyles)

  const onColorChanged = useCallback((color: string) => {
    'worklet'
    pickedColor.value = color
  }, [])

  return (
    <View>
      <View style={{ width: 300 }}>
        {/* <Dropdown
          multiple={false}
          items={[{}]}
          maxHeight={300}
          renderItem={() => {
            return (
              <ColorPicker onColorChanged={onColorChanged} pickedColor={pickedColor} />
            )
          }}
        >
          {() => {
            return <View style={{ height: 30, width: 50, backgroundColor: 'green' }} />
          }}
        </Dropdown> */}
      </View>

      <TabDocuments value={document} onChange={setDocument} />
      <View style={{ height: 400 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <VoucherSVG
              animatedColor={pickedColor}
              width={styles.voucher.width}
              height={styles.voucher.height}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const TabDocuments = ({ value, onChange }) => {
  const documents = [
    {
      label: 'Cotización',
      value: '1'
    },
    {
      label: 'Nota de venta',
      value: '2'
    },
    {
      label: 'Cotización',
      value: '3'
    },
    {
      label: 'Boleta',
      value: '4'
    },
    {
      label: 'Factura',
      value: '5'
    },
    {
      label: 'Nota de crédito',
      value: '6'
    },
    {
      label: 'Guía de remisión',
      value: '7'
    },
    {
      label: 'Tarjeta de contacto',
      value: '8'
    }
  ]
  const line = (
    <View style={{ height: 1, width: '100%', backgroundColor: colors.primary }} />
  )
  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}>
      {documents.map((item, index) => {
        const isSelect = item.value === value
        return (
          <TouchableOpacity
            style={{ margin: 3 }}
            key={index.toString()}
            onPress={() => {
              onChange?.(item.value)
            }}
          >
            <View style={{ padding: 5 }}>
              <Typography
                content={item?.label}
                disableThemeColor
                fontFamily={isSelect ? fonts.baloo2Bold700 : fonts.baloo2Regular400}
                color={isSelect ? colors.primary : undefined}
              />
            </View>
            {isSelect && line}
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}
const minWidth = 317
const minHeigth = 322
const rStyles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#AEAEAE',
    justifyContent: 'center',
    flex: 1,
    padding: 20
  },
  voucher: {
    width: `${minWidth} md:${minWidth + 20} lg:${minWidth + 100} xl:${minWidth + 200}`,
    height: `${minHeigth} md:${minHeigth + 20} lg:${minHeigth + 100} xl:${
      minHeigth + 200
    }`
  }
})

export default VoucherViewer
