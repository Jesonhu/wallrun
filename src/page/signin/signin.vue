<template>
    <div class="signin">
        <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>

        <!-- slide-bar -->
        <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>
    </div>
</template>

<script>
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  
  export default {
    data() {
      return {
        headerTxt: 'demo01',

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
  }
</style>