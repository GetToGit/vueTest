<template>
  <div class="index-title-container container">
    <div class="content">
      <span class="left">
        <div style="font-size: 32rpx;">{{title}}</div>
        <div style="font-size: 24rpx;">登陆查看分数</div>
      </span>
      <span class="right" @click="toClassify">{{classify.name}}&gt;</span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      'title': '预测分',
      'classifyName': '初级会计实务'
    }
  },
  props: ['classify'],
  methods: {
    toClassify () {
      let url = '/pages/examination/pages/current/main'
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="less">
  @import '../less/variable.less';
  .index-title-container {
    height: @indexTitleHeight;
    padding-top: @indexPaddingTop;
    background-color: @indexTitleContainerBgc;

    .content {
      .left {
        float: left;
        margin-left: 50rpx;
        color: @indexTitleLeftColor;
      }
      .right {
        float: right;
        padding: 20rpx;
        font-size: 22rpx;
        color: @indexTitleRightColor;
        border-radius: 40rpx 0 0 40rpx;
        background-color: @indexTitleRightBgc;
      }
    }
  }
</style>
