<template>
  <div class="practise-feedback-containter container">
  	<checkbox-group bindchange="checkboxChange">
		  <label class="checkbox" 
		  	v-for="item in items"
		  	:key="item.name">
		  	<div style="padding: 30rpx; font-size: 30rpx;">
		    	<checkbox :value="item.name" :checked="item.checked">
		    		{{item.value}}
		    	</checkbox>
		    </div>
		  </label>
		</checkbox-group>

		<div class="container" style="padding:0 30rpx;">
			<textarea class="container" style="padding:30rpx; background-color: #F5F5F5; width: 100%; font-size: 30rpx;" placeholder="请输入您要评价的内容"></textarea>
		</div>

		<div class="container" style="padding:0 30rpx; margin-top: 50rpx;">
			<div style="color: #fff; font-size: 34rpx; background-color: #3399FF; padding: 15rpx 0;text-align: center;">提交</div>
		</div>
  </div>
</template>

<script>

export default {
	data () {
		return {
			items: [
	      {name: 'USA', value: '答案有问题'},
	      {name: 'CHN', value: '答案与解析不相符'},
	      {name: 'BRA', value: '有错别字'},
	      {name: 'JPN', value: '选项有问题'},
	      {name: 'ENG', value: '其他'},
	    ]
		}
	}

}
</script>

<style lang="less">
	.practise-feedback-containter {

	}
</style>
