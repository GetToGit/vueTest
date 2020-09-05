<template>
  <div class="course-pic-template-containter container">
  	<img class="course-pic-template-img" :src="coursePicDetail.picSrc" />
  	<div class="course-pic-template-bg">
  		<div class="course-pic-template-bg-pic"></div>
  		<span class="course-pic-template-bg-person">
  			<icon class="iconfont">&#xe6b8;</icon>
  			<span>{{coursePicDetail.person}}</span>
  		</span>
  		<span class="course-pic-template-bg-appraise">
  			<icon class="iconfont">&#xe730;</icon>
  			<icon class="iconfont">&#xe730;</icon>
  			<icon class="iconfont">&#xe730;</icon>
  			<span>{{coursePicDetail.persons}}人评价</span>
  		</span>
  		<span class="course-pic-template-bg-test">
  			<icon class="iconfont">&#xe63d;</icon>
  			<span>{{testText}}</span>
  		</span>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
	props: [
		'coursePicDetail'
	],
	data () {
		return {
			testText: '试学'
		}
	}
}
</script>

<style lang="less">

  .course-pic-template-containter {
  	height: 100%;
  	position: relative;

  	// 图片
  	.course-pic-template-img {
  		width: 100%; height: 100%;
  	}

  	// 遮挡部分
  	.course-pic-template-bg {
  		width: 100%;
  		height: 100%;
  		position: absolute;
  		left: 0; top: 0;
  		.course-pic-template-bg-pic {
  			background-color: #000;
  			width: 100%;
  			height: 100%;
  			position: absolute;
  			left: 0; top: 0;
  			opacity: 0.3
  		}

  		.course-pic-template-bg-person {
  			color: #fff;
  			position: absolute;
  			left: 15rpx; bottom: 10rpx;
  			.iconfont {
					vertical-align: baseline;
  			}
  			span {
  				margin-left: 10rpx;
  			}
  		}
  		.course-pic-template-bg-appraise {
  			color: #fff;
  			position: absolute;
  			right: 15rpx; bottom: 10rpx;
  			.iconfont {
  				margin-right: 15rpx;
					vertical-align: baseline; color: #D17F05;
  			}
  			span {
  				margin-left: 10rpx;
  			}
  		}
  		.course-pic-template-bg-test {
  			left: 40%;
  			top: 30%;
  			color: #fff;
  			position: absolute;
  			display: inline-block;
  			padding: 8rpx 30rpx 10rpx;
  			border: 1px solid #fff;
  			border-radius: 50rpx;
  			background-color: #000;
  			.iconfont {
  				margin-right: 5rpx;
					vertical-align: baseline;
  			}
  		}
  	}
  }
</style>
