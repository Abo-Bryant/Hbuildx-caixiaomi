import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
uni.$http=$http
$http.baseUrl = 'https://www.fastmock.site/mock/a70ae7448faa7c23113d82ec2ec97f8f/_abo-990716/'
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中'
  })
}
$http.afterRequest = function(){
  uni.hideLoading()
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()