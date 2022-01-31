import React, { FunctionComponent as FC, useState } from 'react'
import SearchList from 'components/searchList'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FilterBar from 'components/searchList/componets/FilterBar'
import ListButtons from 'components/searchList/componets/ListButtons'
import Footer from 'components/searchList/componets/Footer'
import { CREATE_PRODUCT, SHOW_PRODUCT } from '../form'
import { Columns } from 'components/searchList/types'
import useTranslation from 'hooks/useTranslation'
import useAppContext from 'hooks/useAppContext'
import { ProductFilterModal } from '../productsModals/ProductFilterModal'
import { useProductService } from 'services/im'
import { Product2 } from 'services/types/Product'
import { TouchableOpacity, View } from 'react-native'
import colors from 'styles/colors'
import Icon from 'components/icon'

interface Props extends BaseProps {}

function useColumns(): Columns<Product2, 'options'> {
  const { t } = useTranslation()
  return {
    code: {
      headerName: t('prodListCinter')
    },
    barcode: {
      headerName: t('prodListCBar')
    },
    name: {
      headerName: t('prodListName')
    },
    price: {
      headerName: t('prodListPunit')
    },
    options: {
      headerName: t('prodListOpt'),
      cellRenderer: 'options'
    }
  }
}

const List: FC<Props> = () => {
  const { t } = useTranslation()
  const { listProducts, deleteProducts } = useProductService()
  const { showModal } = useAppContext()
  const [arrProducts, setArrProducts] = useState<Product2[]>([])
  const [grid, setGrid] = useState(false)
  const formButtonTitle = t('prodListBtn')

  const onPressFormButtom = () => {
    navigation.navigate(CREATE_PRODUCT)
  }

  const getListProducts = async () => {
    try {
      const newListProducts = await listProducts()
      setArrProducts(newListProducts.data.items)
      // newListProducts.data.items.map((x) => {
      //   return {
      //     ...x,
      //     sell: x.productTerminals.find((y) => y.terminalId)
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }

  navigation.useFocused(() => {
    getListProducts()
  })

  const deleteProductsById = async (id: string) => {
    try {
      await deleteProducts(id)
      getListProducts()
    } catch (error) {
      console.log(error)
    }
  }

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
          onPress={() => navigation.navigate(SHOW_PRODUCT, { id: props.data.id })}
        >
          <Icon name="editOutlined" width={16} height={16} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 4,
            marginRight: 8,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: colors.primary
          }}
          onPress={() => deleteProductsById(props.data.id)}
        >
          <Icon name="delete" width={16} height={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SearchList
      data={arrProducts}
      grid={grid}
      columns={useColumns()}
      frameworkComponents={{ options: Options }}
      propsFabButton={{ title: formButtonTitle, onPress: onPressFormButtom }}
      renderHeader={() => (
        <HeaderBar
          navigationText={<NavigationText path={t('prodListPath')} />}
          leftContent={
            <FilterBar
              onFilter={() =>
                showModal(ProductFilterModal, {
                  onAccept: () => {},
                  onCancel: () => {}
                })
              }
              placeholder={t('prodListFilter')}
            />
          }
          rigthContent={
            <ListButtons
              text={formButtonTitle}
              onPress={onPressFormButtom}
              isGrid={grid}
              setGrid={setGrid}
            />
          }
        />
      )}
      renderFooter={() => <Footer />}
    />
  )
}

export default List
