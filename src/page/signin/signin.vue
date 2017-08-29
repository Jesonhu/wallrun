<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <div class="main-bd">
          <div class="wrap">
            <div class="icon-wrap">
              <i class="iconfont icon-qiandao"></i>
            </div>
            <div class="status">签到成功!</div>
            <div class="point">恭喜签到成功,请体验我们的后续活动</div>
          </div>
        </div>

        <!-- slide-bar -->
        <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>
    </div>
</template>

<script>
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  
  export default {
    name: 'signIn',
    data() {
      return {
        headerTxt: '签到',

        showSideBar: false
      }
    },
    methods: {
      sideBarInit () { // 处理sidebar发来的请求
        this.showSideBar = false
      },
      parentHeader(data) {
        this.showSideBar = data
      }
    },
    components: {
      vHeader: header,
      sideBar
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