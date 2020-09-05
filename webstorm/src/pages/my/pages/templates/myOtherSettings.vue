<template>
  <div class="my-center-settings-other-settings-container containter" @click="contentClick">
    <div style="height: 20rpx; background-color: #F5F5F5;"></div>
    <div class="content-item"
      v-for="item in settingItems"
      :key="item.id">
      <span>{{item.name}}</span>
      <i class="iconfont">&#xe6a7;</i>
    </div>

    <div class="quit-btn">
      <span @click="toMyCenter">退出</span>
    </div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      settingItems: [
        {
          id: 0,
          name: '关于我们'
        },
        {
          id: 1,
          name: '重置密码'
        },
        {
          id: 2,
          name: '清楚缓存'
        },
        {
          id: 3,
          name: '手机号码'
        }
      ]
    }
  },
  methods: {
    toMyCenter () {
      wx.redirectTo({
        url: '/pages/my/pages/my_center/main'
      })
    }
  }
}

</script>

<style lang="less">
  .my-center-settings-other-settings-container {
    //
    .content-item {
      font-size: 32rpx;
      padding: 20rpx 30rpx;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      position: relative;
      .iconfont {
        position: absolute;
        right: 5rpx;
        top: 10%;

      }
    }

    .quit-btn {
      text-align: center;
      margin-top: 30rpx;
      span {
        width: 90%;
        color: #fff;
        border-radius: 10rpx;
        padding: 15rpx 0;
        font-size: 32rpx;
        display: inline-block;
        background-color: #3399FF;
      }
    }
  }
</style>
