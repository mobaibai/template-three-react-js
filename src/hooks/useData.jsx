import useSWR from 'swr'
import { useAjax } from '@/lib/ajax'

/**
 * @description: 设置数据
 * @param {string} method 请求方式
 * @param {string} path 请求地址
 * @param {object} params 请求参数
 * @param {object} swrConf SWR 设置
 * @return {object}
 */
export const useData = ({ method = 'get', path, params = {}, swrConf = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
} }) => {
  const { get, post } = useAjax({ showLoading: true, handleError: true })
  const { data, mutate, isLoading, isValidating, error } = useSWR(
    path,
    async (path) => {
      const res = method === 'get'
        ? await get(path, { params })
        : await post(path, params)

      return res.data
    },
    swrConf
  )

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    error
  }
}