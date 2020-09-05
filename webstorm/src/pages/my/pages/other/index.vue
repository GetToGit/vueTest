<template>
  <div class="my-center-settings-other-container containter">
    <otherPreferential v-if="type === 0"/>
    <otherRules v-if="type === 1"/>
    <medalDetail v-if="type === 2"/>
  </div>
</template>

<script>
import otherRules from '../templates/otherRules'
import otherPreferential from '../templates/otherPreferential'
import medalDetail from '../templates/medalDetail'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      type: 0
    }
  },
  components: {
    otherRules,
    otherPreferential,
    medalDetail
  },
  beforeMount () {
    this.type = wx.getStorageSync('otherPageType')
  },
  mounted () {
    this.checkTitle()
  },
  methods : {
    checkTitle () {
      let title = '';
      switch (this.type) {
        case 0:
          title = '优惠券';
          break;
        case 1:
          title = '兑换规则';
          break;
        case 2:
          title = '勋章详情';
          break;
      }
      wx.setNavigationBarTitle({
        title
      })
    },
  }
}

</script>

<style lang="less">
  .my-center-settings-other-container {

  }

</style>
