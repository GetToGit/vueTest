<template>
  <div></div>
</template>
<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style lang="less">
.container {
  box-sizing: border-box;
  // height: 100%;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
  // padding: 200rpx 0;
  // box-sizing: border-box;
}
/* this rule will be remove */
* {
  margin: 0;
  padding: 0;
  // transition: width 2s;
  // -moz-transition: width 2s;
  // -webkit-transition: width 2s;
  // -o-transition: width 2s;
}
page {
  height: 100%;
}
@font-face {
  font-family: 'iconfont';  /* project id 732151 */
  src: url('//at.alicdn.com/t/font_732151_ln20f321ai.eot');
  src: url('//at.alicdn.com/t/font_732151_ln20f321ai.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_732151_ln20f321ai.woff') format('woff'),
  url('//at.alicdn.com/t/font_732151_ln20f321ai.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_732151_ln20f321ai.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  display: inline-block;
  font-size: 40rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
