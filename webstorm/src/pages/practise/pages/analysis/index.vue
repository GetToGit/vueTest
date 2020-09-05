<template>
  <div class="practise-problems-containter container">
  	<swiper class="container" 
  		:autoplay="autoplay" 
  		:interval="interval" 
  		:duration="duration"
  		:indicator-dots="indicatorDots"
  		@change="swiperChange">
  		<block v-for="item in xinwenList" :key="item.name">
  			<swiper-item class="vol-swiper-item">
  				<div>{{item.name}}</div>
  				<practiseProblem2 :item="item" 
  				:index="index"
  				:total="total" 
  				:practiseDetail="practiseDetail"
  				@question="question"/>
  			</swiper-item>
  		</block>
  	</swiper>

  	<div class="practise-problems-fixed">
  		<problemNav2 @examinationPage="examinationPage"
  			@bgcChange="bgcChange"
  			@fontSizeChange="fontSizeChange" 
  			@collectChange="collectChange"
  			@noteType="noteType"/>
  	</div>

  	<div class="question-teacher container" v-show="showQuestion">
  		<div style="overflow:hidden; font-size: 30rpx; padding: 30rpx 0;">
  			<div style="float: left;">您的疑问:</div>
  			<div style="float: right;">
  				<i class="iconfont" @click.stop="question(false)">&#xe62a;</i>
  			</div>
  		</div>
  		<div>
  			<!-- <input type="text"/> -->
  			<textarea v-model="textareaValue" style="border: 1px solid #ccc; width: 100%;"></textarea>
  		</div>

  		<div style="margin-top: 30rpx; text-align: center;font-size: 36rpx; color: #fff; padding: 15rpx 0; background-color: #3399FF;" @click="questionSubmit()">
  			提交
  		</div>
  	</div>

  	<div class="question-teacher-bg" v-show="showQuestion"></div>

  	<div class="question-teacher-bg-2" v-show="showNote">
  		<div style="overflow: hidden; font-size: 32rpx; padding: 10rpx;">
  			<span style="float: left; margin-top: 5rpx;" @click="saveNote">保存笔记</span>
  			<span style="float: right;" @click="showNote = false"><i class="iconfont">&#xe62a;</i></span>
  		</div>
  		<div style="padding: 0 10px;">
  			<textarea v-model="noteValue" style="border: 1px solid #ccc; width: 100%;"></textarea>
  		</div>
  	</div>

  	<problemPause v-if="showPause" :total="total" @hidePause="hidePause"/>
  </div>
</template>

<script>
import practiseProblem2 from '@/components/practiseProblem_2'
import problemNav2 from '../../template/problemNav2'
import problemPause from '../../template/problemsPause'
import Toast from 'mp-weui/packages/toast'
import fly from '@/lib/fetch'

export default {
	components: {
		problemNav2,
		problemPause,
    practiseProblem2
  },
	data () {
		return {
			hidden: false, 
	    indicatorDots: false,
	    autoplay: false,
	    interval: 1500,
	    duration: 500,
	    total: 0,
	    xinwenList: [],
	    xinwenAnswer: [],
	    showPause: false,
	    resultTime: '00:00',
	    practiseDetail: null,
	    showQuestion: false,
	    showNote: false,
	    currentIndex: 0,
	    textareaValue: '',
	    noteValue: ''
		}
	},
	mounted () {
		this.checkData();
		this.getList();
	},
	methods: {
		// 初始化数据
		checkData () {
			let practiseDetail = wx.getStorageSync('subjectDetail')
			this.practiseDetail = practiseDetail
	    this.xinwenList = []
	    this.xinwenAnswer = []

		},
		swiperChange (e) {
			this.currentIndex = e.mp.detail.current
		},
		question (bool) {
			this.showQuestion = bool
		},
		// 交卷
		examinationPage () {
			//
		},
		// 白天夜晚切换背景色
		bgcChange (type) {
			console.log(type)
		},
		// 字体大小切换
		fontSizeChange (type) {
			console.log(type)
		},
		// 收藏本题
		collectChange (type) {
			let userId = 67;
			let item = this.xinwenList[this.currentIndex];
			let qaBankId = item.id;
			let paperType = wx.getStorageSync('pagerType');
			let subjectId = wx.getStorageSync('classifyId');
      subjectId = 35;
			fly.post(`/api/qa-favorite/v1/add/${userId}/${qaBankId}/${paperType}/${subjectId}`, {}, { headers:{
        "content-type":"application/json"
      }}).then((res)=>{
        let { code, data, message } = res.data
        if (code === 200) {
        	console.log(res)
        	Toast('收藏成功')
        	return
        }
       	Toast(message)
      }).catch(err=>{
        console.log(err)
      })
		},
		// 隐藏暂停
		hidePause () {
			this.showPause = false
		},
		// 显示笔记遮罩
		noteType () {
			this.showNote = true
		},
		// 保存笔记
		saveNote () {
			let item = this.xinwenList[this.currentIndex];
			console.log(item)
			let userId = 67;
			let qaBankId = item.id;
			let paperType = 2;
			let subjectId = 35;
			fly.post(`/api/note/v1/add/${userId}/${qaBankId}/${paperType}/${subjectId}`, {
				note: this.noteValue
			}).then((res) => {
				console.log(res)
				let { code, data, message } = res.data
				if (code === 200) {
					Toast('添加笔记成功');
					this.showNote = false;
					this.noteValue = '';
				}
			})
		},
		// 提问
		questionSubmit () {
			let item = this.xinwenList[this.currentIndex];
			let userId = 67;
			let qaBankId = item.id;
			fly.post(`/api/paper/v1/qa-problem/${userId}/${qaBankId}`, {
				content: this.textareaValue
			}).then((res) => {
				let {code, message, data} = res.data
				if (code === 200) {
					this.textareaValue = ''
					this.showQuestion = false
					Toast('提问成功')
				}
				console.log(res)
			})
		},
		// 获取错题列表
		getList () {
      let userId = 67;
      let subjectId = 35;
      let paperType = 1;
      let chapterId = 0;
      let curPage = 1;
      fly.get(`/api/mistake/v1/list/${userId}/${paperType}/${chapterId}/${subjectId}/${curPage}`).then((res) => {
        let { code, message, data } = res.data;
        let arr = []
        data.forEach((item) => {
        	let obj = item.qaBank
        	if (obj.option) obj.option = JSON.parse(obj.option)
        	arr.push(obj)
        })
        this.xinwenList = arr
        this.total = arr.length
      }).catch((err) => {
        console.error(err);
      })
		}
	}

}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .practise-problems-containter {
	  height: 100%;
	  display: flex;
	  margin-top: 0rpx;
	  flex-direction: column;
	  margin-bottom: 90rpx;

	  .vol-swiper-item {  
		  box-sizing: border-box;  
		}
		
		swiper {
			height: 100%;
		}

		// 底部固定
		.practise-problems-fixed {
			position: fixed;
			left: 0; bottom: 0;
			width: 100%;
		}

		// 问老师
		.question-teacher {
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			z-index: 99999;
			background-color: #fff;
			padding: 0 30rpx 30rpx;
		}
		.question-teacher-bg {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0; top: 0;
			background-color: #000;
			opacity: 0.4;
			z-index: 999;
		}

		.question-teacher-bg-2 {
			width: 100%;
			height: 94%;
			position: fixed;
			left: 0; top: 0;
			background-color: #fff;
		}

  }
</style>
