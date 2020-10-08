// 使用常量代替 mutation 事件
export const ADD_TO_CART = 'ADD_TO_CART'

export default {
  /*
  addToCart(state, payload) {
    state.item.push(payload);
  }
  */
  [ADD_TO_CART](state, payload) {
    state.item.push(payload);
  }
}