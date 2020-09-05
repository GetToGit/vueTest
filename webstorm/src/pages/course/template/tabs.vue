<template>
  <div class="course-tabs-template-containter container">
  	<div class="course-tabs-template-item course-tabs-template-item-text"
      :class="{
        'course-tabs-template-item-text-active': tabsActiveName === '全部'
      }"
      @click="toChangeTab('全部')">全部</div>
  	<div class="course-tabs-template-item" style="margin-left: 20rpx;">
  		<span class="course-tabs-template-item-items" 
  			v-for="item in tabsItems" 
  			:key="item.name"
        :class="{
          'course-tabs-template-item-text-active': tabsActiveName === item.name
        }"
        @click="toChangeTab(item.name, item)">{{item.name}}</span>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
	props: [
		'tabsItems',
    'tabsActiveName'
	],
  methods: {
    toChangeTab (name, item) {
      this.$emit('toChangeTabName', name, item)
    }
  }
}
</script>

<style lang="less">

  .course-tabs-template-containter {
  	padding: 10rpx 0;
  	.course-tabs-template-item {
  		display: inline-block;
  	}
  	.course-tabs-template-item-text {
  		font-size: 26rpx;
  		padding: 8rpx 14rpx;
      color: #000666;
  		border-radius: 15rpx;
  	}
  	.course-tabs-template-item-items {
  		font-size: 26rpx;
      padding: 8rpx 14rpx;
  		color: #000666;
  		margin-right: 15rpx;
      border-radius: 15rpx;
  	}
    .course-tabs-template-item-text-active {
      color: #fff;
      background-color: #428DF4;
    }
  }
</style>
