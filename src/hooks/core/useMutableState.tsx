/* eslint-disable no-useless-constructor */
import { makeid } from 'helpers'
import { useCallback, useEffect, useRef, useState } from 'react'
import useForceUpdate from './useForceUpdate'

export function WithCallback<T>(value: T, callback: () => void): T {
  return (() => ({ value, callback })) as any
}
export class MakeMutableValue<T> {
  private _value: T
  private _listeners: any = {}
  private _setListeners: any = {}
  private _forceUpdate?: () => void
  private callback?: () => void

  constructor(initialValue: T, forceUpdate?: () => void) {
    this._value = initialValue
    this._forceUpdate = forceUpdate
  }

  get value() {
    return this._value
  }

  set value(newValue: T) {
    let val: T
    if (typeof newValue === 'function') {
      const { value, callback } = newValue()
      val = value
      this.callback = callback
    } else {
      val = newValue
    }
    this._value = val
    this.emit()
    this.emitSet()
    this._forceUpdate?.()
  }

  addListener(listener: (value: T) => void) {
    const id = makeid(10)
    this._listeners[id] = listener
    const remove = () => {
      delete this._listeners[id]
    }
    return remove
  }

  hookListener() {
    const [state, updateState] = useState({})
    const forceUpdate = useCallback(() => updateState({}), [])
    useEffect(() => {
      this.callback?.()
      this.callback = undefined
    }, [state])

    return useEffect(() => this.addListener(forceUpdate), [])
  }

  hookSetListener() {
    const [state, updateState] = useState({})
    const forceUpdate = useCallback(() => updateState({}), [])

    useEffect(() => {
      this.callback?.()
      this.callback = undefined
    }, [state])

    return useEffect(() => this.addSetListener(forceUpdate), [])
  }

  hookSelector<R>(
    selector: (state: T) => R,
    equalityFn?: (left: T, right: T) => boolean
  ): R {
    const [state, updateState] = useState(selector(this._value))
    const tempState = useRef<any>(selector(this._value))
    useEffect(
      () =>
        this.addSetListener((data) => {
          const nextValue = selector(data) as any
          if (equalityFn && !equalityFn(nextValue, tempState.current)) {
            updateState(nextValue)
            return
          }
          if (nextValue !== tempState.current) {
            updateState(nextValue)
          }
        }),
      []
    )

    return state
  }

  addSetListener(listener: (value: T) => void) {
    const id = makeid(10)
    this._setListeners[id] = listener
    const remove = () => {
      delete this._setListeners[id]
    }
    return remove
  }

  emit() {
    Object.values<any>(this._listeners).forEach((listener) => listener(this._value))
  }

  emitSet() {
    Object.values<any>(this._setListeners).forEach((listener) => listener(this._value))
  }
}

type UseMutableState = {
  <T>(initialValue: T, forceUpdate?: boolean): MakeMutableValue<T>
}

const useMutableState: UseMutableState = (initialValue, forceUpdate = true) => {
  const update = useForceUpdate()
  const mutable = useRef(
    new MakeMutableValue(initialValue, () => {
      forceUpdate && update()
    })
  )

  return mutable.current
}

export default useMutableState
