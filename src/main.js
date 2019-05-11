// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS 初始化

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import '@/styles/index.scss' // 全局 css

// 引入 vue-kikindeditor 需要的文件
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'

// 配置信息
import { publics } from './config/env'

import App from './App'
import router from './router'
import store from './store'

import './icons' // svg-icon
import './permission' // 权限控制
// import './errorLog' // 错误日志
import './mock' // 模拟数据

import * as filters from './filters'

Vue.config.productionTip = false

// 注册 vue-kikindeditor plugin
Vue.use(VueKindEditor)

// 全局变量
Vue.prototype.PUBLIC = publics

Vue.use(Element, { size: 'medium' }) // set element-ui default size

// 注册全局通用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
