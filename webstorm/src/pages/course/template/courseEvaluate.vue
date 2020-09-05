<template>
  <div class="course-evaluate-template-containter container">
    <div class="course-evaluate-template-title">
      <div>
        <span>学院评价</span>
        <span>(200)</span>
      </div>
      <div>查看更多</div>
    </div>
    <div class="course-evaluate-template-content container">
      <div class="course-evaluate-template-content-box" 
        v-for="item in lists"
        :key="item.num">
        <div>
          <span>
            <i class="iconfont">&#xe6b8;</i>
          </span>
          <span class="telephone">{{item.num}}</span>
          <span style="float: right;">
            <i class="iconfont" style="color: #F4C409;">&#xe730;</i>
            <i class="iconfont" style="color: #F4C409;">&#xe730;</i>
            <i class="iconfont" style="color: #F4C409;">&#xe730;</i>
            <i class="iconfont">&#xe730;</i>
            <i class="iconfont">&#xe730;</i>
          </span>
        </div>
        <div>{{item.msg}}</div>
        <div class="time">
          <span>{{item.total}}</span>
          <span style="float: right;">{{item.time}}</span>
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
      lists: [
        {
          num: '1520****0510',
          msg: '老师水平还是很不错的',
          total: '已上课23小时57分时评价',
          time: '2018-04-03'
        },
        {
          num: '1520****0510',
          msg: '老师水平还是很不错的',
          total: '已上课23小时57分时评价',
          time: '2018-04-03'
        }
      ]
    }
  }
}
</script>

<style lang="less">
  .course-evaluate-template-containter {
    // 标题
    .course-evaluate-template-title {
      padding: 10rpx 30rpx;
      overflow: hidden;
      font-size: 30rpx;
      border-bottom: 1px solid #ECECEC;
      div {
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
        }
      }
    }

    // 评论内容
    .course-evaluate-template-content {
      width: 100%;
      padding: 0 30rpx;
      .course-evaluate-template-content-box {
        border-bottom: 1px solid #ECECEC;
        div {
          &:nth-child(1) {
            margin-top: 25rpx;
            .telephone {
              font-size: 30rpx;
            }
            span {
              display: inline-block;
              .iconfont {
                margin-left: 10rpx;
              }
            }
          }
          &:nth-child(2) {
            margin-top: 10rpx;
            font-size: 30rpx;
          }
          &:nth-child(3) {
            margin-bottom: 15rpx;
          }
        }
        .time {
          font-size: 28rpx;
          span {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
