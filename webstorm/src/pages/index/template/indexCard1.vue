<template>
  <div class="index-card-1-container container">
    <div class="card container">
      <div class="card-content container">
        <span class="item container" 
          v-for="(item, index) in items" 
          :key="item.id">
          <div class="item-1" @click="toDetail(item)">
            <span class="item-1-span" v-if="item.id === 0">
              <i class="iconfont" style="color: #3295E0;">&#xe6b9;</i>
            </span>
            <span class="item-1-span" v-if="item.id === 1">
              <i class="iconfont" style="color: #FF3C57;">&#xe681;</i>
            </span>
            <span class="item-1-span" v-if="item.id === 2">
              <i class="iconfont" style="color: #CD6CE6;">&#xe629;</i>
            </span>
            <span class="item-1-span" v-if="item.id === 3">
              <i class="iconfont" style="color: #FFBD2B;">&#xe64c;</i>
            </span>
            <span class="item-1-span" v-if="item.id === 4">
              <i class="iconfont" style="color: #76D62B;">&#xe702;</i>
            </span>
          </div>
          <div class="item-2">{{item.name}}</div>
        </span>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'IndexCard1',
  computed: {
    items () {
      return [
        {
          id: 0,
          name: '快速练习'
        },
        {
          id: 1,
          name: '模考大赛'
        },
        {
          id: 2,
          name: '历年真题'
        },
        {
          id: 3,
          name: '独家押题'
        },
        {
          id: 4,
          name: '智能组卷'
        }
      ]
    }
  },
  methods: {
    toDetail (item) {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        wx.redirectTo({ 
          url: '/pages/login/pages/login/main'
        })
        return
      }
      let id = item.id;
      let url = null
      switch(id) {
        case 0:
          // url = '/pages/practise/pages/problems/main';
          url = '/pages/practise/pages/index/main';
          wx.setStorageSync('getProblemType', 1);
          wx.setStorageSync('subjectDetail', {
            name: '快速练习'
          });
          wx.setStorageSync('pagerType', 5);
          wx.setStorageSync('practiseIndexPageType', 4);
          wx.navigateTo({ url });
          break;
        case 1:
          wx.setStorageSync('pagerType', 4);
          // url = '/pages/record/pages/imitate/main';
          url = '/pages/practise/pages/index/main';
          wx.setStorageSync('practiseIndexPageType', 5);
          wx.navigateTo({ url });
          break;
        case 2:
          wx.setStorageSync('pagerType', 2);
          // url = '/pages/record/pages/exam_questions/main';
          url = '/pages/practise/pages/index/main';
          wx.setStorageSync('practiseIndexPageType', 6);
          wx.navigateTo({ url });
          break;
        case 3:
          wx.setStorageSync('pagerType', 3);
          // url = '/pages/record/pages/exam_questions_2/main';
          url = '/pages/practise/pages/index/main';
          wx.setStorageSync('practiseIndexPageType', 7);
          wx.navigateTo({ url });
          break;
        case 4:
          wx.setStorageSync('pagerType', 1);
          // url = '/pages/record/pages/package/main';
          url = '/pages/practise/pages/index/main';
          wx.setStorageSync('practiseIndexPageType', 8);
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
  .index-card-1-container {
    position: relative;
    height: @indexCardOneContainerH;
    .card {
      width: 100%;
      .postionLeftTop (0rpx, -55rpx, 9);
      height: @indexCardOneContainerConentH;
      padding: @indexCardOneContainerConentPadding;

      .card-content {
        height: 100%;
        display: flex;
        padding-top: 40rpx;
        border-radius: @indexCardOneContainerConentCardRadius;
        background-color: @indexCardOneContainerConentCardBgc;

        .item {
          flex: 1;
          text-align: center;

          .item-1 {
            width: 90rpx;
            height: 90rpx;
            line-height: 90rpx;
            border-radius: 50%;
            margin-bottom: 15rpx;
            display: inline-block;
            background-color: red;
            .item-1-span {
              width: 60rpx;height: 60rpx; 
              background-color: #fff;border-radius:50%;display:inline-block;line-height:60rpx;
            }
          }
          .item-1-1 {
            background-color: yellow
          }
          .item-2 {
            font-size: 22rpx;
          }

          &:nth-child(1) {
            .item-1 {
              background-color: #3295E0;
            }
          }
          &:nth-child(2) {
            .item-1 {
              background-color: #FF3C57;
            }
          }
          &:nth-child(3) {
            .item-1 {
              background-color: #CD6CE6;
            }
          }
          &:nth-child(4) {
            .item-1 {
              background-color: #FFBD2B;
            }
          }
          &:nth-child(5) {
            .item-1 {
              background-color: #76D62B;
            }
          }
        }
      }
    }
  }
</style>
