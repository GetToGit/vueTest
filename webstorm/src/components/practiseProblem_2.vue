<template>
  <div class="practise-problem-components-container container">
  	<div class="title">
	  	<div class="left">{{practiseDetail.name}}</div>
	  	<div class="right">{{index + 1}}/{{total}}</div>
  	</div>
  	<div class="content">
  		<div class="content-title">
  			<span>({{chooseProblem[item.type]}})</span>
  			<span>{{item.question}}</span>
  		</div>
  		<div class="contnet-description">与这段文字意思相符的一项是( )</div>
  		<div class="choose">
  			<div class="choose-content" v-for="(item2, index2) in item.option" :key="item2.name">
  				<div>
  					<span :class="{
  						'choose-content-correct': item2.value == item.answer,
  						'choose-content-wrong': item2.value == 'a'
  					}">
  					{{item2.value}}</span>
  				</div>
  				<div style="margin-left: 10rpx;">{{item2.content}}</div>
  			</div>
  		</div>
  	</div>

  	<div style="height: 20rpx; background-color: #F5F5F5;"></div>

  	<div style="padding:30rpx 40rpx; border-bottom: 1px solid #f5f5f5;">
  		<div style="font-size: 30rpx;color: #666; margin-bottom: 5rpx;">答案</div>
  		<div style="font-size: 30rpx;">
  			<span>正确答案</span>
  			<span style="color:#41D497;">A</span>
  			<span>,错误答案</span>
  			<span style="color:#FC5E5E;">B</span>
  		</div>
  	</div>

  	<div style="padding:30rpx 40rpx; border-bottom: 1px solid #f5f5f5;display: flex;">
  		<div style="flex:1; text-align: center; font-size: 30rpx;">
  			<div>答题时间</div>
  			<div style="color: #E07A00;">0秒</div>
  		</div>
  		<div style="flex:1; text-align: center; font-size: 30rpx;">
  			<div>全站正确率</div>
  			<div style="color: #41D497;">70%</div>
  		</div>
  		<div style="flex:1; text-align: center; font-size: 30rpx;">
  			<div>易错项</div>
  			<div style="color: #FC5E5E;">B</div>
  		</div>
  	</div>

  	<div style="padding:30rpx 40rpx; border-bottom: 1px solid #f5f5f5;font-size: 30rpx;">
  		<div style="overflow:hidden;">
  			<div style="float: left;">解析</div>
  			<div style="float: right;color: #fff;padding: 10rpx 30rpx; background-color: #41D497; border-radius:30rpx;" @click="question">
  				<span>
  					<i class="iconfont" style="font-size: 28rpx;">&#xe600;</i>
  				</span>
  				<span>问老师</span>
  			</div>
  		</div>
		  <div style="margin-top: 15rpx; text-indent: 30rpx;">
				城市维护建设税以增值税和消费税为统计税为依据
			</div>
  	</div>

  	<div style="padding:30rpx 40rpx; border-bottom: 1px solid #f5f5f5;font-size: 30rpx;">
  		<div style="overflow:hidden;">
  			<div style="float: left;">考点</div>
  			<div style="float: right;color: #fff;padding: 10rpx 30rpx; background-color: #5CAC22; border-radius:30rpx;">
  				<span>权益法</span>
  			</div>
  		</div>
  	</div>

  	<div style="padding:30rpx 40rpx; font-size: 30rpx; overflow: hidden;">
  		<div style="float: left;">问题反馈</div>
  		<div style="float: right;" @touchstart="toFeedback">答案和解析反馈&gt;</div>
  	</div>

  </div>
</template>

<script>
export default {
	name: 'PractiseProblem',
  props: [
  	'index',
  	'item',
  	'total',
  	'practiseDetail'
  ],
  data () {
  	return {
  		chooseProblem: {
  			'1': '单选题',
  			'2': '多选题',
  			'3': '判断题',
  			'4': '分析题'
  		}
  	}
  },
  methods: {
  	question () {
  		this.$emit('question', true)
  	},
  	toFeedback () {
  		let url = '/pages/record/pages/feedback/main'
  		wx.navigateTo({ url })
  	}
  }
}
</script>

<style lang="less">
	@import './less/variable';
  @import '../less/function.less';
  
	.practise-problem-components-container {
		.title {
			overflow: hidden;
			padding: @practiseProblemComponentsTitlePadding;
			font-size: @practiseProblemComponentsTitleFontS;
			border-bottom: 1px solid @practiseProblemComponentsTitleBorderC;
			.left {
				float: left;
			}
			.right {
				float: right;
			}
		}

		.content {
			padding: @practiseProblemComponentsContentPadding;
			.content-title {
				border: none;
				font-size: @practiseProblemComponentsContentTitleFontS;
				margin-top: @practiseProblemComponentsContentTitleMarginT;
				span {
					&:first-child {
						color: @practiseProblemComponentsContentTitleSpanFirstColor;
					}
				}
			}
			.contnet-description {
				margin: @practiseProblemComponentsContentDescriptionMargin;
				font-size: @practiseProblemComponentsContentDescriptionFontS;
			}
		}

		.choose {
			padding: @practiseProblemComponentsChoosePadding;
			.choose-content {
				margin: @practiseProblemComponentsChooseMargin;
				div {
					&:nth-child(1) {
						display: inline-block;
						span {
							text-align: center;
							display: inline-block;
							color: @practiseProblemComponentsChooseCircleFontC;
							line-height: @practiseProblemComponentsChooseCircle;
							font-size: @practiseProblemComponentsChooseCircleFontS;
							border: 1px solid @practiseProblemComponentsChooseCircleBorderC;
							.cirlce(@practiseProblemComponentsChooseCircle, @practiseProblemComponentsChooseCircle, 50%);
						}
					}
					&:nth-child(2) {
						display: inline-block;
						font-size: @practiseProblemComponentsChooseCircleSpanFontS;
						margin-left: @practiseProblemComponentsChooseCircleSpanMargin;
					}
				}
			}
			.choose-content-active {
				color: @practiseProblemComponentsChooseContentActiveColor!important;
				background-color: @practiseProblemComponentsChooseContentBgc;
			}
			.choose-content-correct {
				color: #fff!important;
				background-color: #41D497;
				border: 1px solid #41D497!important;
			}
			.choose-content-wrong {
				color: #fff!important;
				background-color: #FC5E5E;
				border: 1px solid #FC5E5E!important;
			}
		}

	}

</style>
