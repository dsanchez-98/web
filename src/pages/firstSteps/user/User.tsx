import UserForm from 'pages/account/personalInformation/form'
import React, { FunctionComponent as FC, useRef } from 'react'
import Navigator from '../@components/Navigator'

interface Props {}

const User: FC<Props> = () => {
  const ref = useRef<any>()

  return (
    <Navigator
      optionIndex={0}
      options={[{ text: 'Usuario' }]}
      onPressNext={async () => {
        await ref.current.handleSubmit()
        return true
      }}
    >
      <UserForm ref={ref} id={null} />
    </Navigator>
  )
}

export default User
