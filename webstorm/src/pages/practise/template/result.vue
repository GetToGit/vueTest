<template>
  <div class="practise-result-containter container">
    <!-- title -->
    <div class="practise-result-title">
      <div>练习类型:{{detail.name}}</div>
      <div>交卷时间:{{detail.commitTimeText}}</div>
      <!-- <div class="return">返回专题</div> -->
    </div>

    <!-- chart -->
    <div class="practise-result-chart">
      <div class="practise-result-chart-content">
        <span class="chart">
          <div>答对</div>
          <div>
            <span style="font-size:60rpx;">{{detail.rightQaCount}}</span>
            <span>/{{detail.totalQaCount}}</span>
          </div>
        </span>
        <div class="absolute-chart">
          <div>{{result.difficulty}}</div>
          <div>难度</div>
        </div>
      </div>
      <div class="practise-result-chart-text">
        <div class="item">
          <div>已击败考生</div>
          <div>{{result.defeat}}</div>
        </div>
        <div class="item">
          <div>全站平均分</div>
          <div>{{result.average}}</div>
        </div>
        <div class="item">
          <div>最高分</div>
          <div>{{result.highest}}</div>
        </div>
      </div>
    </div>

    <!-- hr -->
    <div style="height: 30rpx; background: #F2F2F2;"></div>

    <!-- assess -->
    <div class="practise-result-assess">
      <div class="title">能力评估</div>
      <div class="title_2">通过本次练习，发现您对以下考点的掌握情况(星星越多,对考点掌握得越好)</div>
      <div class="item" v-for="item in access" :key="item.name">
        <div class="float_1">
          <div class="absolute"></div>
          <span class="text" style="float:left;">{{item.name}}</span>
        </div>
        <div class="float_2">
          <span class="text_1" style="float:left;">
            <span class="sign">{{item.sign}}</span>
          </span>
          <span class="text_2" style="float:right;">&gt;</span>
        </div>
      </div>
    </div>

    <!-- hr -->
    <div style="height: 30rpx; background: #F2F2F2;"></div>

    <!-- tree -->
    <div style="padding: 0 30rpx;">
      <subjectTree :items="items"/>
    </div>

    <!-- hr -->
    <div>
      <div style="height: 30rpx; background: #F2F2F2;"></div>
      <div>
        <resultChoose :title="detail.name" :items="items2"/>
      </div>
    </div>

    <!-- fixed -->
    <div class="practise-result-fixed">
      <div @click="toWrong">错题解析</div>
      <div @click="toWrong">全部解析</div>
    </div>

  </div>
</template>

<script>
import subjectTree from '@/components/subjectTree'
import resultChoose from '@/components/resultChoose'
import formatTime from '@/lib/formatTime'
import fly from '@/lib/fetch'

export default {
  components: {
    subjectTree,
    resultChoose
  },
  data () {
    return {
      detail: {},
      title: {
        'name': '专项智能练习(语言理解与表达)',
        'time': '2017.08.02 11:00'
      },
      result: {
        'score': '96',
        'total': '100',
        'difficulty': '5.2',
        'defeat': '10%',
        'average': '12.38',
        'highest': '100' 
      },
      access: [
        {
          name: '文学常识',
          sign: '继续恶补'
        },
        {
          name: '文学常识',
          sign: '继续恶补'
        }
      ],
      items: [],
      items2: [
        {
          name: '1',
          type: 'red'
        },
        {
          name: '1',
          type: 'green'
        },
        {
          name: '1',
          type: 'default'
        },
        {
          name: '1',
          type: 'default'
        },
        {
          name: '1',
          type: 'default'
        },
        {
          name: '1',
          type: 'default'
        }
      ]
    }
  },
  mounted () {
    let detail = wx.getStorageSync('resultDetail')
    detail.commitTimeText = formatTime(detail.commitTime/1000, 'Y-M-D')
    this.detail = detail
    this.getItems()
    this.checkStatus()
  },
  methods: {
    toWrong () {
      let url = null
      url = '/pages/practise/pages/analysis/main'
      wx.navigateTo({ url })
    },
    getItems () {
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
    },
    checkStatus () {
      this.items2 = this.detail.qaAnswerStatus
      console.log(this.detail.qaAnswerStatus)
    }
  }
}
</script>

<style lang="less">
  @import '../less/variable.less';
  @import '../../../less/function.less';

  // 章节练习结果区域
  .practise-result-containter {
    padding-bottom: 100rpx;
    // 标题
    .practise-result-title {
      position: relative;
      padding: @practiseResultTitleTextIndexPadding;
      border-bottom: 1px solid @practiseResultTitleBorderB;
      div {
        text-indent: @practiseResultTitleTextIndex;
        &:nth-child(1) {
          color: @practiseResultTitleNameColor;
          font-size: @practiseResultTitleNameFontS;
        }
        &:nth-child(2) {
          color: @practiseResultTitleTimeColor;
          font-size: @practiseResultTitleNameFontS;
        }
      }
      .return {
        color: #fff;
        text-indent: 0;
        position: absolute;
        padding: 10rpx 20rpx;
        border-radius: 30rpx;
        background-color: #3399FF;
        right: 20rpx; top: 30rpx;
        font-size: @practiseResultTitleNameFontS;
      }
    }

    // 图表
    .practise-result-chart {
      .practise-result-chart-content {
        position: relative;
        text-align: center;
        padding-top: @practiseResultChartContentPaddingT;
        .chart {
          border-radius: 50%;
          display: inline-block;
          width: @practiseResultChartContentCircleW;
          height: @practiseResultChartContentCircleW;
          border: 1px solid @practiseResultChartContentCircleC;

          div {
            &:nth-child(1) {
              font-size: @practiseResultChartContentCircleTitleFontS;
              margin-top: @practiseResultChartContentCircleTitleMarginT;
            }
          }
        }

        .absolute-chart {
          top: 40%;
          right: 15%;
          position: absolute;
          border-radius: 50%;
          width: @practiseResultChartContentAbsoluteCirclrW;
          height: @practiseResultChartContentAbsoluteCirclrW;
          border: 1px solid @practiseResultChartContentCircleC;

          div {
            &:nth-child(1) {
              color: @practiseResultChartContentAbsoluteTextColor_1;
              font-size: @practiseResultChartContentAbsoluteTextFontS_1;
            }
            &:nth-child(2) {
              color: red;
              font-size: @practiseResultChartContentAbsoluteTextFontS_2;
            }
          }
        }
      }

      .practise-result-chart-text {
        display: flex;
        margin: @practiseResultChartTextPadding;
        .item {
          flex: 1;
          text-align: center;
          border-right: 1px solid #ccc;
          &:last-child {
             border: none;
          }
          div {
            &:nth-child(1) {
              color: @practiseResultChartTextColor_1;
              font-size: @practiseResultChartTextFontS_1;
            }
            &:nth-child(2) {
              font-size: @practiseResultChartTextFontS_2;
            }
          }
        }
      }
    }

    // 能力评估
    .practise-result-assess {
      padding: 0 50rpx;
      .title {
        font-size: 28rpx;
        margin-top: 50rpx; 
      }
      .title_2 {
        font-size: 24rpx;
        color: #666;
      }
      .item {
        margin-top: 10rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border: none;
        }
        .float_1, .float_2 {
          overflow: hidden;
        }
        .float_1 {
          position: relative;
          padding-left: 10px;
          .text {
            font-size: 24rpx;
          }
          .absolute {
            width: 18rpx;
            height: 18rpx;
            left: 0; top: 10rpx;
            position: absolute;
            border-radius: 50%;
            background-color: #0099FF;
          }
        }
        .float_2 {
          .text_1 {
            font-size: 24rpx;
            span {
              display: inline-block;
            }
            .sign {
              color: #FD5D5B;
              padding: 5rpx;
              border: 1px solid #FD5D5B;
              border-radius: 15rpx;
            }
            .sign_2 {
              color: #26FF38;
              border: 1px solid #26FF38;
            }
          }
          .text_2 {
            
          }
        }
      }
    }

    // 底部固定
    .practise-result-fixed {
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 9;
      display: flex;
      position: fixed;
      height: 80rpx;
      line-height: 80rpx;
      background-color: #fff;

      div {
        flex: 1;
        color: #fff;
        font-size: 24rpx;
        text-align: center;

        &:nth-child(1) {
          background-color: #3399FF;
        }
        &:nth-child(2) {
          background-color: #0090C9;
        }
      }
    }

  }
</style>
