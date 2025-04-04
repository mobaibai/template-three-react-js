const dev = window.location.host
const prod = 'xxx.com'
const protocol = window.location.protocol
/**
 * @description: 开发
 * @return {type}
 */
const development = {
  API_BASE_URL: `${protocol}//${dev}`
}
/**
 * @description: 生产
 * @return {type}
 */
const production = {
  API_BASE_URL: `${protocol}//${prod}`
}
/**
 * @description: 请求地址前缀
 * @return {type}
 */
export const BaseApi = __isDev__ ? development : production

/**
 * @description: 项目名
 * @return {type}
 */
export const APP_NAME = 'APP_NAME'

/**
 * @description: 主题色
 */
export const ThemePrimary = '#13c2c2'