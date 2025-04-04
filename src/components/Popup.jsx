import { Modal } from 'antd'

const Popup = ({ title = "提示", isOpen, maskClosable = true, width, className, style, onCancel, children }) => {
  return (
    <div className='popup-component'>
      <Modal title={title} open={isOpen} maskClosable={maskClosable} width={width} wrapClassName={className} style={style} getContainer={false} footer={null} onCancel={onCancel} >
        {children}
      </Modal>
    </div>
  )
}
export default Popup