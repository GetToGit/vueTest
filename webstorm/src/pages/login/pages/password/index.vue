<template>
  <div class="index-password-container container" bindsubmit="formSubmit">
    <div class="title">{{title}}</div>
    <div class="telephone" v-show="sending">{{telephoneContent}}{{telephone}}</div>
    <div class="countDown">
      <span @click="countDown">{{countDownText}}</span>
    </div>
    <div class="password">
      <span style="display: inline-block;" v-for="(item, index) in inputItems" :key="item">
        <input class='iptbox'
          disabled
          :class="{'iptbox-active': item.focus}"
          :focus="item.focus"
          maxlength="1"
          v-model="valueNum[index]"
          @click="tap(item, $event)"
          @change=""/> 
      </span>
    </div>

    <!-- hide-input -->
    <div>
      <input name="password"
        type="number"
        class="ipt"
        maxlength="6"
        :password="true"
        :focus="isFocus" 
        v-model="valueNum" />
    </div>
  </div>
</template>

<script>
import Toast from 'mp-weui/packages/toast'
import fly from '@/lib/fetch'
export default {
  data () {
    return {
      title: '输入验证码',
      telephoneContent: '验证码已发送至',
      countDownText: '发送验证码',
      sending: false,
      timerOpen: false,
      timer: null,
      inputItems: [
        {
          focus: false,
          value: ''
        },
        {
          focus: false,
          value: ''
        },
        {
          focus: false,
          value: ''
        },
        {
          focus: false,
          value: ''
        },
        {
          focus: false,
          value: ''
        },
        {
          focus: false,
          value: ''
        }
      ],
      Length: 6, // 输入框个数
      isFocus: false,
      valueNum: '', // 输入的内容
      telephone: ''
    }
  },
  mounted () {
    this.countDownText = '发送验证码'
    this.telephone = wx.getStorageSync('telephone')
  },
  methods: {
    tap (item) {
      this.clearStatus()
      item.focus = true
      this.isFocus = true
    },
    clearStatus () {
      this.inputItems.forEach((item, index) => {
        item.focus = false
      })
    },
    submit (e) {
      console.log(e.detail.value.password)
    },
    success () {
      Toast.loading('正在登录中')
      setTimeout(() => {
        Toast.close()
        Toast.success('登录成功')
        wx.navigateTo({
          url: '/pages/examination/pages/current/main'
        })
        wx.setStorageSync('userInfo', {
          'abc': '123'
        })
      }, 2000)
      // let postData = {
      //   "mobile": this.telephone,
      //   "password": "string",
      //   "userName": "string",
      //   "verifycode": this.valueNum
      // }
      // fly.post(`/api/login/v1/login`, postData).then((res)=>{
      //   console.log(res)
      //   let { code, data, message } = res.data
      //   if (code === 200 && data) {
      //     Toast.close()
      //     wx.setStorageSync('userInfo', data)
      //     Toast.success('登录成功')
      //     wx.navigateTo({
      //       url: '/pages/index/main'
      //     })
      //   }
      // }).catch((err) => {
      //   console.error(err)
      // })
    },
    countDown () {
      if (this.timerOpen) return
      let time = 60;
      this.timerOpen = true;
      this.sending = true
      this.timer = setInterval(() => {
        this.countDownText = `${time}后重新发送`;
        if (time === 0) {
          this.countDownText = '发送验证码';
          this.timerOpen = false;
          clearInterval(this.timer);
        }
        time--
      }, 1000)

      let mobile = this.telephone
      let type = 0
      let postData = {
        mobile,
        type
      }
      fly.post(`/api/login/v1/${mobile}/send-sms/${type}`, postData).then((res)=>{
        console.log(res)
      }).catch((err) => {
        console.error(err)
      })
      // console.log(123321)
    }
  },
  watch: {
    valueNum (newV, oldV) {
      this.clearStatus()
      this.inputItems[newV.length - 1].focus = true
      if (newV.length === 6) {
        this.success()
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .index-password-container {
    // 标题
    .title {
      text-align: center;
      color: @titleColor;
      font-size: @titleFontS;
      margin-top: @titleMarginT;
    }
    // 发送验证码
    .telephone {
      text-align: center;
      color: @telephoneColor;
      font-size: @telephoneFontS;
      margin-top: @telephoneMarginT;
    }
    // 倒计时
    .countDown {
      text-align: center;
      span {
        display: inline-block;
        color: @countDownColor;
        font-size: @countDownFontS;
        padding: @countDownPadding;
        margin-top: @countDownMarginT;
        border: 1px solid @countDownBorderC;
        border-radius: @countDownRadius;
      }
    }
    // 密码框
    .password {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: @passwordMarginT;
      .iptbox {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: @passwordW;
        height: @passwordW;
        border-bottom: 1rpx solid @passwordBoderC;
      }
      .iptbox-active {
        border-color: @passwordBoderActiveC;
      }
    }
    .ipt {
      width: 0;
      height: 0;
    }
  }

</style>
