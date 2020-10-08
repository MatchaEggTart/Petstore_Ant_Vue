import api from '@/api'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

export const state = () => ({
  all: [],
})

export const getters = {
  all: (state) => state.all,
}

export const actions = {
  getAllProducts({ commit }) {
    api.products.getAllProducts((data) => {
      commit('GET_ALL_PRODUCTS', data)
    })
  },
}

export const mutations = {
  [GET_ALL_PRODUCTS](state, payload) {
    state.all = payload
  },
}
