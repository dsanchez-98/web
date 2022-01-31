import React, {
  ForwardRefRenderFunction as FFC,
  FC,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react'
import {
  StyleSheet as NStyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import { useContextForm } from '../ContextForm'
import colors from 'styles/colors'
import Modal from './BaseModal'
import Icon from 'components/icon'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Theme from 'components/theme'
import FormCustomer from 'pages/customers/form'
import { useNavigation } from '@react-navigation/native'
import useForceUpdate from 'hooks/core/useForceUpdate'
import { FlatList } from 'components/largeList'
import { RefreshControl } from 'components/refreshControl'
import useTranslation from 'hooks/useTranslation'

interface ProductsModalProps {}
interface ProductListProps {
  text: string
  reset: (callback?: () => void) => void
  clearText: () => void
}

const ITEM_HEIGHT = 60
const getData = () =>
  new Array(500).fill(0).map((_, index) => ({
    name: `Producto ${index + 1}`,
    id: index + 1,
    barcode: `${index * 929292929292}`,
    affectationType: 'IGV',
    unit: 'UND',
    priceList: (index + 1) * 3,
    discount: 0,
    price: (index + 1) * 3,
    quantity: 1,
    total: (index + 1) * 3
  }))

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const ListHeaderComponent = () => {
  const { t } = useTranslation()
  return (
    <Theme.View scheme="background">
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#EDECEF',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          overflow: 'hidden',
          padding: 5,
          marginTop: 10,
          paddingHorizontal: 20,
          marginHorizontal: 15
        }}
      >
        <Typography
          content={t('vouFormNameCode')}
          style={{ flex: 1 }}
          disableThemeColor
        />
        <Typography content={t('vouFormPrice')} disableThemeColor />
      </View>
    </Theme.View>
  )
}

const Form = ({ text, showForm }) => {
  const { t } = useTranslation()
  const [create, setCreate] = useState(false)
  const navigation = useNavigation()
  if (!create) {
    return (
      <>
        <Typography
          content={`${t('vouFormNotFound')} ${text}`}
          style={{ textAlign: 'center' }}
        />
        <Typography
          content={t('vouFormCreate')}
          style={{ textAlign: 'center' }}
          onPress={() => {
            showForm()
            setCreate(!create)
          }}
        />
      </>
    )
  }

  return <FormCustomer />
}

const ListEmptyComponent = ({ text, showForm }) => (
  <View
    style={{
      padding: 10
    }}
  >
    {!!text.length && <Form text={text} showForm={showForm} />}
  </View>
)

const ProductList: FC<ProductListProps> = ({ text, reset, clearText, showForm }) => {
  const { products } = useContextForm()
  products.hookSetListener()

  const [refreshing, setRefreshing] = useState(false)
  const reloadLines = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      products.value = getData()
      setRefreshing(false)
    })
  }, [])

  useEffect(() => {
    reloadLines()
  }, [])

  const dataFilter = products.value.filter((item) => {
    const textUpper = text.toUpperCase()
    const nameUpper = item.name.toUpperCase()
    return nameUpper.indexOf(textUpper) !== -1
  })

  const renderItem = useCallback(({ item }) => {
    return <Item item={item} />
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ListHeaderComponent />
      <FlatList
        style={{}}
        data={dataFilter}
        keyboardShouldPersistTaps="handled"
        // showsVerticalScrollIndicator={false}
        refreshControl={
          Platform.OS === 'web' ? (
            <RefreshControl refreshing={refreshing} onRefresh={reloadLines} />
          ) : undefined
        }
        heightForItem={() => {
          'worklet'
          return ITEM_HEIGHT
        }}
        contentStyle={{
          marginHorizontal: 15,
          borderColor: colors.borderGray,
          marginBottom: 50,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderBottomWidth: 1,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10
        }}
        numColumns={1}
        renderItem={renderItem}
        renderEmpty={() => (
          <View>
            <ListEmptyComponent text={text} showForm={showForm} />
          </View>
        )}
      />
      <Footer reset={reset} clearText={clearText} />
    </View>
  )
}

const ProductsModal: FFC<ProductsModalProps> = (props) => {
  const { modalProducts } = useContextForm()

  return (
    <Modal ref={modalProducts}>
      {(params) => {
        return <ProductList {...params} />
      }}
    </Modal>
  )
}

const Footer = ({ reset, clearText }) => {
  const { t } = useTranslation()
  const { selectedProducts, addedProducts } = useContextForm()
  selectedProducts.hookSetListener()
  const length = selectedProducts.value.length
  if (!length) {
    return null
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        alignSelf: 'flex-end',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        right: 0
      }}
    >
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => {
          reset(() => {
            addedProducts.add(...selectedProducts.value)
            selectedProducts.removeAll()
            clearText()
          })
        }}
      >
        <Typography
          content={`${t('vouFormAdd')} (${length})`}
          disableThemeColor
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  )
}

const checkbox = ({ disabled, select }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Checkbox value={disabled ? true : select} />
  </View>
)

const Item = ({ item = {} }: { item: any }) => {
  const { selectedProducts, addedProducts } = useContextForm()
  addedProducts.hookSetListener()
  const added = !!addedProducts.productsById[item.id]
  const selected = !!selectedProducts.productsById[item.id]
  const forceUpdate = useForceUpdate()

  return (
    <Pressable
      onPress={() => {
        if (added) {
          alert('Producto ya agregado')
          return
        }
        if (!selected) {
          selectedProducts.add(item)
        } else {
          selectedProducts.remove(item)
        }
        forceUpdate()
      }}
      style={[
        {
          // borderLeftWidth: 1,
          // borderRightWidth: 1,
          // borderColor: colors.borderGray,
          padding: 10,
          flexDirection: 'row',
          backgroundColor: added ? colors.grayBorder : undefined,
          height: ITEM_HEIGHT
        }
      ]}
    >
      {checkbox({ select: selected, disabled: added })}
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Typography
          content={item.name}
          color={'black'}
          fontFamily={fonts.baloo2Medium500}
        />
        <Typography content={item.barcode} color={'black'} size={fontSize.sm} />
      </View>
    </Pressable>
  )
}

const Checkbox = ({ value }) => {
  return (
    <View
      style={[
        styles.checkbox,
        {
          backgroundColor: value ? colors.primaryYellow : undefined,
          borderColor: value ? colors.primaryYellow : colors.grayBorder
        }
      ]}
    >
      {value && <Icon name={'check'} color={'#FFFFFF'} height={16} width={16} />}
    </View>
  )
}

const styles = NStyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  checkbox: {
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    height: 16,
    justifyContent: 'center',
    width: 16
  },
  buttonAdd: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  containerList: {
    marginHorizontal: 15,
    borderColor: colors.borderGray,
    marginBottom: 50,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
})
export default ProductsModal
