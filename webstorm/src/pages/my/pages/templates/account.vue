<template>
  <div class="my-center-settings-account-container containter">
  	<!-- 余额 -->
  	<div class="my-center-settings-account-title">
  		<div class="my-center-settings-account-title-price">
  				<span>¥</span>{{balance}}
  		</div>
  		<div style="text-align: center; color: #fff; font-size: 34rpx;">账户余额</div>
  	</div>

  	<!-- 重置和管理 -->
  	<div class="my-center-settings-account-content">
  		<div class="title">账户充值</div>
  		<div class="price-box">
  			<div class="price-box-item">
  				<div class="show-price"
  					:class="{
  						'show-price-active' : priceType === '6'
  					}"
  					@click="priceType = '6'">
  					<div>6元</div>
  					<div>售价3</div>
  				</div>
  			</div>
  			<div class="price-box-item" style="text-align: center;">
  				<div class="show-price"
  				:class="{
  					'show-price-active' : priceType === '68'
  				}"
  				@click="priceType = '68'">
  					<div>68元</div>
  					<div>售价58</div>
  				</div>
  			</div>
  			<div class="price-box-item" style="text-align: right;">
  				<div class="show-price"
  				:class="{
  					'show-price-active' : priceType === '208'
  				}"
  				@click="priceType = '208'">
  					<div>208元</div>
  					<div>售价188</div>
  				</div>
  			</div>
  		</div>
  		<div class="title">购物管理</div>
  		<div class="price-box">
  			<div class="price-box-item" @click="emitAccount('duihuan')">
  				<div style="text-align: center; color: #FEE17C;"><i class="iconfont">&#xe8e7;</i></div>
  				<div style="font-size: 32rpx;text-align: center" @click="emitAccount('duihuan')">兑换码激活</div>
  			</div>
  			<div class="price-box-item" style="text-align: center;" @click="emitAccount('youhui')">
  				<div style="text-align: center; color: #F1927D;"><i class="iconfont">&#xe669;</i></div>
  				<div style="font-size: 32rpx;text-align: center">优惠券</div>
  			</div>
  			<div class="price-box-item" style="text-align: right;" @click="emitAccount('jilu')">
  				<div style="text-align: center; color: #008C7B;"><i class="iconfont">&#xe652;</i></div>
  				<div style="font-size: 32rpx;text-align: center">消费记录</div>
  			</div>
  		</div>
  	</div>

  	<div style="height: 30rpx; background-color: #F6F6F6; margin-top: 30rpx;"></div>

  	<div class="my-center-settings-account-shuoming">
  		<div class="title">什么是兑换</div>
  		<div class="text">兑换码是APP外购买懂你的英语课凭证，用户凭证兑换码在APP内兑换相应课程。</div>
  	</div>

  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
	data () {
		return {
			balance: '500.00',
			priceType: '6'
		}
	},
  methods: {
    emitAccount (type) {
      this.$emit('emitAccountChange', type)
    }
  }
}

</script>

<style lang="less">
  .my-center-settings-account-container {
  	// 余额
  	.my-center-settings-account-title {
  		padding: 50rpx 0 30rpx 0;
  		background-color: #3399F5;
  		.my-center-settings-account-title-price {
  			font-size: 90rpx;
  			color: #fff;
  			text-align: center;
  			span {
  				font-size: 50rpx;
  			}
  		}
  	}

  	// 管理
  	.my-center-settings-account-content {
  		padding: 0 50rpx;
  		.title {
  			margin: 30rpx 0;
  			font-size: 32rpx;
  		}
  		.price-box {
  			display: flex;
  			.price-box-item {
  				flex: 1;
  				.show-price {
  					padding: 10rpx 0;
  					width: 80%;
  					text-align: center;
  					display: inline-block;
  					border: 1px solid #ccc;
  					border-radius: 15rpx;
  					div {
  						&:nth-child(1) {
  							font-size: 40rpx;
  						}
  						&:nth-child(2) {
  							font-size: 30rpx;
  						}
  					}
  				}
  				.show-price-active {
  					border-color: #73CF10;
  				}
  			}
  		}
  	}

  	// 说明
  	.my-center-settings-account-shuoming {
  		padding: 30rpx;
  		.title {
  			font-size: 32rpx;
  			margin-bottom: 5rpx;
  		}
  		.text {
  			font-size: 30rpx;
  			margin-bottom: 5rpx;
  		}
  	}

  }

</style>
