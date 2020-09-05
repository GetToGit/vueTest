<template>
  <div>
    <!-- 根结点 -->
    <div class="container subject-tree-component-container"
      
      v-for="(item, index) in items" :key="item.id" :item="item">
      <div class="content" @click="toDetail(item)">
        <span class="left">
          <div class="left-content">
            <div class="left-content-circle left-content-circle-1"
             @click.stop="item.expand = !item.expand">{{!item.expand ? '+' : '-'}}</div>
            <div class="left-content-1">{{item.name}}</div>
            <div class="left-content-2">
              <span>
                <i class="iconfont iconfont-active">&#xe730;</i>
              </span>
              <span>
                <i class="iconfont iconfont-active">&#xe730;</i>
              </span>
              <span>
                <i class="iconfont iconfont-active">&#xe730;</i>
              </span>
              <span>
                <i class="iconfont">&#xe730;</i>
              </span>
              <span>
                <i class="iconfont">&#xe730;</i>
              </span>
              <span class="icon-text">59/156</span>
            </div>
          </div>
        </span>
        <span class="right">
          <div>继续上次&gt;</div>
        </span>
      </div>

      <!-- 子节点1 -->
      <div class="container"
        v-if="item.children && item.children.length > 0 && item.expand"
        v-for="(item2, index2) in item.children" :key="item2.id" :item="item2">
        <div class="content" @click="toDetail(item2)">
          <span class="left">
            <div class="left-content">
              <div class="left-content-circle left-content-circle-2" v-if="item2.children && item2.children.length > 0" @click.stop="item2.expand = !item2.expand">{{!item2.expand ? '+' : '-'}}</div>
              <div class="left-content-circle left-content-circle-2" v-else></div>
              <div class="left-content-1">{{item2.name}}</div>
              <div class="left-content-2">
                <span>
                  <i class="iconfont iconfont-active">&#xe730;</i>
                </span>
                <span>
                  <i class="iconfont iconfont-active">&#xe730;</i>
                </span>
                <span>
                  <i class="iconfont iconfont-active">&#xe730;</i>
                </span>
                <span>
                  <i class="iconfont">&#xe730;</i>
                </span>
                <span>
                  <i class="iconfont">&#xe730;</i>
                </span>
                <span class="icon-text">59/156</span>
              </div>
            </div>
          </span>
          <span class="right">
            <div>&gt;</div>
          </span>
        </div>

        <!-- 子节点2 -->
        <div class="container"
          v-if="item2.children && item2.children.length > 0 && item2.expand"
          v-for="(item3, index3) in item2.children" :key="item3.id" :item="item3">
          <div class="content" @click="toDetail(item3)">
            <span class="left">
              <div class="left-content">
                <div class="left-content-circle left-content-circle-3" v-if="item3.children && item3.children.length > 0" @click.stop="item3.expand = !item3.expand">{{!item3.expand ? '+' : '-'}}</div>
                <div class="left-content-circle left-content-circle-3" v-else></div>
                <div class="left-content-1">{{item3.name}}</div>
                <div class="left-content-2">
                  <span>
                    <i class="iconfont iconfont-active">&#xe730;</i>
                  </span>
                  <span>
                    <i class="iconfont iconfont-active">&#xe730;</i>
                  </span>
                  <span>
                    <i class="iconfont iconfont-active">&#xe730;</i>
                  </span>
                  <span>
                    <i class="iconfont">&#xe730;</i>
                  </span>
                  <span>
                    <i class="iconfont">&#xe730;</i>
                  </span>
                  <span class="icon-text">59/156</span>
                </div>
              </div>
            </span>
            <span class="right">
              <div>&gt;</div>
            </span>
          </div>

        <!-- 子节点2 -->
        </div>

      <!-- 子节点1 -->
      </div>
      
    <!-- 根结点 -->  
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectTree',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  created () {
    console.log(this.item)
  },
  methods: {
    toDetail (item) {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        wx.navigateTo({ 
          url: '/pages/login/pages/login/main'
        })
        return
      }
      wx.setStorageSync('subjectDetail', item)
      wx.setStorageSync('getProblemType', 0)
      wx.navigateTo({
        url: '/pages/practise/pages/problems/main'
      })
    }
  }
}
</script>

<style lang="less">
  @import './less/variable';
  @import '../less/function.less';
  
  .subject-tree-component-container {
    position: relative;
    padding-top: 40rpx;
    padding-bottom: 25rpx;
    border-bottom: @subjectTreeContainerBorderB;

    .left, .right {
      display: inline-block;
    }

    .content {
      overflow: hidden;

      .left {
        float: left;
        margin-left: 15rpx;
      }

      .right {
        float: right;
        color: @subjectTreeContentRightColor;
        font-size: @subjectTreeContentRightFontS;
      }

      .left-content {
        position: relative;
        padding-bottom: 25rpx;
        border-left: 1px solid rgb(223, 223, 223);

        .left-content-1 {
          padding-left: 30rpx;
          color: @subjectTreeContentLeftColor;
          font-size: @subjectTreeContentLeftFontS;
        }
        .left-content-2 {
          overflow: hidden;
          padding: 25rpx 0rpx 0rpx 25rpx;
          .iconfont {
            color: #D9D9D9;
            font-size: 30rpx;
          }
          .iconfont-active {
            color: #FFD633;
          }
          .icon-text {
            color: #AAAAAA;
            font-size: 30rpx;
            margin-left: 10rpx;
          }
          span {
            margin-right: 5rpx;
          }
          // span {
          //   float: left;
          //   width: 25rpx;
          //   height: 25rpx;
          //   border-radius: 50%;
          //   background-color: red;
          // }
        }

        .left-content-circle-1 {
          font-size: 20rpx;
          line-height: @subjectTreeContentLeftCircleW;
          .postionLeftTop(0rpx, 0rpx, 9);
          left: -(@subjectTreeContentLeftCircleW/2 - 1);
          .cirlce(@subjectTreeContentLeftCircleW, @subjectTreeContentLeftCircleW, 50%);
        }

        .left-content-circle-2 {
          font-size: 20rpx;
          line-height: @subjectTreeContentLeftCircleW2;
          .postionLeftTop(0rpx, 0rpx, 9);
          left: -(@subjectTreeContentLeftCircleW2/2 - 1);
          .cirlce(@subjectTreeContentLeftCircleW2, @subjectTreeContentLeftCircleW2, 50%);
        }

        .left-content-circle-3 {
          font-size: 20rpx;
          line-height: @subjectTreeContentLeftCircleW3;
          .postionLeftTop(0rpx, 0rpx, 9);
          left: -(@subjectTreeContentLeftCircleW3/2 - 1);
          .cirlce(@subjectTreeContentLeftCircleW3, @subjectTreeContentLeftCircleW3, 50%);
        }

        .left-content-circle {
          color: #fff;
          text-align: center;
          background-color: @subjectTreeContentLeftCircleBgc;
        }
      }
    }
  }
</style>
