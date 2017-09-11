<template>
    <div class="header">
        <div class="header-left">
            <span class="header-back"
             data-toggle="collapse"
             @click.prevent="showSideBarHandle">
                <i class="iconfont icon-category"></i>    
            </span>
        </div>
        <h2 class="header-title">{{headerTxt}}</h2>
        <div class="header-right" @click="goHome">
            <span class="header-home">
                <i class="iconfont icon-homebig"></i>
            </span>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['headerTxt', 'showSideBar'],
    methods: {
      showSideBarHandle() {
        this.$emit('parentHeader', !this.showSideBar)
      },
      goHome() {
          this.$router.push({path: '/'});
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import  '../../styles/mixin';

    .header{
        z-index:100;
        display:flex;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height: pxTorem(48px);
        background:$themColor;

        .header-left,
        .header-right{
            display:flex;
            flex:0 0 pxTorem(52px);
            align-items:center;
            font-size:14px;
        }
        .header-left{
            margin-left:10px;
        }
        .header-right{
            margin-right:10px;
            align-items:center;
            justify-content:flex-end;
            .header-home{
                padding-top:pxTorem(2px);
            }
        }

        .header-title{
            flex:1;
            height: pxTorem(48px);
            line-height: pxTorem(48px);
            text-align:center;
            font-size:18px;
            color:$txtColor;
        }

        .iconfont{
            color:#755d5d;
            font-weight:900;
            font-size:28px;
        }
    }
</style>