/**
 * 设置cookie
 */
const STORAGE_FULLSCREEN_KEY = 'STORAGE_FULLSCREEN_KEY'; // 全屏

const Cookie = {
  // 获取
  getLocal (key = STORAGE_FULLSCREEN_KEY) {
    console.log('get fullScreen opeartion');
    return JSON.parse(window.localStorage.getItem(key));
  },

  // 设置
  setLocal (res, key = STORAGE_FULLSCREEN_KEY, isSaveOldData = false) {
    console.log('set fullScreen opeartion');
    if (isSaveOldData) {
      let oldData = this.getLocal(key);
      const newData = JSON.stringify(oldData.concat(res));
      return window.localStorage.setItem(key, newData);
    }
    return window.localStorage.setItem(key, JSON.stringify(res));
  },
}