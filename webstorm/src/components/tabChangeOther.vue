<template>
  <div class="tab-change-components-other-container containter">
    <div class="tab-change-components-other-title">
      <span>{{classifyTitle}}</span>
      <i class="iconfont" @click="showOtherClassIfy">&#xe62a;</i>
    </div>
    <div class="tab-change-components-other-item" 
      v-for="(item, index) in tabItems"
      :key="item.id"
      @click="changeTabChange(item, index)">{{item.name}}</div>
  </div>
</template>

<script>
export default {
	name: 'TabChange',
	props: ['tabItems'],
  data () {
    return {
      classifyTitle: '切换分类'
    }
  },
  methods: {
    // 显示额外分类
    showOtherClassIfy () {
      this.$emit('showOtherClassIfyTab', false)
    },

    // 切换
    changeTabChange (item, index) {
      this.$emit('changeTabChangeList', item, index)
    }
  }
}
</script>

<style lang="less">
	@import './less/variable';
  @import '../less/function.less';

  /*tab 切换*/
  .tab-change-components-other-container {
    width: 100%;
    font-size: 30rpx;
    background-color: #fff;
    .tab-change-components-other-title {
      width: 100%;
      position: relative;
      padding: 20rpx 30rpx;
      border-bottom: 1px solid #EBEBEB;
      .iconfont {
        position: absolute;
        right: 80rpx; top: 0;
        z-index: 999;
      }
    }
    .tab-change-components-other-item {
      width: 100%;
      padding: 20rpx;
      text-align: center;
      border-bottom: 1px solid #EBEBEB;
      &:last-child {
        border: none;
      }
    }
  }
</style>
