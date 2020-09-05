<template>
  <div class="my-center-settings-edit-container containter">
  	<!-- 头像 -->
  	<div class="my-center-settings-edit-item">
  		<div class="left">
  			<span>头像</span>
  		</div>
  		<div class="right">
  			<span class="circle"></span>
  			<span><i class="iconfont">&#xe6a7;</i></span>
  		</div>
  	</div>

  	<!-- 昵称 -->
  	<div class="my-center-settings-edit-item">
  		<div class="left">
  			<span>昵称</span>
  		</div>
  		<div class="right">
  			<span>abcdef</span>
  		</div>
  	</div>

  	<!-- 年龄 -->
  	<div class="my-center-settings-edit-item">
  		<div class="left">
  			<span>年龄</span>
  		</div>
  		<div class="right">
  			<span>25</span>
  		</div>
  	</div>

  	<!-- 职业 -->
  	<div class="my-center-settings-edit-item">
  		<div class="left">
  			<span>职业</span>
  		</div>
  		<div class="right">
  			<span>在校学生</span>
  		</div>
  	</div>

  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
}

</script>

<style lang="less">
  .my-center-settings-edit-container {
  	height: 100%;
  	padding-top: 15rpx;
  	background-color: #F5F5F5;
  	.my-center-settings-edit-item {
  		margin-bottom: 15rpx;
  		position: relative;
  		overflow: hidden;
  		font-size: 32rpx;
  		padding: 30rpx;
  		background-color: #fff;
  		.left {
  			float: left;
  		}
  		.right {
  			float: right;
  			.circle {
  				position: absolute;
  				right: 30rpx;
  				top: 25%;
  				display: inline-block;
  				margin-right: 30rpx;
  				width:50rpx; height: 50rpx;
  				background-color:#ccc; border-radius: 50%;
  			}
  			.iconfont {
  				position: absolute;
  				right: 15rpx;
  				top: 17%;
  			}
  		}
  	}
  }

</style>
