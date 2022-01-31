import React, { FC, useState } from 'react'

import SearchList from 'components/searchList'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FilterBar from 'components/searchList/componets/FilterBar'
import ListButtons from 'components/searchList/componets/ListButtons'
import Footer from 'components/searchList/componets/Footer'
import Icon from 'components/icon'
import { Columns } from 'components/searchList/types'

import { CREATE_DEVICE, SHOW_DEVICE } from '../form'

import useTranslation from 'hooks/useTranslation'
import { View, TouchableOpacity } from 'react-native'
import colors from 'styles/colors'
import { usePrinterService } from 'services/bm/devices/printer'
import useSesion from 'hooks/useSesion'
import { PrinterTerminal } from 'services/bm/devices/printer/type'
import { useBindingService } from 'services/bm/devices/printer/bindings'

interface Props extends BaseProps {}

const List: FC<Props> = () => {
  const { t } = useTranslation()
  const { printerListByEnterprise, printerListByTerminal } = usePrinterService()
  const { bindingDelete } = useBindingService()
  const { getSesion } = useSesion()
  const [grid, setGrid] = useState(false)
  const formButtonTitle = t('printerListBtn')
  const [arrPrinters, setArrPrinters] = useState<any[]>([])
  function useColumns(): Columns<PrinterTerminal, 'options'> {
    const { t } = useTranslation()
    const { currentTerminalId } = getSesion()
    let option = {}
    if (currentTerminalId) {
      option = {
        options: {
          headerName: t('printerListActions'),
          cellRenderer: 'options'
        }
      }
    }
    return {
      name: {
        headerName: t('printerListName')
      },
      peripheralCategoryName: {
        headerName: t('printerListType')
      },
      printerConnectionTypeName: {
        headerName: t('printerListPair')
      },
      printerPaperSheetTypeName: {
        headerName: t('printerListPaper')
      },
      ...option
    }
  }

  const onPressFormButtom = () => {
    const { currentTerminalId } = getSesion()
    if (currentTerminalId) {
      navigation.navigate(CREATE_DEVICE)
    }
  }

  const getdevicesList = async () => {
    try {
      const { currentTerminalId } = getSesion()
      if (currentTerminalId) {
        const newPrinterDevices = await printerListByTerminal()
        setArrPrinters(
          newPrinterDevices.data.items.map((x) => {
            return {
              id: x.id,
              name: x.name,
              peripheralCategoryName: x.peripheralCategoryName,
              printerConnectionTypeName: x.printerConnectionTypeName || '--',
              printerPaperSheetTypeName: x.printerPaperSheetTypeName || '--'
            }
          })
        )
      } else {
        const newPrinterDevices = await printerListByEnterprise()
        setArrPrinters(
          newPrinterDevices.data.items.map((x) => {
            return {
              id: x.id,
              name: x.name,
              peripheralCategoryName: x.peripheralCategoryName,
              printerConnectionTypeName: '--',
              printerPaperSheetTypeName: '--'
            }
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDeviceById = async (id: string) => {
    try {
      await bindingDelete(id)
      getdevicesList()
    } catch (error) {
      console.log(error)
    }
  }

  navigation.useFocused(() => {
    getdevicesList()
  })

  const Options = (props: any) => {
    return (
      <View
        style={{
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 8
        }}
      >
        <TouchableOpacity
          style={{
            padding: 4,
            marginRight: 8,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: colors.primary
          }}
        >
          <Icon name="eye" width={16} height={16} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 4,
            marginRight: 8,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: colors.primary
          }}
          onPress={() => navigation.navigate(SHOW_DEVICE, { id: props.data.id })}
        >
          <Icon name="editOutlined" width={16} height={16} color={colors.primary} />
        </TouchableOpacity>
        {props.data.printerConnectionTypeName !== '--' && (
          <TouchableOpacity
            style={{
              padding: 4,
              marginRight: 8,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: colors.primary
            }}
            onPress={() => deleteDeviceById(props.data.id)}
          >
            <Icon name="delete" width={16} height={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <SearchList
      data={arrPrinters}
      grid={grid}
      columns={useColumns()}
      frameworkComponents={{ options: Options }}
      propsFabButton={{ title: formButtonTitle, onPress: onPressFormButtom }}
      renderHeader={() => (
        <HeaderBar
          // {...params}
          navigationText={<NavigationText path={t('printerListPath')} />}
          leftContent={<FilterBar placeholder={t('printerListFilter')} />}
          rigthContent={
            <ListButtons
              text={formButtonTitle}
              onPress={onPressFormButtom}
              isGrid={grid}
              setGrid={setGrid}
            />
          }
          // titleButtonForm="Nuevo producto"
          // onPressButtomForm={() => {
          //   navigation.navigate('create')
          // }}
        />
      )}
      renderFooter={() => <Footer />}
    />
  )
}

export default List
