<template>
  <div class="my-center-settings-questions-container containter" @click="contentClick">
    <div style="height: 20rpx; background-color: #F5F5F5;"></div>

    <!-- 导航切换 -->
    <div>
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        @changeTab="changeTab"/>
    </div>

    <!-- 已答复 -->
    <div class="has-questions-content-box" v-show="tabIndex === 0">
      <div class="has-questions-content"
        v-for="item in hasQuestionsItems"
        :key="item.num">
        <div class="content1">
          <div class="left">答疑序号:{{item.num}}</div>
          <div class="right">{{item.time}}</div>
        </div>
        <div class="content2">{{item.name}}</div>
        <div class="content3">
          <div class="left">回答</div>
          <div class="right">{{item.time2}}</div>
        </div>
        <div class="content4">
          <span>{{item.answer}}</span>
        </div>
      </div>
      
    </div>

    <!-- 未答复 -->
    <div class="no-questions-content" 
      v-show="tabIndex === 1"
      v-for="item in noQuestionsItems"
      :key="item.num">
      <div class="content1">
        <div class="left">答疑序号:{{item.num}}</div>
        <div class="right">{{item.time}}</div>
      </div>
      <div class="content2">{{item.name}}</div>
      <div class="content3"></div>
    </div>

  </div>
</template>

<script>
import tabChange from '@/components/tabChange'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      tabIndex: 0,
      tabItems: [
        {
          name: '已答复'
        },
        {
          name: '未答复'
        }
      ],
      hasQuestionsItems: [
        {
          num: 450805055,
          name: '我想学习一下关于PS方面的教程有吗？',
          time: '2018-05-06',
          time2: '2018-09-16',
          answer: '您好，我们这里是没有这个课程。谢谢您的咨询。'
        },
        {
          num: 450805055,
          name: '我想学习一下关于PS方面的教程有吗？',
          time: '2018-05-06',
          time2: '2018-09-16',
          answer: '您好，我们这里是没有这个课程。谢谢您的咨询。'
        }
      ],
      noQuestionsItems: [
        {
          num: 450805055,
          name: '我想学习一下关于PS方面的教程有吗？',
          time: '2018-05-06'
        },
        {
          num: 450805055,
          name: '我想学习一下关于JAVA的教程有吗？',
          time: '2018-05-06'
        }
      ]
    }
  },
  components: {
    tabChange
  },
  methods: {
    // 导航切换
    changeTab (index) {
      this.tabIndex = index;
    }

  }
}

</script>

<style lang="less">
  .my-center-settings-questions-container {
    height: 100%;

    // 已答复
    .has-questions-content-box {
      height: 100%;
      background-color: #F5F5F5;

      .has-questions-content {
        margin-bottom: 25rpx;
        background-color: #fff;
        .content1 {
          padding: 30rpx 40rpx 20rpx 40rpx;
          color: #8F8F8F;
          font-size: 32rpx;
          overflow: hidden;
          .left {
            float: left;
          }
          .right {
            float: right;
          }
        }
        .content2 {
          padding: 0 40rpx 20rpx;
          color: #626262;
          font-size: 34rpx;
          margin: 10rpx 0 10rpx 0;
        }
        .content3 {
          padding: 0 40rpx 10rpx 40rpx;
          color: #8F8F8F;
          font-size: 32rpx;
          overflow: hidden;
          .left {
            float: left;
          }
          .right {
            float: right;
          }
        }
        .content4 {
          padding: 0 40rpx;
          span {
            display: inline-block;
            padding: 30rpx;
            font-size: 34rpx;
            background-color: #EFEFEF;
            margin-bottom: 30rpx;
          }
        }
      }
    }

    // 未答复
    .no-questions-content {
      padding: 30rpx 0;
      .content1 {
        padding: 0 40rpx;
        color: #8F8F8F;
        font-size: 32rpx;
        overflow: hidden;
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }
      .content2 {
        padding: 0 40rpx;
        color: #626262;
        font-size: 34rpx;
        margin: 10rpx 0 30rpx 0;
      }
      .content3 {
        width: 100%;
        height: 10rpx;
        background-color: #F5F5F5;
      }

    }
  }

</style>
