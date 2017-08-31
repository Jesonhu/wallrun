<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <div class="main-bd">
          <div class="banner" style="background-image:url(http://img4.imgtn.bdimg.com/it/u=3432487329,2901563519&fm=26&gp=0.jpg)"></div>
          <form @submit.prevent="submit">
          <ul class="main-list">
            <li class="main-item">
              <div class="title">你最喜欢哪个节目</div>
              <div class="cell">
                  <div class="cell-wrapper">
                    <div class="cell-title">
                      <label for="" class="radiolist-label">
                        <span class="radio">
                          <input type="checkbox" name="pn" class="radio-input" value="是">
                          <span class="checkbox-core"></span>
                        </span>
                        <span class="radio-label">跑男</span>
                      </label>
                    </div>
                  </div>
              </div>
              <div class="cell">
                  <div class="cell-wrapper">
                    <div class="cell-title">
                      <label for="" class="radiolist-label">
                        <span class="radio">
                          <input type="checkbox" name="wsgs" class="radio-input" value="是">
                          <span class="checkbox-core"></span>
                        </span>
                        <span class="radio-label">我是歌手</span>
                      </label>
                    </div>
                  </div>
              </div>
              <div class="cell">
                  <div class="cell-wrapper">
                    <div class="cell-title">
                      <label for="" class="radiolist-label">
                        <span class="radio">
                          <input type="checkbox" name="bbqn" class="radio-input" value="是">
                          <span class="checkbox-core"></span>
                        </span>
                        <span class="radio-label">爸爸去哪</span>
                      </label>
                    </div>
                  </div>
              </div>
            </li>
            <li class="main-item">
              <div class="title">昨天是否是七夕</div>
              <div class="cell">
                  <div class="cell-wrapper">
                    <div class="cell-title">
                      <label for="" class="radiolist-label">
                        <span class="radio">
                          <input type="radio" name="qx" class="radio-input" value="是">
                          <span class="radio-core"></span>
                        </span>
                        <span class="radio-label">是</span>
                      </label>
                    </div>
                  </div>
              </div>
              <div class="cell">
                  <div class="cell-wrapper">
                    <div class="cell-title">
                      <label for="" class="radiolist-label">
                        <span class="radio">
                          <input type="radio" name="qx" class="radio-input" value="是">
                          <span class="radio-core"></span>
                        </span>
                        <span class="radio-label">否</span>
                      </label>
                    </div>
                  </div>
              </div>
            </li>
          </ul>
          <div class="submit-wrap">
            <button class="btn submit" 
             @click="submitClickHandle">提交</button>
          </div>
          </form>
        </div>

        <!-- slide-bar -->
        <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>
    </div>
</template>

<script>
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  import { Toast, MessageBox } from 'mint-ui'
  
  export default {
    name: 'vote',
    data() {
      return {
        headerTxt: '投票',

        showSideBar: false
      }
    },
    methods: {
      // form submit
      submit() {
        console.log()
      },
      submitClickHandle() {
        console.log(1)
      },
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
      position: absolute;
      box-sizing: border-box;
      padding-top: 0.96rem;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .banner{
        width:100%;
        height:pxTorem(160px);
        background-repeat:no-repeat;
        background-size:100% 100%;
      }
      .main-list {
        .main-item{
          .title{
            height:pxTorem(45px);
            background-color:darken($themColor, 10%);
            text-indent:20px;
            line-height:pxTorem(45px);
            color:$txtColor;
            font-size:pxTorem(16px);
          }
          .cell{
            position:relative;
            box-sizing:border-box;
            display:flex;
            padding:20px;
            width:100%;
            font-size:16px;
            overflow:hidden;
            .cell-wrapper{
              box-sizing:border-box;
              display:flex;
              align-items:center;
              font-size:16px;
              .cell-title{
                flex:1;
                .radiolist-label{
                  display:block;
                  padding:0 10px;
                  .radio-input{
                    z-index:99;
                    position:absolute;
                    opacity:0;
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                  }  
                  .radio-core{
                    box-sizing: border-box;
                    display: inline-block;
                    background-color: #fff;
                    border-radius: 100%;
                    border: 1px solid #ccc;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                    &:after{
                      content: " ";
                      border-radius: 100%;
                      top: 5px;
                      left: 5px;
                      position: absolute;
                      width: 8px;
                      height: 8px;
                      -webkit-transition: -webkit-transform .2s;
                      transition: -webkit-transform .2s;
                      transition: transform .2s;
                      transition: transform .2s,-webkit-transform .2s;
                      -webkit-transform: scale(0);
                      transform: scale(0);
                    }
                  }
                  .radio-input:checked+.radio-core,
                  .radio-input:checked+.checkbox-core{
                      background-color: $themColor;
                      border-color: $themColor;
                  }
                  .radio-input[type=radio]:checked+.radio-core:after{
                      background-color: #fff;
                      transform: scale(1);
                  }
                  .checkbox-core{
                    display: inline-block;
                    background-color: #fff;
                    border-radius: 100%;
                    border: 1px solid #ccc;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                    &:after{
                      border: 2px solid transparent;
                      border-left: 0;
                      border-top: 0;
                      content: " ";
                      top: 3px;
                      left: 6px;
                      position: absolute;
                      width: 4px;
                      height: 8px;
                      -webkit-transform: rotate(45deg) scale(0);
                      transform: rotate(45deg) scale(0);
                      -webkit-transition: -webkit-transform .2s;
                      transition: -webkit-transform .2s;
                      transition: transform .2s;
                      transition: transform .2s,-webkit-transform .2s;
                    }
                  }
                  .radio-input:checked+.checkbox-core:after{
                    border-color: #fff;
                    -webkit-transform: rotate(45deg) scale(1);
                    transform: rotate(45deg) scale(1);
                  }
                }
              }
            }
          }
        }
      }
      .submit-wrap{
        margin:20px 0;
        width:100%;
        height:pxTorem(45px);
        text-align:center;
        .submit{
          display:inline-block;
          width:80%;
          height:100%;
          text-align:center;
          color:$txtColor;
          border-radius:5px;
          background-color:darken($themColor, 10%);
        }
      }
    }
  }
</style>