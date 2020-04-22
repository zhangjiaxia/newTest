import Vue from 'vue'
import App from './App'
import store from './store' //全局变量

Vue.config.productionTip = false
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
