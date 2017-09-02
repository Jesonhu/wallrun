<template>
    <div class="progress">
          <ul class="main-list">
            <li class="main-item"
             v-if="hasList.length > 0"
             v-for="item in hasList">
              <div class="title">{{item.title}}</div>
              <div class="progress-detail" 
               v-if="item.option.length > 0"
               v-for="(secItem,index) in item.option">
                  <p class="detail-title">{{secItem.option}}</p>
                  <div class="progress-con">
                      <div class="progress-outer">
                          <div class="progress-inner">
                            <div class="progress-bg" :style="{width: valueList[index]}"></div>
                          </div>
                      </div>  
                      <div class="progress-txt">{{secItem.total}}票</div>
                  </div>
              </div>
            </li>
          </ul>
    </div>
</template>

<script>
  export default {
    name: 'c-progress',
    props: ['hasList'],
    data() {
      return {
          valueList: []
      }
    },
    mounted() {
        setTimeout(() => {
            if (this.hasList.length > 0 && this.hasList[0].option.length > 0) {
                let option = this.hasList[0].option

                option.forEach((item) => {
                    let result = item.total / this.allTotal
                    if (result == NaN) {
                        this.valueList.push(0)
                    } else {
                        this.valueList.push( (result*100 + '%') )
                    }
                })
            }
        }, 500)
    },
    methods: {
    },
    computed: {
        allTotal() {
            let allTotalNum = 0
            if (this.hasList.length > 0 && this.hasList[0].option.length > 0) {
                let option = this.hasList[0].option
                
                option.forEach((item) => {
                    allTotalNum += item.total
                })
                return allTotalNum
            } else {
                return 0
            }
        }
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