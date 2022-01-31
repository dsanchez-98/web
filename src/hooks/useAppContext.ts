import { useContext } from 'react'
import { Context } from 'context/AppContext'

const useAppContext = () => {
  const context = useContext(Context)
  return context
}
export default useAppContext
