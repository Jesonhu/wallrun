/**
 * 设置cookie
 */
const STORAGE_USER_KEY = 'STORAGE_USER_KEY'

export default {
  // 获取
  getLocal (key = STORAGE_USER_KEY) {
    console.log('get local opeartion')
    return JSON.parse(window.localStorage.getItem(key))
  },

  // 设置
  setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    console.log('set local opeartion')
    if (isSaveOldData) {
      let oldData = this.getLocal(key)
      const newData = JSON.stringify(oldData.concat(res))
      return window.localStorage.setItem(key, newData)
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
  },

  // 清除用户登录情况
  removeLocal (key = STORAGE_USER_KEY) {
    console.log('remove local opeartion')
    window.localStorage.removeItem(key)
  }
}