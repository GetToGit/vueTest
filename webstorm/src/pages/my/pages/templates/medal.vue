<template>
  <div class="my-center-settings-medal-container containter" @click="contentClick">
    <div style="height: 20rpx; background-color: #F5F5F5;"></div>

    <!-- 导航切换 -->
    <div>
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        @changeTab="changeTab"/>
    </div>

    <!-- 内功部分 -->
    <div class="my-center-settings-medal-content">
      <div class="my-center-settings-medal-content-item"
        v-for="(item, index) in medalItems"
        :key="item.id">
        <div v-for="(item2, index2) in item.children"
          :key="item2.description">
          <span class="circle" @click="toDetail(item2)"></span>
          <span class="text">{{item2.description}}</span>
        </div>
      </div>
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
          name: '全部'
        },
        {
          name: '尚未获得'
        }
      ],
      medalItems: [
        {
          id: 0,
          children: [
            {
              description: '入门新手'
            },
            {
              description: '起步熟手'
            },
            {
              description: '崭露头角'
            }
          ]
        },
        {
          id: 1,
          children: [
            {
              description: '入门新手'
            },
            {
              description: '起步熟手'
            },
            {
              description: '崭露头角'
            }
          ]
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
    },

    // 跳转勋章详情
    toDetail (item) {
      wx.setStorageSync('otherPageType', 2)
      wx.navigateTo({
        url: '/pages/my/pages/other/main'
      })
    }
  }
}

</script>

<style lang="less">
  .my-center-settings-medal-container {
    .my-center-settings-medal-content {
      padding: 50rpx 40rpx;
      .my-center-settings-medal-content-item {
        margin-bottom: 30rpx;
        display: flex;
        div {
          flex: 1;
          &:nth-child(1) {
            .text {
              margin-left: 10rpx;
            }
          }
          &:nth-child(2) {
            text-align: center;
          }
          &:nth-child(3) {
            text-align: right;
            .text {
              margin-right: 10rpx;
            }
          }
        }
        .circle {
          display: inline-block;
          width: 150rpx;
          height: 150rpx;
          border: 1px solid #ccc;
          border-radius: 50%;
        }
        .text {
          display: inline-block;
          font-size: 32rpx;
          text-align: center;
        }

      }
    }
  }

</style>
