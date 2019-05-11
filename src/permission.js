import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cooki

NProgress.configure({ showSpinner: false }) // NProgress配置

// permissiom判断功能
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) {
//     return true // 管理员权限直接通过
//   }
//   if (!permissionRoles) {
//     return true
//   }
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// 不重定向白名单
const whiteList = [
  '/login'
]

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  if (getToken()) { // 确定是否有Token
    // 有 Token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 如果当前页面是主页，将不会在每个钩子之后触发，所以手动处理它
    } else {
      // 判断当前用户是否已拉取完user_info信息
      if (store.getters.roles.length === 0) {
        // 拉取user_info
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.permission // 注意:必须是一个数组！
          // 根据roles权限生成可访问的路由表
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // hack方法 确保addRoutes已完成 ,设置替换:true，这样导航就不会留下历史记录
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败，请再次登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
      store.dispatch('initRoutes')
    } else {
      // 否则全部重定向到登录页
      next({ path: '/login' })
      NProgress.done() // 如果当前页面是登录，将不会在每个钩子之后触发，所以手动处理它
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
