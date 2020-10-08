// import https from 'https'

// 使用了 axios
// import axios from 'axios'
import request from '@/utlis/request'

const apiName = 'products'

export default {
  // 获取所有商品
  getAllProducts() {
    return request({
      url: `/${apiName}`,
      method: 'get',
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/${apiName}/search/${page}/${size}`,
      method: 'post',
      data: searchMap,
    })
  },
}

// function getAllProducts(method) {
//   // 参数是 products/actions 的匿名方法
//   if (typeof method === 'function') {
//     // const ignoreSSL = axios.create({
//     //   httpsAgent: new https.Agent({
//     //     rejectUnauthorized: false,
//     //   }),
//     // })
//     // ignoreSSL.get(
//     //   'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
//     // )

//     // // 在 axios 请求时，选择性忽略 SSL
//     // const agent = new https.Agent({
//     //   rejectUnauthorized: false,
//     // })
//     axios
//       .get(
//         'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
//         // { httpsAgent: agent }
//       )
//       .then((response) => {
//         method(response.data.products)
//       })
//   } else {
//     window.console.log('Invalid type of arguments.')
//   }
// }

// export default {
//   getAllProducts,
// }
