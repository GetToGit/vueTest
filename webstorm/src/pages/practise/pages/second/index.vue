<template>
  <div class="index-practise-second-container containter" @click="contentClick">
    <answer v-if="type === 0"/>
    <problem v-if="type === 1"/>
  </div>
</template>

<script>
import answer from '../../template/answer'
import problem from '../../template/problem'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      type: 0
    }
  },
  components: {
    answer,
    problem
  },
  beforeMount() {
    this.type = wx.getStorageSync('practiseSecondPageType');
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
          title = '交卷';
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
  .index-practise-second-container {
    height: 100%;
  }
</style>
