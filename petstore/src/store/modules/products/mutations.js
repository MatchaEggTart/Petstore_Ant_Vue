export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"

export default {
  [GET_ALL_PRODUCTS](state, payload) {
    state.all = payload
  }
}