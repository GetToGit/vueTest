<template>
  <div class="practise-problem-nav-template-containter container">
  	<div class="practise-problem-nav-template-item">
  		<span class="title" @click="collectChange('collect')">
  			<i class="iconfont">&#xe730;</i>
  		</span>
  	</div>
  	<div class="practise-problem-nav-template-item">
  		<span class="title">
  			<i class="iconfont">&#xe608;</i>
  		</span>
  	</div>
  	<div class="practise-problem-nav-template-item">
  		<span class="title" @click="examinationPage">
  			<i class="iconfont">&#xe624;</i>
  		</span>
  	</div>
  	<div class="practise-problem-nav-template-item">
  		<span class="practise-problem-nav-template-circle">
  			<span class="practise-problem-nav-template-circle-text">{{result}}</span>
  		</span>
  	</div>
  	<div class="practise-problem-nav-template-item" style="line-height: 40rpx;">
  		<div @click="dialogShow = !dialogShow">
  			<span class="practise-problem-nav-template-little-circle"></span>
  			<span class="practise-problem-nav-template-little-circle"></span>
  			<span class="practise-problem-nav-template-little-circle"></span>
  		</div>
  	</div>

  	<!-- dialog -->
  	<div class="practise-problem-nav-template-dialog" v-show="dialogShow">
  		<div class="practise-problem-nav-template-dialog-item">
  			<span @click="collectChange('collect')">收藏本题</span>
  		</div>
  		<div class="practise-problem-nav-template-dialog-item">
  			<span @click="fontSizeChange('default')">Aa</span>
  			<span @click="fontSizeChange('medium')" style="margin-left: 5rpx; font-size: 22rpx;">Aa</span>
  			<span @click="fontSizeChange('large')" style="margin-left: 5rpx; font-size: 24rpx;">Aa</span>
  		</div>
  		<div class="practise-problem-nav-template-dialog-item">
  			<div class="practise-problem-nav-template-dialog-itemTab">
  				<span @click="bgcChange('night')" 
  					:class="{'practise-problem-nav-template-dialog-itemTab-active':type==='night'}">夜间</span>
  				<span @click="bgcChange('day')" 
  					:class="{'practise-problem-nav-template-dialog-itemTab-active':type==='day'}">日间</span>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>

export default {
	name: 'ProblemNav',
	props: [
		'result'
	],
	data () {
		return {
			min: 0,
			second: 0,
			countDownTime: 1000,
			timer: null,
			type: 'day',
			dialogShow: false,
			timer: null
		}
	},
	mounted () {
		if (this.timer) {
			clearInterval(this.timer)
			this.min = 0;
			this.second = 0;
		}
		this.countDown()
	},
	methods: {
		countDown () {
			this.timer = setInterval(() => {
				this.second++
				if (this.second === 60) {
					this.second = 0
					this.min++
				}
				let result = `${this.min.toString().length === 1 ? `0${this.min}` : `${this.min}`}:${this.second.toString().length === 1 ? `0${this.second}` : `${this.second}`}`
				this.$emit('changeResultTime', result)
			}, this.countDownTime)
		},
		bgcChange (type) {
			this.type = type
			this.$emit('bgcChange', type)
		},
		fontSizeChange (type) {
			this.$emit('fontSizeChange', type)
		},
		collectChange (type) {
			console.log(type)
			this.$emit('collectChange', type)
		},
		examinationPage () {
			this.$emit('examinationPage')
		}
	}
}
</script>

<style lang="less">
	.practise-problem-nav-template-containter {
		color: #fff;
		display: flex;
		position: relative;
		text-align: center;
		background-color: #3399FF;
		.practise-problem-nav-template-item {
			flex: 1;
			padding: 10rpx;
			font-size: 24rpx;
			.title {
				line-height: 55rpx;
			}
		}
		.practise-problem-nav-template-little-circle {
			display: inline-block;
			width: 5rpx;
			height: 5rpx;
			border: 1px solid #fff;
			border-radius: 50%;
			margin-right: 5rpx;
		}
		.practise-problem-nav-template-circle {
			width: 50rpx;
			height: 50rpx;
			position: relative;
			display: inline-block;
			border-radius: 50%;
			border: 1px solid #fff;
		}
		.practise-problem-nav-template-circle-text {
			z-index: 9;
			font-size: 24rpx;
			position: absolute;
			left: -2rpx; top: 8rpx;
			background-color: #3399FF;
		}
		.practise-problem-nav-template-dialog {
			right: 0;
			bottom: 100%;
			position: absolute;
			background-color: #3399FF;
			.practise-problem-nav-template-dialog-item {
				color: #fff;
				padding: 10rpx;
				font-size: 16rpx;
				border-bottom: 1px solid #0071B7;

				&:last-child {
					border: none;
				}
			}
			.practise-problem-nav-template-dialog-itemTab {
				padding: 5rpx;
				border-radius: 10rpx;
				background-color: #006DB0;
				span {
					color: #0099FF;
					padding: 5rpx 10rpx;
					border-radius: 10rpx;
					display: inline-block;
				}
				.practise-problem-nav-template-dialog-itemTab-active {
					color: #fff;
					background-color: #3399FF;
				}
			}
		}
  }
</style>
