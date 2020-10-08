import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock', // api的base_url
  timeout: 15000, // 请求超时时间
})

export default service
