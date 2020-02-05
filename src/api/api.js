import { Message } from 'element-ui'
import { router } from 'vue-router'
import that from '../main.js'

// 引用axios
let axios = require('axios')

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log('请求错误', error)
      switch (error.response.status) {
        case 400:
          console.log('400')
          break
        case 401:
          Message({
            showClose: true,
            message: error.response.data.msg,
            type: 'success'
          })
          that.$router.push('/')
          break
        case 403:
          console.log('不安全的跨域访问')
          break
        case 404:
          console.log('接口不存在')
          break
        case 500:
          Message({
            showClose: true,
            message: '服务器错误',
            type: 'error'
          })
      }
    }
    return Promise.reject(error)// 返回接口返回的错误信息
  })
function apiAxios (method, url, params, tip, success) {
  if (params) {
    if (typeof (params) !== 'string') {
      params = filterNull(params)
    }
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: 'api',
    withCredentials: true
  }).then(function (res) {
    let data = res.data
    if (res.status === 200) {
      if (data.msg === 'ok') {
        success(res.data)
        if (tip != null) {
          Message({
            showClose: true,
            message: tip,
            type: 'success'
          })
        }
      }
    }
  }).catch(function (err) {
    let res = err.response
    if (err) {
      // console.log('api error, HTTP CODE: ' + res.status)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, tip, success) {
    return apiAxios('GET', url, params, tip, success)
  },
  post: function (url, params, tip, success) {
    return apiAxios('POST', url, params, tip, success)
  },
  put: function (url, params, success) {
    return apiAxios('PUT', url, params, success)
  },
  delete: function (url, params, success) {
    return apiAxios('DELETE', url, params, success)
  }
}
