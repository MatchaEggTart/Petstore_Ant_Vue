import api from '@/api'

export default {
  getAllProducts({commit}) {
    api.products.getAllProducts(data =>{
      commit('GET_ALL_PRODUCTS', data)
    })
  }
}