<template>
    <div class="progress">
          <ul class="main-list">
            <li class="main-item">
              <div class="title">你最喜欢哪个节目</div>
              <div class="progress-detail">
                  <p class="detail-title">跑男</p>
                  <div class="progress-con">
                      <div class="progress-outer">
                          <div class="progress-inner">
                            <div class="progress-bg" style="width:10%"></div>
                          </div>
                      </div>  
                      <div class="progress-txt">20票</div>
                  </div>
              </div>
              <div class="progress-detail">
                  <p class="detail-title">跑男2</p>
                  <div class="progress-con">
                      <div class="progress-outer">
                          <div class="progress-inner">
                            <div class="progress-bg" style="width:10%"></div>
                          </div>
                      </div>  
                      <div class="progress-txt">20票</div>
                  </div>
              </div>
            </li>
          </ul>
    </div>
</template>

<script>
  
  export default {
    name: 'vote',
    data() {
      return {
      }
    },
    methods: {
      
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin';

  .progress{
    font-size:18px;
    position:relative;
    width:100%;

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
          .progress-detail{
            display: inline-block;
            box-sizing:border-box;
            margin-top:10px;
            width: 100%;
            font-size: 16px;
            position: relative;
            padding:10px;
            .progress-con{
                width:100%;

                .progress-outer{
                    display:inline-block;
                    width:100%;
                    padding-right:100px;
                    margin-right:-100px;
                    .progress-inner{
                        display: inline-block;
                        width: 100%;
                        background-color: #f3f3f3;
                        border-radius: 0px;
                        vertical-align: middle;
                        .progress-bg{
                            background-color: $themColor;
                            transition: all .2s linear;
                            position: relative;
                            height:10px;
                        }
                    }
                }
                .progress-txt{
                    box-sizing:border-box;
                    display: inline-block;
                    margin-left: 5px;
                    text-align: left;
                    font-size: 1em;
                    vertical-align: middle;
                    color:$themColor;
                    width: 90px;
                    text-align: center;
                }
            }
          }
        }
      }
  }
</style>