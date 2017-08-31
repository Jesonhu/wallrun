import Vue from 'vue'
import Router from 'vue-router'
import helloHor from 'src/page/hello/hello_hor'
import helloVer from 'src/page/hello/hello_ver'
import signIn from 'src/page/signin/signin'
import formSignIn from 'src/page/signin/formSignin'
import message from 'src/page/message/message'
import lottery from 'src/page/lottery/lottery'
import vote from 'src/page/vote/vote'
import account from 'src/page/account/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'helloHor',
      component: helloHor
    },
    {
      path: '/hellover',
      name: 'helloVer',
      component: helloVer
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/formSignIn',
      name: 'formSignIn',
      component: formSignIn
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
