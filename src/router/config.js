import { lazy } from "react"
import { LayoutPage } from "@/layout"
import { Home, HomeSkeleton } from "@/pages/home"

export const RouteItems = [
  {
    path: '/',
    Element: LayoutPage,
    children: [
      {
        name: '首页',
        path: 'home',
        redirect: 'home',
        roles: ['USER_ROLES.ADMIN, USER_ROLES.TEST'],
        Element: Home,
        Skeleton: HomeSkeleton
      },
      {
        name: '组件',
        path: 'components',
        redirect: 'components',
        roles: ['USER_ROLES.ADMIN'],
        Element: lazy(() => import('@/pages/components')),
        Skeleton: lazy(() => import('@/pages/components/skeleton')),
        children: [
          {
            name: '跟随导航',
            path: 'nav',
            roles: ['USER_ROLES.ADMIN'],
            Element: lazy(() => import('@/pages/components/nav')),
            Skeleton: lazy(() => import('@/pages/components/nav/skeleton'))
          },
          {
            name: '弹窗',
            path: 'modal',
            roles: ['USER_ROLES.ADMIN'],
            Element: lazy(() => import('@/pages/components/modal')),
            Skeleton: lazy(() => import('@/pages/components/modal/skeleton'))
          },
          {
            name: '图标',
            path: 'icons',
            roles: ['USER_ROLES.ADMIN'],
            Element: lazy(() => import('@/pages/components/icons')),
            Skeleton: lazy(() => import('@/pages/components/icons/skeleton'))
          }
        ]
      },
      {
        name: 'Three',
        path: 'three',
        redirect: 'three',
        roles: ['USER_ROLES.ADMIN'],
        Element: lazy(() => import('@/pages/three')),
        Skeleton: lazy(() => import('@/pages/three/skeleton'))
      }
    ]
  },
  {
    path: '*',
    Element: lazy(() => import('@/pages/404'))
  }
]