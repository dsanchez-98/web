import React, { useRef, createContext, FC } from 'react'
import 'localization'
import Modal, { ModalRef } from 'components/modal'
import { View } from 'react-native'
import useEventListener from 'hooks/useEventListener'
import AbsoluteView from 'components/modal/AbsoluteView'
import Spinner, { SpinnerRef } from 'components/spinner'
interface ContextType {
  setAbsoluteView: (View: any) => void
  showModal: ModalRef['showModal']
  addEventListener: (name: string, listener: (value: any) => void) => () => void
  setLoading: SpinnerRef['setLoading']
}

const initialValues: ContextType = {
  setAbsoluteView: () => {},
  showModal: () => {},
  addEventListener: () => () => {},
  setLoading: () => {}
}

export const Context = createContext<ContextType>(initialValues)

export const AppContext: FC<{}> = (props) => {
  const refModal = useRef<any>(null)
  const refAbsView = useRef<any>(null)
  const refSpinner = useRef<SpinnerRef>(null)

  const { addEventListener, emit } = useEventListener()

  const showModal = (...args: any) => {
    refModal.current?.showModal(...args)
  }

  const setAbsoluteView = (view: any) => {
    refAbsView.current?.setAbsoluteView(view)
  }

  const setLoading: SpinnerRef['setLoading'] = (...args) => {
    refSpinner.current?.setLoading(...args)
  }

  return (
    <Context.Provider
      value={{
        showModal,
        addEventListener,
        setAbsoluteView,
        setLoading
      }}
    >
      <View
        style={{ flex: 1, minHeight: 300 }}
        onStartShouldSetResponder={(e) => {
          emit('backdrop', e)
          return true
        }}
      >
        {props.children}
      </View>
      <Modal ref={refModal} />
      <AbsoluteView ref={refAbsView} />
      <Spinner ref={refSpinner} />
    </Context.Provider>
  )
}

export default AppContext
