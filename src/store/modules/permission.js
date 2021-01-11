import { baseRouter } from '../../router/index'

const state = {
  routes: [],
  addRoutes: [],
  menuType: 1, // 1: 白底 2：透明底部
  tabIndex: '1',
}

const mutations = {
  SET_ROUTES: (state, routes) =>{
    state.routes = routes;
    state.addRoutes = routes;
  },
  MENU_TYPE: (state, type) =>{
    state.menuType = type;
  },
  TABINDEX: (state, type) => {
    state.tabIndex = type;
  }
}
const actions = {
  generateRoutes({commit}){
    return new Promise((resolve, reject) =>{
      commit('SET_ROUTES', baseRouter);
      resolve(baseRouter)
    })
  },
  getMenuType({commit}, type){
    commit('MENU_TYPE',type)
  },
  changeTabIndex({commit}, type){
    commit('TABINDEX',type);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}