// 封装请求模块
import axios from 'axios'
import store from '@/store' // 加载容器

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}` // !统一设置 token
  }
  console.log(config)
  // 注意：这里必须要返回 config 配置对象，否则 config 配置对象就一直停在这里，外界无法使用
  return config
}, function (err) {
  // 请求失败（请求还没发出去），会进入这里
  return Promise.reject(err)
})
// 响应拦截器

export default request
