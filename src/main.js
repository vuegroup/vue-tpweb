
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import './mock/index.js'  // 该项目所有请求使用mockjs模拟
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import { getToken } from './utils/auth'
Vue.config.productionTip = false

// 注册需要使用的插件
Vue.component('multiselect', Multiselect)
Vue.use(ElementUI)

const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd']// 不验证用户登陆白名单 配置
router.beforeEach((to, from, next) => {
  if (getToken()) { // 判断是否有Token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断是否有当前用户权限
      if (store.getters.roles.length === 0) {
        // 获取用户信息
        store.dispatch('GetInfo').then(res => {

        }).catch(() => {
          // 登出
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        // if (hasPermission(store.getters.roles, to.meta.role)) {
        //   next();//
        // } else {
        //   next({ path: '/401', query: { noGoBack: true } });
        // }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
