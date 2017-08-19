
// 项目路由配置
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/* layout */
import Layout from '../view/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    hidden: true,
    children: [{ path: 'index', component: _import('index/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 加载所有模块根据权限，之后根据权限筛选
export const asyncRouterMap = [
  {
    path: '/list',
    component: Layout,
    redirect: '/list/index',
    name: '列表表单',
    icon: 'EXCEL',
    noDropdown: true,
    children: [
      { path: 'index', component: _import('list/index'), name: '列表表单' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
