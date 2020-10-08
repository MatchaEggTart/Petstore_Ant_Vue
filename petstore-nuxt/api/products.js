// 使用了 axios
import axios from 'axios'

function getAllProducts(method) {
  // 参数是 products/actions 的匿名方法
  if (typeof method === 'function') {
    axios.get('/products.json').then((response) => {
      /* 
      调用 actions的 getAllProducts方法，
        将获取的数据作参数交给 actions/getAllProdcts方法
      function (data) {
        commit('GET_ALL_PRODUCTS', data)
      }
      */
      const products = response.data.products
      // 修改图片地址
      for (let i = 0; i < products.length; i++) {
        products[i].image = products[i].image.replace(/static/, '')
      }
      method(products)
    })
  } else {
    window.console.log('Invalid type of arguments.')
  }
}

export default {
  getAllProducts,
}
