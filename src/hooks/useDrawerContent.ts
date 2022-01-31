import { useContext } from 'react'
import { NavigationHelpersContext } from '@react-navigation/native'

const useDrawerContent = ({ name }: { name: string }) => {
  //   useRoute()
  const navigation = useContext(NavigationHelpersContext)

  const state = navigation?.getState()
  const nameSelected = state?.routeNames[state.index]
  const isParentSelect = nameSelected === name
  return {
    navigate: navigation?.navigate,
    isParentSelect,
    nameSelected
  }
}
export default useDrawerContent
