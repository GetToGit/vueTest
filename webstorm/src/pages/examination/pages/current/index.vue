<template>
  <div class="examination-current-containter container">
  	<!-- card -->
  	<div class="examination-card-container container">
  		<div class="examination-card">
  			<div class="title">{{cardTitle}}</div>
  			<div class="content">
  				<span class="border"></span>
  				<span class="left">
  					<div>
  						<i style="display:inline-block;width: 30rpx;height:30rpx;background-color:red;"></i>
  					</div>
  					<div>{{leftTitle}}</div>
  				</span>
  				<span class="right" @click="toChoose()">{{rightTitle}}  &gt;</span>
  			</div>
  		</div>
  	</div>

  	<!-- button -->
  	<div class="examination-btn-container" 
  		v-for="(item, index) in btnList"
  		:key="item.id"
      @click="toIndex(item, index)">
  		<div>{{item.name}}</div>
  	</div>
  </div>
</template>

<script>
import fly from '@/lib/fetch'

export default {
  data () {
    return {
      cardTitle: '当前考试',
      leftTitle: '',
      rightTitle: '切换考试',
      btnList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let index = wx.getStorageSync('classify')
      fly.get(`/api/exercise/v1/exam-subject`).then((res)=>{
        let { code, data, message } = res.data
        if (code === 200 && data) {
          if (data[index[0]]['children'][index[1]] && data[index[0]]['children'][index[1]]['children']) {
            let child = data[index[0]]['children'][index[1]]['children'][index[2]]
            let parent = data[index[0]]['children'][index[1]]['children']
            this.btnList = parent
            this.leftTitle = child.name
          }
          return
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    toChoose () {
      let url = '/pages/examination/pages/choose/main'
      wx.navigateTo({ url })
    },
    toIndex (item, index) {
      let indexClassify = wx.getStorageSync('classify')
      indexClassify[2] = index
      wx.setStorageSync('classify', indexClassify)
      wx.setStorageSync('classifyId', item.id)
      let url = '/pages/index/main'
      wx.redirectTo({ url })
    }
  }
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .examination-current-containter {
  	// card
  	.examination-card-container {
  		padding: @cardContainerPadding;
  		margin-top: @cardContainerMarginT;

  		.examination-card {
  			box-shadow: @cardBoxShadow;
  			border-radius: @cardRadius;
  			background-color: @cardBgc;

  			.title {
  				text-align: center;
  				font-size: @cardTitleFontSize;
  				padding: @cardTitlePadding;
  			}

  			.content {
  				overflow: hidden;
  				position: relative;
  				padding: @cardContentPadding;

  				.border {
  					width: 1rpx;
						position: absolute;
						display: inline-block;
						height: @cardContentBorderPositionH;
						left: 50%; top: @cardContentBorderPositionT;
						border-left: 1rpx solid @cardContentBorderC;
  				}

  				.left {
  					float: left;
  					width: 150rpx;

  					div {
  						text-align: center;
  						width: 100%;
  						float: left;
  						&:nth-child(2) {
  							font-size: @cardContentRightFontS;
  						}
  					}
  				}
  				.right {
  					float: right;
  					color: @cardContentRightColor;
  					font-size: @cardContentRightFontS;
  					margin-top: @cardContentRightMarginT;
  				}
  			}
  		}
  	}

  	// examination-btn-container
  	.examination-btn-container {
  		margin-top: 65rpx;
  		padding: @btnContainerPadding;
  		div {
  			text-align: center;
  			font-size: @btnContainerContentFontS;
  			padding: @btnContainerContentPadding;
  			border-radius: @btnContainerContentRadius;
  			background-color: @btnContainerContentBgc;
  		}
  	}
  }
</style>
