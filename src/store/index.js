
import Vue from 'vue'
import Vuex from 'vuex'
import app from './model/app'
import user from './model/user'
import permission from './model/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

export default store
