import { IconNames } from 'components/icon'
import { ReactNode } from 'react'

type Module = {
  type?: 'group' | 'item' | 'form'
  name?: string
  path?: string
  options?: {
    title: string
    icon?: IconNames
    unmountOnBlur?: boolean
  }
  component?: ReactNode
  children?: ReactNode
}

const createRoute = () => {}

const Route = (props: Module) => {
  return null
}

export default Route
