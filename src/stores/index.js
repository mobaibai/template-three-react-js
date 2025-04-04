import { APP_NAME } from '@/config'
import { getStorage, removeStorage, setStorage } from '@/storage'
import { create } from 'zustand'

/**
 * @description: 设置Loading
 * @return {Object}
 */
export const useLoadingStore = create(set => ({
  loadingOpen: false,
  setLoadingOpen: (loadingOpen) => {
    set({ loadingOpen })
  }
}))

/**
 * @description: 设置登录弹窗
 * @return {Object}
 */
export const useLoginOpenStore = create(set => ({
  loginOpen: false,
  setLoginOpen: (loginOpen) => {
    set({ loginOpen })
  }
}))

/**
 * @description: 登录数据处理
 * @return {Object}
 */
export const useLoginStore = create(set => {
  const initialValue = {
    uid: '',
    localstore: '',
    nickname: '',
    realname: '',
    avatar: '',
    phone: '',
    token: ''
  }
  return {
    userData: getStorage(`UserData`) || initialValue,
    setUserData: (userData) => {
      set({ userData })
      // 一小时
      const hoursSecond = 3600
      // 一天
      const day1Second = hoursSecond * 24
      // 一周
      const week1Second = day1Second * 7
      // 当前秒
      const currentSecond = Date.now() / 1000
      // 过期时间(秒)
      const expire = currentSecond + day1Second
      setStorage(`UserData`, userData, { expire })
    },
    removeUserData: () => {
      set({ userData: initialValue })
      removeStorage(`UserData`)
    }
  }
})