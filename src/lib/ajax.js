import axios from 'axios'
import { useLoadingStore } from '@/stores'
import { BaseApi } from '@/config'

// 静态配置项直接用 defaults 配置
axios.defaults.baseURL = BaseApi.API_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 3000

// 动态配置项用拦截器来配置
axios.interceptors.request.use(config => {
  config.headers = config.headers || {}
  return config
})

export const useAjax = (options = {}) => {
  const table = {
    401: () => {
      '登录验证'
    },
    402: () => {
      window.alert('请付费后观看')
    },
    403: () => {
      window.alert('没有权限')
    },
    unknown: () => {
      window.alert('未知错误')
    }
  }
  const showLoading = options?.showLoading || false
  const handleError = options?.handleError ?? true
  const { setLoadingOpen } = useLoadingStore()
  const onError = (error) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = table[status] || table.unknown
        fn?.()
      }
    }
    throw error
  }
  const ajax = {
    get: (path, config) => {
      if (showLoading) {
        setLoadingOpen(true)
      }
      return axios
        .get(path, config)
        .catch(onError)
        .finally(() => {
          if (showLoading) {
            setLoadingOpen(false)
          }
        })
    },
    post: (path, data) => {
      if (showLoading) {
        setLoadingOpen(true)
      }
      return axios
        .post(path, data)
        .catch(onError)
        .finally(() => {
          if (showLoading) {
            setLoadingOpen(false)
          }
        })
    },
    patch: () => {},
    delete: () => {}
  }
  return ajax
}