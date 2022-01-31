import useAppContext from './useAppContext'

type Action = {
  <T>(params: { item: T }): void
}

const useActionButton = () => {
  const { showModal } = useAppContext()
  const getPdf: Action = () => {
    // TODO: llamar al servicio para obtener PDF
    showModal({ message: 'PDF' })
  }

  const sendCustomer: Action = () => {
    // TODO: llamar al servicio para enviar comprbante por correo
    showModal({ message: 'Cliente' })
  }

  const sendWhatsApp: Action = () => {
    // TODO: llamar al servicio para obtener el pdf y enviar por whatsApp
    showModal({ message: 'WhatsApp' })
  }

  const getCE: Action = () => {
    // TODO: llamar al servicio para obtener Comprobante de referencia
    showModal({ message: 'CE' })
  }

  const resendSunat: Action = () => {
    // TODO: llamar al servicio para reenviar comprobante
    showModal({ message: 'SUNAT' })
  }

  const cancelDocument: Action = () => {
    // TODO: llamar al servicio para anular el documento
    showModal({ message: 'Anular' })
  }

  return { getPdf, sendCustomer, sendWhatsApp, getCE, resendSunat, cancelDocument }
}
export default useActionButton
