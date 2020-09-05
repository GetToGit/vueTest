<template>
  <div class="my-center-settings-vip-container containter">
    <!-- 内容 -->
    <div class="my-center-settings-vip-container-content"
      v-for="item in items"
      :key="item.name">
      <div class="my-center-settings-vip-container-content-item"
        :class="{
          'my-center-settings-vip-container-content-item-active' : itemType === item.price
        }"
        @click="itemType = item.price">
        <div class="text1">{{item.name}}</div>
        <div class="text2">{{item.description}}</div>
        <div class="abs"></div>
        <div class="abs-2">¥{{item.price}}</div>
      </div>
    </div>

    <!-- 购买btn -->
    <div class="my-center-settings-vip-buy" @click="showPayTypes = true">购买</div>

    <!-- 底部购买菜单 -->
    <div class="my-center-settings-vip-buy-content" v-show="showPayTypes">
      <div class="my-center-settings-vip-buy-content-type">支付方式</div>
      <div class="my-center-settings-vip-buy-content-content"
        v-for="item in payItems"
        :key="item.id">
        <div class="left">
          <span v-if="item.id === 0"><i class="iconfont" style="color: #EF3A22;">&#xe6a8;</i>&nbsp;</span>
          <span v-if="item.id === 1"><i class="iconfont" style="color: #09BA07;">&#xe66a;</i>&nbsp;</span>
          <span>{{item.name}}&nbsp;</span>
          <span class="my-price" v-if="item.id === 0">¥{{myPrice}}</span>
        </div>
        <div class="right">
          <span @click="payType= item.id" v-if="payType !== item.id" class="span-circle"></span>
          <i v-if="payType === item.id" class="iconfont">&#xe632;</i>
        </div>
      </div>
      <div class="my-center-settings-vip-buy-content-explain">
        <span>点击去支付后，如果优惠券，讲和此订单绑定，优惠券将设置成已使用</span>
      </div>
      <div class="my-center-settings-vip-buy-content-pay-btn">
        <div class="left">
          <span>实付:</span>
          <span>¥{{itemType}}</span>
        </div>
        <div class="right">去支付</div>
      </div>

    </div>

  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      showPayTypes: false,
      itemType: 10,
      items: [
        {
          name: 'VIP月卡',
          description: '共5视频课程',
          price: 10,
          active: true
        },
        {
          name: 'VIP季卡',
          description: '三个月内可以观看所有课程',
          price: 130,
          active: false
        },
        {
          name: 'VIP终身卡',
          description: '可永久观看所有课程',
          price: 150,
          active: false
        }
      ],
      myPrice: 1000,
      payType: 0,
      payItems: [
        {
          id: 0,
          name: '账户余额'
        },
        {
          id: 1,
          name: '微信支付'
        }
      ]
    }
  }
}

</script>

<style lang="less">
  .my-center-settings-vip-container {
    height: 100%;
    padding: 50rpx 0 0 0;
    background-color: #F5F5F5;

    .my-center-settings-vip-container-content {
      padding: 0 50rpx;
      margin-bottom: 30rpx;
      .my-center-settings-vip-container-content-item {
        position: relative;
        overflow: hidden;
        background-color: #fff;
        padding: 30rpx 50rpx;
        border-radius: 15rpx;
        .text1 {
          font-size: 32rpx;
        }
        .text2 {
          color: #999;
          font-size: 28rpx;
        }
        .abs {
          width: 12rpx;
          height: 100%;
          position: absolute;
          left: 0; top: 0;
          background-color: #FFCD8C;
        }
        .abs-2 {
          font-size: 32rpx;
          position: absolute;
          right: 50rpx; top: 30%;
        }
      }
      .my-center-settings-vip-container-content-item-active {
        .text1, .text2, .abs-2 {
          color: #F6921E;
        }
        .abs {
          background-color: #FB9806;
        }
      }
    }

    // 购买btn
    .my-center-settings-vip-buy {
      width: 100%;
      padding: 15rpx 0;
      text-align: center;
      font-size: 32rpx;
      color: #fff;
      background-color: #3399FF;
      position: fixed;
      left: 0; bottom: 0;
    }

    // 购买菜单内容
    .my-center-settings-vip-buy-content {
      width: 100%;
      position: fixed;
      left: 0; bottom: 0;
      background-color: #fff;

      .my-center-settings-vip-buy-content-type {
        padding: 20rpx 30rpx;
        font-size: 32rpx;
        border-bottom: 1px solid #eee;
      }

      .my-center-settings-vip-buy-content-content {
        padding: 20rpx 30rpx;
        position: relative;
        font-size: 32rpx;
        overflow: hidden;
        border-bottom: 1px solid #eee;
        .left {
          float: left;
          .my-price {
            color: #FC5959;
          }
        }
        .right {
          float: right;
          .iconfont {
            color: #3399FF;
            font-size: 50rpx;
            position: absolute;
            right: 29rpx; top: 15%;
          }
          .span-circle {
            display: inline-block;
            width: 45rpx; height: 45rpx;
            position: absolute;
            right: 29rpx; top: 25%;
            border-radius: 50%; border: 1px solid #3399FF;
          }
        }
      }

      .my-center-settings-vip-buy-content-explain {
        padding: 20rpx 30rpx;
        font-size: 32rpx;
        color: #999;
      }

      .my-center-settings-vip-buy-content-pay-btn {
        overflow: hidden;
        font-size: 34rpx;
        box-shadow: 0 -5rpx 5rpx #F9F9F9;
        .left {
          float: left;
          width: 60%;
          padding: 20rpx 0;
          text-align: center;
        }
        .right {
          float: left;
          width: 40%;
          padding: 20rpx 0;
          text-align: center;
          background-color: #FF0000;
          color: #fff;
        }
      }
    }


  }
</style>
