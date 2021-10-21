// 【封装本地存储操作模块】:封装、优化代码

// 存储数据
export const setItem = (key, value) => {
  // 将数组、对象类型数据转换成 JSON 字符串格式进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try { // 若数据是 JSON 字符串格式数据则执行该程序，否则则程序报错，进入 catch 操作进行处理
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
