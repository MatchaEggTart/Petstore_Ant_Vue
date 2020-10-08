export const ADD_TO_CART = 'ADD_TO_CART'

export const state = () => ({
  item: [],
})

export const getters = {
  // 购物车里商品ID数组
  item: (state) => state.item,
  // 购物车商品总数
  number: (state) => state.item.length,
}

export const actions = {
  // 添加商品至购物车
  addToCart({ commit }, productId) {
    commit('ADD_TO_CART', productId)
  },
}

export const mutations = {
  [ADD_TO_CART](state, payload) {
    state.item.push(payload)
  },
}
