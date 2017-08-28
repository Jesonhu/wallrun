import Vue from 'vue'
import Router from 'vue-router'
import signIn from 'src/page/signin/signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: signIn
    }
  ]
})
