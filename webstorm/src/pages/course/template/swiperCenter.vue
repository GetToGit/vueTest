<template>
  <div class="course-swiper-template-containter container">
  	<!-- 滑动图 -->
  	<swiper style="height: 300rpx;"
  		:indicator-dots="indicatorDots"
  		:indicator-color="indicatorColor"
  		:indicator-active-color="indicatorActiveColor"
      :autoplay="autoplay" 
      :interval="interval" 
      :duration="duration">
      <block v-for="item in imgUrls" :key="item.url">
        <swiper-item>
        	<img :src="item.url" class="slide-image" style="wdith: 100%; height: 100%;" />
        </swiper-item>
      </block>
    </swiper>
  </div>

</template>

<script>
import fly from '@/lib/fetch'

export default {
	name: 'SwiperCenter',
	data () {
		return {
      imgUrls: [
       	{
          link:'/pages/index/index',
          url:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' 
       	},
       	{
          link:'/pages/logs/logs',
          url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg' 
       	}
    	],
	    indicatorDots: true,
	    indicatorColor: '#90C2E5',
	    indicatorActiveColor: '#fff',
	    autoplay: true,
	    interval: 3000,
	    duration: 1000
		}
	}
}
</script>

<style lang="less">

  .course-swiper-template-containter {
  	height: 300rpx;
  }
</style>
