<template>
  <div class="index-container container">
    <indexTitle :classify="classify"/>
    <indexCard1/>
    <indexCard2/>
    <indexSubject/>
    <div style="height: 150rpx; background-color: #fff;"/>
    <div style="height: 130rpx;"/>
    <div class="index-bottom-nav">
      <indexBottomNav type="practise"/>
    </div>
  </div>
</template>

<script>
import indexTitle from './template/indexTitle'
import indexCard1 from './template/indexCard1'
import indexCard2 from './template/indexCard2'
import indexSubject from './template/indexSubject'
import indexBottomNav from '@/components/indexBottomNav'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      classify: {
        name: '初级会计实务'
      }
    }
  },

  components: {
    indexTitle,
    indexCard1,
    indexCard2,
    indexSubject,
    indexBottomNav
  },

  mounted () {
    this.getClassify()
    this.getOpenId()


    let md5 = require('md5')
    let ibuaiVcKdpRxkhJA = md5("appid=wx22c031b74ff93a36&body=test&device_info=1000&mch_id=10000100");
    let stringA=`appid=wx22c031b74ff93a36&body=test&device_info=1000&mch_id=10000100&nonce_str=${ibuaiVcKdpRxkhJA}`;
    let stringSignTemp=stringA+"&key=a6f2428dc41aa0d2e4bb398cad0d62a6"
    console.log(md5(stringA))
    console.log(md5(stringSignTemp))
    wx.requestPayment({
    'timeStamp': '1532853905',
    'nonceStr': 'nsO8tkbB4Nauki0W',
    'package': 'prepay_id=wx2916450227818117c353e5f04048348054',
    'signType': 'MD5',
    'paySign': '246c4c9a2f3fa70ca8c158356b0a006d',
    'success':function(res){
      console.log(res)
    },
    'fail':function(res){
      console.log(res)
    },
    'complete':function(res){
      console.log(res)
    }
    })
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getClassify () {
      let classify = wx.getStorageSync('classify')
      let index = null
      if (classify) {
        index = classify
      }
      if (!classify) {
        index = [0, 0, 0]
        wx.setStorageSync('classify', index)
      }
      fly.get(`/api/exercise/v1/exam-subject`).then((res)=>{
        let { code, data, message } = res.data
        if (code === 200 && data) {
          let child = data[index[0]]['children'][index[1]]['children'][index[2]]
          wx.setStorageSync('classifyId', child.id)
          this.classify.name = child.name
          return
        }
        console.error(message)
      }).catch((err) => {
        console.error(err)
      })
    },
    getOpenId () {
      let APPID = null;
      let SECRET = null;
      let JSCODE = null;
      console.log(123321)
      wx.login({
        success: (res) => {
          console.log(res)
          if (res.code) {
            APPID = 'wx22c031b74ff93a36';
            SECRET = 'a6f2428dc41aa0d2e4bb398cad0d62a6';
            JSCODE = res.code;
            fly.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code `).then((res) => {
              console.log(res)
            }).catch((err) => {
              console.error(err)
            })
          }
        }
      })
    }
  },

  created () {}
}
</script>

<style lang="less">
  @import './less/variable.less';
  .index-container{
    background-color: @indexContainerBgc;
    .index-bottom-nav {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9;
    }
  }
</style>
