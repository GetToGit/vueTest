<template>
  <div class="course-center-containter container">
  	<div class="course-center-search">
  		<span class="input">
  			<span class="abs" v-show="searchAbs"><i class="iconfont">&#xe6ac;</i>   搜索</span>
  			<input v-model="inputValue" type="text" name="" style="font-size: 30rpx;" @focus="onInput" @blur="onInputSearch">
  		</span>
  	</div>

  	<!-- swiper -->
  	<div class="course-center-containter-swiper">
  		<swiperCenter/>
  	</div>

  	<!-- tabchange -->
	  <div class="tab-change-components-container containter">
	  	<div class="item" 
	  		v-for="(item, index) in tabItems"
	  		:key="item.name">
	  		<span class="item-text"
		  		:class="{
		  			'item-text-active': index===tabIndex
		  		}"
		  		@click.stop="changeTab(index)">{{item.name}}</span>
	  	</div>
	  </div>

  	<!-- tabs -->
  	<div class="course-center-containter-tabs container" style="margin-bottom: 30rpx;">
  		<tabs :tabsItems="tabsItems" 
  			:tabsActiveName="tabsActiveName"
  			@toChangeTabName="toChangeTabName"/>
  	</div>

  	<!-- lists -->
  	<div class="course-center-containter-lists container">
  		<lists :lists="lists" :tabIndex="tabIndex"/>
  	</div>

  	<!-- bottom -->
  	<div class="course-center-containter-bottom container">
  		<indexBottomNav type="course"/>
  	</div>

  	<!-- circle -->
  	<div class="course-center-containter-circle"></div>
  </div>
</template>

<script>
import swiperCenter from '../../template/swiperCenter'
import tabs from '../../template/tabs'
import lists from '../../template/lists'
import indexBottomNav from '@/components/indexBottomNav'
import fly from '@/lib/fetch'
import formatTime from '@/lib/formatTime'

export default {
	components: {
		tabs,
		lists,
		swiperCenter,
		indexBottomNav
	},
	data () {
		return {
			tabIndex: 0,
      tabItems: [
        {
        	id: 1,
          name: '课程专题'
        },
        {
        	id: 2,
          name: '系统班次'
        }
      ],
      tabsItems: [
      	{
      		name: '平面设计'
      	},
      	{
      		name: '游戏动画'
      	},
      	{
      		name: '建筑设计'
      	}
      ],
      tabsActiveName: '全部',
      lists: [],
      searchAbs: true,
      inputValue: ''
		}
	},
	mounted () {
		this.getDirectList()
		this.getClassIfy()
	},
	methods: {
		// 获取直播列表
		getDirectList () {
			let type = 1;
			let cateId = 0;
			let curPage = 1;
	    fly.get(`/api/live/v1/intro/${type}/${cateId}/${curPage}`).then((res)=>{
	      let { code, data, message } = res.data
	      if (code === 200 && data) {
	      	console.log(data)
	      	this.checkList(data);
	      }
	    }).catch(err=>{
	      console.log(err)
	    })
		},

		// 获取专题班次
		getCourseList () {
			let type = 2;
			let cateId = 0;
			let curPage = 1;
	    fly.get(`/api/live/v1/intro/${type}/${cateId}/${curPage}`).then((res)=>{
	      let { code, data, message } = res.data
	      if (code === 200 && data) {
	      	console.log(data)
	      	this.checkList(data);
	      }
	    }).catch(err=>{
	      console.log(err)
	    })
		},

		// 处理列表数据
		checkList (data) {
			if (data) {
				console.log(data)
				data.forEach((item) => {
					item.recentStartTimeText = formatTime(item.recentStartTime/1000, 'Y/M/D')
				})
				this.lists = data
			}
		},

		// 导航切换
    changeTab (index) {
      this.tabIndex = index;
      if (this.tabIndex === 0) {
      	this.getDirectList();
      }
      if (this.tabIndex === 1) {
      	this.getCourseList();
      }
      this.getClassIfy()
    },

    // 小导航切换
    toChangeTabName (name, item) {
    	this.tabsActiveName = name;
      let cateId = null;
      if (name === '全部') {
        cateId = 0;
      } else {
        cateId = item.id;
      }
      if (this.tabIndex === 0) {
        let type = 1;
        let curPage = 1;
        fly.get(`/api/live/v1/intro/${type}/${cateId}/${curPage}`).then((res)=>{
          let { code, data, message } = res.data
          if (code === 200 && data) {
            console.log(data)
            this.checkList(data);
          }
        }).catch(err=>{
          console.log(err)
        })
      }
      if (this.tabIndex === 1) {
        let type = 2;
        let curPage = 1;
        fly.get(`/api/live/v1/intro/${type}/${cateId}/${curPage}`).then((res)=>{
          let { code, data, message } = res.data
          if (code === 200 && data) {
            console.log(data)
            this.checkList(data);
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },

    // 搜索框
    onInput () {
    	this.searchAbs = false;
    },
    onInputSearch () {
    	this.searchAbs = true;
      let type = this.tabItems[this.tabIndex].id
      let cateId = 0;
      let keyword = this.inputValue
      fly.get(`/api/live/v1/search/${type}/${cateId}/${keyword}`).then((res)=>{
        let { code, data, message } = res.data
        if (code === 200 && data) {
          console.log(data)
          // this.checkList(data);
        }
      }).catch(err=>{
        console.log(err)
      })
    	this.inputValue = '';
    },

    // 获取分类
    getClassIfy () {
    	let curPage = 1;
    	let type = this.tabItems[this.tabIndex].id;
	    fly.get(`/api/live/v1/category/${type}`).then((res)=>{
	    	console.log(res)
        let { code, data, message } = res.data
        this.tabsItems = data
	    }).catch(err=>{
	      console.error(err)
	    })
    }
	}

}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .course-center-containter {
  	// 
  	.course-center-search {
  		padding: 0 15rpx;
  		.input {
  			width: 100%;
  			position: relative;
  			margin-top: 10rpx;
  			display: inline-block;
  			border-radius: 30rpx;
  			background-color: #F5F5F5;

  			.abs {
  				.iconfont {
  					font-size: 30rpx;
  				}
  				font-size: 28rpx;
  				position: absolute;
  				left: 40%; top: 5%;
  			}
  		}
  	}

  	.course-center-containter-tabs, .course-center-containter-lists {
  		padding: 0 25rpx;
  	}

  	.course-center-containter-bottom {
  		width: 100%;
  		position: fixed;
  		left: 0; bottom: 0;
  	}
  	.course-center-containter-circle {
  		width: 88rpx; height: 88rpx;
  		position: fixed;
  		right: 30rpx;
  		bottom: 120rpx;
  		background-color: #4CDA64;
  		z-index: 9;
  		border-radius: 50%;
  	}

  	@tabChangeContainerBorderC: #E6E6E6;
	  @tabChangeItemFontS: 26rpx;
	  @tabChangeItemTextPadding: 20rpx 30rpx;
	  @tabChangeItemTextActiveBorderC: #3399FF;
	  @tabChangeItemTextActiveColor: #3399FF;

	  /*tab 切换*/
	  .tab-change-components-container {
	  	display: flex;
	  	border-bottom: 1px solid @tabChangeContainerBorderC;
	  	.item {
	  		flex: 1;
	  		text-align: center;
	  		font-size: @tabChangeItemFontS;
	  	}
	  	.item-text {
	  		display: inline-block;
	  		padding: @tabChangeItemTextPadding;
	  		border-bottom-width: 1px;
	  		border-bottom-style: solid;
	  		border-bottom-color: #fff;
	  	}
	  	.item-text-active {
	  		color: @tabChangeItemTextActiveColor;
	  		border-bottom-color: @tabChangeItemTextActiveBorderC;
	  	}
	  }
  }
</style>
