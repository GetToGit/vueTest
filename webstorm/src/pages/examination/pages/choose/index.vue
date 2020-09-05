<template>
  <div class="examination-choose-containter container">
    <div class="examination-choose-left container">
      <div class="item container" 
        v-for="(item, index) in itemList" 
        v-if="itemList"
        :key="item.id"
        :class="{'item-active' : itemIndex===index}"
        @click="itemIndexChange(index)">
        {{item.name}}
      </div>
    </div>
    <div class="examination-choose-right container">
      <div class="examination-choose-right-content">
        <div class="title">
          <span class="text">
            <span>{{itemIndexName}}</span>
            <span class="left-span"></span>
            <span class="right-span"></span>
          </span>
        </div>
        <!-- v-for -->
        <div class="content container">
          <div class="item" 
            v-for="(item, index) in cardItemList"
            :key="item.id"
            :class="{'item-active': cardItemListIndex===index}"
            @click="chooseCard(item, index)">
            <div class="icon">
              <span></span>
            </div>
            <div class="text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      currentIndex: null,
      itemIndex: 0,
      itemIndexName: '',
      itemList: [],
      cardItemListIndex: 0,
      cardItemList: []
    }
  },
  mounted () {
    this.currentIndex = wx.getStorageSync('classify')
    this.itemIndex = this.currentIndex[0]
    this.getList()
  },
  methods: {
    getList () {
      fly.get(`/api/exercise/v1/exam-subject`).then((res)=>{
        let { code, data, message } = res.data
        console.log(data)
        if (code === 200 && data) {
          this.itemList = data
          this.itemIndexName = this.itemList[this.itemIndex].name
          this.cardItemList = data[this.itemIndex]['children']
          return
        }
        console.error(message)
        // this.cardItemList = data[this.currentIndex[0]]['children']
      }).catch((err) => {
        console.error(err)
      })
    },
    itemIndexChange(index) {
      this.itemIndex = index
      this.currentIndex[0] = index
      this.currentIndex[1] = 0
      this.itemIndexName = this.itemList[this.itemIndex].name
      this.cardItemList = this.itemList[this.itemIndex]['children']
      wx.setStorageSync('classify', this.currentIndex)
    },
    chooseCard (item, index) {
      this.cardItemListIndex = index
      this.currentIndex[1] = index
      wx.setStorageSync('classify', this.currentIndex)
      let url = '/pages/examination/pages/current/main'
      wx.redirectTo({ url })
    }
  }
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  // 选择考试区域
  .examination-choose-containter {
    height: 100%;
    
    // 左区域
    .examination-choose-left {
      float: left;
      height: 100%;
      width: @leftContainerLeft;
      border-right: 2rpx solid @leftContainerLeftBorder;

      // default
      .item {
        border-left-width: 2rpx;
        border-left-color: #fff;
        border-left-style: solid;
        color: @leftContainerItemColor;
        margin: @leftContainerItemMargin;
        font-size: @leftContainerItemFontS;
        text-indent: @leftContainerItemTextIndent;
      }

      // active
      .item-active {
        color: @leftContainerItemColorActive;
        border-left-color: @leftContainerItemColorActive;
      }
    }

    // 右区域
    .examination-choose-right {
      float: left;
      height: 100%;
      width:calc(100% - @leftContainerLeft);

      // 标题
      .title {
        text-align: center;
        margin: @rightContainerTitleMargin;

        // 标题内容
        .text {
          position: relative;
          display: inline-block;
          font-size: 28rpx;

          .left-span, .right-span {
            display: block;
            position: absolute;
            background-color: @rightContainerItemSpanBgc;
            width: @rightContainerItemSpanWidth; height: @rightContainerItemSpanHeight;
          }
          .left-span {
            left: @rightContainerItemSpanLeft; top: @rightContainerItemSpanTop;
          }
          .right-span {
            right: @rightContainerItemSpanLeft; top: @rightContainerItemSpanTop;
          }
        }
      }
    }

    // 内容
    .content {
      overflow: hidden;
      padding: @rightContainerPadding;

      // default
      .item {
        float: left;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
        width: @rightContainerCardItemWidth;
        background-color: @rightContainerCardItemBgc;
        margin-bottom: @rightContainerCardItemMarginB;
        border-bottom-color: @rightContainerCardBorderColor;

        // icon
        .icon {
          text-align: center; 
          padding: @rightContainerCardIconPadding;
          span {
            display: inline-block;
            width: 34rpx; height: 34rpx; background-color: red;
          }
        }

        // text
        .text {
          text-align: center;
          color: @rightContainerCardTextColor;
          font-size: @rightContainerCardTextFontS;
          padding: @rightContainerCardTextPadding;
        }

        &:nth-child(odd) {
          margin-right: 5%;
        }
      }

      // active
      .item-active {
        border-bottom-color: @rightContainerCardBorderColorActive;
      }
    }
  }
</style>
