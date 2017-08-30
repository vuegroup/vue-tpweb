
// 项目路由配置
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/* layout */
import Layout from '../view/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },
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
    path: '/demo1',
    component: Layout,
    name: '测试模块One',
    icon: 'EXCEL',
    children: [
      { path: 'index', component: _import('demo1/index'), name: '列表One' },
      { path: 'add', component: _import('demo1/add'), name: '添加' }
    ]
  },
  {
    path: '/demo2',
    component: Layout,
    name: '测试模块Two',
    icon: 'EXCEL',
    children: [
      { path: 'children', component: _import('demo2/index'), name: '子模块Two' },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
