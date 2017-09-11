<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <!-- 消息内容显示 -->
        <div class="main-bd">
          <ul class="msg-list" ref="scroll">
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
              v-if="messageList.length > 0"
              v-for="(item,key) in messageList">

              <!-- 我发送的 -->
              <div class="msg-wrap me" v-if="item.type === 3">
                <div class="msg-con">
                  <div class="msg-user">{{item.msgUser.userName}}</div>
                  <div class="msg-info">
                    <div class="arrow triangleRight"></div>
                    {{item.msg}}
                  </div>
                </div>
                <div class="msg-avatar">
                  <img :src="item.msgUser.userImg" alt="">
                </div>
                
              </div>

              <!-- 别人发送的 -->
              <div class="msg-wrap" v-if="item.type === 2">
                <div class="msg-avatar"><img :src="item.msgUser.userImg" alt=""></div>
                <div class="msg-con">
                  <div class="msg-user">{{ item.msgUser.userName }}</div>
                  <div class="msg-info">
                    <div class="arrow triangleLeft"></div>
                    {{ item.msg }}
                  </div>
                </div>
              </div>

              <!-- 系统发送的 -->
              <div class="msg-wrap server" v-if="item.type === 1">
                  <span class="tip">{{ item.msg }}</span>
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
  import io from '../../../lib/socket.io'
  import { mapState } from 'vuex'
  let qs = require('qs')
  
  let unicodeUserInfo;
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
        messageList: [],
        connnectState: false
      }
    },
    created() {
      this.userInfo = {};
      // this.messageList = []; // type = 1 提示消息 type = 2 其他人聊天消息 type = 3 自己的聊天消息
    },
    mounted() {
      this.historyMsg();

      this.userInfo = {
          userId: this.openId, // 获取 vuex中的openid
          userName: this.nickname, // 昵称
          userImg: this.headimgurl, // 缩略图
      };

      this.connectEvent();
    },
    updated () {
        this.scroll();
    },
    methods: {
      // 初始连接
      connectEvent() {
        let _this = this;
        const chatHost = 'http://60.205.218.81';
        const localHost = 'http://192.168.1.15';
        const PORT = '8200';

        // this.userInfo = {
        //   userId: this.openId, // 获取 vuex中的openid
        //   userName: this.nickname, // 昵称
        //   userImg: this.headimgurl, // 缩略图
        // }
        unicodeUserInfo = Object.assign({}, this.userInfo); // 复制一份转码用
        // console.log('unicodeUserInfo before', unicodeUserInfo);
        unicodeUserInfo.userName = this.decToHex( unicodeUserInfo.userName );
        // console.log('unicodeUserInfo after', unicodeUserInfo);
        this.httpServer = io.connect(`${chatHost}:${PORT}`); // 创建客户端连接

        
        this.httpServer.emit('login', unicodeUserInfo);
        // console.log('this.userInfo', this.userInfo);
        let onlineUserList = this.singleHexToDec( this.userInfo ); // 在线列表
        // console.log( onlineUserList );
        this.onlineUserList.push( onlineUserList );

        // 接收广播过来的 login(有针对性接收)
        this.httpServer.on('login', function (obj) {
            console.log('login obj', obj);
            _this.onlineUserList = obj.onlineUserList;
            _this.messageList.push({type: 1, msg: '用户 ' + obj.msgUser.userName + ' 加入聊天', msgUser: obj.msgUser});
            // console.log('_this.onlineUserList', _this.onlineUserList);
        });
        this.httpServer.on('loginSuccess', function (obj) { // 1 成功
            // console.log('loginSuccess');
            if (obj.sign === 1) {
                _this.onlineUserList = obj.onlineUserList;
                _this.connectState = true; // 登录状态
                // _this.headerConfig.left = me.userInfo.userImg.toString(); 
                console.log('连接好了');
            }
        });
        // 退出
        this.httpServer.on('logout', function (obj) {
            _this.messageList.push({type: 1, msg: '用户 ' + obj.msgUser.userName + ' 退出聊天', msgUser: obj.msgUser});
        });
        // 发出消息
        this.httpServer.on('message', function (obj) {
            console.log('message', obj);
            _this.onlineUserList = obj.onlineUserList;
            _this.messageList.push({type: 2, msg: obj.msg, msgUser: obj.user});
        });
        
      },
      // 获取历史消息
      historyMsg() {
        let midArr = [{msg: '以下为历史消息', type: 1, msgUser: this.userInfo}];
        axios.post(`${this.host.historyMsg}`, qs.stringify({page: 1}) )
        .then((res) => {
          
          let resList = res.data.list;
          if (resList.length > 0) {
            resList.forEach((item) => {
              if (item.nickname == this.userInfo.userName) { // 用户名相同
                midArr.push({msg: item.content, type: 3, msgUser:{userName: item.nickname, userId: -1, userImg: item.headimgurl} })
              } else {
                midArr.push({msg: item.content, type: 2, msgUser:{userName: item.nickname, userId: -1, userImg: item.headimgurl} })
              }
            })
            midArr.push({msg: '以上为历史消息', type: 1, msgUser: this.userInfo})
            this.messageList = this.messageList.concat( midArr );
          }
          // console.log(midArr);

        }).catch((err) => {
          console.log(err);
        });
      },
      sideBarInit () { // 处理sidebar发来的请求
        this.showSideBar = false
      },
      parentHeader(data) {
        this.showSideBar = data
      },
      sendConHandle() {
        // 发消息到聊天服务器
        if (this.msgInput.length > 0) {
          this.messageList.push({type: 3, msg: this.msgInput, msgUser: this.userInfo});

          let params = qs.stringify( {'content': this.msgInput} )
          console.log(params); // 发送消息到后台
          axios.post(this.host.wallsedCon, params)
          .then((res) => {
            // console.log(res.data)
            this.msgInput = '';
            if (res.data.code === 1) {
              // this.list.push({'nickname': res.data.nickname, 'content': this.msgInput, 'image': res.data.image})
              // console.log(this.list)
            }
          })
          .catch((err) => {
            console.log(err)
          })

          this.httpServer.emit('message', {msg: this.decToHex(this.msgInput), user: unicodeUserInfo});
          
            // if (this.connectState) { // 在线
            //     this.httpServer.emit('message', {msg: this.msgInput, user: unicodeUserInfo});
            //     this.messageList.push({type: 3, msg: this.msgInput, msgUser: unicodeUserInfo});
            // } else {
            //     this.$refs.confirm.modelOpen();
            // }
        }
      },
      trim (s) {
          return s.replace(/(^\s*)|(\s*$)/g, '');
      },
      scroll () { // 发消息滚动到底部
          // console.log('vuex update');
          this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
      },
      
      // 编码相关
      totalHexToDec(arr) { // 将obj.onlineuserList转成中文
        if (arr.length > 0) {
          arr.forEach((item) => {
            item.userName = this.hexToDec( item.userName );
          });
        }
        return arr;
      },
      singleHexToDec(obj) { // 将单个对象转成中文
        obj.userName = this.hexToDec( obj.userName );
        return obj;
      },
      // unicode 编码转换
      // 中文转unicode
      decToHex(str) {
          var res=[];
          for(var i=0;i < str.length;i++)
              res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
          // console.log('decToHex', "\\u"+res.join("\\u") ); 
          return "\\u"+res.join("\\u");
      },
      // unicode转中文
      hexToDec(str) {
          str=str.replace(/\\/g,"%");
          return unescape(str);
      }
    },
    computed: {
      ...mapState({
        openId: state => state.user.localUserInfo.openId,
        nickname: state => state.user.localUserInfo.nickname,
        headimgurl: state => state.user.localUserInfo.headimgurl
      }),
      isSubmit() {
        if (this.msgInput !== '' && this.msgInput.length > 0) {
          return true
        } else {
          return false
        }
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
      box-sizing:border-box;
      padding-top:pxTorem(48px);
      padding-bottom:pxTorem(53px);
      top:0;
      left:0;
      width:100%;
      height:100%;
      .msg-list{
        width:100%;
        height:100%;
        overflow-y:auto;
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
        &.server{
          text-align: center;
          padding: 20px 0;
          .tip{
            padding: 3px 6px;
            border-radius: 2px;
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            font-size: 12px;
            line-height: 12px;
            margin: 0 auto;
            display:inline-block;
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