import { useTitle } from "@/hooks/useTitle"

const Modal = (props) => {
  if (props.title) useTitle(props.title)

  return (
    <div className='modal-container p-10 flex justify-center'>
      弹窗
    </div>
  )
}
export default Modal