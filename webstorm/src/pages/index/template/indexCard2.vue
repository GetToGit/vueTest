<template>
  <div class="index-card-2-container container">
    <div class="index-card-2-content container">
      <span class="item" v-for="item in items" :key="item.id">
        <div class="item-1" @click="toDetail(item)">
          <span v-if="item.id === 0">
            <i class="iconfont" :style="{color: item.color}">&#xe74f;</i>
          </span>
          <span v-if="item.id === 1">
            <i class="iconfont" :style="{color: item.color}">&#xe62d;</i>
          </span>
          <span v-if="item.id === 2">
            <i class="iconfont" :style="{color: item.color}">&#xe6a0;</i>
          </span>
          <span v-if="item.id === 3">
            <i class="iconfont" :style="{color: item.color}">&#xe60d;</i>
          </span>
        </div>
        <div class="item-2">{{item.name}}</div>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IndexCard2',
  computed: {
    items () {
      return [
        {
          id: 0,
          name: '做题记录',
          color: '#62B600'
        },
        {
          id: 1,
          name: '我的错题',
          color: '#FA4B3E'
        },
        {
          id: 2,
          name: '我的收藏',
          color: '#FC9700'
        },
        {
          id: 3,
          name: '我的笔记',
          color: '#2977C5'
        }
      ]
    }
  },
  methods: {
    toDetail (item) {
      let userInfo = wx.getStorageSync('userInfo');
      if (!userInfo) {
        wx.navigateTo({ 
          url: '/pages/login/pages/login/main'
        })
        return
      }
      let id = item.id;
      let url = null;
      switch(id) {
        case 0:
          // url = '/pages/record/pages/subject_record/main';
          url = '/pages/practise/pages/index/main';
          wx.setStorageSync('practiseIndexPageType', 0);
          wx.navigateTo({ url });
          break;
        case 1:
          wx.setStorageSync('mistakenType', 0);
          wx.setStorageSync('practiseIndexPageType', 1);
          url = '/pages/practise/pages/index/main';
          wx.navigateTo({ url });
          break;
        case 2:
          wx.setStorageSync('mistakenType', 1);
          wx.setStorageSync('practiseIndexPageType', 2);
          url = '/pages/practise/pages/index/main';
          wx.navigateTo({ url });
          break;
        case 3:
          wx.setStorageSync('mistakenType', 2);
          wx.setStorageSync('practiseIndexPageType', 3);
          url = '/pages/practise/pages/index/main';
          wx.navigateTo({ url });
          break;
      }
    }
  }
}
</script>

<style lang="less">
  @import '../less/variable';
  @import '../../../less/function';
  .index-card-2-container {
    height: @indexCardTwoContainerH;
    background-color: @indexCardTwoContainerBgc;

    .index-card-2-content {
      display: flex;
      padding-top: 35rpx;

      .item {
        flex: 1;
        text-align: center;

        .item-1 {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          display: inline-block;
        }
        .item-2 {
          font-size: 22rpx;
        }
      }
    }
  }
</style>
