import React, { FunctionComponent as FC, useState } from 'react'
import SearchList from 'components/searchList'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FilterBar from 'components/searchList/componets/FilterBar'
import ListButtons from 'components/searchList/componets/ListButtons'
import Footer from 'components/searchList/componets/Footer'
import { Columns } from 'components/searchList/types'
import CreateIncome from '../form'
import { Cash } from 'services/types'
import useTranslation from 'hooks/useTranslation'
import { View } from 'react-native'
import useAppContext from 'hooks/useAppContext'

interface Props {}

function useColumns(): Columns<Cash, 'options' | 'openingEmployeeName'> {
  const { t } = useTranslation()
  return {
    openingEmployeeName: {
      headerName: t('userNames'),
      valueGetter: ({ data }) => data.openingEmployee?.user.profile.name
    },
    description: {
      headerName: t('description')
    },
    amount: {
      headerName: t('vouListAmount')
    },
    createdAt: {
      headerName: t('vouListDate')
    },
    closedAt: {
      headerName: t('closing'),
      valueGetter: ({ data }) => (data.closedAt ? t('yes') : t('no'))
    }
  }
}

const ModalForm = (props: any) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 24, width: 420, borderRadius: 20 }}>
      <CreateIncome {...props} />
    </View>
  )
}

const List: FC<Props> = () => {
  const { t } = useTranslation()
  const [data, setData] = useState<Cash[]>([])
  const [grid, setGrid] = useState(false)
  const formButtonTitle = t('cashFlowNewIncome')
  const { showModal } = useAppContext()

  navigation.useFocused(() => {
    // getListCLients()
  })

  const onPressFormButtom = () => {
    showModal(ModalForm, {
      cancelable: false,
      title: t('cashFlowIncoListModalTitle'),
      message: t('cashFlowIncoListModalBody'),
      acceptText: t('cashFlowIncoListBtn')
    })
  }

  return (
    <SearchList
      data={data}
      grid={grid}
      columns={useColumns()}
      // frameworkComponents={{ options: Options }}
      propsFabButton={{ title: formButtonTitle, onPress: onPressFormButtom }}
      renderHeader={() => (
        <HeaderBar
          navigationText={<NavigationText path={t('cashFlowIncomesListPath')} />}
          leftContent={
            <FilterBar onFilter={() => {}} placeholder={t('clientListFilter')} />
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
