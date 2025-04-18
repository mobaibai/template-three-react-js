/**
 * @description: 时间转换
 * @param {number|string|Date} time 时间
 * @param {string} format 格式
 * @return {string} 格式化后的时间字符串
 */
export const formatTime = (time, format) => {
  if (typeof time === 'string') time = Number(time)
  if (typeof time !== 'number' || Number.isNaN(time)) return ''
  if (!format) format = 'yyyy-MM-dd HH:mm:ss'

  const date = time ? new Date(time) : new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const ms = date.getMilliseconds().toString().padStart(3, '0')

  const formattedTime = format
    .replace(/yyyy/g, year.toString())
    .replace(/MM/g, month)
    .replace(/dd/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds)
    .replace(/fff/g, ms)

  return formattedTime
}

/**
 * @description: 对象转QueryString
 * @param {object} obj 要转换的对象
 * @return {string} 查询字符串
 */
export const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')
}

/**
 * @description: 文件单位转换
 * @param {number} size 文件大小
 * @param {string} fromUnit 初始单位
 * @param {string} toUnit 目标单位
 * @param {number} decimalPoint 保留小数位
 * @return {string|null} 转换结果，如果参数无效，则返回 null
 */
export const convertFileSize = (size, fromUnit, toUnit, decimalPoint = 2) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const fromIndex = units.indexOf(fromUnit)
  const toIndex = units.indexOf(toUnit)

  if (fromIndex === -1 || toIndex === -1) {
    return null
  }

  if (!Number.isInteger(decimalPoint)) {
    return null
  }

  const exponent = toIndex - fromIndex
  const resultSize = size / Math.pow(1024, exponent)

  return `${parseFloat(resultSize.toFixed(decimalPoint))} ${toUnit}`
}