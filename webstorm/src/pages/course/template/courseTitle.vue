<template>
  <div class="course-title-template-containter container">
  	<div class="course-title-template-vip">
  		<div>{{courseTitleDetail.title}}</div>
  		<div>共 <span style="color: #3399FF;">{{courseTitleDetail.total}}</span> 视频课时</div>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
	props: [
		'courseTitleDetail'
	]

}
</script>

<style lang="less">
  .course-title-template-containter {
  	.course-title-template-vip {
  		div {
  			&:nth-child(1) {
  				font-size: 30rpx;
  			}
  			 &:nth-child(2) {
  			 	color: #969696;
  				font-size: 26rpx;
  			}
  		}
  	}
  }
</style>
