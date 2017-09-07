<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <!-- 消息内容显示 -->
        <div class="main-bd">
          <ul class="msg-list">
           <!-- <li class="msg-item">
              <div class="msg-wrap">
                <div class="msg-avatar" 
                 style="background-image:url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2182925329,386985427&fm=117&gp=0.jpg')"></div>
                <div class="msg-con">
                  <div class="msg-user">Jeson</div>
                  <div class="msg-info">
                    <div class="arrow triangleLeft"></div>
                    我是实施试试女所付所付所我是实施试试女所付所付所我是实施试试女所付所付所我是实施试试女所付所付所
                  </div>
                </div>
              </div>
            </li> -->
            <li class="msg-item" 
              v-if="list.length > 0"
              v-for="(item,key) in list">
              <div class="msg-wrap me">
                <div class="msg-con">
                  <div class="msg-user">{{item.nickname}}</div>
                  <div class="msg-info">
                    <div class="arrow triangleRight"></div>
                    {{item.content}}
                  </div>
                </div>
                <div class="msg-avatar">
                  <img :src="item.image" alt="">
                </div>
                
              </div>
            </li>
          </ul>
        </div>

        <div class="form-wrap">
          <form>  
            <div class="from-group">
              <input type="text" class="msg-input" v-model="msgInput">
              <div class="action">
                <div class="add" v-show="!isSubmit"><i class="iconfont icon-addition"></i></div>
                <div class="submit" v-show="isSubmit" @click="sendConHandle">发送</div>
              </div>
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
  import axios from 'axios'
  import { mapState } from 'vuex'
  // import io from 'src/lib/socket.js'
  
  let ws;
  let _this;
  export default {
    name: 'message',
    data() {
      return {
        headerTxt: '消息上墙',
        showSideBar: false,
        msgInput: '',
        list: [],

        userInfo: {},
        userNameList: [],
        onlineUserList: [],
        connnectState: false
      }
    },
    created() {
      this.userInfo = {};
      this.messageList = []; // type = 1 提示消息 type = 2 其他人聊天消息 type = 3 自己的聊天消息
    },
    mounted() {
      // this.connectEvent();
      _this = this;
      this.connect();
    },
    methods: {
      // 初始连接
      connect() {
          // 创建websocket
          ws = new WebSocket("ws://192.168.0.58:2346");

          ws.onopen = _this.onopen;

          ws.onmessage = _this.onmessage;

          ws.onsend = _this.onsend;

          // console.log(ws);
          ws.onclose = function() {
              console.log("连接关闭，定时重连");
              _this.connect();
          };
          ws.onerror = function() {
              console.log("出现错误");
          };
      },

      onopen () {
          axios.get('http://lmlin.tunnel.echomod.cn/scene/public/index.php/index/index/index',function(data){

              var login = {
                  'type' : 'login',
                  'openid' : data.openid
              };

              login = JSON.stringify(login);

              ws.send(login);

          });
      },

      // 消息处理 获取到聊天信息
      onmessage(e) {
          var data = eval("("+e.data+")");
          console.log(data);
          this.list.push({
            nickname: data.nickname,
            headimgurl: data.headimgurl,
            content: data.content,
            fromMe: data.openid == this.openId
          });

          switch(data['type']){ // 判断 data['type']
              case 'login':
                  break;
              case 'msg':
                  break;
              case 'send':
                  break;    
          }
      },

      // 发送消息
      onsend(msg) {
          msg = JSON.stringify(msg);
          // ws.send(msg);
          console.log(ws);
      },

      sideBarInit () { // 处理sidebar发来的请求
        this.showSideBar = false
      },
      parentHeader(data) {
        this.showSideBar = data
      },
      sendConHandle() {
        // console.log(this.msgInput); 发消息到数据库
        axios.post(this.host.wallsedCon, {
          content: this.msgInput
        })
        .then((res) => {
          // console.log(res.data)
          if (res.data.code === 1) {
            this.list.push({'nickname': res.data.nickname, 'content': this.msgInput, 'image': res.data.image})
            // console.log(this.list)
          }
        })
        .catch((err) => {
          console.log(err)
        });

        // 发消息上墙
        var msg = {
                'type' : 'msg',
                'openid' : this.openId,
                'nickname' : 'jeson__hu', // 来自初始请求
                'headimgurl' : '', // 来自初始请求
                'content' : this.msgInput
            };
        this.onsend(msg);
      },
      tounicode(data) {
        if(data == '') return '请输入汉字';
        var str =''; 
        for(var i=0;i<data.length;i++)
        {
            str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
        }
        return str;
      }
    },
    computed: {
      isSubmit() {
        if (this.msgInput !== '' && this.msgInput.length > 0) {
          return true
        } else {
          return false
        }
      },
      ...mapState({
        openId: state => state.user.localUserInfo.openId
      })
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
      box-sizing:border-box;
      padding-top:pxTorem(48px);
      padding-bottom:pxTorem(53px);
      top:0;
      left:0;
      width:100%;
      height:100%;
      .msg-list{
        width:100%;
        .msg-item:last-child{
          margin-bottom:100px;
        }
      }
      .msg-wrap{
        display:flex;
        padding:10px;
        width:100%;

        .msg-avatar{
          position:relative;
          width:pxTorem(36px);
          height:pxTorem(36px);
          border-radius:100%;
          background-repeat:no-repeat;
          background-size:100% 100%;
          img{
            width:pxTorem(36px);
            height:pxTorem(36px);
            border-radius:100%;
          }
        }
        .msg-con{
          flex:1;
          box-sizing:border-box;
          margin-left:10px;
          margin-right:40px;
          .msg-info{
            position:relative;
            border:1px solid $themColor;
            border-radius:5px;
            padding:10px;
            font-size:12px;
            color:$txtColor;
            background-color:$themColor;
            .arrow{
              position:absolute;
              top:7px;
              left:-10px;
            }
          }
        }

        &.me{
          .msg-con{
            margin:0;
            margin-left:40px;
            margin-right:10px;
            .msg-user{
              text-align:right;
            }
            .msg-info{
              .arrow{
                left:100%;
              }
            }
          }
        }
      }
    }

    .form-wrap{
        position:fixed;
        left:0;
        bottom:0;
        width:100%;
        height:pxTorem(53px);
        display:flex;
        align-items:center;
        flex-wrap:nowrap;
        border-top:1px solid #ddd;
        background-color:#fff;

        form{
          width:100%;
          height:100%;
        }
        .from-group{
          width:100%;
          height:100%;
          display:flex;
          flex-wrap:nowrap;
          align-items:center;
          .msg-input{
            box-sizing:border-box;
            margin:0 10px;
            height:80%;
            flex:1;
            border:1px solid #ddd;
            outline:none;
            border-radius:5px;
          }
          .action{
            position:relative;
            display:flex;
            align-items:center;
            width:pxTorem(60px);
            margin-right:10px;
            height:100%;
            & > * {
              width:100%;
              height:80%;
              text-align:center;
              line-height:pxTorem(42px);
              font-size:12px;
            }
            .add{
              width:pxTorem(42px);
              height:pxTorem(42px);
              // border:1px solid #ddd;
              border-radius:50%;
              .iconfont{
                font-size:34px;
                color:#a7a2a2;
              }
            }
            .submit{
              background-color:green;
              color:#fff;
              border-radius:3px;
            }
          }
        }
    }
  }
</style>