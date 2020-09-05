<template>
  <div class="record-exam-questions-container containter">
    <div class="record-exam-questions-tab">
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        @changeTab="changeTab"/>
    </div>
    <div class="record-exam-questions-content">
      <problems :items="items" type="exam"/>
    </div>
  </div>
</template>

<script>
import tabChange from '@/components/tabChange'
import problems from '@/components//problemsTemplate'
import fly from '@/lib/fetch'

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
          name: '推荐真题'
        },
        {
          name: '全部真题'
        }
      ],
      items: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      let type = 2;
      let userId = 67;
      let subjectId = wx.getStorageSync('classifyId');
      subjectId = 35;
      fly.get(`/api/paper/v1/list/${type}/${userId}/${subjectId}`).then((res)=>{
        let { code, message, data } = res.data;
        if (code === 200 && data) {
          console.log(data)
          this.items = data
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    // 导航切换
    changeTab (index) {
      this.tabIndex = index;
    }
  }
}
</script>

<style lang="less">

  // 做题记录
  .record-exam-questions-container {
    // 导航切换区域
    .record-exam-questions-tab {

    }

    // 题目内容区域
    .record-exam-questions-content {
      padding: 0 30rpx;
    }
  }
</style>
