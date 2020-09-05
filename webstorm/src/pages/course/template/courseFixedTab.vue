<template>
  <div class="course-fixed-tab-template-containter container">
  	<div class="course-fixed-tab-template-1">
  		<span style="color: #FD1506;" @click="toBuy">
  			<i class="iconfont">&#xe6ba;</i>
  			购买VIP
  		</span>
  		<span style="background-color: #3399FF; color: #fff;" @click="study">开始学习</span>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
  methods: {
    toBuy () {
      wx.setStorageSync('settingsPageType', 3)
      let url = '/pages/my/pages/settings/main'
      wx.navigateTo({
        url
      })
    },
    study () {
      let url = '/pages/course/pages/course_detail/main'
      wx.navigateTo({
        url
      })
    }
  }

}
</script>

<style lang="less">
  .course-fixed-tab-template-containter {
  	width: 100%;
  	background-color: #fff;
  	z-index: 9;
  	.course-fixed-tab-template-1 {
  		display: flex;
  		font-size: 30rpx;
  		span {
  			flex: 1;
  			text-align: center;
  			height: 80rpx;
  			line-height: 80rpx;
  		}
  	}
  }
</style>
