<template>
  <div class="record-imitate-container containter">
    <div class="record-imitate-box containter">
      <div class="content">
        <div style="font-size: 28rpx;margin-bottom: 5rpx;">练习类型:{{detail.title}}</div>
        <div style="font-size: 26rpx;color: #565656; margin-bottom: 5rpx;">已有
          <span style="color: #3399FF;">{{detail.person}}</span>人报名
        </div>
        <div style="font-size: 26rpx;color: #565656;margin-bottom: 5rpx;">考试时间:{{detail.time}}</div>
        <div style="font-size: 26rpx;color: #565656;margin-bottom: 10rpx;">解析课:当晚19:00准时开讲，只需1元</div>
        <div style="font-size: 26rpx;color: #3399FF;">点击购买</div>
        <div>
          <span class="content-btn">我要报名</span>
        </div>
      </div>
    </div>

    <div style="padding: 0 30rpx;margin-top: 30rpx;font-size: 26rpx;color:#565656;">
      <div>考试说明</div>
      <div>1.开考前5分钟可以提前进入考场查看题目，开考30分钟后不能再进入考场</div>
      <div>2.考生在粉笔APP参加公基模考</div>
      <div>3.模考当天9:25-10:00如果遇到无法进入考场，答题过程中遇到问题可以联系在线人工客服</div>
      <div>4.通过"粉笔"客户端-我的-右上角"设置"-在线客服，即可联系人工客服</div>
      <div>5.下次模考大赛时间为6月23日</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      detail: {
        title: '专项智能练习(语言理解与表达)',
        person: '320',
        time: '2018年6月9日(周六) 9:30-11:00'
      }
    }
  }
}
</script>

<style lang="less">

  // 模考大赛
  .record-imitate-container {
    height: 100%;
    background-color: #F5F5F5;
    .record-imitate-box {
      padding: 30rpx 30rpx 0;
      .content {
        padding: 30rpx 0;
        text-align: center;
        background-color: #fff;
        border-radius: 5rpx;
      }
      .content-btn {
        display:inline-block;
        background-color: #3399FF;
        border-radius: 5rpx;
        font-size: 26rpx;color:#fff;padding:10rpx 15rpx;
      }
    }
  }
</style>
