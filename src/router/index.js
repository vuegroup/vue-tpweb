
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
      { path: 'index', component: _import('demo1/index'), name: '列表One' }
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
  {
    path: '/list',
    component: Layout,
    name: '列表demo',
    icon: 'EXCEL',
    children: [
      { path: 'insideadd', component: _import('list/insideadd'), name: '页面内添加' },
      { path: 'externaladd', component: _import('list/externaladd'), name: '新页面添加' },
      { path: 'fixedheader', component: _import('list/fixedheader'), name: '固定表头' },
      { path: 'unfixedheader', component: _import('list/unfixedheader'), name: '不固定表头' },
      { path: 'drag', component: _import('list/drag'), name: '拖拽列表' },
      { path: 'insideedit', component: _import('list/insideedit'), name: '行内编辑' },
      { path: 'add', component: _import('list/add'), name: '添加', hidden: true }
    ]
  },
  {
    path: '/select',
    component: Layout,
    name: '选择器',
    icon: 'EXCEL',
    children: [
      { path: 'pt-select', component: _import('select/pt-select'), name: '普通选择器' },
      { path: 'multi-select', component: _import('select/multi-select'), name: '多级选择器' },
      { path: 'search-select', component: _import('select/search-select'), name: '搜索选择器' }
    ]
  },
  {
    path: '/tree',
    component: Layout,
    name: '树形结构',
    icon: 'EXCEL',
    noDropdown: true,
    children: [
      { path: 'index', component: _import('tree/index'), name: '树形结构' },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
