<template>
  <div class="my-center-exchange-dialog-content">
    <div style="text-align: center;">
      <i class="iconfont" style="font-size: 90rpx; color: #F6921E;">&#xe669;</i>
    </div>
    <div>
      <input style="font-size: 30rpx;" type="number" name="" placeholder="请输入兑换码">
    </div>
    <div>
      <span class="duihuan">兑换</span>
    </div>
    <div @click="toOther" style="font-size: 30rpx; margin: 30rpx 0 40rpx 0;">兑换规则</div>
  </div>
</template>

<script>

export default {
  methods: {
    toOther () {
      wx.setStorageSync('otherPageType', 1)
      wx.navigateTo({
        url: '/pages/my/pages/other/main'
      })
    }
  }
}

</script>

<style lang="less">
  .my-center-exchange-dialog-content {
    border-radius: 15rpx;
    background-color: #fff;
    width: 70%;
    text-align: center;
    z-index: 999;
    position: fixed;
    left: 15%;
    top: 25%;
    opacity: 1;

    .duihuan {
      display: inline-block;
      background-color: red;
      padding: 10rpx 0;
      border-radius: 5rpx;
      margin-top: 40rpx;
      color: #fff;width: 80%; font-size: 32rpx; background-color: #3399FF;
    }
  }

</style>
