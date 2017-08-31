<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <div class="main-bd">
          <ul class="msg-list">
            <li class="msg-item">
              <div class="msg-title">
                <span class="bd">
                  <em class="triangleLeft"></em>
                  2017-08-30 12:00:00
                </span>
              </div>
              <div class="msg-bd">
                未获得奖励
              </div>
            </li>
          </ul>
        </div>

        <!-- slide-bar -->
        <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>
    </div>
</template>

<script>
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  
  export default {
    name: 'account',
    data() {
      return {
        headerTxt: '个人中心',

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
    position:relative;
    width:100%;
    height:100vh;
    font-size:18px;
    .main-bd{
      position: absolute;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding-top: 0.96rem;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      
      .msg-list{
        box-sizing:border-box;
        width:100%;
        padding-left:30px;
        .msg-item{
          position:relative;
          box-sizing:border-box;
          padding-top:30px;
          border-left:1px solid #eee;
          &:before{
            z-index:2;
            content:'';
            position:absolute;
            top:33px;
            left:-10px;
            display:block;
            width:16px;
            height:16px;
            border:2px solid darken($themColor, 10%);
            border-radius:50%;
            background-color:#fff;
          }
          &:after{
            z-index:2;
            content:'';
            position:absolute;
            top:38px;
            left:-5px;
            display:block;
            width:10px;
            height:10px;
            border-radius:50%;
            background-color:darken($themColor, 10%);
          }
          .msg-title{
            padding-left:50px;
            position:relative;
            &:before{
              z-index:1;
              content:'';
              position:absolute;
              left:0;
              top:13px;
              display:block;
              width:50px;
              height:1px;
              background-color:#eee;
            }
            .bd{
              position:relative;
              padding:5px 10px;
              color:#fff;
              border-radius:5px;
              font-size:12px;
              background-color:darken($themColor, 10%);
              .triangleLeft{
                z-index:2;
                position:absolute;
                top:6px;
                left:-5px;
                border-width:6px 6px 6px 0;
                border-color:transparent darken($themColor, 10%) transparent transparent;
              }
            }
          }
          .msg-bd{
            box-sizing:border-box;
            padding:25px;
            padding-left:49px;
            font-size:14px;
          }
        }
      }
    }
  }
</style>