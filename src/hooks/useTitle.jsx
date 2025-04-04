import * as React from 'react'

/**
 * @description: 设置页面 Title
 * @param {string} [title] - 可选的页面标题
 * @return {void}
 */
export function useTitle(title) {
  React.useEffect(() => {
    if (title === undefined || title === null) return
    document.title = title
  }, [])
}
