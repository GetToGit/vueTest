<template>
  <div class="my-center-settings-medal-detail-container containter">
  	<div style="height: 20rpx; background-color: #F5F5F5;"></div>
  	<div style="font-size: 32rpx; text-align: center; margin-top: 50rpx;">
  		<span>{{id}}&nbsp;&nbsp;</span>
  		<span>恭喜您获得新的勋章</span>
  	</div>
  	<div style="font-size: 32rpx; text-align: center; margin-top: 10rpx;">
  		<span>已有&nbsp;</span>
  		<span style="color: #FB2929;">{{persons}}</span>
  		<span>人获得奖励</span>
  	</div>
  	<div style="text-align: center; margin-top: 100rpx;">
  		<span class="circle"></span>
  	</div>
  	<div style="font-size: 36rpx; text-align: center; margin-top: 10rpx;">新手入门</div>
  	<div style="font-size: 36rpx; text-align: center; margin-top: 30rpx; color: #E37222;" 
  		@click="encourageDialog = true">点击领取奖励</div>
  	<div style="text-align: center; margin-top: 50rpx; position: relative;">
  		<span style="font-size: 30rpx; color: #9B9B9B;">继续努力</span>
  		<span class="left-pos-line"></span>
  		<span class="right-pos-line"></span>
  	</div>

  	<div class="box-shadow" v-show="encourageDialog"></div>
  	<div class="box-shadow-content" v-show="encourageDialog">
  		<div class="title">勋章奖励</div>
  		<div class="text1">恭喜您获得优惠券奖励</div>
  		<div class="text2">优惠券号：{{num}}</div>
  		<div class="btn"><span>查看奖励</span></div>
  		<span class="icon" @click="encourageDialog = false"><i class="iconfont">&#xe62a;</i></span>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
	data () {
		return {
			id: 2330130,
			num: 5224234234234,
			persons: '600,2011,000',
			encourageDialog: true
		}
	}
}

</script>

<style lang="less">
  .my-center-settings-medal-detail-container {
  	.circle {
  		display: inline-block;
      width: 150rpx;
      height: 150rpx;
      border: 1px solid #ccc;
      border-radius: 50%;
  	}

  	.left-pos-line {
  		width: 15%;
  		height: 2px;
  		background-color: #9B9B9B;
  		position: absolute;
  		left: 25%; 
  		top: 50%;
  	}

  	.right-pos-line {
  		width: 15%;
  		height: 2px;
  		background-color: #9B9B9B;
  		position: absolute;
  		right: 25%; 
  		top: 50%;
  	}

  	.box-shadow {
  		width: 100%;
  		height: 100%;
  		background-color: #000;
  		opacity: 0.3;
  		position: fixed;
  		left: 0; top: 0;
  	}

  	.box-shadow-content {
  		width: 70%;
  		background-color: #fff;
  		position: fixed;
  		left: 15%;
  		top: 20%;

  		.title {
  			margin: 25rpx 0;
  			text-indent: 30rpx;
  			font-size: 34rpx;
  		}

  		.text1 {
  			color: #FF1A1A;
  			text-align: center;
  			font-size: 36rpx;
  			margin: 40rpx 0 10rpx 0;
  		}

  		.text2 {
  			color: #9B9B9B;
  			text-align: center;
  			font-size: 34rpx;
  			margin: 0 0 20rpx 0;
  		}
  		.btn {
  			text-align: center;
  			span {
  				display: inline-block;
  				width: 80%;
  				color: #fff;
  				font-size: 32rpx;
  				padding: 10rpx 0;
  				background-color: #3398FE;
  				margin-bottom: 45rpx;
  			}
  		}
  		.icon {
  			position: absolute;
  			right: 15rpx; top: 10rpx;
  		}
  	}
  }
</style>
