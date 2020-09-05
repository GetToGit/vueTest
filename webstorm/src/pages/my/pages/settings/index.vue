<template>
  <div class="my-center-settings-center-container containter" @click="contentClick">
    
    <!-- 设置部分 -->
    <edit v-if="type === 0"/>
    <account v-if="type === 1"
      @emitAccountChange="emitAccountChange"/>
    <medal v-if="type === 2" />
    <vip v-if="type === 3"/>
    <course v-if="type === 4"/>
    <questions v-if="type === 5"/>
    <myOtherSettings v-if="type === 6"/>

    <div id="exchangeDialog" 
      class="my-center-exchange-dialog-container containter" 
      v-if="exchangeDialogShow"></div>
    <exchangeDialog v-if="exchangeDialogShow"/>
  </div>
</template>

<script>
import edit from '../templates/edit'
import account from '../templates/account'
import medal from '../templates/medal'
import vip from '../templates/vip'
import course from '../templates/course'
import questions from '../templates/questions'
import myOtherSettings from '../templates/myOtherSettings'
import exchangeDialog from '../templates/exchangeDialog'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      type: 2,
      exchangeDialogShow: false
    }
  },
  components: {
    vip,
    edit,
    medal,
    course,
    account,
    questions,
    myOtherSettings,
    exchangeDialog
  },
  beforeMount() {
    this.type = wx.getStorageSync('settingsPageType');
    this.checkTitle();
  },
  mounted () {
    // 
  },
  methods: {
    checkTitle () {
      let title = '';
      switch (this.type) {
        case 0:
          title = '个人中心';
          break;
        case 1:
          title = '我的账户';
          break;
        case 2:
          title = '我的勋章';
          break;
        case 3:
          title = '专题VIP';
          break;
        case 4:
          title = '我的课程';
          break;
        case 5:
          title = '我的提问';
          break;
        case 6:
          title = '我的设置';
          break;
        default:
          title = '个人中心';
          break;
      }
      wx.setNavigationBarTitle({
        title
      })
    },

    // 全局点击
    contentClick (e) {
      if (e.target.id === 'exchangeDialog') {
        this.exchangeDialogShow = false
      }
    },

    // 管理点击
    emitAccountChange (type) {
      console.log(type)
      switch (type) {
        case 'duihuan':
          this.exchangeDialogShow = true;
          break;
        case 'youhui':
          wx.setStorageSync('otherPageType', 0)
          wx.navigateTo({
            url: '/pages/my/pages/other/main'
          })
          break;
        case 'jilu':
          break;
      }
    }
  }
}

</script>

<style lang="less">
  .my-center-settings-center-container {
    height: 100%;

    .my-center-exchange-dialog-container {
      width: 100%;
      height: 100%;
      position: fixed;
      background-color: #000;
      opacity: 0.4;
      z-index: 99;
      left: 0;
      top: 0;
    }
  }

</style>
