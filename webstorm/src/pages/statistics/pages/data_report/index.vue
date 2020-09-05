<template>
  <div class="data-report-containter containter">

  	<!-- title -->
    <div class="title">
    	<div>{{titleText}}</div>
    	<div>{{titleScore}}</div>
    </div>

    <!-- score -->
    <div class="score">
  		<div class="item item_1">
  			<div>全站最高分</div>
  			<div>99</div>
  		</div>
  		<div class="item item_2">
  			<div>我的排名</div>
  			<div>123123123</div>
  		</div>
    </div>

    <!-- total -->
    <div class="total">
  		<div class="item item_1">
  			<div>答题数量</div>
  			<div>
  				<span style="font-size: 80rpx;">688</span>
  				<span>道</span>
  			</div>
  		</div>
  		<div class="item item_2">
  			<div>正确率</div>
  			<div>
  				<span style="font-size: 80rpx;">34</span>
  				<span>%</span>
  			</div>
  		</div>
    </div>

    <!-- score_2 -->
    <div class="score">
  		<div class="item item_1">
  			<div>全站最高答案题量</div>
  			<div>2222299</div>
  		</div>
  		<div class="item item_2">
  			<div>我的排名</div>
  			<div>123123123</div>
  		</div>
    </div>

    <!-- chart -->
    <div class="chart">
    	<div class="title">预测分趋势</div>
    </div>

    <!-- report -->
    <div class="report">
    	<div class="report-item containter">
    		<div class="report-title report-title-1">练习天数</div>
    		<div class="report-content report-content-1">
    			<span>18</span>
    			<span>天</span>
    		</div>
    	</div>
    	<div class="report-item containter">
    		<div class="report-title report-title-2">答题时长</div>
    		<div class="report-content report-content-2">
    			<span>4</span>
    			<span>小时</span>
    		</div>
    	</div>
    	<div class="report-item containter">
    		<div class="report-title report-title-3">创建练习</div>
    		<div class="report-content report-content-3">
    			<span>51</span>
    			<span>次</span>
    		</div>
    	</div>
    </div>

    <!-- time -->
    <div class="time">
    	<div>生成时间: 2018.05.25 09:28</div>
    	<div>以上全站数据基于国考所有考生</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    	titleText: '预测分',
    	titleScore: '64.2'
    }
  }
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  // 数据报告
  .data-report-containter {

  	// 标题
  	.title {
  		background-color: @dataReportTitleBgc;
  		div {
  			color: @dataReportTitleColor;
  			&:nth-child(1) {
  				font-size: @dataReportTitleFontS;
  				text-indent: @dataReportTitleTextIndex_1;
  			}
  			&:nth-child(2) {
  				text-align: center;
  				font-size: @dataReportTitleFontS_2;
  				padding-bottom: @dataReportTitlePaddingB;
  			}
  		}
  	}

  	// 分数
  	.score {
  		display: flex;
  		background-color: @dataReportScoreBgc;
  		padding: @dataReportScoreContainerPadding;
  		.item {
  			flex: 1;
  		}
  		.item_1, .item_2 {
  			div {
  				color: @dataReportScoreTitleColor;
  				&:nth-child(1) {
  					color: @dataReportScoreTitleColor;
  					font-size: @dataReportScoreTitleFontS;
  				}
  				&:nth-child(2) {
  					color: @dataReportScoreValueFontS;
  					font-size: @dataReportScoreValueColor;
  				}
  			}
  		}
  		.item_1 {
  			text-indent: 40rpx;
  		}
  	}

  	// 数量
  	.total {
  		display: flex;
  		background-color: @dataReportTotalBgc;
  		padding: @dataReportTotalContainerPadding;
  		.item {
  			flex: 1;
  		}
  		.item_1, .item_2 {
  			div {
  				color: #fff;
  				&:nth-child(1) {
  					font-size: @dataReportScoreTitleFontS;
  				}
  				&:nth-child(2) {
  					font-size: @dataReportScoreValueColor;
  				}
  			}
  		}
  		.item_1 {
  			text-indent: 40rpx;
  		}
  	}

  	// 预测分趋势图
  	.chart {
  		background-color: #fff;
  		// title
  		.title {
  			background-color: #fff;
  			color: @dataReportChartTitleColor;
  			margin: @dataReportChartTitleMargin;
  			font-size: @dataReportChartTitleFontS;
  			text-indent: @dataReportChartTitleTextIndex;
  		}
  	}

  	// 记录
  	.report {
  		display: flex;
  		padding: @dataReportReportPadding;
  		background-color: @dataReportReportBgc;
  		.report-item {
  			flex: 1;
  			.report-title {
  				color: @dataReportReportTitleColor;
  				font-size: @dataReportReportTitleFontS;
  			}
  			.report-title-1 {
					margin-left: 40rpx;
  			}
  			.report-title-2 {
  				text-align: center;
  			}
  			.report-title-3 {
  				text-align: right;
  				margin-right: 40rpx;
  			}
  			.report-content {
  				span{
  					color: @dataReportReportContentColor;
  					&:nth-child(1) {
  						font-size: @dataReportReportContentFontS_1;
  					}
  					&:nth-child(2) {
  						font-size: @dataReportReportContentFontS_2;
  					}
  				}
  			}
  			.report-content-1 {
					margin-left: 40rpx;
  			}
  			.report-content-2 {
  				text-align: center;
  			}
  			.report-content-3 {
  				text-align: right;
  				margin-right: 72rpx;
  			}
  		}
  	}

  	// 底部固定
  	.time {
  		width: 100%;
  		bottom: 0;
  		position: fixed;
  		background-color: #fff;
  		padding: @dataReportReportTimePadding;
  		div {
  			text-align: center;
  			color: @dataReportReportTimeColor;
  			font-size: @dataReportReportTimeFontS;
  		}
  	}

  }
</style>
