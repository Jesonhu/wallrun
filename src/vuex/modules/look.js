import Cookie from '../../plugins/cookie'
import { Toast } from 'mint-ui'

const state = {
  localLooksInfo: Cookie.getLocalLooks() || {}
}
const actions = {
  setLooksInfo ({commit}, res) { // 获取用户信息
    Cookie.setLocalLooks(res)
    commit('SET_LOOKS', res)
    // Toast({
    //   message: '欢迎回来:-D',
    //   position: 'middle',
    //   iconClass: 'icon icon-success',
    //   duration: 1000
    // })
  },
  removeLooksInfo ({ commit }) { // 注销
    Cookie.removeLocalLooks()
    commit('REMOVE_LOOKS')
  }
}
const getters = {
  localLooksInfo: (state) => {
    state.localLooksInfo
  }
}
const mutations = {
  SET_LOOKS (state, res) {
    state.localLooksInfo = res
  },
  REMOVE_LOOKS (state) {
    state.localLooksInfo = {}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}