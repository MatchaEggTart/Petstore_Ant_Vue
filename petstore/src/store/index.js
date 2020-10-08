// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCart from './modules/shoppingCart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // shoppingCart 开启了 namespaced: true
    // 所以要使用这个模块， 前缀一定要加入这里写的 shoppingCart
    shoppingCart,
    products
  },
  
})