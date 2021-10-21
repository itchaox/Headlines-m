import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
// Vuex 容器优点：
// 1. 访问方便
// 2. 数据响应式

// 本地存储优点：
// 1. 数据持久化

const TOKEN_KEY = 'TOUTIAO_USER' // 用常量存储变量，便于后续修改

export default new Vuex.Store({
  state: {
    // 对象，存储当前显示登录用户信息(token等数据)
    user: getItem(TOKEN_KEY) // 【获取本地数据】将字符串还原成对象
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // （其他组件使用 token 数据，在容器中拿取数据）
  },
  mutations: {
    setUser (state, data) {
      state.user = data // 控制 user 为传入值 data
      // 防止刷新丢失数据，需要本地备份存储数据，保持数据持久化
      setItem(TOKEN_KEY, state.user) // 【存储本地数据】
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
