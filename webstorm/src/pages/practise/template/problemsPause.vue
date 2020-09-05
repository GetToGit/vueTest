<template>
  <div class="practise-problem-pause-template-containter container" 
  	@click.stop="hidePause">
  	<div class="practise-problem-pause-template-item">休息一下</div>
  	<div class="practise-problem-pause-template-item">共{{total}}道题</div>
  	<div class="practise-problem-pause-template-item">点击任意位置继续</div>
  </div>
</template>

<script>

export default {
	name: 'ProblemPause',
	props: [
		'total'
	],
	data () {
		return {
		}
	},
	methods: {
		hidePause () {
			this.$emit('hidePause')
		}
	}
}
</script>

<style lang="less">
	.practise-problem-pause-template-containter {
		width: 100%;
		height: 100%;
		opacity: 0.3;
		color: #fff;
		z-index: 9;
		position: fixed;
		left: 0; top: 0;
		background-color: #000;
		.practise-problem-pause-template-item {
			text-align: center;
			&:nth-child(1) {
				font-size: 40rpx;
				margin-top: 250rpx;
			}
			&:nth-child(2) {
				font-size: 26rpx;
				margin-top: 10rpx;
			}
			&:nth-child(3) {
				font-size: 26rpx;
				margin-top: 30rpx;
			}
		}
  }
</style>
