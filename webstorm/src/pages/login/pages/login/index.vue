<template>
  <div class="index-login-container container">
  	<!-- icon-pic -->
  	<div class="index-login-icon">
  		<span></span>
  	</div>
  	<!-- icon-title -->
  	<div class="index-login-title">
  		<span>{{iconTitle}}</span>
  	</div>
  	<!-- icon-detail -->
  	<div class="index-login-detail">
  		<span>{{iconDetail}}</span>
  	</div>
  	<!-- login-input -->
  	<div class="index-login-input container">
  		<span>
  			<input type="number"
  				v-model="number"
  				placeholder="请输入手机号" 
  				placeholder-class="phcolor"
  				@focus="keyBoardFocus"
  				@blur="keyBoardBlur">
  		</span>
  	</div>
  	<!-- login-keyboard -->
  	<div class="index-login-keyboard container">
  		<span :class="{'index-login-keyboard-active': number.length > 0}"
        @click="next">下一步</span>
  	</div>

  	<!-- login-keyboard-num -->
  	<div class="index-login-keyboard-num"
  	  :class="{'index-login-keyboard-num-show': keyboardNumShow}">
  		<keyBoard @handleClick="handleClick"
  			@deleteClick="deleteClick"/>
  	</div>

  </div>
</template>

<script>
import keyBoard from '../../template/keyBoard'
import Toast from 'mp-weui/packages/toast'
export default {
  data () {
    return {
      iconTitle: '财会百一',
      iconDetail: '为保存你的学习数据，请登录后继续学习',
      number: '',
      keyboardNumShow: false
    }
  },
  components: {
    keyBoard
  },
  methods: {
    keyBoardFocus () {
      //
    },
    keyBoardBlur () {
      // this.keyboardNumShow = false
    },
    handleClick (num) {
      this.number += num
    },
    deleteClick () {
      this.number = ''
    },
    clickLoginContainer (e) {
      console.log(e.target)
    },
    next () {
      if (this.number.length === 0) {
        return false
      }
      if (!this.checkPhone(this.number)) {
        Toast('输入电话有误')
        return false
      }
      wx.setStorageSync('telephone', this.number)
      wx.navigateTo({
        url: '/pages/login/pages/password/main'
      })
    },
    checkPhone (value) {
      if (/^1[34578]\d{9}$/.test(value)) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="less">
  @import '../../less/variable.less';
  @import '../../../../less/function.less';

  .index-login-container {
  	// icon-pic
  	.index-login-icon {
  		text-align: center;
  		margin-top: @loginIconMarginTop;
  		span {
  			display: inline-block;
  			.cirlceBorder (@loginIconWidth, @loginIconWidth, @loginIconBorderColor, @loginIconBorderColorRadius);
  		}
  	}
  	// icon-title
  	.index-login-title {
  		text-align: center;
  		span {
  			.fontSizeColor(@loginIconTitleFontSize, @loginIconTitleFontColor);
  		}
  	}
  	// icon-detail
  	.index-login-detail {
  		text-align: center;
  		margin-top: @loginIconDetailMarinTop;
  		span {
  			.fontSizeColor(@loginIconDetailFontSize, @loginIconDetailColor);
  		}
  	}
  	// login-input
  	.index-login-input {
  		padding: @loginInputPadding;
  		margin-top: @loginInputMarginTop;
  		.input {
  			padding-bottom: 20rpx;
  			border-bottom: 1px solid @loginInputBorderColor;
  		}
  		.cursor {
  			width: 2rpx;
  			height: 5rpx;
  			background-color: red;
  		}
  		span {
  			width: 100%;
  			display: inline-block;
  			padding-bottom: 20rpx;
  			border-bottom: 1px solid @loginInputBorderColor;
  			.phcolor {
  				color: @loginInputColor;
  			}
  		}
  		// span {
  		// 	float:left;
  		// 	// display: inline-block;
  		// }
  	}
  	// login-keyboard
  	.index-login-keyboard {
  		padding: @loginInputPadding;
  		margin-top: @loginKeyboardMarginTop;
  		span {
  			width: 100%;
  			text-align: center;
  			display: inline-block;
  			color: @loginKeyboardColor;
  			padding: @loginKeyboardPadding;
  			font-size: @loginKeyboardFontSize;
  			border-radius: @loginKeyboardRadius;
  			background-color: @loginKeyboardDefaultBgc;
  		}
  		.index-login-keyboard-active {
  			color: @loginKeyboardActiveColor;
  			background-color: @loginKeyboardActiveBgc;
  		}
  	}
  	// login-keyboard-num
  	.index-login-keyboard-num {
  		width: 100%;
  		height: 406rpx;
  		bottom: -406rpx;
  		position: fixed;
  		transition: all 0.25s linear;
  	}
  	.index-login-keyboard-num-show {
  		bottom: 0rpx;
  	}
  }
</style>
