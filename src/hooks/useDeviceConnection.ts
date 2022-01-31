import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const url = 'http://localhost:8433'

type UseDeviceConnectionType = {
  autoConnect?: boolean
}

type ParamsPrint = {
  input?: { [key: string]: any }
  template?: string
  printer: { port: number; host: string }
  buffer?: any
}
const useDeviceConnection = (params: UseDeviceConnectionType = {}) => {
  const { autoConnect = true } = params
  const socket = useRef(io(url, { autoConnect })).current
  const resolvePrint = useRef((value: any) => {})
  const rejectPrint = useRef((reason?: any) => {})
  const close = () => {
    return socket.close()
  }

  const print = (params: ParamsPrint) => {
    return new Promise((resolve, reject) => {
      resolvePrint.current = resolve
      rejectPrint.current = reject
      socket.emit('print', params)
    })
  }

  useEffect(() => {
    socket.on('serverConnection', (state) => {
      console.log('connected', state)
    })
    socket.on('error', (e) => {
      console.log('error', e)
    })

    socket.on('error_print', (e) => {
      console.log('error', e)
      rejectPrint.current(e)
    })
    socket.on('success_print', (e) => {
      resolvePrint.current(e)
    })

    return () => {
      close()
    }
  }, [])

  return { close, socket, print }
}

export default useDeviceConnection
