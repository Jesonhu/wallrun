<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <div class="main-bd">
          <div class="wrap" v-show="!showLoading">
            <div class="icon-wrap">
              <i class="iconfont icon-qiandao"></i>
            </div>
            <div class="status">{{msg}}</div>
            <div class="point">{{welcome}}</div>
          </div>
        </div>

        <!-- slide-bar -->
        <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>

        <!-- loading -->
        <loading :show="showLoading"></loading>
    </div>
</template>

<script>
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  import loading from 'components/loading/loading'
  import { MessageBox } from 'mint-ui'
  import axios from 'axios'
  
  let _this = null
  export default {
    name: 'signIn',
    data() {
      return {
        headerTxt: '签到',

        showSideBar: false,
        showLoading: true,

        msg: '',
        welcome: ''
      }
    },
    mounted() {
      _this = this
      // setTimeout(function() {
      //   _this.showLoading = false
      // }, 1000)
      // 二维码方式还是表单签到
      // let action = async function () {
      //   try {
      //     let type = axios.post(this.host.signType)
      //     console.log(type)
      //   } catch(err) {

      //   }
      // }
      // console.log(action)
      axios.post(this.host.signType)
      .then((res) => {
        let actionType = 0
        if (res.data.code === 1) {
          actionType = res.data.type
          if (actionType === 0) { // 已经扫码过了
            axios.post(this.host.signIn).then((secRes) => {
              this.msg= secRes.data.msg
              this.welcome = secRes.data.welcome || '恭喜您，请体验我们的后续活动！'
              _this.showLoading = false
              // setTimeout(function() {
              //   _this.handleMessageBox('签到成功', '即将自动跳转到下一环节')
              // }, 1000)
              // setTimeout(function() {
              //    _this.$router.push({path: '/message'})
              // }, 2000)
            }).catch((secErr) => {
              console.log('has code but check signInStatus error')
            })
          } else if (actionType === 1) { // 去表单提交签到
            // console.log('跳到表单签到页面')
            this.$router.push({path: '/formSignIn'})
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    methods: {
      sideBarInit () { // 处理sidebar发来的请求
        this.showSideBar = false
      },
      parentHeader(data) {
        this.showSideBar = data
      },
      handleMessageBox (title, msg) {
        MessageBox({
          title: title,
          message: msg,
          showCancelButton: false
        })
      }
    },
    components: {
      vHeader: header,
      sideBar,
      loading
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin';

  .signin{
    font-size:18px;
    position:relative;
    width:100%;
    height:100vh;

    .main-bd{
      position:absolute;
      display:flex;
      align-items:center;
      box-sizing:border-box;
      padding-top:pxTorem(48px);
      top:0;
      left:0;
      width:100%;
      height:100%;
      .wrap{
        margin-top:pxTorem(-100px);
        width:100%;
        .icon-wrap{
          display:flex;
          align-items:center;
          justify-content:center;
          width:pxTorem(100px);
          height:pxTorem(100px);
          margin:0 auto;
          color:#fff;
          border-radius:50%;
          background-color:$themColor;
          .iconfont{
            color:$txtColor;
            font-size:pxTorem(46px);
          }
        }
        .status{
          margin:pxTorem(30px) 0;
          text-align:center;
          color:$themColor;
        }
        .point{
          text-align:center;
          font-size:pxTorem(14px);
        }
      }
    }
  }
</style>