// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/'
import './plugins/rem' // rem.js
import FastClick from 'fastclick'
import 'font-awesome/css/font-awesome.min.css'
import Vuelidate from 'vuelidate' // 表单验证

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import host from './config/host'
import localMock from './mock/mockRes'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  })
}

Vue.use(MintUI)
Vue.use(Vuelidate)

Vue.prototype.host = host
Vue.prototype.mockHost = localMock
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
