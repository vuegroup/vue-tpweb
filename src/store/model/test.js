
// 配置实体
const test = {
  state: {
    options: []
  },

  // getter and setter
  mutations: {
    //新增菜单
    ADD_MENU: (state, menu) => {
      if (state.options.some(v => v.name === menu.name)) return
        state.options.push({ name: menu.name, path: menu.path })
    },
    //移除菜单
    REMOVE_MENU: (state, menu) => {
      if (state.options.some(v => v.name === menu.name)) {
        state.options=state.options.filter(v => v.name !== menu.name);
      }
    }
  },

  actions: {
    // 添加菜单
    addMenu: ({ commit }, menu) => {
      commit('ADD_MENU', menu)
    },
    //移除菜单
    remouveMenu: ({ commit }, menu) => {
      commit('REMOVE_MENU', menu)
    }
  }
}

export default test
