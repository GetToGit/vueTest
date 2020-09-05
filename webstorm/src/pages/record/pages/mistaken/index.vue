<template>
  <div class="record-mistaken-container containter">
    <div class="record-mistaken-tab containter">
      <tabChange :tabIndex="tabIndex"
        :tabItems="tabItems"
        :other="true"
        @changeTab="changeTab"
        @showOtherClassIfyTab="showOtherClassIfyTab"/>
    </div>

    <!-- title -->
    <div class="record-mistaken-total">
      <div>{{title}}</div>
      <div>{{total}}</div>
    </div>

    <!-- content -->
    <div class="record-mistaken-tree">
      <div class="item" 
        v-for="item in items"
        :key="item.name">
        <div class="item-content">
          <span>{{item.chapter.name}}</span>
          <span class="right">
            <i class="iconfont">&#xe608;</i>
          </span>
        </div>
        <div class="item-mistake" v-show="type === 0">做错<span>15</span>道题</div>
      </div>
    </div>

    <!-- button -->
    <div class="bottom-fixed" @click="toWrong()">{{wrongTitle}}</div>

    <!-- 分类选择 -->
    <div class="other-classify" v-show="otherClassify">
      <tabChangeOther :tabItems="otherTabItems"
        @showOtherClassIfyTab="showOtherClassIfyTab"
        @changeTabChangeList="changeTabChangeList"/>
    </div>
    <div class="other-classify-bgc" v-show="otherClassify"></div>

  </div>
</template>

<script>
import tabChange from '@/components/tabChange'
import tabChangeOther from '@/components/tabChangeOther'
import fly from '@/lib/fetch'

export default {
  components: {
    tabChange,
    tabChangeOther
  },
  data () {
    return {
      tabIndex: 0,
      tabItems: [
        {
          id: 1,
          name: '智能组卷'
        },
        {
          id: 2,
          name: '真题'
        },
        {
          id: 3,
          name: '独家押题'
        }
      ],
      otherTabItems: [
        {
          id: 4,
          name: '模考大赛'
        },
        {
          id: 5,
          name: '快速练习'
        },
        {
          id: 6,
          name: '章节练习'
        }
      ],
      items: [],
      otherClassify: false,
      type: null,
      total: null,
      title: '',
      wrongTitle: ''
    }
  },
  mounted () {
    this.getType();
    this.getList();
  },
  methods: {
    // 导航切换
    changeTab (index) {
      this.tabIndex = index;
      let item = this.tabItems[index]
      this.getList();
    },

    // 类型判断 
    getType () {
      this.type = wx.getStorageSync('mistakenType')
      switch (this.type) {
        case 0:
          this.title = '错题总数';
          this.wrongTitle = '练习全部错题';
          break;
        case 1:
          this.title = '收藏总数';
          this.wrongTitle = '查看收藏';
          break;
        case 2:
          this.title = '笔记总数';
          this.wrongTitle = '查看笔记';
          break;
      }
    },

    // 获取我的收藏列表
    getList () {
      console.log(this.type)
      switch (this.type) {
        case 0:
          this.getMistakeList();
          break;
        case 1:
          this.getCollectList();
          break;
        case 2:
          this.getWritingList();
          break;
      }
    },

    // 错题列表
    getMistakeList () {
      let userId = 67;
      let subjectId = 35;
      let paperType = this.tabItems[this.tabIndex].id;
      let chapterId = 0;
      let curPage = 1;
      fly.get(`/api/mistake/v1/list/${userId}/${paperType}/${chapterId}/${subjectId}/${curPage}`).then((res) => {
        let { code, message, data } = res.data;
        if (code === 200) {
          this.items = data;
          this.total = data.length;
          return
        }
      }).catch((err) => {
        console.error(err);
      })
    },

    // 收藏列表
    getCollectList () {
      let userId = 67;
      let subjectId = 35;
      let paperType = this.tabItems[this.tabIndex].id;
      let chapterId = 0;
      let curPage = 1;
      fly.get(`/api/qa-favorite/v1/list/${userId}/${paperType}/${chapterId}/${subjectId}/${curPage}`).then((res) => {
        let { code, message, data } = res.data;
        if (code === 200) {
          this.items = data;
          this.total = data.length;
          return
        }
      }).catch((err) => {
        console.error(err);
      })
    },

    // 笔记列表
    getWritingList () {
      let userId = 67;
      let subjectId = 35;
      let chapterId = 0;
      let curPage = 1;
      let paperType = this.tabItems[this.tabIndex].id;
      fly.get(`/api/note/v1/list/${userId}/${paperType}/${chapterId}/${subjectId}/${curPage}`).then((res) => {
        let { code, message, data } = res.data;
        if (code === 200) {
          this.items = data;
          this.total = data.length;
          return
        }
      }).catch((err) => {
        console.error(err);
      })
    },

    // 去全部错题
    toWrong () {
      let url = null
      switch (this.type) {
        case 0:
          url = '/pages/practise/pages/analysis/main';
          wx.navigateTo({ url });
          break;
        case 1:
          url = '/pages/practise/pages/analysis/main'
          wx.navigateTo({ url })
          break;
      }
    },

    // 控制分类显示
    showOtherClassIfyTab (bool) {
      this.otherClassify = bool
    },

    // 切换分类
    changeTabChangeList (item, index) {
      this.tabIndex = 0;
      [this.tabItems[0], this.otherTabItems[index]] = [this.otherTabItems[index], this.tabItems[0]];
      this.otherClassify = false;
      this.getList();
    }
  }
}
</script>

<style lang="less">

  // 错题记录
  .record-mistaken-container {
    height: 100%;
    background-color: #F5F5F5;
    .record-mistaken-tab {
      background-color: #fff;
    }
    .record-mistaken-total {
      background-color: #fff;
      text-align: center;
      div {
        &:nth-child(1) {
          font-size: 30rpx;padding-top: 50rpx;
        }
        &:nth-child(2) {
          font-size: 60rpx;padding-bottom: 50rpx; color: #3399FF;
        }
      }
    }
    .record-mistaken-tree {
      padding: 30rpx 30rpx 50rpx 30rpx;
      margin-top: 30rpx;
      background-color: #fff;
      .item {
        margin-top: 10rpx;
        font-size: 30rpx;
        border-bottom: 1px solid #EBEBEB;
        .item-content {
          overflow: hidden;
          .right {
            float: right;
          }
          .iconfont {
            font-size: 30rpx; color: #3399FF;
          }
        }
        .item-mistake {
          margin: 20rpx 0 30rpx 0;
          span {
            color: #3399FF;
          }
        }
      }
    }
    .bottom-fixed {
      width: 100%;
      color: #fff;
      background-color: #3399FF;
      text-align: center;
      font-size: 32rpx;
      position: fixed;
      left: 0;bottom: 0;
      padding: 15rpx 0;
    }

    .other-classify {
      width: 100%;
      position: fixed;
      left: 0; top: 0; z-index: 99;
    }
    .other-classify-bgc {
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.3;
      position: fixed;
      left: 0; top: 0; z-index: 9;
    }
  }
</style>
