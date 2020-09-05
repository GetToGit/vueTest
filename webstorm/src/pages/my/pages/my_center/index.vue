<template>
  <div class="my-center-container containter">
    <!-- 头像标题  -->
    <div class="my-center-title">
      <div class="my-center-title-item my-center-title-item-circle"></div>
      <div class="my-center-title-item my-center-title-item-text">
        <span @click="login">{{telephone}}</span><br/>
        <span @click="editMy">编辑个人资料</span>
      </div>
      <div class="my-center-title-item-abs">
        <div>
          <i class="iconfont">&#xe60f;</i>
        </div>
        <div class="text">已签到</div>
      </div>
    </div>

    <!-- 本周日历 -->
    <div class="my-cetenr-course">
      <div class="my-cetenr-course-title">
        <div class="left">直播日历</div>
        <div class="right">本周<span style="color: #E21A1A;">6</span> 节</div>
      </div>
      <div class="my-cetenr-course-days">
        <div class="my-cetenr-course-days-item" 
          v-for="item in days"
          :key="item.dayName"
          :class="{
            'my-cetenr-course-days-item-active': item.active
          }">
          <div class="my-cetenr-course-days-item-circle">
            <span>{{item.dayName}}</span>
            <span><i class="iconfont">&#xe632;</i></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的各种设置 -->
    <div class="my-cetenr-setting">
      <div class="my-cetenr-setting-item" 
        v-for="item in settings"
        :key="item.id"
        @click="toDetail(item)">
        <span class="my-cetenr-setting-item-icon"
          :class="item.colorName">
          <i class="iconfont" v-if="item.id === 0">&#xe60e;</i>
          <i class="iconfont" v-if="item.id === 1">&#xe60d;</i>
          <i class="iconfont" v-if="item.id === 2">&#xe6b8;</i>
          <i class="iconfont" v-if="item.id === 3">&#xe6ba;</i>
          <i class="iconfont" v-if="item.id === 4">&#xe78f;</i>
          <i class="iconfont" v-if="item.id === 5">&#xe7bf;</i>
          <i class="iconfont" v-if="item.id === 6">&#xe606;</i>
        </span>
        <span class="my-cetenr-setting-item-text">{{item.name}}</span>
        <span class="my-cetenr-setting-item-right-icon"><i class="iconfont">&#xe6a7;</i></span>
      </div>
    </div>


    <div class="index-bottom-nav">
      <indexBottomNav type="mycenter"/>
    </div>
  </div>
</template>

<script>
import indexBottomNav from '@/components/indexBottomNav'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      telephone: '',
      days: [
        {
          dayName: '一',
          active: true
        },
        {
          dayName: '二',
          active: false
        },
        {
          dayName: '三',
          active: false
        },
        {
          dayName: '四',
          active: true
        },
        {
          dayName: '五',
          active: false
        },
        {
          dayName: '六',
          active: false
        },
        {
          dayName: '日',
          active: false
        }
      ],
      settings: [
        {
          id: 0,
          name: '我的勋章',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color1'
        },
        {
          id: 1,
          name: '选择科目',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color2'
        },
        {
          id: 2,
          name: '我的账户',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color3'
        },
        {
          id: 3,
          name: '专题VIP',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color2'
        },
        {
          id: 4,
          name: '我的课程',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color4'
        },
        {
          id: 5,
          name: '我的提问',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color5'
        },
        {
          id: 6,
          name: '设置中心',
          icon: '&#xe632;',
          colorName: 'my-cetenr-setting-item-icon-color2'
        }
      ]
    }
  },
  mounted () {
    this.checkUserInfo()
  },
  components: {
    indexBottomNav
  },
  methods: {
    // 检查个人信息
    checkUserInfo () {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        this.telephone = '未登录'
        wx.redirectTo({ 
          url: '/pages/login/pages/login/main'
        })
        return
      }
      this.telephone = '13728390000'
    },

    // 登陆
    login () {
      if (this.telephone === '未登录') {
        wx.redirectTo({ 
          url: '/pages/login/pages/login/main'
        })
      }
    },

    // 编辑个人资料
    editMy () {
      let url = '/pages/my/pages/settings/main'
      wx.setStorageSync('settingsPageType', 0)
      wx.navigateTo({
        url
      })
    },

    // 跳转
    toDetail (item) {
      let id = item.id;
      let url = null;
      switch (id) {
        case 0: 
          wx.setStorageSync('settingsPageType', 2)
          url = '/pages/my/pages/settings/main'
          wx.navigateTo({
            url
          })
          break;
        case 1:
          let url = '/pages/examination/pages/current/main'
          wx.navigateTo({ url })
          break;
        case 2:
          wx.setStorageSync('settingsPageType', 1)
          url = '/pages/my/pages/settings/main'
          wx.navigateTo({
            url
          })
          break;
        case 3:
          wx.setStorageSync('settingsPageType', 3)
          url = '/pages/my/pages/settings/main'
          wx.navigateTo({
            url
          })
          break;
        case 4:
          wx.setStorageSync('settingsPageType', 4)
          url = '/pages/my/pages/settings/main'
          wx.navigateTo({
            url
          })
          break;
        case 5:
          wx.setStorageSync('settingsPageType', 5)
          url = '/pages/my/pages/settings/main'
          wx.navigateTo({
            url
          })
          break;
        case 6:
          wx.setStorageSync('settingsPageType', 6)
          url = '/pages/my/pages/settings/main'
          wx.navigateTo({
            url
          })
          break;
      }
    }
  }
}

</script>

<style lang="less">
  @TitleBgc: #3399FF;

  // 个人中心
  .my-center-container {
    box-sizing: border-box;

    // 标题
    .my-center-title {
      position: relative;
      padding: 40rpx 0;
      overflow: hidden;
      background-color: @TitleBgc;
      .my-center-title-item {
        float: left;
        display: inline-block;
      }
      .my-center-title-item-circle {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        background-color: #fff;
        margin-left: 30rpx;
      }
      .my-center-title-item-text {
        font-size: 30rpx;
        color: #fff;
        margin: 15rpx 0 0 25rpx;
      }
      .my-center-title-item-abs {
        position: absolute;
        right: 30rpx;
        top: 12%;
        .iconfont {
          font-size: 70rpx; color: #fff;
        }
        .text {
          font-size: 28rpx; color: #fff;
        }
      }
    }

    // 本周日历
    .my-cetenr-course {
      padding-bottom: 40rpx;
      border-bottom: 2px solid #F6F6F6;
      .my-cetenr-course-title {
        overflow: hidden;
        font-size: 32rpx;
        padding: 30rpx;
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }

      .my-cetenr-course-days {
        padding: 0 30rpx;
        display: flex;
        .my-cetenr-course-days-item {
          flex: 1;
          .my-cetenr-course-days-item-circle {
            position: relative;
            width: 70rpx;
            height: 70rpx;
            text-align: center;
            line-height: 70rpx;
            font-size: 30rpx;
            border-radius: 50%;
            border: 1px solid #B3B3B3;
            background-color: #F5F5F5;
          }
          .iconfont {
            display: none;
            color: #438DF3;
            font-size: 30rpx;
            position: absolute;
            right: 0; bottom: -25rpx;
          }
        }
        .my-cetenr-course-days-item-active {
          .my-cetenr-course-days-item-circle {
            color: #438DF3;
            border-color: #C1CFE5;
            background-color: #EBF5FF;
          }
          .iconfont {
            display: block;
          }
        }
      }
    }

    // 我的各种设置
    .my-cetenr-setting {
      padding-bottom: 120rpx;
      .my-cetenr-setting-item {
        overflow: hidden;
        padding: 15rpx 10rpx;
        border-bottom: 1px solid #F6F6F6;

        .my-cetenr-setting-item-icon {
          float: left;
          margin-left: 30rpx;
          width: 60rpx;
          height: 60rpx;
          text-align: center;
          line-height: 60rpx;
          border-radius: 50%;
          .iconfont {
            font-size: 32rpx;
            color: #fff;
          }
        }
        .my-cetenr-setting-item-icon-color1 {
          background-color: #89D579;
        }
        .my-cetenr-setting-item-icon-color2 {
          background-color: #FCB065;
        }
        .my-cetenr-setting-item-icon-color3 {
          background-color: #4592FC;
        }
        .my-cetenr-setting-item-icon-color4 {
          background-color: #F8D447;
        }
        .my-cetenr-setting-item-icon-color5 {
          background-color: #69F74B;
        }
        .my-cetenr-setting-item-text {
          float: left;
          font-size: 32rpx;
          margin-left: 15rpx;
          margin-top: 10rpx;
        }
        .my-cetenr-setting-item-right-icon {
          float: right;
          margin-right: 30rpx;
        }
      }
    }

    // 底部固定
    .index-bottom-nav {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9;
    }
  }

</style>
