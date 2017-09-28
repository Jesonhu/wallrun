<template>
    <div class="hello" :style="{backgroundImage: `url(${bgImg})`}">
        <div class="bellow"></div>
        <!-- 顶部 -->
        <div class="top">
            <span class="txt">{{title}}</span>
        </div>
        <!-- 中间 -->
        <div class="main-bd">
          <ul class="list clearfix">
            <li class="item"
             v-if="list.length > 0"
             v-for="(item,index) in list"
             :key="index">
                <router-link :to="item.url" class="link">
                  <i class="icon"></i>
                  <span class="txt">{{item.name}}</span>
                </router-link>
            </li>
          </ul>
        </div>
        <!-- 底部 -->
        <div class="bottom">{{bottomTxt}}</div>
    </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    name: 'helloHor',
    data() {
      return {
        title: '微现场-荆门恒大',
        bottomTxt: '©炫幕网络',

        list: [
          {
            url: '/signin',
            name: '签到'
          },
          {
            url: '/message',
            name: '消息上墙'
          }
          // {
          //   url: '/lottery',
          //   name: '抽奖'
          // },
          // {
          //   url: '/vote',
          //   name: '投票'
          // }
        ]
      }
    },
    mounted() {
      axios.post(this.host.indexUrl)
      .then((res) => {
        this.$store.dispatch('setUserInfo', {openId: res.data.openid, nickname: res.data.nickname, headimgurl: res.data.headimgurl, loginStatus: true})
      })
      .catch((error) => {
        console.log(error)
      })
      axios.post(this.host.skinBgImg)
      .then((res) => {
        this.$store.dispatch('setLooksInfo', {bgImg: `${this.host.domain}/scene/${res.data.wapbg}`})
      })
      .catch((err) => {
        console.log(error);
      })
    },
    computed: {
      ...mapState({
        bgImg: state => state.look.localLooksInfo.bgImg
      })
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../styles/mixin';

    .hello{
        position:fixed;
        left:0;
        top:0;
        bottom:0;
        width:100%;
        background-image:url('../../assets/mobile_bg01.jpg');
        @include bgImg100('');

        & > *{
          z-index:2;
          position:relative;
        }

        .top{
          display:flex;
          box-sizing:border-box;
          align-items:center;
          justify-content:center;
          height:20%;
          width:100%;
          border-bottom:1px solid #5A6174;
          
          .txt{
            color:$txtColor;
            font-size:27px;
          }
        }

        .main-bd{
          height:62%;
          .list{
            height:100%;
            display:flex;
            .item{
              width:33%;
              flex:1;
              height:100%;
              float:left;
              display:flex;
              align-items:center;
              justify-content:center;
              .link{
                display:block;
                text-align:center;
                i{
                  display:block;
                  margin:0 auto;
                  width:pxTorem(80px);
                  height:pxTorem(80px);
                  @include bgImg100('');
                }
                .txt{
                  display:block;
                  color:$txtColor;
                  margin-top:5px;
                  font-size:18px;
                }
              }

              &:nth-child(1){
                i.icon{
                  background-image:url('../../assets/qdicon.png');
                }
              }
              &:nth-child(2){
                i.icon{
                  background-image:url('../../assets/xxsqicon.png');
                }
              }
              &:nth-child(3){
                i.icon{
                  background-image:url('../../assets/tpicon.png');
                }
              }
            }
          }
        }

        .bottom{
          box-sizing:border-box;
          padding-top:pxTorem(39px);
          height:18%;
          border-top:1px solid #5A6174;
          color:$txtColor;
          font-size:15px;
          text-align:center;
        }

        // bellow
        .bellow{
          z-index:0;
          position:absolute;
          left:0;
          top:0;
          bottom:0;
          width:100%;
          // background-image:url('../../assets/hello_bellow.png');
          @include bgImg100('');
        }
    }
</style>