<template>
  <div class="index-practise-third-container containter" @click="contentClick">
    <result v-if="type === 0"/>
  </div>
</template>

<script>
import result from '../../template/result'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      type: 0
    }
  },
  components: {
    result
  },
  beforeMount() {
    this.type = wx.getStorageSync('practiseThirdPageType');
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
          title = '交卷结果';
          break;
        default:
          title = '';
          break;
      }
      wx.setNavigationBarTitle({
        title
      })
    }
  }
}

</script>

<style lang="less">
  .index-practise-third-container {
    height: 100%;
  }
</style>
