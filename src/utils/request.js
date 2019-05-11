import axios from 'axios'
import { MessageBox } from 'element-ui'
import { Notification } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 排序的函数
// function objKeySort(obj, reverse) {
//   var newkey
//   if (!reverse) {
//     newkey = Object.keys(obj).sort()
//   } else {
//     newkey = Object.keys(obj).sort().reverse()
//   }
//   // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//   var newObj = {}// 创建一个新的对象，用于存放排好序的键值对
//   for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
//     newObj[newkey[i]] = obj[newkey[i]]// 向新创建的对象中按照排好的顺序依次增加键值对
//   }
//   return newObj// 返回排好序的新对象
// }
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: 'http://eolinker.mctag.cn/server/index.php?g=Web&c=Mock&o=mock&projectID=25&uri=', // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做一些事情
  if (store.getters.token) {
    // config.headers['Token'] = getToken() // 让每个请求携带Token
  }
  // config.data = {
  //   params: decode.encryptData(JSON.stringify(objKeySort(config.data)))
  // }

  return config
}, error => {
  // 请求错误
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
    const res = response.data
    if (res.code !== 1) {
      Notification({
        title: '错误',
        message: res.message,
        type: 'error'
      })
      return Promise.reject('error')
    }
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm('用户信息已失效,请重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    }
    if (typeof res.data === 'string') {
      // console.log(decode.getData(res.data))
      return res.data ? res.data : ''
      // return res.data ? objKeySort(JSON.parse(decode.getData(res.data))) : ''
    } else {
      return res.data
    }
  },
  error => {
    console.log('请求出错：' + error)
    Notification({
      title: '错误',
      message: '请求出错, 请稍后再试',
      type: 'warning'
    })
    return Promise.reject(error)
  }
)

export default service
