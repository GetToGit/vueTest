<template>
  <div class="result-choose-container container">
    <div class="title">{{title}}</div>
    <div class="content">
    	<div class="content-item" v-for="(item2, index2) in items" :key="item2.name">
    		<span class="content-item-inline"
    			:class="{
    				'content-item-red': item2.status == 1,
    				'content-item-green': item2.status == 2,
    				'content-item-no': item2.status == 3
    			}">{{index2}}</span>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'ResultChoose',
  props: ['title', 'items'],
  created () {
  	console.log(this.items)
  }
}
</script>

<style lang="less">
	@import './less/variable';
  @import '../less/function.less';

	.result-choose-container {
		padding: @resultChooseContainerPadding;
		.title {
			padding: @resultChooseTitlePadding;
			font-size: @resultChooseTitleFontS;
		}
		.content {
			overflow: hidden;
			.content-item {
				float: left;
				margin: @resultChooseContentItemMargin;
				margin-right: 45rpx;
			}
			.content-item-inline {
				text-align: center;
				display: inline-block;
				line-height: @resultChooseContentItemInlineWidth;
				.cirlce(@resultChooseContentItemInlineWidth, @resultChooseContentItemInlineWidth, 50%);
			}
			.content-item-red {
				color: @resultChooseContentItemRedColor;
				background-color: @resultChooseContentItemRedBgc;
				border: 1px solid @resultChooseContentItemRedBorderC;
			}
			.content-item-green {
				color: @resultChooseContentItemGreenColor;
				background-color: @resultChooseContentItemGreenBgc;
				border: 1px solid @resultChooseContentItemGreenBorderC;
			}
			.content-item-no {
				color: @resultChooseContentItemNoColor;
				background-color: @resultChooseContentItemNoBgc;
				border: 1px solid @resultChooseContentItemNoBorderC;
			}
		}
	}
</style>
