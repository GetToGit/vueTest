<template>
  <div class="index-subject-container container">
    <subjectTree :items="items"/>
  </div>
</template>

<script>
import subjectTree from '@/components/subjectTree'
import fly from '@/lib/fetch'

export default {
  name: 'IndexSubject',
  components: {
    subjectTree
  },
  data () {
    return {
      items: []
    }
  },
  created () {
    let topCateId = 29;
    let userId = 67;
    fly.get(`/api/exercise/v1/category/${topCateId}/${userId}`).then((res)=>{
      let { code, data, message } = res.data
      console.log(res.data)
      if (code === 200 && data) {
        console.log(data)
        data.forEach((item) => {
          item.expand = false;
          if (item.children && item.children.length > 0) {
            item.children.forEach((item2) => {
              item2.expand = false;
              if (item2.children && item2.children.length > 0) {
                item2.children.forEach((item3) => {
                  item3.expand = false;
                })
              }
            })
          }
        })
        this.items = data;
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style lang="less">
  @import '../less/variable';
  @import '../../../less/function';
  .index-subject-container {
    padding: @indexSubjectContainerPadding;
    margin-top: @indexSubjectContainerMarginT;
    background-color: @indexSubjectContainerBgc;
  }
</style>
