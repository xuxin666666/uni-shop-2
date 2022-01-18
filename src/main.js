import Vue from 'vue'
import {$http} from '@escook/request-miniprogram'

import App from './App'
import store from '@/store/store'

uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
$http.beforeRequest = function(options) {
    uni.showLoading({
        title: '数据加载中...'
    })
}
$http.afterRequest = function(options) {
    uni.hideLoading()
}

uni.$showMsg = function(title='数据请求失败！', duration=1500) {
    uni.showToast({
        title,
        duration,
        icon: 'none'
    })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store,
})
app.$mount()
