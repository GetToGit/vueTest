<template>
  <div class="index-practise-index-container containter" @click="contentClick">
    <subjectRecord v-if="type === 0"/>
    <mistaken v-if="type === 1 || type === 2 || type === 3"/>
    <problem v-if="type === 4"/>
    <imitate v-if="type === 5"/>
    <examQuestions v-if="type === 6"/>
    <examQuestions2 v-if="type === 7"/>
    <packagePage v-if="type === 8"/>
  </div>
</template>

<script>
import subjectRecord from '../../template/subjectRecord'
import mistaken from '../../template/mistaken'
import problem from '../../template/problem'
import imitate from '../../template/imitate'
import examQuestions from '../../template/examQuestions'
import examQuestions2 from '../../template/examQuestions2'
import packagePage from '../../template/packagePage'
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      type: 0
    }
  },
  components: {
    subjectRecord,
    mistaken,
    problem,
    imitate,
    examQuestions,
    examQuestions2,
    packagePage
  },
  beforeMount() {
    this.type = wx.getStorageSync('practiseIndexPageType');
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
          title = '做题记录';
          break;
        case 1:
          title = '我的错题';
          break;
        case 2:
          title = '我的收藏';
          break;
        case 3:
          title = '我的笔记';
          break;
        case 5:
          title = '模考大赛';
          break;
        case 6:
          title = '历年真题';
          break;
        case 7:
          title = '独家押题';
          break;
        case 8:
          title = '智能组卷';
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
  .index-practise-index-container {
    height: 100%;
  }
</style>
