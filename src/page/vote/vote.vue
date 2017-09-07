<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <div class="main-bd" v-show="!showLoading">
          <div class="banner" style="background-image:url(http://img4.imgtn.bdimg.com/it/u=3432487329,2901563519&fm=26&gp=0.jpg)"></div>
          
          <div class="no-vote" v-show="!showVote">暂无投票~</div>
          <div class="vote-con" v-show="showVote">
          
            <!-- 已投票 -->
            <v-progress :hasList="hasList"></v-progress>

            <!-- 未投票 -->
            <form @submit.prevent="submit" ref="form" v-if="unList.length > 0">
            <ul class="main-list">
              <!-- 多选 -->
              <li class="main-item"
               v-if="unList.length > 0 && item.type == 2"
               v-for="(item,index) in unList">
                <div class="title">{{item.title}}</div>
                <div class="cell"
                 v-for="(select, key, index) in item.option">
                    <div class="cell-wrapper">
                      <div class="cell-title">
                        <label for="" class="radiolist-label">
                          <span class="radio">
                            <input type="checkbox" :value="key" class="radio-input" v-model="checkedNames0">
                            <span class="checkbox-core"></span>
                          </span>
                          <span class="radio-label">{{select}}</span>
                        </label>
                      </div>
                    </div>
                </div>
                <span v-if="false">checkedNames0:{{checkedNames0}}</span>
              </li>
              <!-- 单选 -->
              <li class="main-item"
                v-if="unList.length > 0 && item.type == 1"
                v-for="item in unList">
                <div class="title">{{item.title}}</div>
                <div class="cell"
                 v-for="(radio, key, index) in item.option">
                    <div class="cell-wrapper">
                      <div class="cell-title">
                        <label for="" class="radiolist-label">
                          <span class="radio">
                            <input type="radio" class="radio-input" :value="key" v-model="picked1">
                            <span class="radio-core"></span>
                          </span>
                          <span class="radio-label">{{radio}}</span>
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
        </div>

        <!-- slide-bar -->
        <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>

        <!-- loading -->
        <loading :show="showLoading"></loading>
    </div>
</template>

<script>
  import qs from 'qs'
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  import vProgress from 'components/progress/progress'
  import loading from 'components/loading/loading'
  import { Toast, MessageBox } from 'mint-ui'
  import axios from 'axios'
  
  export default {
    name: 'vote',
    data() {
      return {
        headerTxt: '投票',

        showLoading: true,
        showSideBar: false,

        hasList: [], // 已经投过票
        unList: [], // 未投票,
        showVote: false,
        // 复选
        checkedNames0: [],
        checked0Id: 0,
        checkedNames1: [],
        checked1Id: 0,
        checkedNames2: [],
        checked2Id: 0,
        checkedNames3: [],
        checked3Id: 0,
        checkedNames4: [],
        checked4Id: 0,
        checkedNames5: [],
        // 单选
        picked1: [],
        picked2: []
      }
    },
    mounted() {
      axios.post(this.host.getVote)
      .then((res) => {
        this.showLoading = false
        if (!(res.data.code === 0)) {
          let code = res.data.code
          let voteData = res.data.vote
          let voteOption = res.data.option
          this.showVote = true

          if (code === 2) { // 返回已经投过票
          /*
            [
              {
                voteid: 2,
                option: [选项]
              }
            ]
           */
            this.hasList.push({id: voteData.id, title: voteData.title, option: voteOption})
          } else if(code === 1) { // 返回未投过票
          /*
            [
              {
                voteid: 2,
                title: ‘投票测试’,
                type: 2,
                option: {}
              }
            ]
           */
            this.unList.push({id: voteData.id, title: voteData.title, type: voteData.type, option: voteOption})
          }
        } else { // code:0
          this.showVote = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    methods: {
      // form submit
      submit() { // 表单默认提交
        let option, paramsResult
        if (this.unList[0].type == 2) {
          option = this.checkedNames0.toString()
          paramsResult = {
            voteid: this.unList[0].id,
            option: option
          }
        } else {
          option = this.picked1.toString()
          paramsResult = {
            voteid: this.unList[0].id,
            option: option
          }
        }
        paramsResult = qs.stringify(paramsResult)
        // console.log(paramsResult)
        axios.post(this.host.resultVote, paramsResult)
        .then((res) => {
          // console.log(res.data)
          if (res.data.code == 1) {
            console.log('投票成功');
            // this.$router.push({path: '/vote'})
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err)
        })
      },
      submitClickHandle() {
        // 按钮点击出发
      },
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
      vProgress,
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
      .no-vote{
        margin-top:50px;
        width:100%;
        text-align:center;
        color:$themColor;
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