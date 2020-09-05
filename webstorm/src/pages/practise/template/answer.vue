<template>
  <div class="practise-page-containter container">
    <div class="title">
      <div class="left">{{title}}</div>
      <div class="right">{{userAnswerProblems.time}}</div>
    </div>
    <div class="content">
      <div class="content-item" 
        v-for="(item, index) in userAnswerProblems.xinwenList"
        :key="item.id">
        <span class="content-item-circle" 
          :class="{'content-item-circle-active': item.setActive}">{{index + 1}}</span>
      </div>
    </div>

    <!-- 底部tab -->
    <div class="practise-page-bottom-nav">
      <div style="background-color: #3399FF;" @click="goBack()">继续练习</div>
      <div style="background-color: #3F8FEF;" @click="submit()">交卷</div>
    </div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'
import Toast from 'mp-weui/packages/toast'

export default {
  data () {
    return {
      title: '',
      userAnswerProblems: {
        time: '',
        xinwenAnswer: [],
        xinwenList: []
      }
    }
  },
  mounted() {
    this.title = wx.getStorageSync('problemsTitle')
    this.userAnswerProblems = {
      time: '',
      xinwenAnswer: [],
      xinwenList: []
    }
    this.checkAnswer()
  },
  methods: {
    // 联系题目提交
    checkAnswer () {
      let userAnswerProblems = JSON.parse(wx.getStorageSync('userAnswerProblems'))
      this.userAnswerProblems = userAnswerProblems
      console.log(this.userAnswerProblems)
      this.userAnswerProblems.xinwenAnswer.forEach((item) => {
        if (item.useTime) {
          let indexOf = item.useTime.indexOf(':')
          let min = parseInt(item.useTime.substr(0, indexOf))
          let second = parseInt(item.useTime.substr(indexOf + 1))
          item.useTime = (min * 60) + second
        }
        this.userAnswerProblems.xinwenList.forEach((item2) => {
          if (item2.id === item.qaBankId) item2.setActive = true
        })
      })
    },
    // 返回练习题目
    goBack () {
      wx.navigateBack({
        delta: 1
      })
    },
    // 交卷
    submit () {
      let type = this.userAnswerProblems.type
      if (type === 'problem2') {
        this.submitProblem2()
      }
      if (type === 'problem1') {
        this.submitProblem1()
      }
    },
    submitProblem1 () {
      let userId = 67;
      let exerciseHistoryId = wx.getStorageSync('exerciseHistoryId');
      let url = null;
      let data = this.userAnswerProblems.xinwenAnswer
      this.userAnswerProblems.xinwenList.forEach((item) => {
        let filter = data.filter(item2 => item2.qaBankId === item.id)
        if (!filter || filter.length === 0) {
          data.push({
            "qaBankId": item.id,
            "useTime": 0,
            "userAnswer": ""
          })
        }
      })
      url = `/api/exercise/v1/commit/${exerciseHistoryId}/${userId}`;
      fly.post(`${url}`, data, { headers:{
        "content-type":"application/json"
      }}).then((res)=>{
        let { code, data, message } = res.data
        if (code === 200) {
          Toast('提交成功')
          wx.setStorageSync('resultDetail', data)
          wx.setStorageSync('practiseThirdPageType', 0);
          setTimeout(() => {
            // wx.navigateTo({
            //   url: '/pages/practise/pages/result/main'
            // })
            wx.navigateTo({
              url: '/pages/practise/pages/third/main'
            })
          }, 1500)
          return
        }
        Toast(message)
      }).catch(err=>{
        console.log(err)
      })
    },
    submitProblem2 () {
      let paperHistoryId = wx.getStorageSync('paperHistoryId');
      let pagerType = wx.getStorageSync('pagerType');
      let userId = 67;
      let data = this.userAnswerProblems.xinwenAnswer
      this.userAnswerProblems.xinwenList.forEach((item) => {
        let filter = data.filter(item2 => item2.qaBankId === item.id)
        if (!filter || filter.length === 0) {
          console.log(item)
          data.push({
            "qaBankId": item.id,
            "useTime": 0,
            "userAnswer": ""
          })
        }
      })
      let url = null
      url = `/api/paper/v1/commit/${paperHistoryId}/${userId}/${pagerType}`
      fly.post(`${url}`, data, { headers:{
        "content-type":"application/json"
      }}).then((res)=>{
        let { code, data, message } = res.data
        if (code === 200) {
          Toast('提交成功')
          wx.setStorageSync('resultDetail', data);
          wx.setStorageSync('practiseThirdPageType', 0);
          setTimeout(() => {
            // wx.navigateTo({
            //   url: '/pages/practise/pages/result/main'
            // })
            wx.navigateTo({
              url: '/pages/practise/pages/third/main'
            })
          }, 1500)
          return
        }
        Toast(message)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
  .practise-page-containter {
    height: 100%;
    background-color: #F5F5F5;
    .title {
      overflow: hidden;
      padding: 15rpx 30rpx;
      font-size: 28rpx;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
    .content {
      overflow: hidden;
      padding: 30rpx 0;
      background-color: #fff;
      .content-item {
        float: left;
        width: 20%;
        text-align: center;
        padding: 10rpx 0;
      }
      .content-item-circle {
        width: 80rpx;
        height: 80rpx;
        line-height: 80rpx;
        display: inline-block;
        border: 1px solid #CACACA;
        border-radius: 50%;
        color: #3399FF;
      }
      .content-item-circle-active {
        color: #fff;
        border: 1px solid #3399FF;
        background-color: #3399FF;
      }
    }
    .practise-page-bottom-nav {
      width: 100%;
      display: flex;
      font-size: 30rpx;
      color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9;
      div {
        flex: 1;
        padding: 15rpx 0;
        text-align: center;
      }
    }
  }
</style>
