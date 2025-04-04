import { lazy, useState } from "react"
import ReactDOM from "react-dom"

const Popup = lazy(() => import('@/components/Popup'))

export const usePopup = (options) => {
  const { isOpen = false, title, maskClosable, width, className, style, children } = options
  const [open, setOpen] = useState(isOpen)
  const popup = ReactDOM.createPortal(
    <Popup 
      isOpen={open} 
      title={title} 
      maskClosable={maskClosable} 
      width={width} 
      className={className} 
      style={style} 
      onCancel={() => setOpen(false)}
    >
      {children}
    </Popup>,
    document.getElementById('root')
  )
  return {
    popup,
    show() {
      setOpen(true)
    },
    hide() {
      setOpen(false)
    },
    toggle() {
      setOpen(!open)
    },
  }
}
