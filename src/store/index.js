<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
// import user from './modules/user'
// import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    // user,
    // permission
  },
  getters
})

export default store
=======

import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
});

export default store
>>>>>>> e45379c4ac259799d7dde428c08ee411de6ded79
