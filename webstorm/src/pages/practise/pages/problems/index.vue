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
  				<practiseProblem :item="item"
  					:index="index"
  					:total="total" 
  					:practiseDetail="practiseDetail"
  					@choose="choose"
  					@commentValue="commentValue"
  					@examinationPageIndex="examinationPageIndex"
  					@fillValue="fillValueIndex"/>
  			</swiper-item>
  		</block>
  	</swiper>

  	<problemPause v-if="showPause" :total="total" @hidePause="hidePause"/>

  	<div v-show="showProblemPrompt">
  		<problemPrompt @toQucikPractise="toQucikPractise"/>
  	</div>
  </div>
</template>

<script>
import practiseProblem from '@/components/practiseProblem'
import problemNav from '../../template/problemNav'
import problemPause from '../../template/problemsPause'
import problemPrompt from '../../template/problemPrompt'
import fly from '@/lib/fetch'

export default {
	components: {
		problemNav,
		problemPause,
    practiseProblem,
    problemPrompt
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
	    showProblemPrompt: false,
	    currentPage: 29
		}
	},
	mounted () {
		this.checkData();
		this.checkTitle();
		this.getListType();
	},
	methods: {
		// 初始化数据
		checkData () {
			let practiseDetail = wx.getStorageSync('subjectDetail')
			this.practiseDetail = practiseDetail
	    this.xinwenList = []
	    this.xinwenAnswer = []
	    this.resultTime = '00:00'
		},

		// 标题
		checkTitle () {
			// 修改wx自带title
			if (this.practiseDetail.name) {
				wx.setNavigationBarTitle({
		 			title: this.practiseDetail.name
		 		})
			}

			// 快速练习
			this.showProblemPrompt = false
	    if (this.practiseDetail.name === '快速练习') {
	    	let problemsHideProblemPrompt = wx.getStorageSync('problemsHideProblemPrompt')
	    	if (!problemsHideProblemPrompt) {
	    		this.showProblemPrompt = true
	    	}
	    }
		},

		// 获取题目数据TYPE
		getListType () {
			let type = wx.getStorageSync('getProblemType');
			let userId = 67;
			let url = null;
			let subjectId = null;
			let paperType = null;
			let paperId = null;
			console.log(type);
			switch (type) {
				// 章节练习
				case 0:					
					let cateId = 28;
					url = `/api/exercise/v1/qa/${cateId}/${userId}`;
					this.getPratise(url);
					break;
				// 快速练习
				case 1:
					subjectId = wx.getStorageSync('classifyId');
					paperType = wx.getStorageSync('pagerType');
					url = `/api/paper/v1/auto-exercise/${userId}/${subjectId}/${paperType}`;
					this.getAutoExercise(url);
					break;
				// 智能组卷
				case 2:
					subjectId = wx.getStorageSync('classifyId');
					paperType = wx.getStorageSync('pagerType');
					url = `/api/paper/v1/auto-paper/${userId}/${subjectId}/${paperType}`;
					this.getAutoPaper(url);
					break;
				// 普通卷子
				case 3:
					paperId = wx.getStorageSync('problems2_id');
					paperType = wx.getStorageSync('pagerType');
					url = `/api/paper/v1/detail/${paperId}/${userId}/${paperType}`;
					this.getPaper(url);
					break;
			}
		},

		// 章节练习
		getPratise (url) {
	    fly.get(`${url}`).then((res)=>{
	      let { code, data, message } = res.data;
	      if (code === 200 && data) {
	      	wx.setStorageSync('exerciseHistoryId', data.exerciseHistoryId)
	      	this.checkList(data)
	      }
	    }).catch(err=>{
	      console.error(err)
	    })
		},

		// 快速练习
		getAutoExercise (url) {
			fly.post(`${url}`).then((res)=>{
	      let { code, data, message } = res.data;
	      if (code === 200 && data) {
	      	wx.setStorageSync('paperHistoryId', data.paperHistoryId);
	      	this.checkList(data);
	      }
	    }).catch(err=>{
	      console.error(err);
	    })
		},

		// 智能组卷
		getAutoPaper (url) {
			fly.post(`${url}`).then((res)=>{
	      let { code, data, message } = res.data;
	      if (code === 200 && data) {
	      	wx.setStorageSync('paperHistoryId', data.paperHistoryId);
	      	this.checkList(data);
	      }
	    }).catch(err=>{
	      console.error(err);
	    })
		},

		// 普通卷子
		getPaper (url) {
			fly.get(`${url}`).then((res)=>{
	      let { code, data, message } = res.data;
	      if (code === 200 && data) {
	      	wx.setStorageSync('paperHistoryId', data.paperHistoryId);
	      	this.checkList(data);
	      }
	    }).catch(err=>{
	      console.error(err);
	    })
		},

		// 处理List数据
		checkList (data) {
			console.log(data)
			if (!data) return
			let qaBankList = data.qaBankList;
    	qaBankList.forEach((item) => {
    		if (item.option) {
      		item.option = JSON.parse(item.option);
      		item.option.forEach((item) => {
      			item.checked = false;
      		})
    		}
    	})
    	this.xinwenList = qaBankList;
    	this.total = qaBankList.length;
		},

		// 快速练习
		toQucikPractise (bool) {
			if (bool) {
				wx.setStorageSync('problemsHideProblemPrompt', true)
			}
			this.showProblemPrompt = false
		},

		// 选择题目
		choose(Index, index, checked, checkItem, time) {
			let item = this.xinwenList[Index]
			// 单选
			if (item.type === 1 || item.type === 3 || item.subType === 1 || item.subType === 3) {
				item.option.forEach(item => item.checked = false)
				item.option[index].checked = !checked
			}
			// 多选
			if (item.type === 2 || item.subType === 2) {
				item.option[index].checked = !checked
			}
			this.checkResultItem(Index)
		},

		// 结果题目
		checkResultItem (index, time) {
			let result = {
		    "qaBankId": 0,
		    "useTime": 0,
		    "userAnswer": ""
		  }
		  let item = this.xinwenList[index]
		  result.qaBankId = item.id
		  result.useTime = time
		  // result.useTime = 
		  // 单选
		  if (item.type === 1 || item.type === 3) {
		  	item.option.forEach((item) => {
		  		if (item.checked) {
		  			result.userAnswer = item.value
		  		}
		  	})
		  }
		  // 多选
		  if (item.type === 2) {
		  	item.option.forEach((item) => {
		  		if (item.checked) {
		  			result.userAnswer += item.value + '@'
		  		}
		  	})
		  	result.userAnswer = result.userAnswer.substring(0, result.userAnswer.length - 1)
		  }
		 	let current = false;
		  this.xinwenAnswer.forEach((item) => {
		  	if (item.qaBankId === result.qaBankId) {
		  		current = true
		  		item.useTime = this.resultTime
		  		item.userAnswer = result.userAnswer
		  	}
		  })
		  if (!current) this.xinwenAnswer.push(result)
		},

		// 分析题答案
		commentValue (index, val, time) {
			let result = {
		    "qaBankId": 0,
		    "useTime": 0,
		    "userAnswer": ""
		  }
		  let item = this.xinwenList[index]
		  result.qaBankId = item.id
		  result.userAnswer = val;
		  result.useTime = time
		  let current = false;
			this.xinwenAnswer.forEach((item) => {
		  	if (item.qaBankId === result.qaBankId) {
		  		current = true
		  		item.useTime = this.resultTime
		  		item.userAnswer = result.userAnswer
		  	}
		  })
		  if (!current) this.xinwenAnswer.push(result)
		},

		// 填空题答案
		fillValueIndex (index, time, val) {

		},

		// 交卷
		examinationPageIndex (time) {
			let type = wx.getStorageSync('getProblemType');
			wx.setStorageSync('userAnswerProblems', JSON.stringify({
				xinwenList: this.xinwenList,
				xinwenAnswer: this.xinwenAnswer,
				time: time,
				type: type === 0 ? 'problem1' : 'problem2'
			}))
			// wx.setStorageSync('practiseSecondPageType', 0);
			wx.navigateTo({
        url: '/pages/practise/pages/answer/main'
      })
      // wx.navigateTo({
      //   url: '/pages/practise/pages/second/main'
      // })
		},

		swiperChange (e) {
			console.log(e.mp.detail.current)
		},

		// 隐藏暂停
		hidePause () {
			this.showPause = false
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

	  swiper {
			height: 100%;
		}

	  .vol-swiper-item {  
		  box-sizing: border-box;  
		}

		// 底部固定
		.practise-problems-fixed {
			position: fixed;
			left: 0; bottom: 0;
			width: 100%;
		}
  }
</style>
