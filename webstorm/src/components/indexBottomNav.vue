<template>
  <div class="index-bottom-nav-components-container containter">
    <div class="index-bottom-nav-components-item"
      :class="{'index-bottom-nav-components-item-active': type==='practise'}"
      @click="toPractise">
      <div>
        <i class="iconfont">&#xe61b;</i>
      </div>
      <div class="index-bottom-nav-text">练习</div>
    </div>
    <div class="index-bottom-nav-components-item"
      :class="{'index-bottom-nav-components-item-active': type==='course'}" 
      @click="toCourse">
      <div>
        <i class="iconfont">&#xe613;</i>
      </div>
      <div class="index-bottom-nav-text">课程</div>
    </div>
    <div class="index-bottom-nav-components-item"
      :class="{'index-bottom-nav-components-item-active': type==='mycenter'}"
      @click="toMycenter">
      <div>
        <i class="iconfont">&#xe6b8;</i>
      </div>
      <div class="index-bottom-nav-text">我的</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'type'
  ],
  methods: {
    toPractise () {
      wx.redirectTo({
        url: '/pages/index/main'
      })
    },
    toCourse () {
      wx.redirectTo({
        url: '/pages/course/pages/course_center/main'
      })
    },
    toMycenter () {
      wx.redirectTo({
        url: '/pages/my/pages/my_center/main'
      })
    }
  }
}
</script>

<style lang="less">

  /*首页 tab切换*/
  .index-bottom-nav-components-container {
    width: 100%;
    z-index: 99;
    display: flex;
    background-color: #fff;
    .index-bottom-nav-components-item {
      flex: 1;
      text-align: center;
      .iconfont {
        font-size: 40rpx;
      }
      .index-bottom-nav-text {
        font-size: 30rpx;
      }
    }
    .index-bottom-nav-components-item-active {
      color: #0A9DFF;
    }
  }
</style>
