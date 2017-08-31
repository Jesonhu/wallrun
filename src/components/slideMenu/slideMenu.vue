<template>
  <div class="slide-menu">
    <ul class="list">
      <li class="item"
       v-for="(item,index) in list"
       :class="{'is-active': index==999}">
        <router-link class="link"
         :to="item.link">
          <i class="icon fa"
           :class="item.icon"></i>
          <span class="name">{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {
            icon: 'fa-home',
            link: '/signin',
            name: '签到'
          },
          {
            icon: 'fa-home',
            link: '/message',
            name: '消息上墙'
          },
          // {
          //   icon: 'fa-home',
          //   link: '/lottery',
          //   name: '抽奖'
          // },
          {
            icon: 'fa-home',
            link: '/vote',
            name: '投票'
          },
          {
            icon: 'fa-home',
            link: '/account',
            name: '个人中心'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/mixin';

  $itemHei: pxTorem(58px);
  $color: #fff;
  $activeBg:#424242;
  $activeLineBg: #c53c43;
  .slide-menu{
    z-index:2;
    position:relative;
    .item{
      height:$itemHei;
      width:100%;
      padding:0 25px;
      line-height: $itemHei;
      font-size:14px;
      text-align: left;
      &.is-active{
        position:relative;
        background:$activeBg;
        &:before{
          content: '';
          position: absolute;
          top:0;
          left:0;
          display:block;
          height:100%;
          width:3px;
          background:$activeLineBg;
        }
      }
      .link{
        display:flex;
        flex-wrap: nowrap;
        align-items: center;
        color:$color;
        .icon{
          flex:0 0 20px;
          height:20px;
          text-align: center;
          line-height: 20px;
          color:$color;
          font-size: 23px;
        }
        .name{
          color:$color;
          flex:1;
          text-indent: 10px;
          font-size:16px;
        }
      }
    }
  }
</style>