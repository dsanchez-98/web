import React, {
  ForwardRefRenderFunction as FFC,
  FC,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react'
import { StyleSheet as NStyleSheet, Pressable, View, Platform } from 'react-native'
import { useContextForm } from '../ContextForm'
import Modal from './BaseModal'
import Theme from 'components/theme'
import Typography from 'components/typography'
import colors from 'styles/colors'
import { FlatList } from 'components/largeList'
import { RefreshControl } from 'components/refreshControl'
import useTranslation from 'hooks/useTranslation'

interface CustomerModalProps {}

interface CustomerListProps {
  text: string
  clearText: () => void
  reset: (callback?: () => void) => void
}

interface ItemCustomerProps {
  item: any
  select: boolean
  onPress: () => void
}

const getData = () =>
  new Array(30).fill(0).map((_, index) => ({
    name: `Cliente ${index + 1}`,
    id: index + 1,
    document: '20601446686',
    address: 'Calle loma'
  }))

const ITEM_HEIGHT = 60

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
        <Typography content={t('vouFormNameDoc')} style={{ flex: 1 }} disableThemeColor />
      </View>
    </Theme.View>
  )
}
const CustomerList: FC<CustomerListProps> = ({ text, clearText, reset }) => {
  const refList = useRef<any>(null)
  const { customer } = useContextForm()
  customer.hookSetListener()
  const [data] = useState(getData())
  const [refreshing, setRefreshing] = useState(false)

  const reloadLines = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  useEffect(() => {
    reloadLines()
  }, [])

  const renderItem = useCallback(({ item = {} }) => {
    const select = customer.value?.id === item.id
    return (
      <ItemCustomer
        item={item}
        select={select}
        onPress={() => {
          if (!select) {
            reset(() => {
              customer.value = item
              refList.current?.scrollTo({ x: 0, y: 0 })
              clearText()
            })
          } else {
            customer.value = undefined
          }
        }}
      />
    )
  }, [])

  return (
    <>
      <ListHeaderComponent />
      <FlatList
        ref={refList}
        data={data.filter((item) => {
          const textUpper = text.toUpperCase()
          const nameUpper = item.name.toUpperCase()
          return nameUpper.indexOf(textUpper) !== -1
        })}
        keyboardShouldPersistTaps="handled"
        // showsVerticalScrollIndicator={false}
        refreshControl={
          Platform.OS === 'web' ? (
            <RefreshControl refreshing={refreshing} onRefresh={reloadLines} />
          ) : undefined
        }
        onRefresh={() => {}}
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
        renderItem={renderItem}
      />
    </>
  )
}

const CustomersModal: FFC<CustomerModalProps> = (props) => {
  const { modalCustomers } = useContextForm()
  return (
    <Modal ref={modalCustomers}>
      {(params) => {
        return <CustomerList {...params} />
      }}
    </Modal>
  )
}

const ItemCustomer: FC<ItemCustomerProps> = ({ item, select, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: select ? 'gray' : undefined,
        height: ITEM_HEIGHT
      }}
    >
      <Typography content={item.name} />
      <Typography content={item.document} />
    </Pressable>
  )
}

export default CustomersModal
