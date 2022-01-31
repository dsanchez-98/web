import { useNavigation } from '@react-navigation/native'
import useAppContext from 'hooks/useAppContext'
import { FunctionComponent as FC, useEffect } from 'react'

interface Props {
  formikRef: any
}

const BackHandler: FC<Props> = (props) => {
  const navigation = useNavigation()
  const { showModal } = useAppContext()
  useEffect(() => {
    navigation.addListener('beforeRemove', async (e) => {
      if (!props.formikRef.current.dirty) {
        e.preventDefault()
        showModal({
          cancelable: false,
          message: 'Los datos que has ingreso se van a perder',
          title: '¿Estás seguro que deseas salir sin completar el registro? ',
          onAccept: () => {
            navigation.dispatch(e.data.action)
          },
          onCancel: () => {}
        })
      }
    })
    return () => {
      navigation.removeListener('beforeRemove', () => {})
    }
  }, [])
  return null
}

export default BackHandler
