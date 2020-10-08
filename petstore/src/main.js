// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 添加 axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// import all Antd
import Antd from 'ant-design-vue/es'	// 这里添加/es才不会报错
import 'ant-design-vue/dist/antd.css'

// add Vuex
import Vuex from 'vuex'

// 导入 store
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(Antd)
Vue.use(Vuex)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,	// ES6 写法， 引入 store
  components: { App },
  template: '<App/>'
})

// 避免多次点击路由报错
// Uncaught (in promise) NavigationDuplicated
import Router from 'vue-router'
 
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
