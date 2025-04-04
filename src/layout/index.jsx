import { Outlet } from "react-router-dom"

export const LayoutPage = (props) => {
  if (props.title) document.title = props.title

  return (
    <div className='layout-container'>
      <Outlet />
    </div>
  )
}