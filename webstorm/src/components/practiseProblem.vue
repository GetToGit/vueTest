<template>
  <div class="practise-problem-components-container container"
  	:class="{
  		'practise-problems-font-default': fontType == 'default',
  		'practise-problems-font-medium': fontType == 'medium',
  		'practise-problems-font-large': fontType == 'large',
  		'practise-problems-bgc-day': dayType == 'day',
  		'practise-problems-bgc-night': dayType == 'night',
  	}">
    <div style="height: 90%; position:fixed; left: 0; top: 0; width: 100%;">
      
    	<div class="title">
  	  	<div class="left">{{practiseDetail.name}}</div>
  	  	<div class="right">{{index + 1}}/{{total}}</div>
    	</div>
    	<div class="content" v-if="item.type != 5 && item.type != 6">
    		<div class="content-title">
    			<span>({{chooseProblem[item.type]}})</span>
    			<span>{{item.question}}</span>
    		</div>
    		<div class="contnet-description" 
          v-if="item.type == 1 || item.type == 2 || item.type == 3">与这段文字意思相符的一项是( )</div>
    		<div class="choose">
    			<div class="choose-content" v-for="(item, index) in item.option" :key="item.name">
    				<div>
    					<span :class="{'choose-content-active': item.checked}" 
    						@click="choose(index, item.checked, item)">
    						{{item.value}}</span>
    				</div>
    				<div style="margin-left: 10rpx;">{{item.content}}</div>
    			</div>
    		</div>
        <div v-if="item.type == 4">
          <textarea v-model="commentValue" style="border: 1px solid #ccc; width: 100%;"></textarea>
        </div>
    	</div>

      <div class="content-6" v-if="item.type == 6">
        <div class="content-6-title">{{item.question}}</div>
        <div class="content-6-item">
          <textarea @input="fill" maxlength="50" placeholder="请输入答案"></textarea>
        </div>
      </div>

      <div class="content-5" v-if="item.type == 5">
        <div class="content-title">
          <span>({{chooseProblem[item.type]}})</span>
          <span>{{item.question}}</span>
        </div>
        <div class="content-5-title">
          <div class="abs">
            <span style="left: 10rpx;top: 5rpx;"></span>
            <span style="left: 10rpx;top: 14rpx;"></span>
          </div>
          <span>{{item.subType == 0 ? '主观题' : '客观题'}}</span>
        </div>
        <div class="content-5-subQuestion">{{item.subQuestion}}</div>
        <div style="padding: 30rpx;" v-if="item.subType == 0 || item.subType == 4">
          <textarea v-model="commentValue" style="border: 1px solid #ccc; width: 100%;"></textarea>
        </div>
        <div class="choose" v-if="item.subType == 1 || item.subType == 2 || item.subType == 3">
          <div class="choose-content" v-for="(item, index) in item.option" :key="item.name">
            <div> 
              <span :class="{'choose-content-active': item.checked}" 
                @click="choose(index, item.checked, item)">
                {{item.value}}</span>
            </div>
            <div style="margin-left: 10rpx;">{{item.content}}</div>
          </div>
        </div>
        <div class="content-6" v-if="item.subType == 6">
          <div class="content-6-item">
            <textarea @input="fill" maxlength="50" placeholder="请输入答案"></textarea>
          </div>
        </div>
      </div>

    </div>

  	<div class="practise-problems-fixed">
  		<problemNav :result="resultTime"
  			@changeResultTime="changeResultTime"
  			@examinationPage="examinationPage"
  			@bgcChange="bgcChange" 
  			@fontSizeChange="fontSizeChange" 
  			@collectChange="collectChange"/>
  	</div>
  </div>
</template>

<script>
import problemNav from '../pages/practise/template/problemNav'
import fly from '@/lib/fetch'
import Toast from 'mp-weui/packages/toast'

export default {
	name: 'PractiseProblem',
  props: [
  	'index',
  	'item',
  	'total',
  	'practiseDetail'
  ],
  components: {
		problemNav
  },
  data () {
  	return {
  		fontType: null,
  		dayType: null,
  		resultTime: '00:00',
      commentValue: '',
  		chooseType: {
  			'0': 'A',
  			'1': 'B',
  			'2': 'C',
  			'3': 'D',
  			'4': 'E',
  			'5': 'F',
  			'6': 'G'
  		},
  		chooseProblem: {
  			'1': '单选题',
  			'2': '多选题',
  			'3': '判断题',
  			'4': '分析题',
        '5': '材料题',
        '6': '填空题'
  		}
  	}
  },
  methods: {
  	choose (index, checked, item) {
  		this.$emit('choose', this.index, index, checked, item, this.resultTime)
  	},
  	// 定时器
		changeResultTime (time) {
			this.resultTime = time
		},
		// 白天夜晚切换背景色
		bgcChange (type) {
			console.log(type)
			this.dayType = type
		},
		// 字体大小切换
		fontSizeChange (type) {
			console.log(type)
			this.fontType = type
		},
		// 收藏本题
		collectChange (type) {
			let userId = 67;
			let qaBankId = this.item.id;
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
		// 交卷
		examinationPage () {
			this.$emit('examinationPageIndex', this.resultTime)
		},
    // 填空题
    fill (e) {
      console.log(e.mp.detail.value)
      let value = e.mp.detail.value
      this.$emit('fillValue', this.index, this.resultTime, value)
    }
  },
  watch: {
    commentValue: function (val) {
      console.log(this.commentValue)
      this.$emit('commentValue', this.index, this.commentValue, this.resultTime)
    },
  }
}
</script>

<style lang="less">
	@import './less/variable';
  @import '../less/function.less';
  
	.practise-problem-components-container {
		background-color: #fff;
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
		}

    // 材料题
    .content-5 {
      .content-title {
        border: none;
        padding: 15rpx 30rpx 40rpx 30rpx;
        background-color: #F5F7F6;
        font-size: @practiseProblemComponentsContentTitleFontS;
        span {
          &:first-child {
            color: @practiseProblemComponentsContentTitleSpanFirstColor;
          }
        }
      }
      .choose {
        padding: 30rpx;
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
      }
        
      .content-5-title {
        position: relative;
        padding: 15rpx 30rpx;
        font-size: 30rpx;
        border-top: 1px solid #E1E1E1;
        border-bottom: 1px solid #E1E1E1;
      }
      .content-5-subQuestion {
        padding: 15rpx 30rpx;
        font-size: 30rpx;
        border-bottom: 1px solid #E1E1E1;
      }
      .abs {
        position: absolute;
        left: 45%; top: -25rpx;
        width: 80rpx;
        height: 25rpx;
        background-color: #C5CAC4;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        span {
          position: absolute;
          width: 60rpx;
          height: 3rpx;
          background-color: #fff;
        }
      }
    }

    // 填空题
    .content-6 {
      .content-6-title {
        padding: 30rpx; font-size: 30rpx;
      }
      .content-6-item {
        margin-bottom: 30rpx;
        padding: 0 30rpx; height: 130rpx;
        textarea {
          border: 1px solid #ccc; width: 100%; height: 100%; background-color: #FAF8FB;
        }
      }
    }

		// 底部固定
		.practise-problems-fixed {
			position: fixed;
			left: 0; bottom: 0;
			width: 100%;
			.title {
				border: none;
			}
		}

    textarea {
      font-size: 30rpx;
    }
	}

	.practise-problems-font-default {
  	.title, .content-title, .contnet-description, .choose-content {
  		font-size: 26rpx!important;
  	}
  }
  .practise-problems-font-medium {
  	.title, .content-title, .contnet-description, .choose-content {
  		font-size: 30rpx!important;
  	}

  }
  .practise-problems-font-large {
  	.title, .content-title, .contnet-description, .choose-content {
  		font-size: 34rpx!important;
  	}
  }
  .practise-problems-bgc-day {
  	background-color: #fff;
  }
  .practise-problems-bgc-night {
  	.title, .content-title, .contnet-description, .choose-content {
  		color: #fff!important;
  	}
  	background-color: #000;
  }

</style>
