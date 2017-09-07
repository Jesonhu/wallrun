import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user' // 处理用户(登录)
import look from './modules/look' // 背景皮肤设置
// import route from './modules/routerDirection'

Vue.use(Vuex)

export default new Vuex.Store({ // 此时才将vuex的state显示在vue中
  modules: {
    user,
    look
    // route
  }
})