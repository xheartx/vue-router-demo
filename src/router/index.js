import Vue from 'vue'
import Router from 'vue-router'

const _import = require(`./_import_${process.env.NODE_ENV}`)
// import { userType } from '@/config/variable'
// 在开发环境中不使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。 所以只有在生产中使用延迟加载;
// 详细信息：https：//panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   如果 `hidden:true`将不会显示在侧栏中(默认为false)
* redirect: noredirect           如果  `redirect:noredirect` 不会在面包屑中重新使用
* name:'router-name'             这个名字被用在了(必须设置！！！！)
* meta : {
    roles: ['admin','editor']    将控制页面角色(您可以设置多个角色)
    title: 'title'               在子菜单和面包屑中显示名称(推荐设置)
    icon: 'svg-name'             侧边栏的图标显示
    noCache: true                如果 fasle ,页面将不会被缓存(默认为false)
  }
**/
export const constantRouterMap = [
  {
    path: '',
    redirect: '/dashboard/index'
  },
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/default',
    component: Layout,
    redirect: '/default/index',
    hidden: true,
    children: [
      { path: 'index', component: _import('default/default'), name: 'default', meta: { title: '开发中', noCache: true }}
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
