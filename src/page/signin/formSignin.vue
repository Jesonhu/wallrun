<template>
  <div class="signin">
    <v-header 
          :headerTxt="headerTxt"
          :showSideBar="showSideBar"
          @parentHeader="parentHeader"></v-header>
    <div class="main-bd"> 
        <form @submit.prevent="submit" class="from-order">

        <!-- 姓名 -->
        <div class="form-group" v-bind:class="{ 'form-group--error': $v.form.name.$error }">
            <label class="form__label">姓名</label>
            <div class="input-wrap">
            <i class="fa fa-user-o"></i>
            <input class="form__input b-1px" placeholder="请输入姓名"
            v-model.trim="form.name"
            @input="userTouch($v.form.name)"
            @blur="handleBlur($v.form.name.$invalid, 0)">
            <i class="input-icon-validate mintui mintui-field-error icon-empty"
            v-if="$v.form.name.nameValid"
            @click="form.name = '' "></i>
            <i class="input-icon-validate icon-status mintui"
                :class="[!$v.form.name.$invalid ? 'mintui-field-success' : '']"></i>
            <i class="input-icon-validate icon-required mintui mintui-field-warning" v-show="!$v.form.name.nameValid"></i>
            </div>
        </div>

        <!-- 手机号 -->
        <div class="form-group" v-bind:class="{ 'form-group--error': $v.form.phone.$error }">
            <label class="form__label">手机号</label>
            <div class="input-wrap">
            <i class="fa fa-mobile-phone"></i>
            <input class="form__input b-1px" placeholder="请输入手机号" type="number"
            v-model.trim="form.phone"
            @input="$v.form.phone.$touch()"
            @blur="handleBlur($v.form.phone.$invalid, 1)">
            <i class="input-icon-validate mintui mintui-field-error icon-empty"
            v-if="$v.form.phone.phoneValid"
            @click="form.phone = '' "></i>
            <i class="input-icon-validate icon-status mintui"
                :class="[!$v.form.phone.$invalid ? 'mintui-field-success' : '']"></i>
            <i class="input-icon-validate icon-required mintui mintui-field-warning" v-show="!$v.form.phone.phoneValid"></i>
            </div>
        </div>

        <!-- 提交 -->
        <div class="submit-wrap">
            <button class="form-group__message" type="submit"
            @click="submitClickHandle($v.form)">去签到</button>
        </div>

        <div v-if="false" class="" @click="showDate">1111</div>
        <pre v-if="false">表单: {{ $v.form }}</pre>

        </form>
    </div>

    <!-- slide-bar -->
    <side-bar :show="showSideBar" @parent="sideBarInit"></side-bar>
  </div>
</template>

<script>
  import qs from 'qs'
  import header from 'components/header/header'
  import sideBar from 'components/slidebar/slidebar'
  import { required } from 'vuelidate/lib/validators'
  import { Toast, MessageBox } from 'mint-ui'
  import { isPhone, isUserName } from '../../plugins/form'
  import axios from 'axios'
  
  let _this;
  export default {
    name: 'formSignin',
    data () {
      return {
        headerTxt: '表单签到',
        showSideBar: false,

        canSubmitMark: false,
        descToggleMark: false,
        toastMesg: [
          {
            key: 'name',
            text: '姓名不正确'
          },
          {
            key: 'phone',
            text: '手机号不正确'
          }
        ],
        form: {
          name: '',
          phone: ''
        }
      }
    },
    methods: {
      submit () {
        _this = this
        if (this.canSubmitMark) {
        //   const formatData = JSON.stringify(this.form)
        //   console.log(formatData)
          axios.post(this.host.signInExtra, qs.stringify(this.form))
            .then((res) => {
              if (res.data.code === 1) {
                _this.handleMessageBox('签到成功', '即将跳转到下一环节')
                // setTimeout(function() {
                //   _this.$router.push({path: '/message'})
                // }, 1000)
              } else if (res.data.code === 2) {
                _this.handleMessageBox('已经签到过', '即将跳转到下一环节')
                // setTimeout(function() {
                //   _this.$router.push({path: '/message'})
                // }, 1000)
              } else if (res.data.code === 0) {
                _this.handleMessageBox('签到失败', '请重新签到')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      submitClickHandle (form) {
        let requireArr = []
        let showErrorMsg
        requireArr.push(form.name)
        requireArr.push(form.phone)
        requireArr.push(form.dateTime)

        if (this.descToggleMark) {
          requireArr.push(form.desc)
        }

        if (form.$invalid) { // 全部验证不通过
          this.canSubmitMark = false // 控制是否submit()可以提交
          for (let i = 0; i < requireArr.length; i++) { // 获取具体哪个验证有问题
            if (requireArr[i]['$invalid']) {
              showErrorMsg = this.toastMesg[i]['text']
              break
            }
          }
          this.handelToast(showErrorMsg)
        } else { // 全部验证通过
//          console.log('表单验证通过')
          this.canSubmitMark = true
        }
      },
      changeCount (status) {
        if (status) { // 增加
          this.form.count++
        } else { // 减少
          if (this.form.count === 1) {
            this.handelToast('随行人数至少有一人')
            return
          }
          this.form.count--
        }
      },
      selectVal (currentVal) {
        this.descToggleMark = currentVal
      },
      userTouch ($v) { // 用户每次输入内容时候触发 vuelidate自己验证
//        console.log('blur')
      },
      handleBlur (isError, _index) { // 处理失去光标
        if (isError) {
          this.handelToast(this.toastMesg[_index]['text'])
        }
      },
      handelToast (msg) {
        Toast({
          message: msg,
          position: 'top',
          duration: 1000
        })
      },
      handleMessageBox (title, msg) {
        MessageBox({
          title: title,
          message: msg,
          showCancelButton: false
        })
      },
      // mint picker
      open (picker) {
        this.$refs[picker].open()
      },
      handleChange (value) {
        const result = formatDate(value, 'yyyy-MM-dd hh:mm')
        this.form.dateTime = result
      },
      lastData () {
        let nowDate = new Date()
        // 设置日期为2018-1-1 0:0:0
//        nowDate.setFullYear(2018)
//        nowDate.setMonth(1)
//        nowDate.setDate(1)
//        nowDate.setHours(0)
//        nowDate.setMinutes(0)
//        nowDate.setSeconds(0)
//        nowDate.setMilliseconds(0)
        return nowDate
      },
      showDate () {
        console.log(this.lastData())
      },
      // slidebar
      sideBarInit () { // 处理sidebar发来的请求
        this.showSideBar = false
      },
      parentHeader(data) {
        this.showSideBar = data
      }
    },
    validations () {
      return {
        form: {
            name: {
                nameValid: isUserName
            },
            phone: {
                phoneValid: isPhone
            }
        }
      }
    },
    components: {
      vHeader: header,
      sideBar
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/mixin';  

  $TthemColor: rgb(197,60,67);

  .order-wrap{
    margin-top:0rem;
    position: relative;
    min-height: 100vh;
  }

  .from-order{
    position: absolute;
    top:2rem;
    bottom:0;
    width:100%;
    left:0;
  }
  .form-group{
    margin:10px;
    .input-wrap{
      position: relative;
      .fa{
        z-index: 9;
        position: absolute;
        top:50%;
        margin-top:-10px;
        left:5px;
        display:block;
        width:20px;
        height:20px;
        color:$TthemColor;
        font-size:15px;
        line-height: 20px;
        text-align: center;
        &.fa-mobile-phone{
          font-size:23px;
        }
      }
    }
    .form__label,
    .label-block{
      font-size:12px;
    }
    /* 留言 */
    .mod-form-textarea{
      display: inline-block;
      width: 100%;
      margin-top:5px;
      font-size: 12px;
      border: 1px solid #dddee1;
      border-radius: 4px;
      color: #495060;
      background-color: #fff;
      background-image: none;
      position: relative;
      cursor: text;
      transition: border 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95), background 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95), box-shadow 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
    }
    &.inline-group{
      padding-top:10px;
      .pickers-wrap{
        display:flex;
        flex-wrap: nowrap;
        .input-wrap{
          flex:1;
          .mu-date-picker,
          .mu-time-picker{
            width:100%;
            .mu-text-field-input{
              display: inline-block;
              width: 100%;
              height: 32px;
              line-height: 1.5;
              padding: 4px 7px;
              font-size: 12px;
              border: 1px solid #dddee1;
              border-radius: 4px;
              color: #495060;
              background-color: #fff;
              background-image: none;
              position: relative;
              cursor: text;
              transition: border 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95),
                          background 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95),
                          box-shadow 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
            }
          }
        }
      }
    }

    /* label */
    .label-block{
      display:block;
      width:100%;
      height:19px;
    }

    /* 两边按钮 */
    .two-slide-bar{
      display:flex;
      width:100px;
      height:35px;
      .count{
        display:inline-block;
        flex:1;
        height:30px;
        width:30px;
        border:1px solid #dddee1;
        border-left:0;
        border-right:0;
        text-align: center;
      }
      .slide-bar{
        display:inline-block;
        flex: 0 0 35px;
        height: 30px;
        width:35px;
        line-height: 30px;
        text-align: center;
        border:1px solid #dddee1;
        &:first-child{
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        &:last-child{
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }
      }
    }
  }

  /* 验证图标 */
  .input-wrap{
    position: relative;
    display:block;
  .form__input{
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    text-indent: 25px;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s cubic-bezier(0.45, 0.05, 0.55, 0.95),
            background .2s cubic-bezier(0.45, 0.05, 0.55, 0.95),
            box-shadow .2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
    &:hover,
    &:focus {
       border-color: #57a3f3;
    }
    &:focus{
       outline: 0;
       box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    }
  }
  .input-icon-validate{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    right:0;
    width:30px;
    height:100%;
    background:transparent;
  &.icon-status{
     right:0px;
   }
  &.mintui-field-error{
     color:red;
   }
  &.mintui-field-warning{
     color:red;
   }
  &.mintui-field-success{
     color:green;
   }
  &.icon-empty{
     color:#888;
     opacity:.5;
   }
  }
  }

  /* 提交按钮 */
  .submit-wrap{
    margin: 10px;
    & > * ,
    .input[type=submit] {
      display: block;
      width: 90%;
      height: pxTorem(33px);
      margin: 0.768rem auto;
      border-radius: 3px;
      text-align: center;
      border: none;
      color: #fff;
      font-size: 14px;
      background-color: $themColor;
    }
  }
  .signin{
    font-size:18px;
    position:relative;
    width:100%;
    height:100vh;

    .main-bd{
      position: absolute;
      box-sizing: border-box;
      padding-top: 0.96rem;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .banner{
        width:100%;
        height:pxTorem(160px);
        background-repeat:no-repeat;
        background-size:100% 100%;
      }
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
          .cell{
            position:relative;
            box-sizing:border-box;
            display:flex;
            padding:20px;
            width:100%;
            font-size:16px;
            overflow:hidden;
            .cell-wrapper{
              box-sizing:border-box;
              display:flex;
              align-items:center;
              font-size:16px;
              .cell-title{
                flex:1;
                .radiolist-label{
                  display:block;
                  padding:0 10px;
                  .radio-input{
                    z-index:99;
                    position:absolute;
                    opacity:0;
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                  }  
                  .radio-core{
                    box-sizing: border-box;
                    display: inline-block;
                    background-color: #fff;
                    border-radius: 100%;
                    border: 1px solid #ccc;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                    &:after{
                      content: " ";
                      border-radius: 100%;
                      top: 5px;
                      left: 5px;
                      position: absolute;
                      width: 8px;
                      height: 8px;
                      -webkit-transition: -webkit-transform .2s;
                      transition: -webkit-transform .2s;
                      transition: transform .2s;
                      transition: transform .2s,-webkit-transform .2s;
                      -webkit-transform: scale(0);
                      transform: scale(0);
                    }
                  }
                  .radio-input:checked+.radio-core,
                  .radio-input:checked+.checkbox-core{
                      background-color: $themColor;
                      border-color: $themColor;
                  }
                  .radio-input[type=radio]:checked+.radio-core:after{
                      background-color: #fff;
                      transform: scale(1);
                  }
                  .checkbox-core{
                    display: inline-block;
                    background-color: #fff;
                    border-radius: 100%;
                    border: 1px solid #ccc;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                    &:after{
                      border: 2px solid transparent;
                      border-left: 0;
                      border-top: 0;
                      content: " ";
                      top: 3px;
                      left: 6px;
                      position: absolute;
                      width: 4px;
                      height: 8px;
                      -webkit-transform: rotate(45deg) scale(0);
                      transform: rotate(45deg) scale(0);
                      -webkit-transition: -webkit-transform .2s;
                      transition: -webkit-transform .2s;
                      transition: transform .2s;
                      transition: transform .2s,-webkit-transform .2s;
                    }
                  }
                  .radio-input:checked+.checkbox-core:after{
                    border-color: #fff;
                    -webkit-transform: rotate(45deg) scale(1);
                    transform: rotate(45deg) scale(1);
                  }
                }
              }
            }
          }
        }
      }
      .submit-wrap{
        margin:20px 0;
        width:100%;
        height:pxTorem(45px);
        text-align:center;
        .submit{
          display:inline-block;
          width:80%;
          height:100%;
          text-align:center;
          color:$txtColor;
          border-radius:5px;
          background-color:darken($themColor, 10%);
        }
      }
    }
  }
</style>
