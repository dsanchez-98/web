import React, { FunctionComponent as FC, useState } from 'react'
import SearchList from 'components/searchList'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FilterBar from 'components/searchList/componets/FilterBar'
import ListButtons from 'components/searchList/componets/ListButtons'
import { CREATE_VOUCHER } from '../form'
import { Columns } from 'components/searchList/types'
import { Voucher } from 'services/types'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'

interface Props extends BaseProps {}

const getData = (pag: number) =>
  new Array(3).fill({}).map((i, index) => ({
    ...i,
    key: index,
    numDoc: 'B001-00000048',
    client: 'MDN PERÚ S.A.C. RUC 20600001702',
    amount: 'S/20000,00',
    date: '11/08/21 - 08:00 hrs',
    state: 'Activo',
    sunat: 'Aceptado',
    docVinc: 'C001-00000048 '
  }))

function useColumns(): Columns<Voucher, 'options'> {
  const { t } = useTranslation()
  return {
    numDoc: {
      headerName: t('vouListNdoc')
    },
    client: {
      headerName: t('vouListClient')
    },
    amount: {
      headerName: t('vouListAmount')
    },
    date: {
      headerName: t('vouListDate')
    },
    state: {
      headerName: t('vouListState')
    },
    sunat: {
      headerName: t('vouListSunat')
    },
    docVinc: {
      headerName: t('vouListDocVinc')
    },
    options: {
      headerName: t('vouListAcc'),
      cellRenderer: 'options'
    }
  }
}

const Options = (props: any) => {
  return <Typography content={'Test'} />
}

const List: FC<Props> = () => {
  const { t } = useTranslation()
  const [data] = useState<any[]>(getData(1))
  const [grid, setGrid] = useState(false)
  const formButtonTitle = t('vouListBtn')

  const onPressFormButtom = () => {
    navigation.navigate(CREATE_VOUCHER)
  }
  return (
    <>
      <SearchList
        data={data}
        grid={grid}
        columns={useColumns()}
        frameworkComponents={{ options: Options }}
        propsFabButton={{ title: formButtonTitle, onPress: onPressFormButtom }}
        renderHeader={() => (
          <HeaderBar
            navigationText={<NavigationText path={t('vouListPath')} />}
            leftContent={<FilterBar placeholder={t('vouListFilter')} />}
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
      />
    </>
  )
}

export default List
