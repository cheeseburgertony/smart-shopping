// 约定一个通用键名
const INFO_KEY = 'smart_shopping_info'
const HISTORY_KEY = 'shopping_search_history'

// 获取本地个人信息
export const getInfo = () => {
  const res = localStorage.getItem(INFO_KEY)
  return res ? JSON.parse(res) : { token: '', userId: '' }
}

// 设置本地个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 删除本地个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getSearchHistory = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}

// 设置搜索历史
export const setSearchHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
