import Vue from "vue"
// 导入axios
import axios from "axios"
axios.defaults.baseURL = "http://localhost:8081/"
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})
// 将axios挂载到vue的原型对象上
Vue.prototype.$http = axios
