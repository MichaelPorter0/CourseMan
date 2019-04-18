/**
 * Created by jiachenpan on 16/11/18.
 */

// 验证用户名称
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
