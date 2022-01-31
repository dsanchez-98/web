import React, { FunctionComponent as FC, useState } from 'react'

import SearchList from 'components/searchList'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FilterBar from 'components/searchList/componets/FilterBar'
import ListButtons from 'components/searchList/componets/ListButtons'
import Footer from 'components/searchList/componets/Footer'
import { Columns } from 'components/searchList/types'

import {
  CREATE_CUSTOMER,
  CREATE_PROVIDER,
  SHOW_CUSTOMER,
  SHOW_PROVIDER
} from 'pages/customers/form'
import { FilterModal } from 'pages/customers/customersModals/CustomerFilterModal'

import { Client, Provider } from 'services/types'
import { useClientService } from 'services/sales'

import useTranslation from 'hooks/useTranslation'
import useAppContext from 'hooks/useAppContext'
import { CUSTOMER_LIST, PROVIDER_LIST } from '.'
import { useRoute } from '@react-navigation/native'
import { useProviderService } from 'services/im'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'components/icon'
import colors from 'styles/colors'
import { identityDocumentType } from 'constants/core'

interface Props extends BaseProps {}

function useColumnsClient(): Columns<Client, 'options'> {
  const { t } = useTranslation()
  return {
    code: {
      headerName: t('clientListCode')
    },
    contributorId: {
      headerName: t('clientListDoc')
    },
    name: {
      headerName: t('clientListName')
    },
    lastname: {
      headerName: t('clientListLast')
    },
    phone: {
      headerName: t('clientListPhone')
    },
    options: {
      headerName: t('clientListOpt'),
      cellRenderer: 'options'
    }
  }
}

function useColumnsProvider(): Columns<Provider, 'options'> {
  const { t } = useTranslation()
  return {
    code: {
      headerName: t('providerListCode')
    },
    senderId: {
      headerName: t('providerListDoc')
    },
    name: {
      headerName: t('providerListName')
    },
    lastname: {
      headerName: t('providerListLast')
    },
    phone: {
      headerName: t('providerListPhone')
    },
    options: {
      headerName: t('providerListOpt'),
      cellRenderer: 'options'
    }
  }
}

const List: FC<Props> = () => {
  const { t } = useTranslation()
  const { name } = useRoute()
  const flagClientRoute = name === CUSTOMER_LIST
  const { showModal } = useAppContext()
  const { listClients, deleteClient } = useClientService()
  const { listProviders, deleteProvider } = useProviderService()
  const [arrClients, setArrClients] = useState<Client[] | Provider[]>([])
  const [grid, setGrid] = useState(false)
  const formButtonTitle = flagClientRoute ? t('clientListBtn') : t('providerListBtn')

  const getListCLients = async () => {
    try {
      if (flagClientRoute) {
        const newListClients = await listClients()
        console.log(newListClients)
        setArrClients(
          newListClients.data.items.map((x) => {
            if (x.contributor.identityDocumentTypeId === identityDocumentType.ruc) {
              x.name = x.businessReason
              x.lastname = x.businessName
            }
            return x
          })
        )
      } else if (name === PROVIDER_LIST) {
        const newListClients = await listProviders()
        setArrClients(
          newListClients.data.items.map((x) => {
            if (x.sender.identityDocumentTypeId === identityDocumentType.ruc) {
              x.name = x.businessReason
              x.lastname = x.businessName
            }
            return x
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCustomerById = async (id: string) => {
    try {
      if (flagClientRoute) {
        await deleteClient(id)
      } else {
        await deleteProvider(id)
      }
      getListCLients()
    } catch (error) {
      console.log(error)
    }
  }

  navigation.useFocused(() => {
    getListCLients()
  })

  const Options = (props: any) => {
    return (
      <View
        style={{
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '8px'
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
          onPress={() =>
            flagClientRoute
              ? navigation.navigate(SHOW_CUSTOMER, { id: props.data.id })
              : navigation.navigate(SHOW_PROVIDER, { id: props.data.id })
          }
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
          onPress={() => deleteCustomerById(props.data.id)}
        >
          <Icon name="delete" width={16} height={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    )
  }

  const onPressFormButtom = () => {
    if (flagClientRoute) {
      navigation.navigate(CREATE_CUSTOMER)
    } else if (name === PROVIDER_LIST) {
      navigation.navigate(CREATE_PROVIDER)
    }
  }

  return (
    <SearchList
      data={arrClients}
      grid={grid}
      columns={flagClientRoute ? useColumnsClient() : useColumnsProvider()}
      frameworkComponents={{ options: Options }}
      propsFabButton={{ title: formButtonTitle, onPress: onPressFormButtom }}
      renderHeader={() => (
        <HeaderBar
          navigationText={
            <NavigationText
              path={flagClientRoute ? t('clientListPath') : t('providerListPath')}
            />
          }
          leftContent={
            <FilterBar
              onFilter={() =>
                showModal(FilterModal, {
                  onAccept: () => {},
                  onCancel: () => {}
                })
              }
              placeholder={
                flagClientRoute ? t('clientListFilter') : t('providerListFilter')
              }
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
