import Vue from 'vue'
import Router from 'vue-router'
import hello from 'src/page/hello/hello'
import signIn from 'src/page/signin/signin'
import message from 'src/page/message/message'
import lottery from 'src/page/lottery/lottery'
import vote from 'src/page/vote/vote'
import account from 'src/page/account/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery
    },
    {
      path: '/vote',
      name: 'vote',
      component: vote
    },
    {
      path: '/account',
      name: 'account',
      component: account
    }
  ]
})
