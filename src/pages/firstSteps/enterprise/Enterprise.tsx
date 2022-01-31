import EnterpriseSetupForm from 'pages/enterprises/companySetup/form'
import React, { FunctionComponent as FC, useState, useRef } from 'react'
import Navigator from '../@components/Navigator'
import { useEnterpriseService } from 'services/bm'
import { NavigationPanelProps } from 'components/navigationPanel'
import useService from 'hooks/useService'

interface Props {}

const Enterprise: FC<Props> = () => {
  const ref = useRef<any>()
  const [enterprises] = useService(useEnterpriseService, 'enterprisesList')()
  const [index, setIndex] = useState(0)
  const options: NavigationPanelProps['options'] =
    enterprises?.data.items.map((item) => ({
      text: item.name || 'Empresa',
      params: item
    })) || []

  return (
    <Navigator
      optionIndex={index}
      options={options}
      onPressOption={setIndex}
      onPressNext={async () => {
        await ref.current?.handleSubmit()
        return true
      }}
    >
      {options.map((item, i) => {
        if (i !== index) {
          return null
        }
        return <EnterpriseSetupForm ref={ref} key={i.toString()} {...item.params} />
      })}
    </Navigator>
  )
}

export default Enterprise
