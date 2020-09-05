<template>
  <div class="course-detail-template-containter containter">
<!--     <div class="course-detail-template-course-1">
      <div>{{detail.title}}</div>
      <div>课程简介</div>
      <div>{{detail.description}}</div>
    </div> -->
    <div class="course-detail-template-course-2">
      <div class="course-detail-template-course-2-content"
        v-for="(item, index) in list"
        :key="item.num">
        <div class="parent">
          <div class="title">
            <span style="color: #999;">{{item.num}}</span>
            <span style="margin-left: 5rpx;">{{item.name}}</span>
            <span class="iconfont-span" @click="item.expand = !item.expand">
              <icon class="iconfont" :class="{'iconfont-expand': item.expand}">&#xe6a6;</icon>
            </span>
          </div>
          <div class="status">{{item.status}}</div>
        </div>
        <div class="child" v-for="(item2, index2) in item.children"
          :key="item2.name"
          v-show="item.expand">
          <div class="title">
            <span class="circle"></span>
            <span style="color: #666;">{{item2.name}}</span>
          </div>
          <div style="color: #999; text-indent: 41rpx;">
            <span>52</span>分钟  已观看<span>1</span>分钟
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	props: [
		'detail'
	],
  data () {
    return {
      list: [
        {
          num: '01',
          name: 'PS人像后期处理基础课程',
          status: '未完成',
          expand: false,
          children: [
            {
              name: '1'
            },
            {
              name: '2'
            }
          ]
        },
        {
          num: '02',
          name: 'PS人像后期处理基础课程_2',
          status: '完成',
          expand: false,
          children: [
            {
              name: '1'
            },
            {
              name: '2'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less">

  // 做题记录
  .course-detail-template-containter {
  	padding: 30rpx;

    // 普通课程详情
    .course-detail-template-course-1 {
      div {
        &:nth-child(1) {
          margin-top: 20rpx;font-size: 30rpx;
        }
        &:nth-child(2) {
          margin-top: 20rpx;font-size: 30rpx;
        }
        &:nth-child(3) {
          margin-top: 5rpx;font-size: 28rpx; color: #666;
        }
      }
    }

    // 节点课程
    .course-detail-template-course-2 {
      .course-detail-template-course-2-content {
        font-size: 32rpx;
        margin-bottom: 25rpx;
        .parent {
          .title {
            position: relative;
            .iconfont-span {
              right: 0;
              height: 0;
              top: -14rpx;
              position: absolute;
            }
            .iconfont-expand {
              transform: rotate(180deg);
            }
          }
          .status {
            color: #999;
            text-indent: 40rpx;
          }
        }
        .child {
          padding: 0 0 0 40rpx;
          .title {
            .circle {
              width: 35rpx;
              height: 35rpx;
              border-radius: 50%;
              background-color: #3399FF;
              display: inline-block;
              margin-right: 10rpx;
              margin-top: 5rpx;
            }
          }
        }
      }
    }
  }
</style>
