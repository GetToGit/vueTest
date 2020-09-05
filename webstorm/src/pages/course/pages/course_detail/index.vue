<template>
  <div class="course-live-containter container">
  	<!-- 直播介绍 -->
  	<div class="course-live-video">
			<live-player mode="live"
				:src="videoSrc"
				autoplay 
				bindstatechange="statechange" 
				binderror="error"
				style="width: 100%; height: 100%;"/>
  	</div>
  	<div class="course-live-announcement">
  		<span style="margin-left: 15rpx; color: #409FFC;">公告</span>
  		<span style="margin-left: 30rpx;">课程优惠活动在继续进行中...</span>
  	</div>

  	<div>
  		<div style="overflow: hidden; font-size: 32rpx;padding: 10rpx 0;">
  			<span style="float: right; margin-top: 7rpx; margin-right: 30rpx;">收起</span>
  			<span style="float: right;margin-right: 5rpx;"><i class="iconfont">&#xe6a6;</i></span>
  		</div>

  		<div>
  			<div class="course-content-box">
  				<div>
  					<span>张无忌</span>
  					<span>2017-son</span>
  				</div>
  				<div>就像开店的医院</div>
  			</div>
  		</div>
  	</div>


  	<div class="indexBottom">
  		<span><i class="iconfont">&#xe662;</i></span>
  		<span><i class="iconfont">&#xe602;</i></span>
  		<span><i class="iconfont">&#xe62e;</i></span>
  		<span><i class="iconfont">&#xe616;</i></span>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'
import courseDetail from '../../template/courseDetail'
import courseCatalogue from '../../template/courseCatalogue'
import coursePic from '../../template/coursePic'
import courseTitle from '../../template/courseTitle'
import courseEvaluate from '../../template/courseEvaluate'
import courseFixedTab from '../../template/courseFixedTab'
import tabChange from '@/components/tabChange'
import lists from '../../template/lists'
import formatTime from '@/lib/formatTime'

export default {
	components: {
		lists,
    tabChange,
    coursePic,
    courseTitle,
    courseDetail,
    courseCatalogue,
    courseEvaluate,
    courseFixedTab
  },
	data () {
		return {
			videoSrc: '',
      contents: []
		}
	},
	mounted () {
		this.getLiveVideo()
		this.getCommentList()
	},
	methods: {
		// 获取直播地址
		getLiveVideo () {
			let liveId = 1;
			let courseId = 1;
			fly.get(`/api/live/v1/address/${liveId}/${courseId}`).then((res) => {
	      let { code, data, message } = res.data
	      if (code === 200 && data) {
	      	this.videoSrc = data
	      	console.log('123:' + this.videoSrc)
	      }
	    }).catch(err=>{
	      console.log(err)
	    })
		},

		// 获取评论
		getCommentList () {
			let courseId = 1;
			let chatId = 0;
			fly.get(`/api/live/v1/live/chat/${courseId}/${chatId}`).then((res) => {
				console.log(res)
			})
		}
	}
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .course-live-containter {
  	height: 100%;
  	background-color: #F8F9FB;
  	.course-live-video {
  		height: 380rpx;
  	}
  	.course-live-title {
  		padding: 30rpx 40rpx;
  	}
  	.course-live-announcement {
  		padding: 20rpx 10rpx;
  		font-size: 32rpx;
  		background-color: #FEF5D8;
  	}
  	.course-content-box {
  		padding: 0 30rpx;
  		margin-bottom: 30rpx;
  		div {
  			&:nth-child(1) {
  				font-size: 30rpx;
  				span {
  					&:nth-child(1) {
  						color: #478AE5;
  						margin-right: 20rpx;
  					}
  					&:nth-child(2) {
  						color: #979A9F;
  						font-size: 26rpx;
  					}
  				}
  			}
  			&:nth-child(2) {
  				font-size: 32rpx;
  			}
  		}
  	}

  	.indexBottom {
  		position: fixed;
  		left: 0; bottom: 0;
  		display: flex;
  		width: 100%;
  		background-color: #fff;
  		span {
  			padding: 5rpx 0;
  			flex: 1;
  			text-align: center;
  		}
  	}
  }
</style>
