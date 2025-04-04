import CryptoJS from "crypto-js"
import { APP_NAME } from "@/config"

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("3333e6e143439161")
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("e3bbe7e3ba84431a")

const config = {
  type: "localStorage", // 本地默认存储类型 localStorage
  prefix: APP_NAME, // 名称前缀: 项目名 + 版本
  expire: 0, // 过期时间 单位：秒
  isEncrypt: !__isDev__, // 默认加密 可设置开发环境与生产环境
}

/**
 * @description: 判断是否支持 Storage
 * @return {boolean}
 */
export function isSupportStorage() {
  return typeof Storage !== "undefined"
}

/**
 * @description: 设置 setStorage
 * @param {string} key
 * @param {*} value 值
 * @param {Object} options 配置项
 * @param {number} options.expire 过期时间(秒)
 * @param {string} options.type 存储类型
 */
export function setStorage(key, value, { expire = 0, type = "localStorage" } = {}) {
  if (value === "" || value === null || value === undefined) {
    value = null
  }

  if (isNaN(expire) || expire < 0) throw new Error("Expire must be a number")

  const data = {
    value, // 存储值
    time: Date.now() / 1000, // 存值时间戳
    expire, // 过期时间
  }

  const encryptString = config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data)

  window[type].setItem(autoAddPrefix(key), encryptString)
}

/**
 * @description: 获取 getStorage
 * @param {string} key
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 * @return {*}
 */
export function getStorage(key, { type = "localStorage" } = {}) {
  key = autoAddPrefix(key)
  // key 不存在判断
  if (!window[type].getItem(key) || JSON.stringify(window[type].getItem(key)) === "null") {
    return null
  }

  // 优化 持续使用中续期
  const item = window[type].getItem(key)
  const storage = config.isEncrypt ? JSON.parse(decrypt(item ?? "")) : JSON.parse(item ?? "")

  const nowTime = Date.now() / 1000

  // 过期删除
  if (storage.expire && storage.expire < nowTime) {
    removeStorage(key)
    return null
  } else {
    // 未过期期间被调用 则自动续期 进行保活
    setStorage(autoRemovePrefix(key), storage.value, { expire: storage.expire })
    return storage.value
  }
}

/**
 * @description: 删除 removeStorage
 * @param {string} key
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 */
export function removeStorage(key, { type = "localStorage" } = {}) {
  window[type].removeItem(autoAddPrefix(key))
}

/**
 * @description: 是否存在 hasStorage
 * @param {string} key
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 * @return {boolean}
 */
export function hasStorage(key, { type = "localStorage" } = {}) {
  return !!window[type].getItem(autoAddPrefix(key))
}

/**
 * @description: 获取所有key
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 * @return {string[]}
 */
export function getStorageKeys({ type = "localStorage" } = {}) {
  const items = window[type]
  const array = []
  for (let i = 0; i < items.length; i++) {
    array.push(items.key(i))
  }
  return array
}

/**
 * @description: 根据索引获取key
 * @param {number} index
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 * @return {string}
 */
export function getStorageForIndex(index, { type = "localStorage" } = {}) {
  return window[type].key(index)
}

/**
 * @description: 获取localStorage长度
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 * @return {number}
 */
export function getStorageLength({ type = "localStorage" } = {}) {
  return window[type].length
}

/**
 * @description: 清空Storage
 * @param {Object} options 配置项
 * @param {string} options.type 存储类型
 */
export function clearStorage({ type = "localStorage" } = {}) {
  window[type].clear()
}

/**
 * @description: 名称前自动添加前缀
 * @param {string} key
 * @return {string}
 */
export function autoAddPrefix(key) {
  const prefix = config.prefix ? config.prefix + "_" : ""
  return prefix + key
}

/**
 * @description: 移除已添加的前缀
 * @param {string} key
 * @return {string}
 */
export function autoRemovePrefix(key) {
  const len = config.prefix ? config.prefix.length + 1 : 0
  return key.substring(len)
}

/**
 * @description: 加密方法
 * @param {string} data
 * @return {string}
 */
export const encrypt = (data) => {
  if (typeof data === "object") {
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.log("encrypt error:", error)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * @description: 解密方法
 * @param {string} data
 * @return {string}
 */
export const decrypt = (data) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
