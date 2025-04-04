let id = 0
/**
 * @description: 创建Id
 * @return {number}
 */
export const createId = () => {
  id += 1
  return id
}

/**
 * @description: 创建Item
 * @param {Object} attrs
 * @return {Object}
 */
export const createItem = (attrs = {}) => {
  return {
    id: createId().toString(),
    ...attrs,
  }
}

/**
 * @description: 创建List
 * @param {number} num
 * @param {Object} attrs
 * @return {Array}
 */
export const createList = (num, attrs = {}) => {
  if (attrs instanceof Array) return attrs
  else return Array.from({ length: num }).map(() => createItem(attrs))
}

/**
 * @description: 创建回包Obj
 * @param {Object} rest
 * @param {Object} attrs
 * @return {Object}
 */
export const createResponseObj = ({ ...rest }, attrs) => {
  return {
    code: 200,
    data: {
      data: createItem(attrs),
      query: { ...rest },
    },
  }
}

/**
 * @description: 创建回包列表
 * @param {Object} query {total_page: 总页数, per: 每页条数, page: 当前页}
 * @param {Object} attrs 回包
 * @return {Object}
 */
export const createResponseList = ({ page = 1, per = 10, total_page = 0, ...rest }, attrs = {}) => {
  const sendTotalPage = (page - 1) * per
  const left = total_page - sendTotalPage

  return {
    code: 200,
    data: {
      list: left > 0 ? createList(Math.min(left, per), attrs) : [],
      query: { ...rest },
      pages: {
        page,
        per,
        total_page,
      },
    },
  }
}
