<template>
  <div class="course-list-template-containter container">
  	<div class="course-list-content" 
  		v-for="(item, index) in lists"
  		:key="item.name">
  		<div class="left">
  			<img :src="item.icon" style="width: 100%; height: 100%;" />
  		</div>
  		<div class="right container">
  			<div style="font-size: 34rpx; color: #000666;">{{item.name}}</div>
  			<div style="font-size: 27rpx; color: #428DF4; margin-top: 25rpx;">
          直播时间:{{item.recentStartTimeText}}
        </div>
  			<div style="font-size: 27rpx; color: #999; margin-top: 20rpx;">已报名{{item.studyNum}}人</div>
  			<div class="look" @click="toDetail(item)">{{tabIndex === 0 ? '看直播' : '进入听课'}}</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
	props: [
		'lists',
    'tabIndex'
	],
  methods: {
    toDetail (item) {
      wx.setStorageSync('courseListDetail', item);
      wx.navigateTo({ 
        url: '/pages/course/pages/course_live/main'
      })
    }
  }
}
</script>

<style lang="less">

  .course-list-template-containter {
  	padding-bottom: 40rpx;
  	border-bottom: 1px solid #B4B4B4;
  	overflow: hidden;
  	.course-list-content {
  		.left,.right {
  			float: left;
  		}
  		.left {
  			width: 45%;
  			height: 200rpx;
  			border-radius: 10rpx;
  		}
  		.right {
  			position: relative;
  			width: 55%;
  			padding-left: 40rpx;
  			.look {
  				padding: 5rpx 15rpx;
  				color: #428DF4;
  				position: absolute;
  				border: 1px solid #428DF4;
  				background-color: #fff;
  				right: 0; bottom: -5rpx;
  				font-size: 28rpx;
  				border-radius: 10rpx;
  			}
  		}
  	}

  }
</style>
