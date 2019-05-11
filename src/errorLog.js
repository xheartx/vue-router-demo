import Vue from 'vue'
import store from './store'

// 您只能在生产env中设置错误日志 / /如果
// if (process.env.NODE_ENV === 'production') {

Vue.config.errorHandler = function(err, vm, info, a) {
  // 不要问我为什么要使用Vue。nextTick，它只是一个 hack
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  Vue.nextTick(() => {
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
    console.error(err, info)
  })
}

// }
