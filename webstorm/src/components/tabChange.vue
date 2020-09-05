<template>
  <div class="tab-change-components-container containter"
    :class="{
      'tab-change-components-other-container-show' : other
    }">
  	<div class="item" 
  		v-for="(item, index) in tabItems"
  		:key="item.name">
  		<span class="item-text"
	  		:class="{
	  			'item-text-active': index===tabIndex
	  		}"
	  		@click.stop="changeTab(index)">{{item.name}}</span>
  	</div>
    <span class="other-icon">
      <i class="iconfont" @click="showOtherClassIfy">&#xe605;</i>
    </span>
  </div>
</template>

<script>
export default {
	name: 'TabChange',
	props: ['tabIndex', 'tabItems', 'other'],
	methods: {
    // 切换tab
		changeTab (index) {
      console.log(index)
			this.$emit('changeTab', index);
		},

    // 显示额外分类
    showOtherClassIfy () {
      this.$emit('showOtherClassIfyTab', true)
    }
	}
}
</script>

<style lang="less">
	@import './less/variable';
  @import '../less/function.less';

  /*tab 切换*/
  .tab-change-components-container {
  	display: flex;
    position: relative;
  	border-bottom: 1px solid @tabChangeContainerBorderC;
  	.item {
  		flex: 1;
  		text-align: center;
  		font-size: @tabChangeItemFontS;
  	}
  	.item-text {
  		display: inline-block;
  		padding: @tabChangeItemTextPadding;
  		border-bottom-width: 1px;
  		border-bottom-style: solid;
  		border-bottom-color: #fff;
  	}
  	.item-text-active {
  		color: @tabChangeItemTextActiveColor;
  		border-bottom-color: @tabChangeItemTextActiveBorderC;
  	}
    .other-icon {
      display: none;
      position: absolute;
      right: 5rpx;
      top: 0;
    }
  }

  .tab-change-components-other-container-show {
    box-sizing: border-box;
    padding-right: 50rpx;
    .other-icon {
      display: block;
    }
  }
</style>
