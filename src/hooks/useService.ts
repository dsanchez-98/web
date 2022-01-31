/* eslint-disable indent */
import { useEffect, useState } from 'react'

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never

type UseServiceType = {
  <H extends (...args: any) => any, T extends ReturnType<H>, K extends keyof T>(
    hook: H,
    service: K
  ): (
    ...params: Parameters<T[K]>
  ) => [undefined | UnboxPromise<ReturnType<T[K]>>, () => Promise<void>, null | Error]
}

const useService: UseServiceType = (hook, service) => {
  return (...params) => {
    const [response, setResponse] = useState<any>(undefined)
    const funService = hook()[service]
    const [error, setError] = useState<null | Error>(null)

    const callService = async () => {
      try {
        const response = await funService(...params)
        setResponse(response)
      } catch (error: any) {
        setError(error)
      }
    }

    useEffect(() => {
      callService()
    }, [])

    return [response, callService, error]
  }
}

export default useService
