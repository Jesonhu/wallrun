import Cookie from '../../plugins/cookie'
import { Toast } from 'mint-ui'

const state = {
  localUserInfo: Cookie.getLocal() || {}
}
const actions = {
  setUserInfo ({commit}, res) { // 获取用户信息
    Cookie.setLocal(res)
    commit('SET_USER', res)
    // Toast({
    //   message: '欢迎回来:-D',
    //   position: 'middle',
    //   iconClass: 'icon icon-success',
    //   duration: 1000
    // })
  },
  removeUserInfo ({ commit }) { // 注销
    Cookie.removeLocal()
    commit('REMOVE_USER')
  }
}
const getters = {
  localUserInfo: (state) => {
    state.localUserInfo
  }
}
const mutations = {
  SET_USER (state, res) {
    state.localUserInfo = res
  },
  REMOVE_USER (state) {
    state.localUserInfo = {}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}