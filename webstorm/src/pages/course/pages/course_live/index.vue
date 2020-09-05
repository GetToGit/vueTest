<template>
  <div class="course-live-containter container">
  	<!-- 直播介绍 -->
  	<div class="course-live-video">
			<!--<live-player mode="live"
				:src="videoSrc"
				autoplay 
				bindstatechange="statechange" 
				binderror="error"
				style="width: 100%; height: 100%;"/>-->
			<coursePic :coursePicDetail="coursePicDetail"/>
  	</div>

  	<!-- 直播标题 -->
  	<div class="course-live-title container">
    <!--<div style="font-size: 28rpx;">{{detail.title}}</div>
  		<div>
  			<span style="font-size: 28rpx; color: #FD1506;">¥{{detail.price}}</span>
  			<span style="font-size: 26rpx; color: #999; margin-left: 30rpx;">购买人数{{detail.person}}</span>
  		</div> -->
  		<courseTitle :courseTitleDetail="courseTitleDetail"/>
  	</div>

  	<!-- 分割线 -->
  	<div style="height: 30rpx; background: #f5f5f5;"></div>

  	<!-- tab切换 -->
  	<div class="course-live-tabs-change">
  		<tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        @changeTab="changeTab"/>
  	</div>

  	<!-- 课程详情 -->
  	<div v-show="tabIndex === 0">
  		<courseDetail :detail="detail"/>
  		<div style="height: 30rpx; background: #f5f5f5;"></div>
  		<courseEvaluate/>
  		<div style="padding-bottom: 150rpx;"></div>
  	</div>

  	<!-- 课程目录 -->
  	<div v-show="tabIndex === 1">
  		<courseCatalogue/>
  	</div>

  	<!-- 相关课程 -->
  	<div v-show="tabIndex === 2" style="margin-top: 30rpx; padding: 0 30rpx;">
  		<lists :lists="lists" :tabIndex="1"/>
  	</div>

  	<!-- 底部tab -->
  	<div style="position: fixed; left: 0; bottom: 0; width: 100%;">
  		<courseFixedTab/>
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
			// vip图片详情
			coursePicDetail: {
				picSrc: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
				person: '123123',
				persons: '100'
			},
			// 课程标题
			courseTitleDetail: {
				title: 'PS人像后期处理基础课程',
				total: '5'
			},
			detail: {
				title: 'PS人像后期处理基础课程',
				price: '800',
				person: '267',
				description: '课程描述'
			},
			tabIndex: 0,
      tabItems: [
        {
          name: '课程详情'
        },
        {
          name: '课程目录'
        },
        {
        	name: '相关课程'
        }
      ],
      lists: [],
      courseDetail: {}
		}
	},
	mounted () {
		this.getLiveVideo()
		this.getDirectList()
		this.courseDetail = wx.getStorageSync('courseListDetail')
		console.log(this.courseDetail)
	},
	methods: {
		// 获取直播地址
		getLiveVideo () {
			// let liveId = 1;
			// let courseId = 1;
			// fly.get(`/api/live/v1/address/${liveId}/${courseId}`).then((res)=>{
	  //     let { code, data, message } = res.data
	  //     if (code === 200 && data) {
	  //     	this.videoSrc = data
	  //     	console.log('123:' + this.videoSrc)
	  //     }
	  //   }).catch(err=>{
	  //     console.log(err)
	  //   })
		},
		// 获取直播列表
		getDirectList () {
			let type = 1;
			let cateId = 0;
			let curPage = 1;
	    fly.get(`/api/live/v1/intro/${type}/${cateId}/${curPage}`).then((res)=>{
	      let { code, data, message } = res.data
	      console.log(data)
	      if (code === 200 && data) {
	      	this.checkList(data)
	      }
	    }).catch(err=>{
	      console.log(err)
	    })
		},
		// 处理列表数据
		checkList (data) {
			if (data) {
				data.forEach((item) => {
					item.recentStartTimeText = formatTime(item.recentStartTime/1000, 'Y/M/D')
				})
				this.lists = data
			}
		},
		// 导航切换
    changeTab (index) {
      this.tabIndex = index;
    }
	}
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .course-live-containter {
  	.course-live-video {
  		height: 380rpx;
  	}
  	.course-live-title {
  		padding: 30rpx 40rpx;
  	}

  }
</style>
