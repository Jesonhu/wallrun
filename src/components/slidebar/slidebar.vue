<template>
  <div class="sidebar" :class="{active:isActive}">
    <div class="bg-wrap" @click="active"></div>
    <div class="con-wrap">
      <div class="bg-wrap"></div>
      <div class="avatar-wrap">
      </div>

      <slide-menu></slide-menu>
      <div class="user-status" v-if="false">
        <div class="login" v-if="isLogin" @click="userHandle">注销</div>
        <div class="no-login" v-if="!isLogin">
          <router-link to="/login" class="link">请登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideMenu from 'components/slideMenu/slideMenu'

  export default {
    name: 'sidebar',
    // props 验证默认值写法
    props: {
      show: Boolean
    },
    data () {
      return {
        isActive: false,

        isLogin: false
      }
    },
    methods: {
      active () {
        this.isActive = false
        this.$emit('parent') // 向header.vue发送请求
      },
      userHandle () {
        // 注销
        this.$store.dispatch('removeUserInfo')
      }
    },
    computed: {
    },
    watch: {
      show () {
        this.isActive = this.show
      }
    },
    components: {
      slideMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin';

  .sidebar{
    z-index: 999;
    display:flex;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow-y:auto;
    visibility: hidden;
    opacity: 0;
    transition:.2s all linear;
    &.active{
      opacity: 1;
      visibility: visible;
      .con-wrap {
        transform:translateX(0);
      }
    }
  }
  .con-wrap{
    position: absolute;
    top:0;
    left:0;
    height:100%;
    width: 220px;
    background-image:url('../../assets/mobile_bg1.jpg');
    background-repeat:no-repeat;
    background-size:cover;
    transform:translateX(-220px);
    transition:.2s transform linear;
    .bg-wrap{
      z-index:1;
      position:absolute;
      top:0;
      left:0;
      height:100%;
      width:100%;
      background-color:rgba(0,0,0,.6);
    }
    .avatar-wrap{
      height:pxTorem(72px);
      border-bottom:1px solid transparent;
      display:flex;
      justify-content: center;
      align-items: center;
      .link{
        display:block;
        width:60px;
        height:60px;
        line-height: 74px;
        border-radius:50%;
        overflow: hidden;
        .img{
          display:block;
          width:100%;
          height:100%;
        }
      }
    }
    .user-info-wrap{
      margin-left:10px;
      font-size:12px;
      color:#fff;
      i, span{
        color:#fff;
      }
      i{
        margin-right: 5px;
        color:#c53c43;
      }
    }
  }
  .bg-wrap{
    flex:1;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,.5);
  }

  .login,
  .no-login{
    display: block;
    margin: 0 auto;
    margin-top:20px;
    width: 90%;
    height: 1.45rem;
    line-height: 1.45rem;
    border-radius: 3px;
    text-align: center;
    border: none;
    color: #fff;
    font-size: 14px;
    background-color: #c53c43;
    .link {
      display:block;
      color:#fff;
    }
  }
</style>