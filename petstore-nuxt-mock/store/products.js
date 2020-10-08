import productsApi from '@/api/products'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

export const state = () => ({
  all: [],
})

export const getters = {
  all: (state) => state.all,
}

export const actions = {
  getAllProducts({ commit }) {
    // api.products.getAllProducts((data) => {
    //   commit('GET_ALL_PRODUCTS', data)
    // })
    productsApi.getAllProducts().then((response) => {
      commit('GET_ALL_PRODUCTS', response.data.products)
    })
  },
  search({ commit }, { page: p, pageSize: s, searchMap: m }) {
    productsApi.search(p, s, m).then((response) => {
      commit('GET_ALL_PRODUCTS', response.data.rows)
    })
  },
}

export const mutations = {
  [GET_ALL_PRODUCTS](state, payload) {
    state.all = payload
  },
}
