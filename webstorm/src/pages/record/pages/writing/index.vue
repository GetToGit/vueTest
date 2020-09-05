<template>
  <div class="record-mistaken-container containter">
    <!-- tab -->
    <div class="record-mistaken-tab containter">
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        :other="true"
        @changeTab="changeTab"
        @showOtherClassIfyTab="showOtherClassIfyTab"/>
    </div>

    <!-- total -->
    <div class="record-mistaken-total">
      <div>笔记总数</div>
      <div>88</div>
    </div>

    <!-- content -->
    <div class="record-mistaken-tree">
      <div class="item">
        <div class="item-content">
          <span>
            <i class="iconfont">&#xe726;</i>
          </span>
          <span>资产</span>
          <span style="float: right;">
            <i class="iconfont">&#xe608;</i>
          </span>
        </div>
        <div style="margin: 20rpx 0 30rpx 0;">做错<span style="color: #3399FF;">15</span>道题</div>
      </div>
    </div>

    <!-- button -->
    <div class="bottom-fixed" @click="toWriting()">查看笔记</div>

    <!-- 分类选择 -->
    <div class="other-classify" v-show="otherClassify">
      <tabChangeOther :tabItems="otherTabItems"
        @showOtherClassIfyTab="showOtherClassIfyTab"
        @changeTabChangeList="changeTabChangeList"/>
    </div>
    <div class="other-classify-bgc" v-show="otherClassify"></div>

  </div>
</template>

<script>
import tabChange from '@/components/tabChange'
import tabChangeOther from '@/components/tabChangeOther'
import fly from '@/lib/fetch'

export default {
  components: {
    tabChange,
    tabChangeOther
  },
  data () {
    return {
      tabIndex: 0,
      tabItems: [
        {
          id: 1,
          name: '智能组卷'
        },
        {
          id: 2,
          name: '真题'
        },
        {
          id: 3,
          name: '独家押题'
        }
      ],
      otherTabItems: [
        {
          id: 4,
          name: '模考大赛'
        },
        {
          id: 5,
          name: '快速练习'
        },
        {
          id: 6,
          name: '章节练习'
        }
      ],
      items: [],
      otherClassify: false
    }
  },
  methods: {
    // 导航切换
    changeTab (index) {
      this.tabIndex = index;
    },
    toWriting () {
      let url = null
      url = '/pages/practise/pages/analysis/main'
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="less">

  // 错题记录
  .record-mistaken-container {
    height: 100%;
    background-color: #F5F5F5;
    .record-mistaken-tab {
      background-color: #fff;
    }
    .record-mistaken-total {
      background-color: #fff;
      text-align: center;
      div {
        &:nth-child(1) {
          font-size: 30rpx;padding-top: 50rpx;
        }
        &:nth-child(2) {
          font-size: 60rpx;padding-bottom: 50rpx; color: #3399FF;
        }
      }
    }
    .record-mistaken-tree {
      padding: 30rpx 30rpx 50rpx 30rpx;
      margin-top: 30rpx;
      background-color: #fff;
      .item {
        font-size: 30rpx;
        border-bottom: 1px solid #EBEBEB;
        .item-content {
          overflow: hidden;
          .iconfont {
            font-size: 30rpx; color: #3399FF;
          }
        }
      }
    }
    .bottom-fixed {
      width: 100%;
      color: #fff;
      background-color: #3399FF;
      text-align: center;
      font-size: 32rpx;
      position: fixed;
      left: 0;bottom: 0;
      padding: 15rpx 0;
    }
  }
</style>
