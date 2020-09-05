<template>
  <div class="record-template-problems-container containter">
    <div class="record-template-problems-content" 
      v-for="(item, index) in items"
      :key="index"
      @click="toDetail(item)">
      <div class="record-template-problems-title">
        <span v-show="!item.exerciseName">{{item.paperIntro ? item.paperIntro.name : item.paperName }}</span>
        <span v-show="item.exerciseName">{{item.exerciseName}}</span>
      </div>
      <div class="record-template-problems-time" v-if="type === 'record'">
        <span>{{item.startTime}},</span>
        <span>
          共计
          <span class="blue">{{item.totalQaCount}}</span>
          道题，做对
          <span class="blue">{{item.rightQaCount}}</span>道
        </span>
        <!-- <span v-if="!item.record" class="red">没做完</span> -->
      </div>
      <div class="record-template-problems-time" v-if="type === 'exam'">
        <span>难度:</span>
        <span>4.7</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Problems',
  props: {
    items: {
      type: Array,
      default: []
    }, 
    type: {
      type: String
    }
  },
  methods: {
    toDetail (item) {
      let url = null;

      // 试卷跳转
      if (this.type === 'exam') {
        url = '/pages/practise/pages/problems/main';
        wx.setStorageSync('problems2_id', item.paperIntro.id);
        wx.setStorageSync('getProblemType', 3);
        wx.setStorageSync('subjectDetail', {
          name: item.paperIntro ? item.paperIntro.name : item.name
        })
        wx.redirectTo({ url });
      }

      // 做题记录
      if (this.type === 'record' && item.exerciseName) {
        url = '/pages/practise/pages/problems/main'
        wx.setStorageSync('subjectDetail', {
          name: item.exerciseName
        })
        // wx.redirectTo({ url })
        wx.setStorageSync('getProblemType', 0);
        // url = '/pages/practise/pages/second/main';
        wx.setStorageSync('practiseSecondPageType', 1);
        wx.navigateTo({ url });
      }
      if (this.type === 'record' && item.paperName) {
        url = '/pages/practise/pages/problems/main'
        wx.setStorageSync('subjectDetail', {
          name: item.paperName
        })
        wx.setStorageSync('pagerType', item.paperType);
        switch (item.paperType) {
          case 1:
            wx.setStorageSync('getProblemType', 2);
            break;
          case 5:
            wx.setStorageSync('getProblemType', 1);
            break;
          default:
            wx.setStorageSync('problems2_id', item.id);
            wx.setStorageSync('getProblemType', 3);
            break;
        }
        wx.redirectTo({ url })
      }
    }
  }
}
</script>

<style lang="less">
  @import '../pages/record/less/variable.less';
  @import '../less/function.less';

  // 做题记录
  .record-template-problems-container {
    // 内容区域box
    .record-template-problems-content {
      padding: @recordTemplateProblemsContentBorderPadding;
      border-bottom: 1px solid @recordTemplateProblemsContentBorderC;
    }

    // 标题内容
    .record-template-problems-title {
      .fontSizeColor(28rpx, #333);
      margin: @recordTemplateProblemsTitleMargin;
    }

    // 内容区域
    .record-template-problems-time {
      .fontSizeColor(26rpx, #6C6C6C);
      margin: @recordTemplateProblemsTimeMargin;
    }

    .blue {
      color: @recordTemplateProblemsTextBlue;
    }
    .red {
      color: @recordTemplateProblemsTextRed;
    }
  }
</style>
