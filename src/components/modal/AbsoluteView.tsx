import React, {
  forwardRef,
  ForwardRefRenderFunction as FC,
  useImperativeHandle,
  useState
} from 'react'

interface Props {}

const AbsoluteView: FC<Props> = (props, ref) => {
  const [content, setContent] = useState<JSX.Element>()

  useImperativeHandle(ref, () => {
    return {
      setAbsoluteView: (view: JSX.Element) => {
        setContent(view)
      }
    }
  })
  return <>{content}</>
}

export default forwardRef(AbsoluteView)
