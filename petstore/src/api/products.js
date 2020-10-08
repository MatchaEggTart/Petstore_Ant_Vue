// 使用了 axios
import axios from 'axios';


function getAllProducts(method) {
  // 参数是 products/actions 的匿名方法
  if (typeof(method) === "function") {
    axios.get("/static/products.json").then((response) => {
      /* 
      调用 actions的 getAllProducts方法，
        将获取的数据作参数交给 actions/getAllProdcts方法
      function (data) {
        commit('GET_ALL_PRODUCTS', data)
      }
      */
      method(response.data.products)
    })
  } else {
    throw "Invalid type of arguments."
  }
}

export default{
  getAllProducts
}