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
            link: '/',
            name: '首页'
          },
          {
            icon: 'fa-home',
            link: '/lpshow',
            name: '楼盘鉴赏'
          },
          {
            icon: 'fa-home',
            link: '/hxtype',
            name: '户型图展示'
          },
          {
            icon: 'fa-home',
            link: '/fullview',
            name: '全景看房'
          },
          {
            icon: 'fa-home',
            link: '/map',
            name: '项目地址'
          },
          {
            icon: 'fa-home',
            link: '/about',
            name: '公司简介'
          },
          {
            icon: 'fa-home',
            link: '/active',
            name: '最新资讯'
          },
          {
            icon: 'fa-home',
            link: '/order',
            name: '预约看房'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  $itemHei: 45px;
  $color: #fff;
  $activeBg:#424242;
  $activeLineBg: #c53c43;
  .slide-menu{
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
        }
      }
    }
  }
</style>