export default {
    // 添加商品至购物车
    addToCart({ commit }, productId) {
        commit('ADD_TO_CART', productId)
    }
}