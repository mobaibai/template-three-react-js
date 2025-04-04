import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

/**
 * @typedef {Object} MenuItem
 * @property {React.ReactNode} label - 菜单项的标签
 * @property {string} key - 菜单项的唯一标识
 */

/** @type {MenuItem[]} */
const menuItems = [
  {
    label: <NavLink to={'/home'}>{'首页'}</NavLink>,
    key: '/home'
  },
  {
    label: <NavLink to={'/components'}>{'组件'}</NavLink>,
    key: '/components'
  },
  {
    label: <NavLink to={'/three'}>{'Three'}</NavLink>,
    key: '/three'
  }
]

export const Header = () => {
  const location = useLocation()
  const [menuCurrent, setMenuCurrent] = useState(location.pathname)

  useEffect(() => {
    menuItems.forEach((item) => {
      if (location.pathname.includes(item.key)) {
        setMenuCurrent(item.key)
      }
    })
  }, [location.pathname])

  return (
    <div className="header-container">
      <div className="menu">
        <Menu selectedKeys={[menuCurrent]} mode="horizontal" items={menuItems} />
      </div>
    </div>
  )
}
