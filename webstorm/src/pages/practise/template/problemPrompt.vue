<template>
  <div class="practise-problem-prompt-template-containter container">
  	<div style="margin-top: 150rpx;">
  		<i class="iconfont" style="font-size: 50rpx; color: #2DA3FC;">&#xe6b9;</i>
  	</div>
  	<div style="font-size: 36rpx; color: #2DA3FC;">快速练习</div>
  	<div style="margin-top: 50rpx;">智能组卷随手测</div>
  	<div>有空就来刷一组</div>
  	<div style="margin-top: 300rpx;">
  		<input type="checkbox" name="" @click="checkBox">以后不再联系
  	</div>
  	<div class="btn-bottom" @click="toQucik">开始练习</div>
  </div>
</template>

<script>

export default {
	data () {
		return {
			checked: false
		}
	},
	methods: {
		checkBox () {
			this.checked = !this.checked
		},
		toQucik () {
			this.$emit('toQucikPractise', this.checked)
		}
	}

}
</script>

<style lang="less">
	.practise-problem-prompt-template-containter {
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 99;
		position: fixed;
		left: 0;
		top: 0;
		text-align: center;
		font-size: 30rpx;

		.btn-bottom {
			width: 100%;
			color: #fff;
			padding: 15rpx 0;
			font-size: 32rpx;
			position: fixed;
			left: 0; bottom: 0;
			background-color: #2DA3FC;
		}
	}

</style>
