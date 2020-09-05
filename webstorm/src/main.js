import Vue from 'vue'
import App from './App'
// import 'mp-weui/lib/style.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      // 首页
      'pages/index/main',
      'pages/practise/pages/index/main',
      'pages/practise/pages/second/main',
      'pages/practise/pages/third/main',
      // 登录相关
      'pages/login/pages/login/main',
      'pages/login/pages/password/main',
      // 考试相关
      'pages/examination/pages/current/main',
      'pages/examination/pages/choose/main',
      // 统计相关
      'pages/statistics/pages/data_report/main',
      // 练习相关
      'pages/practise/pages/result/main',
      'pages/practise/pages/problems/main',
      // 'pages/practise/pages/answer/main',
      'pages/practise/pages/analysis/main',
      // 做题历史记录相关
      // 'pages/record/pages/subject_record/main',
      'pages/record/pages/exam_questions/main',
      'pages/record/pages/exam_questions_2/main',
      'pages/record/pages/imitate/main',
      'pages/record/pages/package/main',
      'pages/record/pages/mistaken/main',
      'pages/record/pages/feedback/main',
      // 直播视频相关
      '^pages/course/pages/course_center/main',
      'pages/course/pages/course_live/main',
      'pages/course/pages/course_detail/main',
      // 个人中心相关
      'pages/my/pages/my_center/main',
      'pages/my/pages/settings/main',
      'pages/my/pages/other/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#3399FF',
      navigationBarTitleText: '在线题库',
      navigationBarTextStyle: '#fff'
    }
  }
}
