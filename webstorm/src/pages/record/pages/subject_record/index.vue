<template>
  <div class="subject-record-container containter">
    <div class="subject-record-tab">
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        @changeTab="changeTab"/>
    </div>
    <div class="subject-record-content">
      <problems :items="items" type="record"/>
    </div>
  </div>
</template>

<script>
import tabChange from '@/components/tabChange'
import problems from '../../template/problems'
import fly from '@/lib/fetch'
import formatTime from '@/lib/formatTime'

export default {
  components: {
    tabChange,
    problems
  },
  data () {
    return {
      tabIndex: 0,
      tabItems: [
        {
          name: '练习'
        },
        {
          name: '试卷'
        }
      ],
      items: []
    }
  },
  mounted () {
    this.getList();
  },
  methods: {
    // 导航切换
    changeTab (index) {
      this.tabIndex = index;
      this.getList();
    },
    getList () {
      let subjectId = 35;
      let userId = 67;
      if (this.tabIndex === 0) {
        subjectId = 29;
        fly.get(`/api/exercise/v1/history/${userId}/${subjectId}`).then((res)=>{
          let { code, message, data } = res.data
          if (code === 200) {
            data.forEach((item) => {
              item.startTime = formatTime(item.createdTime/1000, 'Y/M/D')
            })
            this.items = data
          }
        }).catch((err) => console.error(err))
      }
      if (this.tabIndex === 1) {
        fly.get(`/api/paper/v1/history/${userId}/${subjectId}`).then((res)=>{
          console.log(res)
          let { code, message, data } = res.data
          if (code === 200) {
            data.forEach((item) => {
              item.startTime = formatTime(item.createdTime/1000, 'Y/M/D')
            })
            this.items = data
          }
        }).catch((err) => console.error(err))
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  // 做题记录
  .subject-record-container {
    // 导航切换区域
    .subject-record-tab {

    }

    // 题目内容区域
    .subject-record-content {
      padding: 0 30rpx;
    }
  }
</style>
