import StoreForm from 'pages/enterprises/store/form'
import React, { FunctionComponent as FC, useState, useRef } from 'react'
import { useTerminalService } from 'services/bm'
import Navigator from '../@components/Navigator'
import useService from 'hooks/useService'
import { NavigationPanelProps } from 'components/navigationPanel'

interface Props {}

const Store: FC<Props> = () => {
  const ref = useRef<any>()
  const [terminals] = useService(useTerminalService, 'terminalsList')()
  const [index, setIndex] = useState(0)
  const options: NavigationPanelProps['options'] =
    terminals?.data.items.map((item) => ({
      text: item.name || 'Tienda',
      params: item
    })) || []

  return (
    <Navigator
      optionIndex={index}
      options={options}
      onPressOption={setIndex}
      onPressNext={async () => {
        await ref.current.handleSubmit()
        return true
      }}
    >
      {options.map((item, i) => {
        if (i !== index) {
          return null
        }
        return <StoreForm ref={ref} key={i.toString()} {...item.params} firstUpdate />
      })}
    </Navigator>
  )
}

export default Store
