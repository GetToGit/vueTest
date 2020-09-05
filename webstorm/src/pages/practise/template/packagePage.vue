<template>
  <div class="index-package-container containter">
    <div class="item-1">智能组卷</div>
    <div class="item-2">财会一为你生成与目标考试点范围、难度分布完全匹配的模考</div>
    <div class="bottom-1">
      <span @click="toProbelms()">开始模考</span>
    </div>
    <div class="bottom-2">下载试卷</div>
  </div>
</template>

<script>
export default {
  methods: {
    toProbelms () {
      wx.setStorageSync('getProblemType', 2);
      wx.setStorageSync('subjectDetail', {
        name: '智能组卷'
      });
      let url = '/pages/practise/pages/problems/main';
      wx.redirectTo({ url });
    }
  }
}
</script>

<style lang="less">

  /*智能组卷*/
  .index-package-container {
    position: relative;
    .item-1 {
      font-size: 36rpx;
      text-align: center;
      margin-top: 120rpx;
    }
    .item-2 {
      margin-top: 15rpx;
      font-size: 30rpx;
      text-align: center;
      padding: 0 100rpx;
    }
    .bottom-1 {
      font-size: 30rpx;
      text-align: center;
      margin-top: 500rpx;
      span {
        color: #fff;
        display: inline-block;
        background-color: #3399FF;
        padding: 15rpx 50rpx;
        border-radius: 10rpx;
      }
    }
    .bottom-2 {
      color: #3399FF;
      font-size: 30rpx;
      text-align: center;
      margin-top: 30rpx;
    }
  }
</style>
