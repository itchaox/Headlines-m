// 用户相关接口
import request from '@/utils/request'
// import store from '@/store' // 加载容器

// 用户登录
export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送手机验证码
// 注意：每个手机每分钟只能发一次
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // 发送请求头数据，赋予使用接口权限
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
