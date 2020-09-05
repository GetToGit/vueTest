<template>
  <div class="my-center-settings-other-preferential-container containter">
    <div style="height: 20rpx; background-color: #F5F5F5;"></div>
    <div>
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        @changeTab="changeTab"/>
    </div>
    <div class="my-center-settings-other-preferential-items"
      v-for="item in items"
      :key="item.name">
      <div class="my-center-settings-other-preferential-item">
        <div class="left">
          <div>{{item.name}}</div>
          <div>{{item.time}}</div>
        </div>
        <div class="right">
          <div>¥{{item.money}}</div>
          <div>立即使用</div>
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
          name: '未使用'
        },
        {
          name: '已使用'
        },
        {
          name: '已过期'
        }
      ],
      items: [
        {
          name: '新用户注册',
          time: '有效期:2018',
          money: '500'
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
  .my-center-settings-other-preferential-container {
    .my-center-settings-other-preferential-items {
      border-bottom: 1px solid #EEE;
      .my-center-settings-other-preferential-item {
        padding: 30rpx 50rpx;
        overflow: hidden;
        .left {
          float: left;
          div {
            &:nth-child(1) {
              font-size: 30rpx;
            }
            &:nth-child(2) {
              color: #999;
              font-size: 26rpx;
            }
          }
        }
        .right {
          float: right;
          div {
            &:nth-child(1) {
              color: #FF0000;
              font-size: 30rpx;
            }
            &:nth-child(2) {
              color: #3399FF;
              font-size: 26rpx;
            }
          }
        }
      }
    }
  }
</style>
